class VEffectManager
{
    private effects:Array<IEffect>;
    private queue:Array<IEffect>;
    private cleared:boolean;

    constructor()
    {
        this.effects = [];
        this.queue = [];
        this.cleared = false;
    }

    AddEffect(effect:IEffect)
    {
        this.queue.push(effect);
    }

    Clear()
    {
        this.effects = [];
        this.queue = [];
        this.cleared = true;
    }

    Update()
    {
        this.cleared = false;

        this.FlushQueue();

        for(let i = 0; i < this.effects.length; ++i)
        {
            if(this.effects[i].Update())
            {
                if(this.cleared)
                {
                    this.cleared = false;
                    return;
                }

                this.effects.splice(i, 1);

                if(i == this.effects.length) break;
            }
        }
    }

    private FlushQueue()
    {
        for(let i = 0; i < this.queue.length; ++i)
        {
            this.effects.push(this.queue[i]);
            this.queue[i].Init();
        }

        this.queue = [];
    }
}