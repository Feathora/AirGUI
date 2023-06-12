var AirGUI;
(function (AirGUI) {
    var AnchorPoint;
    (function (AnchorPoint) {
        AnchorPoint[AnchorPoint["Centre"] = 0] = "Centre";
        AnchorPoint[AnchorPoint["Left"] = 1] = "Left";
        AnchorPoint[AnchorPoint["Top"] = 2] = "Top";
        AnchorPoint[AnchorPoint["Right"] = 4] = "Right";
        AnchorPoint[AnchorPoint["Bottom"] = 8] = "Bottom";
    })(AnchorPoint = AirGUI.AnchorPoint || (AirGUI.AnchorPoint = {}));
    var DisplayObject = /** @class */ (function () {
        function DisplayObject(data) {
            this.ID = data.ID;
            this.position = new Vector2(data.Position.x, data.Position.y);
            this.size = new Vector2(data.Size.x, data.Size.y);
            this.scale = new Vector2(data.Scale.x, data.Scale.y);
            this.pivot = new Vector2(data.Pivot.x, data.Pivot.y);
            this.alpha = data.Alpha;
            this.anchor = data.Anchor;
            this.visible = data.Visible;
        }
        Object.defineProperty(DisplayObject.prototype, "Position", {
            get: function () {
                return this.position;
            },
            set: function (value) {
                this.position = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Size", {
            get: function () {
                return this.size;
            },
            set: function (value) {
                this.size = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Scale", {
            get: function () {
                return this.scale;
            },
            set: function (value) {
                this.scale = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Pivot", {
            get: function () {
                return this.pivot;
            },
            set: function (value) {
                this.pivot = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Alpha", {
            get: function () {
                return this.alpha;
            },
            set: function (value) {
                this.alpha = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Anchor", {
            get: function () {
                return this.anchor;
            },
            set: function (value) {
                this.anchor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Visible", {
            get: function () {
                return this.visible;
            },
            set: function (value) {
                this.visible = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "Animator", {
            get: function () {
                return this.animator;
            },
            set: function (value) {
                if (value !== null)
                    this.animator = new AirGUI.DisplayObjectAnimator(this, value);
                else
                    this.animator = null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "AnchorOffset", {
            get: function () {
                var offset = new Vector2();
                var renderOffset = window.app.renderer.CalculateRenderOffset(ScreenScaleMode.Normal);
                if ((this.anchor & AnchorPoint.Left) === AnchorPoint.Left) {
                    offset.x -= renderOffset.x / window.app.renderer.ScaleFactorMin;
                }
                if ((this.anchor & AnchorPoint.Right) === AnchorPoint.Right) {
                    offset.x += renderOffset.x / window.app.renderer.ScaleFactorMin;
                }
                if ((this.anchor & AnchorPoint.Top) === AnchorPoint.Top) {
                    offset.y -= renderOffset.y / window.app.renderer.ScaleFactorMin;
                }
                if ((this.anchor & AnchorPoint.Bottom) === AnchorPoint.Bottom) {
                    offset.y += renderOffset.y / window.app.renderer.ScaleFactorMin;
                }
                return offset;
            },
            enumerable: false,
            configurable: true
        });
        return DisplayObject;
    }());
    AirGUI.DisplayObject = DisplayObject;
})(AirGUI || (AirGUI = {}));
