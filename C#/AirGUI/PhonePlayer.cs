using UnityEngine;
using System;
using System.Collections;
using NDream.AirConsole;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Reflection;
using Newtonsoft.Json;

namespace AirGUI
{
    [AttributeUsage(AttributeTargets.Field, Inherited = false, AllowMultiple = true)]
    sealed class PersistentAttribute : Attribute
    {
        public PersistentAttribute()
        {
            
        }
    }

#if !DISABLE_AIRCONSOLE
    public abstract class Player : BasePlayer
    {
        public class Config
        {
            public float width;
            public float height;
            public float widthFactor;
            public float heightFactor;
        }

        public Config PhoneConfig
        {
            get; private set;
        }

        public static Vector2 Size
        {
            get { return new Vector2(1920.0f, 1080.0f); }
        }

        public override string UID => AirConsole.instance.GetUID(ID);

        public override bool IsHero => AirConsole.instance.IsPremium(ID);

        public override string ProfilePictureURL => AirConsole.instance.GetProfilePicture(ID);

        public override string Name => AirConsole.instance.GetNickname(ID);

        public PhoneScene ActiveScene { get; private set; }

        protected Player(int controllerID)
        {
            ID = controllerID;

            AirConsole.instance.onPersistentDataLoaded += OnAirConsolePersistentDataLoaded;

            AirConsole.instance.RequestPersistentData(new List<string> { UID });
        }

        private void OnAirConsolePersistentDataLoaded(JToken data)
        {
            if(UID == null) return;

            var phoneData = data[UID];
            if(phoneData == null) return;

            var fields = GetType().GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach(var field in fields)
            {
                if(field.GetCustomAttribute<PersistentAttribute>() != null)
                {
                    var jValue = phoneData[field.Name];
                    if(jValue != null)
                    {
                        if(!field.FieldType.IsEnum)
                        {
                            field.SetValue(this, Convert.ChangeType(jValue, field.FieldType));
                        }
                        else
                        {
                            int index = (int)jValue;
                            field.SetValue(this, index);
                        }
                    }
                }
            }
        }

        public void SavePersistentData()
        {
            var fields = GetType().GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach(var field in fields)
            {
                if(field.GetCustomAttribute<PersistentAttribute>() != null)
                {
                    object value = field.GetValue(this);
                    AirConsole.instance.StorePersistentData(field.Name, JToken.FromObject(value), UID);
                }
            }
        }

        public T EnterScene<T>() where T : PhoneScene, new()
        {
            return EnterScene(new T());
        }

        public T EnterScene<T>(T scene) where T : PhoneScene
        {
            ActiveScene?.Leave();

            ActiveScene = scene;
            ActiveScene.Phone = this;
            ActiveScene.Enter();
            string sceneData = ActiveScene.Create();

            Message("EnterScene", new { sceneName = typeof(T).Name, sceneData });

            return (T)ActiveScene;
        }

        public void OnAirConsoleMessage(string cmd, JToken data)
        {
            switch (cmd)
            {
                case "CallFunction":
                    string functionName = (string)data["function"];
                    JToken args = data["args"];
                    ActiveScene.CallFunction(functionName, args);
                    break;
                case "config":
                    PhoneConfig = JsonConvert.DeserializeObject<Config>(data["config"].ToString());
                    break;
            }
        }

        public void Message(string cmd, object data)
        {
            AirConsole.instance.Message(ID, new { cmd, data });
        }

        public void PlaySound(string sound)
        {
            Message("PlaySound", sound);
        }

        public void GetPremium()
        {
            Message("GetPremium", null);
        }
    } 
#endif
}
