/**
 * 矿场管理器
 */
class StopeManager extends BaseBuildManager {

    private static _instance: StopeManager = null;
    private StopeManager() {}
    public static get instance(): StopeManager {
        if (!this._instance) {
            this._instance = new StopeManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        var main: ModelBuild = MapInfo.instance.MapBuildXmlData[10001];
        var farm: ModelBuild = MapInfo.instance.MapBuildXmlData[10005];
        SpriteManager.instance.dispatchArmy(null, main.gate, farm.gate);
    }

}