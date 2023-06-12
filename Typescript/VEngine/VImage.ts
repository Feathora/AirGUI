class VImage extends VDisplayObject
{
    private isReady:boolean;
    image:HTMLImageElement;
    pivot:Vector2;
    scale:Vector2;
    rotation:number;
    alpha:number;

    public set Src(src:string)
    {
        this.isReady = false;
        this.image = new Image();
        this.image.onload = () =>
        {
            this.isReady = true;
            this.Size = new Vector2(this.image.width, this.image.height);
        }
        this.image.onerror = (ev:ErrorEvent) =>
        {
            console.error("Error loading image file: " + src, ev.message);
        }
        this.image.src = "Resources/" + src;
    }

    constructor(imageName:string, loadCallback:Function = null)
    {
        super();

        this.pivot = new Vector2();
        this.scale = new Vector2();
        this.scale.x = 1;
        this.scale.y = 1;

        this.rotation = 0;

        this.alpha = 1.0;

        this.image = new Image();
        this.image.onload = () =>
        {
            this.isReady = true;
            this.Size = new Vector2(this.image.width, this.image.height);
            if(loadCallback) loadCallback();
        };
        this.image.src = "Resources/" + imageName;
    }

    Contains(point:Vector2)
    {
        let left = this.Position.x - this.pivot.x * this.scale.x;
        let right = left + this.Size.x * this.scale.x;
        let top = this.Position.y - this.pivot.y * this.scale.y;
        let bottom = top + this.Size.y * this.scale.y;

        return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
    }

    protected OnRender()
    {
        //if(this.isReady) window.app.renderer.RenderImage(this);
    }
}