enum ScreenScaleMode
{
    Normal,
    Width,
    Height,
    Both,
    Biggest
}

class VRenderer
{
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;
    readonly SCREEN_WIDTH:number = 1920;
    readonly SCREEN_HEIGHT:number = 1080;

    private scaleFactor:Vector2;
    public get ScaleFactor()
    {
        return this.scaleFactor;
    }
    public get ScaleFactorMin()
    {
        return Math.min(this.scaleFactor.x, this.scaleFactor.y);
    }
    public get ScaleFactorMax()
    {
        return Math.max(this.scaleFactor.x, this.scaleFactor.y);
    }

    renderOffset:Vector2;
    canvasWidth:number;
    canvasHeight:number;

    private bordersEnabled = false;

    private lastScaleMode:ScreenScaleMode;

    config:any;

    constructor(canvas:HTMLCanvasElement)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    CalculateScaling()
    {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        let widthFactor = this.canvas.clientWidth / this.SCREEN_WIDTH;
        let heightFactor = this.canvas.clientHeight / this.SCREEN_HEIGHT;
        this.scaleFactor = new Vector2(widthFactor, heightFactor);

        this.renderOffset = this.CalculateRenderOffset(this.lastScaleMode);

        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;

        this.config =
        {
            width: this.canvasWidth,
            height: this.canvasHeight,
            widthFactor: widthFactor,
            heightFactor: heightFactor
        };

        window.app.SendPhoneConfig(this.config);
    }

    public CalculateRenderOffset(scaleMode:ScreenScaleMode)
    {
        if(scaleMode == ScreenScaleMode.Normal)
        {
            return {
                x: (this.canvas.clientWidth - (this.SCREEN_WIDTH * this.ScaleFactorMin)) * .5,
                y: (this.canvas.clientHeight - (this.SCREEN_HEIGHT * this.ScaleFactorMin)) * .5
            };
        }
        else if(scaleMode == ScreenScaleMode.Width)
        {
            return {
                x: (this.canvas.clientWidth - (this.SCREEN_WIDTH * this.ScaleFactor.x)) * .5,
                y: (this.canvas.clientHeight - (this.SCREEN_HEIGHT * this.ScaleFactor.x)) * .5
            };
        }
        else if(scaleMode == ScreenScaleMode.Height)
        {
            return {
                x: (this.canvas.clientWidth - (this.SCREEN_WIDTH * this.ScaleFactor.y)) * .5,
                y: (this.canvas.clientHeight - (this.SCREEN_HEIGHT * this.ScaleFactor.y)) * .5
            };
        }
        else if(scaleMode == ScreenScaleMode.Both)
        {
            return {
                x: .0,
                y: .0
            };
        }
        else if(scaleMode == ScreenScaleMode.Biggest)
        {
            return {
                x: (this.canvas.clientWidth - (this.SCREEN_WIDTH * this.ScaleFactorMax)) * .5,
                y: (this.canvas.clientHeight - (this.SCREEN_HEIGHT * this.ScaleFactorMax)) * .5
            };
        }
    }

    Clear()
    {
        if(this.canvasWidth != window.innerWidth || this.canvasHeight != window.innerHeight) this.CalculateScaling();

        this.ctx!.setTransform(1, 0, 0, 1, 0, 0);

        this.ctx!.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        this.renderOffset = this.CalculateRenderOffset(ScreenScaleMode.Normal);
        
        this.ctx!.translate(this.renderOffset.x, this.renderOffset.y);
        this.ctx!.scale(this.ScaleFactorMin, this.ScaleFactorMin);

        this.lastScaleMode = ScreenScaleMode.Normal;
    }

