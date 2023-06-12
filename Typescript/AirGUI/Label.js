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
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(data) {
            var _this = _super.call(this, data) || this;
            _this.text = data.Text;
            _this.fontSize = data.FontSize;
            _this.lineWrap = data.LineWrap;
            _this.colour = data.Colour;
            return _this;
        }
        Object.defineProperty(Label.prototype, "Text", {
            get: function () {
                return this.text;
            },
            set: function (value) {
                this.text = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "FontSize", {
            get: function () {
                return this.fontSize;
            },
            set: function (value) {
                this.fontSize = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "LineWrap", {
            get: function () {
                return this.lineWrap;
            },
            set: function (value) {
                this.lineWrap = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "Colour", {
            get: function () {
                return this.colour;
            },
            set: function (value) {
                this.colour = value;
            },
            enumerable: false,
            configurable: true
        });
        Label.prototype.Render = function () {
            if (this.Visible)
                window.app.renderer.RenderAirLabel(this);
        };
        Label.prototype.Update = function () {
        };
        return Label;
    }(AirGUI.DisplayObject));
    AirGUI.Label = Label;
})(AirGUI || (AirGUI = {}));
