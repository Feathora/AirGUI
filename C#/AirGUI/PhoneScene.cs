using UnityEngine;
using System.Collections;
using System.Reflection;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Runtime.CompilerServices;

namespace AirGUI
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class PhonePropertyAttribute : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class LoadingSceneAttribute : Attribute
    {

    }

    public abstract class PhoneScene : BaseInputScene
    {

        private List<object> changedProperties;

        public PhoneScene()
        {
            
        }

        public override void Create()
        {
            var objects = new Dictionary<string, object>();

            FieldInfo[] fields = GetType().GetFields(BindingFlags.Instance | BindingFlags.NonPublic);
            foreach(var field in fields)
            {
                if(field.FieldType.IsSubclassOf(typeof(DisplayObject)))
                {
                    DisplayObject obj = (DisplayObject)field.GetValue(this);
                    obj.OnPropertyChanged = PropertyChanged;

                    objects.Add(field.Name, obj);
                }
                else if(typeof(IList).IsAssignableFrom(field.FieldType))
                {
                    IList listObject = (IList)field.GetValue(this);
                    if(listObject.GetType().GetGenericArguments()[0].IsSubclassOf(typeof(DisplayObject)))
                    {
                        foreach (var obj in listObject)
                        {
                            (obj as DisplayObject).OnPropertyChanged = PropertyChanged;
                        }

                        objects.Add(field.Name, listObject);
                    }
                }
            }

            PropertyInfo[] properties = GetType().GetProperties(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach(var prop in properties)
            {
                if(prop.GetCustomAttribute<PhonePropertyAttribute>() != null)
                {
                    object value = prop.GetValue(this);
                    objects.Add(prop.Name, value);
                }
            }

            var settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            string data = JsonConvert.SerializeObject(objects, Formatting.None, settings);

            changedProperties = new List<object>();

            Player.Message("EnterScene", new { sceneName = GetType().Name, sceneData = data });
        }

        public void ButtonPressed(JToken args)
        {
            string buttonName = (string)args["buttonName"];

            FieldInfo field = GetType().GetField(buttonName, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            if(field == null) return;
            
            if(typeof(Button).IsAssignableFrom(field.FieldType))
            {
                var button = (Button)field.GetValue(this);
                button.Pressed();
            }
            else if (typeof(IList).IsAssignableFrom(field.FieldType))
            {
                int arrayIndex = (int)args["arrayIndex"];

                var listObject = (IList)field.GetValue(this);
                ((Button)listObject[arrayIndex]).Pressed();
            }
        }

        public void CallFunction(string functionName, JToken args)
        {
            MethodInfo info = GetType().GetMethod(functionName, BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            if(info != null)
            {
                info.Invoke(this, new[] { args });
            }
        }

        public void PropertyChanged(int id, object value, string propertyName)
        {
            changedProperties?.Add(new { id, propertyName, value });
        }

        protected void ScenePropertyChanged(object value, [CallerMemberName]string propertyName = "")
        {
            PropertyChanged(-1, value, propertyName);
        }

        public override void Flush()
        {
            if(changedProperties.Count > 0)
            {
                Player.Message("PropertiesChanged", changedProperties);

                changedProperties.Clear();
            }
        }
    }
}
