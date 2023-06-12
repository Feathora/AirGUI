namespace AirGUI
{
    class DisplayObjectAnimatorProperty
    {
        public name:string;
        public path:Array<string>;
        public value:number;
        public startValue:number;
    }

    export class DisplayObjectAnimator
    {
        private t:number;
        private duration:number;

        private animations:Array<DisplayObjectAnimatorProperty>;

        constructor(private target:DisplayObject, data:any)
        {
            this.t = 0;
            this.duration = data.Duration;
            this.animations = data.animations;

            for(let a of this.animations)
            {
                a.path = a.name.split('.');
                let obj = this.target as any;
                for(let i = 0; i < a.path.length - 1; ++i)
                {
                    obj = obj[a.path[i]];
                }

                a.startValue = obj[a.path[a.path.length - 1]];
            }
        }

        public Update():boolean
        {
            this.t += window.app.deltaTime;
            this.t = Math.min(this.t, this.duration);

            for(let a of this.animations)
            {
                let v = Math.lerp(a.startValue, a.value, this.t / this.duration);

                let obj = this.target as any;
                for(let i = 0; i < a.path.length - 1; ++i)
                {
                    obj = obj[a.path[i]];
                }

                obj[a.path[a.path.length - 1]] = v;
            }

            return this.t >= this.duration;
        }
    }
}