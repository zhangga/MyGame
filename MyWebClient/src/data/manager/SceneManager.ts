/**
 * 场景管理器
 */
class SceneManager {

    //所有注册的战斗场景
    private fightScenes: {} = null;

    private static _instance: SceneManager;
    public static get instance(): SceneManager {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }
    private constructor() {

    }

    //初始化
    public init(): void {

    }

    //初始化注册所有场景
    public onRegisterAllScene(): void {
        this.onRegisterFightScene();
    }
    
    //注册所有战斗场景
    private onRegisterFightScene(): void {
        this.fightScenes = {};
        this.fightScenes[MESSAGE_ID.FIGHT_JUNGLE_DETAIL_MSG] = ESceneType.JUNGLE;

        for (var msgID in this.fightScenes) {
            GameWorld.instance.addEventListener(msgID.toString(), this.onChangeFightScene, this);
        }
    }

    /**
     * 切换战斗场景
     */
    private onChangeFightScene(evt: GameMessageEvent): void {

    }

}