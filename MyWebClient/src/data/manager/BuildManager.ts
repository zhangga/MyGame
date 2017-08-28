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

    //点击建筑
    private onClickBuilding(evt: egret.Event): void {
        var build: ActiveBuild = evt.currentTarget;
        var mgr: BaseBuildManager = this.getManager(build.model.type);
        if (mgr == null)
            return;
        mgr.onClick(build);
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
        //添加监听
        this.addListener(build);
    }

    //添加监听
    private addListener(build: ActiveBuild): void {
        if (build.model.type == EBuildType.DECORATE) {
            return;
        }
        build.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBuilding, this);
    }

    /**
     * 根据类型获取对应的管理器
     */
    public getManager(type: EBuildType): BaseBuildManager {
        var mgr: BaseBuildManager = null;
        switch (type) {
            case EBuildType.MAIN:
                mgr = MainManager.instance;
                break;
            case EBuildType.DEPOT:
                mgr = DepotManager.instance;
                break;
            case EBuildType.CAMP:
                mgr = CampManager.instance;
                break;
            case EBuildType.FARM:
                mgr = FarmManager.instance;
                break;
            case EBuildType.STOPE:
                mgr = StopeManager.instance;
                break;
            case EBuildType.LOGGING:
                mgr = LoggingManager.instance;
                break;
            default:
                break;
        }
        return mgr;
    }

    public set mapLayer(mapLayer: MapLayer) {
        this._mapLayer = mapLayer;
    }

}