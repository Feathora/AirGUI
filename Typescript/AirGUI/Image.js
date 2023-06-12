var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AirGUI;
(function (AirGUI) {
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(data) {
            var _this = _super.call(this, data) || this;
            _this.scaleMode = data.ScaleMode;
            _this.asset = AirGUI.Resources.GetAsset(data.Source);
            _this.Size = new Vector2(_this.asset.width, _this.asset.height);
            return _this;
            // this.image = document.createElement("img");
            // this.image.onload = () =>
            // {
            //     this.isReady = true;
            //     this.Size = new Vector2(this.image.width, this.image.height);
            // };
            // this.image.src = "Resources/" + data.Source;
        }
        Object.defineProperty(Image.prototype, "ScaleMode", {
            get: function () {
                return this.scaleMode;
            },
            set: function (value) {
                this.scaleMode = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "Source", {
            set: function (value) {
                // this.isReady = false;
                // this.image = document.createElement("img");
                // this.image.onload = () =>
                // {
                //     this.isReady = true;
                //     this.Size = new Vector2(this.image.width, this.image.height);
                // }
                // this.image.src = "Resources/" + value;
                this.asset = AirGUI.Resources.GetAsset(value);
                this.Size = new Vector2(this.asset.width, this.asset.height);
            },
            enumerable: false,
            configurable: true
        });
        Image.prototype.Render = function () {
            if (this.asset.isReady && this.Visible)
                window.app.renderer.RenderAirImage(this);
        };
        Image.prototype.Update = function () {
        };
        return Image;
    }(AirGUI.DisplayObject));
    AirGUI.Image = Image;
})(AirGUI || (AirGUI = {}));
