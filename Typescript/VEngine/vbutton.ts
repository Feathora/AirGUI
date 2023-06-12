class VButton extends VTouchableObject
{
    private displayObject:VImage;
    public get DisplayObject()
    {
        return this.displayObject;
    }

    public constructor(imageName:string, callback:Function = null)
    {
        super();

        this.displayObject = new VImage(imageName, () =>
        {
            this.Size = this.displayObject.Size;
            if(callback) callback();
        });
    }

    protected OnRender(): void 
    {
        this.displayObject.Position = this.Position;
        this.displayObject.Render();
    }
}