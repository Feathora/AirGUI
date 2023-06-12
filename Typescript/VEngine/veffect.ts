interface IEffect
{
    Init():void;
    Update():boolean;
}

class VEffectCollection implements IEffect
{
    constructor(private effects:Array<IEffect> = [])
    {

    }

    Init()
    {
        for(let effect of this.effects)
        {
            effect.Init();
        }
    }

    AddEffect(effect:IEffect)
    {
        this.effects.push(effect);
    }

    Update():boolean
    {
        let result = 0;
        for(let effect of this.effects)
        {
            if(effect.Update()) ++result;
        }
        return result == this.effects.length;
    }
}

class VEffectSequence implements IEffect
{
    private currentEffect:number;

    constructor(private effects:Array<IEffect> = [])
    {

    }

    Init()
    {
        this.effects[0].Init();
    }

    AddEffect(effect:IEffect)
    {
        this.effects.push(effect);
    }

    Update():boolean
    {
        if(this.currentEffect == this.effects.length) return true;

        if(this.effects[this.currentEffect].Update())
        {
            ++this.currentEffect;

            if(this.currentEffect == this.effects.length) return true;
            else this.effects[this.currentEffect].Init();
        }

        return false;
    }
}

class VEffect implements IEffect
{   
    target:any;
    property:string;
    startValue:number;
    targetValue:number;
    effectTime:number;
    timePassed:number;
    callback:() => void | null;

    constructor(target:any, property:string, targetValue:number, effectTime:number, callback:() => void | null)
    {
        this.target = target;
        this.property = property;
        this.startValue = this.target[this.property];
        this.targetValue = targetValue;
        this.timePassed = 0;
        this.effectTime = effectTime;
        this.callback = callback;
    }

    Init()
    {
        this.startValue = this.target[this.property];
    }

    Update():boolean
    {
        this.timePassed += window.app.deltaTime;

        let p = this.timePassed / this.effectTime;
        p = Math.min(Math.max(p, 0), 1);

        this.target[this.property] = Math.lerp(this.startValue, this.targetValue, p);

        if(this.timePassed >= this.effectTime)
        {
            if(this.callback) this.callback();
            return true;
        }

        return false;
    }
}

function CreateScale(target:{ scale:Vector2 }, targetValue:Vector2, effectTime:number, callback:() => void | null = null):VEffectCollection
{
    return new VEffectCollection([ new VEffect(target.scale, "x", targetValue.x, effectTime, callback), new VEffect(target.scale, "y", targetValue.y, effectTime, callback) ]);
}

function CreateFade(target:{ alpha:number }, targetValue:number, effectTime:number, callback:() => void | null = null):IEffect
{
    return new VEffect(target, "alpha", targetValue, effectTime, callback);
}