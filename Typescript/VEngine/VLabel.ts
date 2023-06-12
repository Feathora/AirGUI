class VLabel extends VDisplayObject
{
    private text:string = "";
    public get Text()
    {
        return this.text;
    }
    public set Text(value:string)
    {
        this.text = value;
        let ctx = window.app.renderer.ctx;
        ctx.font = this.fontSize + "pt Hauracherell";
        if(!this.multiline)
        {
            let size = ctx.measureText(this.text);
            this.Size = new Vector2(size.width, this.fontSize);
        }
    }

    pivot:Vector2;
    scale:Vector2;
    colour:string;
    alpha:number;
    multiline:boolean;
    
    constructor(text = "", public fontSize = 32)
    {
        super();

        this.scale = new Vector2(1.0, 1.0);
        this.pivot = new Vector2();
        this.colour = "white";
        this.alpha = 1;
        this.Text = text;
        this.multiline = false;
    }

    protected OnRender()
    {
        //window.app.renderer.RenderLabel(this);
    }
}