namespace AirGUI
{
    export class Image extends DisplayObject 
    {
        //public image:HTMLImageElement;
        public asset:Asset;
        //private isReady = false;

        private scaleMode:ScreenScaleMode;
        public get ScaleMode()
        {
            return this.scaleMode;
        }
        public set ScaleMode(value)
        {
            this.scaleMode = value;
        }

        public set Source(value:string)
        {
            // this.isReady = false;
            // this.image = document.createElement("img");
            // this.image.onload = () =>
            // {
            //     this.isReady = true;
            //     this.Size = new Vector2(this.image.width, this.image.height);
            // }
            // this.image.src = "Resources/" + value;

            this.asset = Resources.GetAsset(value);
            this.Size = new Vector2(this.asset.width, this.asset.height);
        }

        constructor(data:any)
        {
            super(data);

            this.scaleMode = data.ScaleMode;

            this.asset = Resources.GetAsset(data.Source);
            this.Size = new Vector2(this.asset.width, this.asset.height);

            // this.image = document.createElement("img");
            // this.image.onload = () =>
            // {
            //     this.isReady = true;
            //     this.Size = new Vector2(this.image.width, this.image.height);
            // };
            // this.image.src = "Resources/" + data.Source;
        }

        Render(): void 
        {
            if(this.asset.isReady && this.Visible) window.app.renderer.RenderAirImage(this);
        }
        
        Update(): void 
        {
            
        }
    }
}