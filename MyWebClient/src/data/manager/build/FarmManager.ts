/**
 * 农田管理器
 */
class FarmManager extends BaseBuildManager {

    private static _instance: FarmManager = null;
    private FarmManager() {}
    public static get instance(): FarmManager {
        if (!this._instance) {
            this._instance = new FarmManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        SceneManager.instance.onOpenScene(ESceneType.JUNGLE, null);
        var main: ModelBuild = MapInfo.instance.MapBuildXmlData[10001];
        var farm: ModelBuild = MapInfo.instance.MapBuildXmlData[10004];
        SpriteManager.instance.dispatchArmy(null, main.gate, farm.gate);
    }

}