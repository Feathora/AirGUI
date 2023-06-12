abstract class VWindow
{
    position:Vector2;
    scale:Vector2;
    pivot:Vector2;
    size:Vector2;

    constructor()
    {
        this.position = new Vector2();
        this.scale = new Vector2(1, 1);
        this.pivot = new Vector2();
        this.size = new Vector2();
    }

    OnPreRender()
    {
        window.app.renderer.ctx.save();
        
        window.app.renderer.ctx.translate(this.position.x, this.position.y);
        window.app.renderer.ctx.scale(this.scale.x, this.scale.y);
        window.app.renderer.ctx.translate(-this.pivot.x, -this.pivot.y);
    }

    abstract OnRender():void;

    OnPostRender()
    {
        window.app.renderer.ctx.restore();
    }

    Render()
    {
        this.OnPreRender();

        this.OnRender();

        this.OnPostRender();
    }
}