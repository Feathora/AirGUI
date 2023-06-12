namespace AirGUI
{
    export class Label extends DisplayObject
    {
        private text:string;
        public get Text()
        {
            return this.text;
        }
        public set Text(value)
        {
            this.text = value;
        }

        private fontSize:number;
        public get FontSize()
        {
            return this.fontSize;
        }
        public set FontSize(value)
        {
            this.fontSize = value;
        }

        private lineWrap:boolean;
        public get LineWrap()
        {
            return this.lineWrap;
        }
        public set LineWrap(value)
        {
            this.lineWrap = value;
        }

        private colour:string;
        public get Colour()
        {
            return this.colour;
        }
        public set Colour(value)
        {
            this.colour = value;
        }

        constructor(data:any)
        {
            super(data);

            this.text = data.Text;
            this.fontSize = data.FontSize;
            this.lineWrap = data.LineWrap;
            this.colour = data.Colour;
        }

        Render()
        {
            if(this.Visible) window.app.renderer.RenderAirLabel(this);
        }

        Update()
        {

        }
    }
}