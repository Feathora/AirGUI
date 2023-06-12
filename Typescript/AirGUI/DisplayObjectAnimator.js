var AirGUI;
(function (AirGUI) {
    var DisplayObjectAnimatorProperty = /** @class */ (function () {
        function DisplayObjectAnimatorProperty() {
        }
        return DisplayObjectAnimatorProperty;
    }());
    var DisplayObjectAnimator = /** @class */ (function () {
        function DisplayObjectAnimator(target, data) {
            this.target = target;
            this.t = 0;
            this.duration = data.Duration;
            this.animations = data.animations;
            for (var _i = 0, _a = this.animations; _i < _a.length; _i++) {
                var a = _a[_i];
                a.path = a.name.split('.');
                var obj = this.target;
                for (var i = 0; i < a.path.length - 1; ++i) {
                    obj = obj[a.path[i]];
                }
                a.startValue = obj[a.path[a.path.length - 1]];
            }
        }
        DisplayObjectAnimator.prototype.Update = function () {
            this.t += window.app.deltaTime;
            this.t = Math.min(this.t, this.duration);
            for (var _i = 0, _a = this.animations; _i < _a.length; _i++) {
                var a = _a[_i];
                var v = Math.lerp(a.startValue, a.value, this.t / this.duration);
                var obj = this.target;
                for (var i = 0; i < a.path.length - 1; ++i) {
                    obj = obj[a.path[i]];
                }
                obj[a.path[a.path.length - 1]] = v;
            }
            return this.t >= this.duration;
        };
        return DisplayObjectAnimator;
    }());
    AirGUI.DisplayObjectAnimator = DisplayObjectAnimator;
})(AirGUI || (AirGUI = {}));
