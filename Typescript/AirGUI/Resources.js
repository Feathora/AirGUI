var AirGUI;
(function (AirGUI) {
    var Asset = /** @class */ (function () {
        function Asset() {
            this.isReady = false;
        }
        return Asset;
    }());
    AirGUI.Asset = Asset;
    var Resources = /** @class */ (function () {
        function Resources() {
        }
        Resources.GetAsset = function (file) {
            for (var _i = 0, _a = Resources.assets; _i < _a.length; _i++) {
                var asset = _a[_i];
                if (asset.path == file)
                    return asset;
            }
            return null;
        };
        Resources.Load = function (file, callback) {
            var request = new XMLHttpRequest();
            request.onload = function () {
                var assetData = JSON.parse(request.responseText);
                var _loop_1 = function (asset) {
                    var img = document.createElement("img");
                    img.onload = function () {
                        asset.isReady = true;
                    };
                    img.src = "Resources/" + asset.path;
                    asset.img = img;
                };
                for (var _i = 0, assetData_1 = assetData; _i < assetData_1.length; _i++) {
                    var asset = assetData_1[_i];
                    _loop_1(asset);
                }
                Resources.assets = assetData;
                callback();
            };
            request.open("get", file, true);
            request.send();
        };
        Resources.assets = [];
        return Resources;
    }());
    AirGUI.Resources = Resources;
})(AirGUI || (AirGUI = {}));
