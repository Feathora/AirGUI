using UnityEngine;
using System.Collections;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace AirGUI
{
    public class DisplayObjectAnimator
    {
        public class Property
        {
            public string name;
            public float value;
        }

        [JsonProperty]
        private List<Property> animations;

        public float Duration
        {
            get; set;
        } = .25f;

        private DisplayObject target;

        public DisplayObjectAnimator(DisplayObject target)
        {
            this.target = target;

            animations = new List<Property>();
        }

        public DisplayObjectAnimator PositionX(float value)
        {
            animations.Add(new Property { name = "position.x", value = value });

            target.Position = new Vector2(value, target.Position.y);

            return this;
        }

        public DisplayObjectAnimator PositionY(float value)
        {
            animations.Add(new Property { name = "position.y", value = value });

            target.Position = new Vector2(target.Position.x, value);

            return this;
        }

        public DisplayObjectAnimator ScaleX(float value)
        {
            animations.Add(new Property { name = "scale.x", value = value });

            target.Scale = new Vector2(value, target.Position.y);

            return this;
        }

        public DisplayObjectAnimator ScaleY(float value)
        {
            animations.Add(new Property { name = "scale.y", value = value });

            target.Scale = new Vector2(target.Position.x, value);

            return this;
        }

        public DisplayObjectAnimator Alpha(float value)
        {
            animations.Add(new Property { name = "alpha", value = value });

            target.Alpha = value;

            return this;
        }
    } 
}
