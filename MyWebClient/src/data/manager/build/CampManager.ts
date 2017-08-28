/**
 * 兵营管理器
 */
class CampManager extends BaseBuildManager {

    private static _instance: CampManager = null;
    private CampManager() {}
    public static get instance(): CampManager {
        if (!this._instance) {
            this._instance = new CampManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        var main: ModelBuild = MapInfo.instance.MapBuildXmlData[10001];
        var farm: ModelBuild = MapInfo.instance.MapBuildXmlData[10003];
        SpriteManager.instance.dispatchArmy(null, main.gate, farm.gate);
    }

}