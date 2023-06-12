abstract class VDisplayObject
{
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

    private scaleMode:ScreenScaleMode;
    public get ScaleMode()
    {
        return this.scaleMode;
    }
    public set ScaleMode(value)
    {
        this.scaleMode = value;
    }

    constructor()
    {
        this.position = new Vector2(.0, .0);
        this.size = new Vector2(.0, .0)
        this.scaleMode = ScreenScaleMode.Normal;
    }

    protected abstract OnRender():void;

    public Render()
    {
        this.OnRender();
    }
}