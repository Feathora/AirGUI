enum TouchPhase
{
    None,
    Begin,
    Hold,
    End
}

class VInput
{
    deltaSpeed:Array<Vector2>;
    smoothMoveSpeed:Vector2;
    lastPosition:Vector2;
    currentPosition:Vector2;

    downTime:number;

    touchPhase:TouchPhase;

    constructor()
    {
        this.smoothMoveSpeed = new Vector2();
        this.deltaSpeed = [];
    }

    TouchStart():boolean
    {
        return this.touchPhase === TouchPhase.Begin;
    }

    TouchHold():boolean
    {
        return this.touchPhase === TouchPhase.Hold;
    }

    TouchEnded():boolean
    {
        return this.touchPhase === TouchPhase.End;
    }

    OnTouchStart(position:Vector2)
    {
        this.touchPhase = TouchPhase.Begin;
        this.downTime = 0;
        this.currentPosition = position;
        this.lastPosition = position;
    }

    OnTouchMoved(position:Vector2)
    {
        this.currentPosition = position;
    }

    OnTouchEnd(position:Vector2)
    {
        this.touchPhase = TouchPhase.End;
        this.currentPosition = position;
    }

    MoveSpeed():Vector2
    {
        return this.deltaSpeed[this.deltaSpeed.length - 1];
    }

    LateUpdate()
    {
        if(this.touchPhase === TouchPhase.Begin)
        {
            this.touchPhase = TouchPhase.Hold;

            let delta = { x: this.currentPosition.x - this.lastPosition.x, y: this.currentPosition.y - this.lastPosition.y };

            this.deltaSpeed.push(delta);
        }
        else if(this.touchPhase === TouchPhase.Hold)
        {
            if(this.deltaSpeed.length === 5)
            {
                this.deltaSpeed.splice(0, 1);
            }

            let delta = { x: this.currentPosition.x - this.lastPosition.x, y: this.currentPosition.y - this.lastPosition.y };
            this.deltaSpeed.push(delta);

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
        else if(this.touchPhase === TouchPhase.End)
        {
            this.touchPhase = TouchPhase.None;
            this.deltaSpeed = [];
            this.smoothMoveSpeed = { x: 0, y: 0 };
        }

        this.lastPosition = this.currentPosition;
    }
}