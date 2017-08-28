/**
 * 仓库管理器
 */
class DepotManager extends BaseBuildManager {

    private static _instance: DepotManager = null;
    private DepotManager() {}
    public static get instance(): DepotManager {
        if (!this._instance) {
            this._instance = new DepotManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        var main: ModelBuild = MapInfo.instance.MapBuildXmlData[10001];
        var farm: ModelBuild = MapInfo.instance.MapBuildXmlData[10002];
        SpriteManager.instance.dispatchArmy(null, main.gate, farm.gate);
    }

}