/**
 * 场景管理器
 */
class SceneManager {

    private static _instance: SceneManager;
    public static get instance(): SceneManager {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }
    private constructor() {

    }

    //当前场景
    private currScene: ESceneType;

    //场景所需数据
    private data: SceneParamVo;

    //初始化
    public init(): void {

    }

    //初始化注册所有场景
    public onRegisterAllScene(): void {
        //增加监听
        GameDispatcher.instance.addEventListener(GameEvent.GAME_SCENE_OPEN, this.onChangeFightScene, this);
    }
    
    //打开场景
    public onOpenScene(sceneType: ESceneType, data: SceneParamVo): void {
        this.currScene = sceneType;
        this.data = data;
        GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_SCENE_OPEN, false, this);
    }

    /**
     * 切换战斗场景
     */
    private onChangeFightScene(): void {
        Tool.log("打开场景：" + this.currScene);
    }

}