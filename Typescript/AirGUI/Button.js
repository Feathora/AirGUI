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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(data) {
            var _this = _super.call(this, data) || this;
            _this.enabled = data.Enabled;
            return _this;
        }
        Object.defineProperty(Button.prototype, "Enabled", {
            get: function () {
                return this.enabled;
            },
            set: function (value) {
                this.enabled = value;
                if (!this.enabled) {
                    this.ReleaseTouch();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchData", {
            get: function () {
                return this.touchData;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchDown", {
            get: function () {
                return this.touchData != null && this.touchPhase == TouchPhase.Begin && this.TouchRect.Contains(this.touchData.Position);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchHold", {
            get: function () {
                return this.touchData != null && this.touchPhase == TouchPhase.Hold;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchHoldInside", {
            get: function () {
                return this.TouchHold && this.TouchRect.Contains(this.touchData.Position);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchUp", {
            get: function () {
                return this.touchData != null && this.touchPhase == TouchPhase.End;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchUpInside", {
            get: function () {
                return this.TouchUp && this.TouchRect.Contains(this.touchData.Position);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "TouchRect", {
            get: function () {
                var offset = this.AnchorOffset;
                return new Rect(this.Position.x + offset.x, this.Position.y + offset.y, this.Size.x, this.Size.y);
            },
            enumerable: false,
            configurable: true
        });
        Button.prototype.ReleaseTouch = function (releaseByManager) {
            if (releaseByManager === void 0) { releaseByManager = false; }
            if (this.touchData == null)
                return;
            if (!releaseByManager)
                window.touchManager.ReleaseTouch(this.touchData);
            this.touchData = null;
        };
        Button.prototype.StealTouch = function () {
            var result = this.touchData;
            this.touchData = null;
            return result;
        };
        Button.prototype.GiveTouch = function (touch) {
            if (this.touchData != null)
                window.touchManager.ReleaseTouch(this.touchData);
            this.touchData = touch;
            if (this.touchData != null) {
                this.touchPhase = this.touchData.Phase;
                this.touchData.Capture(this);
            }
        };
        Button.prototype.UpdateTouch = function () {
            if (!this.Enabled || !this.Visible)
                return;
            if (this.touchData != null) {
                this.touchPhase = this.touchData.Phase;
                if (this.TouchUpInside) {
                    window.app.audioPlayer.PlaySound("button_click.wav");
                }
            }
            else {
                this.touchData = window.touchManager.CaptureTouch(this, this.TouchRect);
                if (this.touchData != null) {
                    this.touchPhase = this.touchData.Phase;
                }
            }
        };
        return Button;
    }(AirGUI.Image));
    AirGUI.Button = Button;
})(AirGUI || (AirGUI = {}));
