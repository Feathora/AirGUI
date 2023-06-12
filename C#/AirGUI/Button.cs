using UnityEngine;
using System.Collections;
using System;

namespace AirGUI
{
    public class Button : Image
    {
        public delegate void ButtonPressed(Button sender, EventArgs args);

        private bool enabled;
        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                PropertyChanged(value);
            }
        }

        public event ButtonPressed OnPressed;

        public Button(string imageName)
            : base(imageName)
        {
            enabled = true;
        }

        public void Pressed()
        {
            OnPressed?.Invoke(this, EventArgs.Empty);
        }
    } 
}
