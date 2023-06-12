interface Math
{
    lerp(a:number, b:number, t:number): number;
}

Math.lerp = function(a:number, b:number, t:number): number
{
    return a + t * (b - a);
}

class Vector2
{
    constructor(public x = 0, public y = 0)
    {

    }
}

class Rect
{
    constructor(public x:number, public y:number, public width:number, public height:number)
    {

    }

    Contains(point:Vector2)
    {
        let left = this.x;
        let right = left + this.width;
        let top = this.y;
        let bottom = top + this.height;

        return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
    }

    static ContainsPoint(rect:Rect, point:Vector2)
    {
        let left = rect.x;
        let right = left + rect.width;
        let top = rect.y;
        let bottom = top + rect.height;

        return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
    }
}