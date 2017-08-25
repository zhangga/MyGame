/**
 * 战斗管理器
 */
class FightManager {

    private static _instance: FightManager;
    public static get instance(): FightManager {
        if (!this._instance)
            this._instance = new FightManager();
        return this._instance;
    }
    private constructor() {

    }

}