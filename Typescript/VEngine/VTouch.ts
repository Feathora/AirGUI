class VTouch
{
    private deltaSpeed:Array<Vector2> = [];
    private smoothMoveSpeed:Vector2 = new Vector2();

    private lastPosition:Vector2;

    private touchPhase:TouchPhase;

    private target:VTouchableObject;

    public get Captured()
    {
        return this.target != null;
    }

    get SmoothMovement():Vector2
    {
        return this.smoothMoveSpeed;
    }

    get SmoothMoveSpeed():number
    {
        return Math.sqrt(this.smoothMoveSpeed.x * this.smoothMoveSpeed.x + this.smoothMoveSpeed.y * this.smoothMoveSpeed.y);
    }

    get Movement():Vector2
    {
        return this.deltaSpeed[0];
    }

    get Phase():TouchPhase
    {
        return this.touchPhase;
    }

    get Position():Vector2
    {
        return new Vector2((this.touchData.pageX - window.app.renderer.renderOffset.x) / window.app.renderer.ScaleFactorMin, (this.touchData.pageY - window.app.renderer.renderOffset.y) / window.app.renderer.ScaleFactorMin);
    }

    get FingerID():number
    {
        return this.touchData.identifier;
    }

    constructor(private touchData:Touch)
    {
        this.lastPosition = this.Position;
        this.touchPhase = TouchPhase.Begin;
    }

    public Capture(target:any)
    {
        this.target = target;
    }

    public Release()
    {
        if(this.target != null) this.target.ReleaseTouch(true);

        this.smoothMoveSpeed = new Vector2();
    }

    UpdateTouchData(data:Touch, touchPhase:TouchPhase)
    {
        this.touchData = data;
        this.touchPhase = touchPhase;
    }

    LateUpdate()
    {
        if(this.touchPhase === TouchPhase.Begin) 
        {
            this.touchPhase = TouchPhase.Hold;
            this.deltaSpeed.unshift(new Vector2(this.Position.x - this.lastPosition.x, this.Position.y - this.lastPosition.y));
        }
        else if(this.touchPhase === TouchPhase.Hold)
        {
            if(this.deltaSpeed.length === 5) this.deltaSpeed.pop();
            
            this.deltaSpeed.unshift(new Vector2(this.Position.x - this.lastPosition.x, this.Position.y - this.lastPosition.y));
    
            let xMove = 0, xCount = 0, yMove = 0, yCount = 0;
            for(let i = 0; i < this.deltaSpeed.length; ++i)
            {
                if(Math.abs(this.deltaSpeed[i].x) > .01)
                {
                    ++xCount;
                    xMove += this.deltaSpeed[i].x;
                }
                if(Math.abs(this.deltaSpeed[i].y) > .01)
                {
                    ++yCount;
                    yMove += this.deltaSpeed[i].y;
                }
            }
            if(xCount !== 0) this.smoothMoveSpeed.x = xMove / xCount;
            else this.smoothMoveSpeed.x = 0;
            if(yCount !== 0) this.smoothMoveSpeed.y = yMove / yCount;
            else this.smoothMoveSpeed.y = 0;
        }

        this.lastPosition = this.Position;
    }
}