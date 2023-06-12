namespace AirGUI
{
    export class Button extends Image 
    {
        private enabled:boolean;
        public get Enabled()
        {
            return this.enabled;
        }
        public set Enabled(value:boolean)
        {
            this.enabled = value;
            if(!this.enabled)
            {
                this.ReleaseTouch();
            }
        }

        private touchData:VTouch;
        public get TouchData():VTouch
        {
            return this.touchData;
        }

        private touchPhase:TouchPhase;

        public get TouchDown()
        {
            return this.touchData != null && this.touchPhase == TouchPhase.Begin && this.TouchRect.Contains(this.touchData.Position);
        }

        public get TouchHold()
        {
            return this.touchData != null && this.touchPhase == TouchPhase.Hold;
        }

        public get TouchHoldInside()
        {
            return this.TouchHold && this.TouchRect.Contains(this.touchData.Position);
        }

        public get TouchUp()
        {
            return this.touchData != null && this.touchPhase == TouchPhase.End;
        }

        public get TouchUpInside()
        {
            return this.TouchUp && this.TouchRect.Contains(this.touchData.Position);
        }

        protected get TouchRect()
        {
            let offset = this.AnchorOffset;
            return new Rect(this.Position.x + offset.x, this.Position.y + offset.y, this.Size.x, this.Size.y);
        }

        constructor(data:any)
        {
            super(data);

            this.enabled = data.Enabled;
        }

        public ReleaseTouch(releaseByManager = false)
        {
            if(this.touchData == null) return;

            if(!releaseByManager) window.touchManager.ReleaseTouch(this.touchData);

            this.touchData = null;
        }

        public StealTouch()
        {
            let result = this.touchData;
            this.touchData = null;

            return result;
        }

        public GiveTouch(touch:VTouch)
        {
            if(this.touchData != null) window.touchManager.ReleaseTouch(this.touchData);

            this.touchData = touch;

            if(this.touchData != null)
            {
                this.touchPhase = this.touchData.Phase;
                this.touchData.Capture(this);
            }
        }

        public UpdateTouch()
        {
            if(!this.Enabled || !this.Visible) return;

            if(this.touchData != null)
            {
                this.touchPhase = this.touchData.Phase;
                if(this.TouchUpInside)
                {
                    window.app.audioPlayer.PlaySound("button_click.wav");
                }
            }
            else
            {
                this.touchData = window.touchManager.CaptureTouch(this, this.TouchRect);
                if(this.touchData != null)
                {
                    this.touchPhase = this.touchData.Phase;
                }
            }
        }
    }
}