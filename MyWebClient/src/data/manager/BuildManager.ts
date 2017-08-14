/**
 * 建筑管理类
 */
class BuildManager {

    //地图层
    private _mapLayer: MapLayer;

    private static _instance: BuildManager;
    public static get instance(): BuildManager {
        if (!this._instance)
            this._instance = new BuildManager();
        return this._instance;
    }
    private constructor() {

    }

    public set mapLayer(mapLayer: MapLayer) {
        this._mapLayer = mapLayer;
    }

}