namespace AirGUI
{
    export enum AnchorPoint
    {
        Centre = 0,
        Left = 1,
        Top = 2,
        Right = 4,
        Bottom = 8
    }

    export abstract class DisplayObject
    {
        public ID:number;

        private position:Vector2;
        public get Position()
        {
            return this.position;
        }
        public set Position(value)
        {
            this.position = value;
        }

        private size:Vector2;
        public get Size()
        {
            return this.size;
        }
        public set Size(value)
        {
            this.size = value;
        }

        private scale:Vector2;
        public get Scale()
        {
            return this.scale;
        }
        public set Scale(value)
        {
            this.scale = value;
        }

        private pivot:Vector2;
        public get Pivot()
        {
            return this.pivot;
        }
        public set Pivot(value)
        {
            this.pivot = value;
        }

        private alpha:number;
        public get Alpha()
        {
            return this.alpha;
        }
        public set Alpha(value)
        {
            this.alpha = value;
        }

        private anchor:AnchorPoint;
        public get Anchor()
        {
            return this.anchor;
        }
        public set Anchor(value)
        {
            this.anchor = value;
        }

        private visible:boolean;
        public get Visible()
        {
            return this.visible;
        }
        public set Visible(value)
        {
            this.visible = value;
        }

        private animator:DisplayObjectAnimator;
        public get Animator()
        {
            return this.animator;
        }
        public set Animator(value)
        {
            if(value !== null) this.animator = new DisplayObjectAnimator(this, value);
            else this.animator = null;
        }

        public get AnchorOffset()
        {
            let offset = new Vector2();
            let renderOffset = window.app.renderer.CalculateRenderOffset(ScreenScaleMode.Normal);

            if((this.anchor & AnchorPoint.Left) === AnchorPoint.Left)
            {
                offset.x -= renderOffset.x / window.app.renderer.ScaleFactorMin;
            }
            if((this.anchor & AnchorPoint.Right) === AnchorPoint.Right)
            {
                offset.x += renderOffset.x / window.app.renderer.ScaleFactorMin;
            }
            if((this.anchor & AnchorPoint.Top) === AnchorPoint.Top)
            {
                offset.y -= renderOffset.y / window.app.renderer.ScaleFactorMin;
            }
            if((this.anchor & AnchorPoint.Bottom) === AnchorPoint.Bottom)
            {
                offset.y += renderOffset.y / window.app.renderer.ScaleFactorMin;
            }

            return offset;
        }

        constructor(data:any)
        {
            this.ID = data.ID;
            this.position = new Vector2(data.Position.x, data.Position.y);
            this.size = new Vector2(data.Size.x, data.Size.y);
            this.scale = new Vector2(data.Scale.x, data.Scale.y);
            this.pivot = new Vector2(data.Pivot.x, data.Pivot.y);
            this.alpha = data.Alpha;
            this.anchor = data.Anchor;
            this.visible = data.Visible;
        }

        abstract Render():void;
        abstract Update():void;
    }
}