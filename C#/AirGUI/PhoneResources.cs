using UnityEngine;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AirGUI
{
    public class PhoneAsset
    {
        public string path;
        public int width;
        public int height;

        public PhoneAsset(string p)
        {
            path = p;
        }
    }

    public class PhoneResources : MonoBehaviour
    {
        public static PhoneResources Instance
        {
            get; private set;
        }

        [SerializeField]
        private TextAsset resourcesFile;

        private List<PhoneAsset> assets;
        private List<PhoneAsset> Assets
        {
            get { return assets ?? (assets = JsonConvert.DeserializeObject<List<PhoneAsset>>(resourcesFile.text)); }
        }

        public PhoneAsset GetAsset(string path)
        {
            return (from a in Assets where a.path == path select a).FirstOrDefault();
        }

        private void Awake()
        {
            Instance = this;
        }
    } 
}
