using UnityEngine;
using System.Collections;
using Newtonsoft.Json;

public enum ScreenScaleMode
{
    Normal,
    Width,
    Height,
    Both,
    Biggest
}

namespace AirGUI
{
    public class Image : DisplayObject
    {
        private string source;
        public string Source
        {
            get { return source; }
            set
            {
                source = value;
                if(!string.IsNullOrEmpty(source))
                {
                    var asset = PhoneResources.Instance.GetAsset(source);
                    Size = new Vector2(asset.width, asset.height);
                }
                else Size = Vector2.zero;
                PropertyChanged(value);
            }
        }

        public ScreenScaleMode ScaleMode
        {
            get; set;
        }

        public Image(string filename)
        {
            Source = filename;
        }
    }
}