    Flush()
    {
        if(this.bordersEnabled)
        {
            let offset = new Vector2(this.renderOffset.x / this.ScaleFactorMin, this.renderOffset.y / this.ScaleFactorMin);

            this.ctx.fillStyle = "black";
            this.ctx.fillRect(-offset.x, -offset.y, offset.x, this.SCREEN_HEIGHT + offset.y * 2.0);
            this.ctx.fillRect(-offset.x, -offset.y, this.SCREEN_WIDTH + offset.x * 2.0, offset.y);
            this.ctx.fillRect(this.SCREEN_WIDTH, -offset.y, offset.x, this.SCREEN_HEIGHT + offset.y * 2.0);
            this.ctx.fillRect(-offset.x, this.SCREEN_HEIGHT, this.SCREEN_WIDTH + offset.x * 2.0, offset.y);
        }
    }

    private ChangeScaleMode(scaleMode:ScreenScaleMode)
    {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.renderOffset = this.CalculateRenderOffset(scaleMode);
        let scaleFactor:Vector2;
        if(scaleMode == ScreenScaleMode.Normal) scaleFactor = new Vector2(this.ScaleFactorMin, this.ScaleFactorMin);
        else if(scaleMode == ScreenScaleMode.Width) scaleFactor = new Vector2(this.ScaleFactor.x, this.ScaleFactor.x);
        else if(scaleMode == ScreenScaleMode.Height) scaleFactor = new Vector2(this.ScaleFactor.y, this.ScaleFactor.y);
        else if(scaleMode == ScreenScaleMode.Both) scaleFactor = this.ScaleFactor;
        else if(scaleMode == ScreenScaleMode.Biggest) scaleFactor = new Vector2(this.ScaleFactorMax, this.ScaleFactorMax);

        this.ctx.translate(this.renderOffset.x, this.renderOffset.y);
        this.ctx.scale(scaleFactor.x, scaleFactor.y);
    }

    RenderAirImage(image:AirGUI.Image)
    {
        this.ctx.save();

        if(image.ScaleMode !== this.lastScaleMode) this.ChangeScaleMode(image.ScaleMode);

        this.ctx.translate(image.Position.x + image.AnchorOffset.x, image.Position.y + image.AnchorOffset.y);
        this.ctx.scale(image.Scale.x, image.Scale.y);
        this.ctx.translate(-image.Pivot.x, -image.Pivot.y);

        this.ctx.globalAlpha = image.Alpha;

        this.ctx!.drawImage(image.asset.img, 0, 0, image.Size.x, image.Size.y);

        this.ctx.drawImage(image.asset.img, 0, 0, image.Size.x, image.Size.y);

        this.ctx.restore();
    }

    WrapText(text:string, x:number, y:number, maxWidth:number, lineHeight:number) 
    {
        let cars = text.split("\n");

        for(var ii = 0; ii < cars.length; ii++) 
        {
            let line = "";
            let words = cars[ii].split(" ");

            for(let n = 0; n < words.length; n++) 
            {
                let testLine = line + words[n] + " ";
                let metrics = this.ctx.measureText(testLine);
                let testWidth = metrics.width;

                if(testWidth > maxWidth) 
                {
                    this.ctx.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else 
                {
                    line = testLine;
                }
            }

            this.ctx.fillText(line, x, y);
            y += lineHeight;
        }
     }

    RenderAirLabel(label:AirGUI.Label)
    {
        this.ctx.save();

        if(ScreenScaleMode.Normal !== this.lastScaleMode) this.ChangeScaleMode(ScreenScaleMode.Normal);

        this.ctx.translate(label.Position.x + label.AnchorOffset.x, label.Position.y + label.AnchorOffset.y);
        this.ctx.scale(label.Scale.x, label.Scale.y);
        this.ctx.translate(-label.Pivot.x, -label.Pivot.y);

        this.ctx.globalAlpha = label.Alpha;
        
        this.ctx.font = label.FontSize + "pt Hauracherell";
        this.ctx.fillStyle = label.Colour;
        if(label.LineWrap) this.WrapText(label.Text, 0.0, 0.0, label.Size.x, label.FontSize + 2);
        else this.ctx.fillText(label.Text, 0, 0);

        this.ctx.restore();
    }
}
