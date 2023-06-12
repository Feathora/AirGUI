enum ScrollState
{
    None,
    Pending,
    Scroll
}

class VScrollWindow extends VWindow
{
    private scrollSpeed:number;
    private scrollP:number;

    private scrollState:ScrollState;

    private selectedImage = -1;
    public get SelectedImage()
    {
        return this.selectedImage;
    }

    private movement = 0;

    offset = new Vector2();

    readonly SCROLL_SPEED_NEEDED = 5;
    readonly MAX_MOVEMENT = 5;

    constructor(private images:Array<VImage> = [])
    {
        super();

        this.scrollSpeed = 0;
        this.scrollP = 0;
        this.scrollState = ScrollState.None;
    }

    OnRender()
    {
        for(let image of this.images)
        {
            image.Render();
        }
    }

    private FixPositions()
    {
        let mid = this.size.x * .5;

        let middleIndex = 0;
        if(this.selectedImage === -1)
        {
            let closestX = Math.abs(mid - this.images[0].Position.x);
            for(let i = 1; i < this.images.length; ++i)
            {
                let diff = Math.abs(mid - this.images[i].Position.x);
                if(diff < closestX)
                {
                    middleIndex = i;
                    closestX = diff;
                }
            }
        }
        else middleIndex = this.selectedImage;

        for(let i = 0; i < this.images.length; ++i)
        {
            if(i == middleIndex) continue;

            if(this.images[i].Position.x >= this.images[middleIndex].Position.x)
            {
                let previousIndex = i - 1;
                if(previousIndex < 0) previousIndex += this.images.length;
                this.images[i].Position.x = this.images[previousIndex].Position.x + this.images[previousIndex].pivot.x * this.images[previousIndex].scale.x + this.offset.x + this.images[i].pivot.x * this.images[i].scale.x;
            }
        }

        for(let i = this.images.length - 1; i >= 0; --i)
        {
            if(i === middleIndex) continue;

            if(this.images[i].Position.x < this.images[middleIndex].Position.x)
            {
                let nextIndex = (i + 1) % this.images.length;
                this.images[i].Position.x = this.images[nextIndex].Position.x - this.images[nextIndex].pivot.x * this.images[nextIndex].scale.x - this.offset.x - this.images[i].pivot.x * this.images[i].scale.x;
            }
        }

        for(let i = 0; i < this.images.length; ++i)
        {
            if(this.scrollSpeed > 0)
            {
                if(this.images[i].Position.x - this.images[i].pivot.x > window.app.renderer.SCREEN_WIDTH)
                {
                    let nextStageIndex = (i + 1) % this.images.length;
                    this.images[i].Position.x = this.images[nextStageIndex].Position.x - this.images[i].Size.x - this.offset.x;
                }
            }
            else if(this.scrollSpeed < 0)
            {
                if(this.images[i].Position.x + this.images[i].Size.x + this.images[i].pivot.x < 0)
                {
                    let previousStageIndex = i - 1;
                    if(previousStageIndex < 0) previousStageIndex += this.images.length;
                    this.images[i].Position.x = this.images[previousStageIndex].Position.x + this.images[previousStageIndex].Size.x + this.offset.x;
                }
            }
        }
    }

    private SelectImage(index:number)
    {
        if(this.selectedImage !== -1)
        {
            this.DeselectImage();
        }

        let scaleX = new VEffect(this.images[index].scale, "x", 1.5, .3, null);
        window.app.effectManager.AddEffect(scaleX);

        let scaleY = new VEffect(this.images[index].scale, "y", 1.5, .3, null);
        window.app.effectManager.AddEffect(scaleY);

        let move = new VEffect(this.images[index], "x", window.app.renderer.SCREEN_WIDTH * .5, .3, null);
        window.app.effectManager.AddEffect(move);

        this.selectedImage = index;
    }

    private DeselectImage()
    {
        let scale = CreateScale(this.images[this.selectedImage], new Vector2(1.0, 1.0), .3);
        window.app.effectManager.AddEffect(scale);

        this.selectedImage = -1;
    }

    Update()
    {
        if(this.scrollState == ScrollState.None)
        {
            if(window.input.TouchStart())
            {
                let pos = window.input.currentPosition;
                if(pos.x >= this.position.x && pos.x <= this.position.x + this.size.x && pos.y >= this.position.y - this.images[0].pivot.x && pos.y <= this.position.y - this.images[0].pivot.x + this.size.y)
                {
                    let selectedImage = -1;
                    for(let i = 0; i < this.images.length; ++i)
                    {
                        let image = this.images[i];
                        let left = image.Position.x - image.pivot.x * image.scale.x;
                        let right = left + image.Size.x * image.scale.x;
                        let top = this.position.y + image.Position.y - image.pivot.y * image.scale.y;
                        let bottom = top + image.Size.y * image.scale.y;
                        if(pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom)
                        {
                            selectedImage = i;
                            break;
                        }
                    }
    
                    if(selectedImage === -1)
                    {
                        this.scrollState = ScrollState.Scroll;
                        if(this.selectedImage !== -1)
                        {
                            this.DeselectImage();
                        }
                    }
                    else this.scrollState = ScrollState.Pending;
                }
            }
            else
            {
                this.scrollSpeed *= .95;
                if(Math.abs(this.scrollSpeed) < .01) this.scrollSpeed = 0;
            }
        }
        else if(this.scrollState === ScrollState.Scroll || this.scrollState === ScrollState.Pending)
        {
            if(window.input.TouchEnded())
            {
                if(this.scrollState === ScrollState.Pending && window.input.smoothMoveSpeed.x < this.SCROLL_SPEED_NEEDED && this.movement < this.MAX_MOVEMENT)
                {
                    for(let i = 0; i < this.images.length; ++i)
                    {
                        let image = this.images[i];
                        let pos = window.input.currentPosition;
                        let left = image.Position.x - image.pivot.x * image.scale.x;
                        let right = left + image.Size.x * image.scale.x;
                        let top = this.position.y + image.Position.y - image.pivot.y * image.scale.y;
                        let bottom = top + image.Size.y * image.scale.y;
                        if(pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom)
                        {
                            this.SelectImage(i);
                            break;
                        }
                    }
                }

                this.scrollSpeed = window.input.smoothMoveSpeed.x;
                this.scrollP = 0;
                this.scrollState = ScrollState.None;
                this.movement = 0;
            }
            else if(window.input.TouchHold())
            {
                this.scrollSpeed = window.input.MoveSpeed().x;
                this.movement += Math.abs(window.input.MoveSpeed().x);
            }

            if(this.scrollState === ScrollState.Pending)
            {
                if(window.input.smoothMoveSpeed.x > this.SCROLL_SPEED_NEEDED || this.movement >= this.MAX_MOVEMENT)
                {
                    this.scrollState = ScrollState.Scroll;
                    if(this.selectedImage !== -1)
                    {
                        this.DeselectImage();
                    }
                }
            }
        }

        if(this.scrollSpeed != 0)
        {
            for(let i = 0; i < this.images.length; ++i)
            {
                this.images[i].Position.x += this.scrollSpeed;
            }
        }

        this.FixPositions();
    }
}