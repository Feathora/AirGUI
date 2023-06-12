using UnityEngine;
using System.Collections;

namespace AirGUI
{
    public class Label : DisplayObject
    {
        private string text;
        public string Text
        {
            get { return text; }
            set
            {
                text = value;
                PropertyChanged(value);
            }
        }

        private int fontSize;
        public int FontSize
        {
            get { return fontSize; }
            set
            {
                fontSize = value;
                PropertyChanged(value);
            }
        }

        private bool lineWrap;
        public bool LineWrap
        {
            get { return lineWrap; }
            set
            {
                lineWrap = value;
                PropertyChanged(value);
            }
        }

        private string colour;
        public string Colour
        {
            get { return colour; }
            set
            {
                colour = value;
                PropertyChanged(value);
            }
        }

        public Label(string text)
        {
            this.text = text;
            fontSize = 32;
            lineWrap = false;
            colour = "black";
        }
    } 
}
