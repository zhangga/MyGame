/**
 * 主基地管理器
 */
class MainManager extends BaseBuildManager {

    private static _instance: MainManager = null;
    private MainManager() {}
    public static get instance(): MainManager {
        if (!this._instance) {
            this._instance = new MainManager();
        }
        return this._instance;
    }

    //点击
    public onClick(build: ActiveBuild): void {
        
    }

}