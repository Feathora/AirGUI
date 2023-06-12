var AirGUI;
(function (AirGUI) {
    var Scene = /** @class */ (function () {
        function Scene() {
        }
        Scene.prototype.Create = function (data) {
            var objData = JSON.parse(data);
            var me = this;
            for (var key in objData) {
                if (objData[key] instanceof Array) {
                    me[key] = [];
                    for (var _i = 0, _a = objData[key]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        var displayObj = new AirGUI[obj.TypeName](obj);
                        me[key].push(displayObj);
                    }
                }
                else {
                    if (objData[key].TypeName)
                        me[key] = new AirGUI[objData[key].TypeName](objData[key]);
                    else
                        me[key] = objData[key];
                }
            }
        };
        Scene.prototype.Render = function () {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    var element = this[key];
                    if (element) {
                        if (element.Render)
                            element.Render();
                        else if (element instanceof Array) {
                            for (var _i = 0, element_1 = element; _i < element_1.length; _i++) {
                                var obj = element_1[_i];
                                if (obj.Render)
                                    obj.Render();
                            }
                        }
                    }
                }
            }
        };
        Scene.prototype.UpdateTouch = function () {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    var element = this[key];
                    if (element) {
                        if (element instanceof AirGUI.Button) {
                            element.UpdateTouch();
                        }
                        else if (element instanceof Array) {
                            for (var _i = 0, element_2 = element; _i < element_2.length; _i++) {
                                var obj = element_2[_i];
                                if (obj instanceof AirGUI.Button) {
                                    obj.UpdateTouch();
                                }
                            }
                        }
                    }
                }
            }
        };
        Scene.prototype.CallFunction = function (functionName, args) {
            if (args === void 0) { args = {}; }
            window.airConsole.message(AirConsole.SCREEN, { "cmd": "CallFunction", "function": functionName, "args": args });
        };
        Scene.prototype.FindPropertyDescriptor = function (obj, propertyName) {
            var prototype = Object.getPrototypeOf(obj);
            if (!prototype)
                return null;
            return Object.getOwnPropertyDescriptor(prototype, propertyName) || this.FindPropertyDescriptor(prototype, propertyName);
        };
        Scene.prototype.PropertyChanged = function (id, propertyName, value) {
            if (id !== -1) {
                for (var key in this) {
                    if (this.hasOwnProperty(key)) {
                        var element = this[key];
                        if (element) {
                            if (element instanceof Array) {
                                for (var _i = 0, element_3 = element; _i < element_3.length; _i++) {
                                    var obj = element_3[_i];
                                    if (obj.ID === id) {
                                        this.FindPropertyDescriptor(obj, propertyName).set.call(obj, value);
                                    }
                                }
                            }
                            else {
                                if (element.ID === id) {
                                    this.FindPropertyDescriptor(element, propertyName).set.call(element, value);
                                }
                            }
                        }
                    }
                }
            }
            else {
                this[propertyName] = value;
            }
        };
        Scene.prototype.Update = function () {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    var element = this[key];
                    if (element instanceof Array) {
                        for (var i = 0; i < element.length; ++i) {
                            var obj = element[i];
                            if (obj instanceof AirGUI.Button) {
                                if (obj.TouchUpInside) {
                                    this.CallFunction("ButtonPressed", { "buttonName": key, "arrayIndex": i });
                                }
                            }
                            if (obj && obj.Animator && obj.Animator.Update()) {
                                obj.Animator = null;
                            }
                        }
                    }
                    else {
                        if (element instanceof AirGUI.Button) {
                            if (element.TouchUpInside) {
                                this.CallFunction("ButtonPressed", { "buttonName": key });
                            }
                        }
                        if (element && element.Animator && element.Animator.Update()) {
                            element.Animator = null;
                        }
                    }
                }
            }
        };
        return Scene;
    }());
    AirGUI.Scene = Scene;
})(AirGUI || (AirGUI = {}));
