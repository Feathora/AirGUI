namespace AirGUI
{
    export class Asset
    {
        public path:string;
        public width:number;
        public height:number;
        public img:HTMLImageElement;
        public isReady:boolean;

        constructor()
        {
            this.isReady = false;
        }
    }

    export class Resources
    {
        private static assets:Array<Asset> = [];

        private constructor()
        {
            
        }

        public static GetAsset(file:string)
        {
            for(let asset of Resources.assets)
            {
                if(asset.path == file) return asset;
            }

            return null;
        }

        public static Load(file:string, callback:Function)
        {
            let request = new XMLHttpRequest();
            request.onload = () =>
            {
                let assetData:Array<Asset> = JSON.parse(request.responseText);

                for(let asset of assetData)
                {
                    let img = document.createElement("img");
                    img.onload = () =>
                    {
                        asset.isReady = true;
                    };
                    img.src = "Resources/" + asset.path;

                    asset.img = img;
                }

                Resources.assets = assetData;

                callback();
            };
            request.open("get", file, true);
            request.send();
        }
    }
}