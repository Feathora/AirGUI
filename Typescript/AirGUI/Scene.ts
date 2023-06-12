namespace AirGUI
{
    export abstract class Scene
    {
        protected constructor()
        {

        }

        public Create(data:string)
        {
            let objData = JSON.parse(data);
            let me = this as any;

            for(let key in objData)
            {
                if(objData[key] instanceof Array)
                {
                    me[key] = [];
                    for(let obj of objData[key])
                    {
                        let displayObj = new (AirGUI as any)[obj.TypeName](obj);
                        me[key].push(displayObj);
                    }
                }
                else
                {
                    if(objData[key].TypeName) me[key] = new (AirGUI as any)[objData[key].TypeName](objData[key]);
                    else me[key] = objData[key];
                }
            }
        }

        public Render()
        {
            for(const key in this) 
            {
                if(this.hasOwnProperty(key)) 
                {
                    const element = this[key];
                    if(element)
                    {
                        if((element as any).Render) (element as any).Render();
                        else if(element instanceof Array)
                        {
                            for(let obj of element)
                            {
                                if(obj.Render) obj.Render();
                            }
                        }
                    }
                }
            }
        }

        public UpdateTouch()
        {
            for(const key in this)
            {
                if(this.hasOwnProperty(key))
                {
                    const element = this[key];
                    if(element)
                    {
                        if(element instanceof Button)
                        {
                            element.UpdateTouch();
                        }
                        else if(element instanceof Array)
                        {
                            for(let obj of element)
                            {
                                if(obj instanceof Button)
                                {
                                    obj.UpdateTouch();
                                }
                            }
                        }
                    }
                }
            }
        }

        protected CallFunction(functionName:string, args:any = {})
        {
            window.airConsole.message(AirConsole.SCREEN, { "cmd": "CallFunction", "function": functionName, "args": args });
        }

        private FindPropertyDescriptor(obj:any, propertyName:string):PropertyDescriptor
        {
            let prototype = Object.getPrototypeOf(obj);
            if(!prototype) return null;

            return Object.getOwnPropertyDescriptor(prototype, propertyName) || this.FindPropertyDescriptor(prototype, propertyName);
        }

        public PropertyChanged(id:number, propertyName:string, value:any)
        {
            if(id !== -1)
            {
                for(const key in this)
                {
                    if(this.hasOwnProperty(key))
                    {
                        const element = this[key];
                        if(element)
                        {
                            if(element instanceof Array)
                            {
                                for(let obj of element)
                                {
                                    if(obj.ID === id)
                                    {
                                        this.FindPropertyDescriptor(obj, propertyName).set.call(obj, value);
                                    }
                                }
                            }
                            else
                            {
                                if((element as any).ID === id)
                                {
                                    this.FindPropertyDescriptor(element, propertyName).set.call(element, value);
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                (this as any)[propertyName] = value;
            }
        }

        public Update()
        {
            for(const key in this) 
            {
                if(this.hasOwnProperty(key))
                {
                    const element = this[key];
                    if(element instanceof Array)
                    {
                        for(let i = 0; i < element.length; ++i)
                        {
                            let obj = element[i];
                            if(obj instanceof Button)
                            {
                                if(obj.TouchUpInside)
                                {
                                    this.CallFunction("ButtonPressed", { "buttonName": key, "arrayIndex": i });
                                }
                            }

                            if(obj && obj.Animator && obj.Animator.Update())
                            {
                                obj.Animator = null;
                            }
                        }
                    }
                    else
                    {
                        if(element instanceof Button)
                        {
                            if(element.TouchUpInside)
                            {
                                this.CallFunction("ButtonPressed", { "buttonName": key });
                            }
                        }

                        if(element && (element as any).Animator && (element as any).Animator.Update())
                        {
                            (element as any).Animator = null;
                        }
                    }
                }
            }
        }
    }
}