abstract class VScene
{
    abstract Render():void;
    abstract Update():void;

    public UpdateTouch()
    {
        for(let field in this)
        {
            if((this[field] as any) instanceof VTouchableObject)
            {
                (this[field] as any).UpdateTouch();
            }
        }
    }
}