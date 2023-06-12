using UnityEngine;
using System.Collections;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;

namespace AirGUI
{
    public abstract class DisplayObject
    {
        private static int NEXT_ID = 1;

        public delegate void PropertyChangedDelegate(int id, object value, string callerName);

        [JsonIgnore]
        public PropertyChangedDelegate OnPropertyChanged;

        [JsonProperty]
        private string TypeName
        {
            get { return GetType().Name; }
        }

        [JsonProperty]
        private int ID
        {
            get; set;
        }

        private Vector2 position;
        public Vector2 Position
        {
            get { return position; }
            set
            {
                position = value;
                PropertyChanged(new { value.x, value.y });
            }
        }

        public Vector2 Size
        {
            get; set;
        }

        public Vector2 Scale
        {
            get; set;
        } = Vector2.one;

        public Vector2 Pivot
        {
            get; set;
        }

        public float Alpha
        {
            get; set;
        } = 1.0f;

        public AnchorPoint Anchor
        {
            get; set;
        } = AnchorPoint.Centre;

        private bool visible;
        public bool Visible
        {
            get { return visible; }
            set
            {
                visible = value;
                PropertyChanged(value);
            }
        }

        private DisplayObjectAnimator animator;
        public DisplayObjectAnimator Animator
        {
            get { return animator; }
            set
            {
                animator = value;
                PropertyChanged(value);
            }
        }

        protected DisplayObject()
        {
            ID = NEXT_ID++;
            visible = true;
        }

        public DisplayObjectAnimator Animate()
        {
            return (Animator = new DisplayObjectAnimator(this));
        }

        protected void PropertyChanged(object value, [CallerMemberName]string callerName = "")
        {
            OnPropertyChanged?.Invoke(ID, value, callerName);
        }
    } 
}
