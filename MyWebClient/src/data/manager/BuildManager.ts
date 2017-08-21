/**
 * 建筑管理类
 */
class BuildManager {

    //地图层
    private _mapLayer: MapLayer;

    //地图上的建筑对象
    private _buildMap: ActiveBuild[] = [];

    private static _instance: BuildManager;
    public static get instance(): BuildManager {
        if (!this._instance)
            this._instance = new BuildManager();
        return this._instance;
    }
    private constructor() {

    }

    /**将建筑显示到地图上 */
    public showOnMap(): void {
        for (var key in MapInfo.instance.MapBuildXmlData) {
            this.addBuild(key);
        }
    }

    //添加建筑
    public addBuild(id): void {
        //建筑显示对象
        var build: ActiveBuild = new ActiveBuild();
        build.id = id
        if (!build.model)
            return;
        //显示对象
        build.initBodyLayer();
        this._buildMap[build.id] = build;
        this._mapLayer.addSprite(build);
    }

    public set mapLayer(mapLayer: MapLayer) {
        this._mapLayer = mapLayer;
    }

}

enum BUILD_TYPE {
    //主城
    main = 1,
    //兵营
    camp = 2,
}