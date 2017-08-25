class GameWorld extends egret.DisplayObjectContainer {

    private _mainScene: MainScene;

    private static _instance: GameWorld;
    public static get instance(): GameWorld {
        if (!this._instance)
            this._instance = new GameWorld();
        return this._instance;
    }
    private constructor() {
        super();
        this.init();
    }

    private init(): void {
        
    }

    public set mainScene(mainScene: MainScene) {
        this._mainScene = mainScene;
    }

    public get mainScene(): MainScene {
        return this._mainScene;
    }

}