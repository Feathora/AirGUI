class VTouchManager
{
    private touches:Array<VTouch> = [];
    public get Touches():Array<VTouch>
    {
        return this.touches;
    }

    constructor()
    {

    }

    public ReleaseTouch(touch:VTouch)
    {
        for(let i = 0; i < this.touches.length; ++i)
        {
            if(this.touches[i].FingerID == touch.FingerID)
            {
                this.touches.splice(i, 1);
            }
        }
    }

    public CaptureTouch(target:any, touchRect:Rect)
    {
        for(let touch of this.touches)
        {
            if(touch.Phase !== TouchPhase.Begin) continue;
            if(touch.Captured) continue;
            if(!touchRect.Contains(touch.Position)) continue;

            touch.Capture(target);
            return touch;
        }

        return null;
    }

    OnTouchStart(data:Touch)
    {
        let touch = new VTouch(data);
        this.touches.push(touch);
    }

    OnTouchMoved(data:Touch)
    {
        for(let touch of this.touches)
        {
            if(data.identifier !== touch.FingerID) continue;

            touch.UpdateTouchData(data, touch.Phase);
            break;
        }
    }

    OnTouchEnd(data:Touch)
    {
        for(let touch of this.touches)
        {
            if(data.identifier !== touch.FingerID) continue;

            touch.UpdateTouchData(data, TouchPhase.End);
            break;
        }
    }

    LateUpdate()
    {
        for(let i = this.touches.length - 1; i >= 0; --i)
        {
            if(/*!this.touches[i].Captured || */this.touches[i].Phase === TouchPhase.End)
            {
                this.touches[i].Release();
                this.touches.splice(i, 1);
            }
            else this.touches[i].LateUpdate();
        }
    }
}