/**
 * 木场管理器
 */
class LoggingManager extends BaseBuildManager {

    private static _instance: LoggingManager = null;
    private LoggingManager() {}
    public static get instance(): LoggingManager {
        if (!this._instance) {
            this._instance = new LoggingManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        var main: ModelBuild = MapInfo.instance.MapBuildXmlData[10001];
        var farm: ModelBuild = MapInfo.instance.MapBuildXmlData[10006];
        SpriteManager.instance.dispatchArmy(null, main.gate, farm.gate);
    }

}