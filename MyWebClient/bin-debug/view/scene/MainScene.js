var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MainScene.prototype.onAddToStage = function () {
        this.onRegist();
        //场景层
        this.sceneLayer = new egret.DisplayObjectContainer();
        //提示层
        this.promptLayer = new egret.DisplayObjectContainer();
        this.addChild(this.sceneLayer);
        this.addChild(this.promptLayer);
        this.promptLayer.addChild(PromptPanel.getInstance());
        this.onChangeState();
    };
    //开始创建游戏
    MainScene.prototype.onStartGame = function () {
        this._mapLayer = new MapLayer(this);
        this.addChild(this._mapLayer);
        if (!this._moduleLayer) {
            this._moduleLayer = new ModuleLayer();
        }
        else {
            this._moduleLayer.onReset();
        }
        this.sceneLayer.addChild(this._moduleLayer);
    };
    //状态切换
    MainScene.prototype.onChangeState = function () {
        this.sceneLayer.removeChildren();
        if (_GF.instance.isDemo) {
            MainScene.state = MAINSCENE_STATE.GAME;
        }
        switch (MainScene.state) {
            //登录
            case MAINSCENE_STATE.LOGIN:
                var login = new LoginView();
                this.sceneLayer.addChild(login);
                break;
            //建角
            case MAINSCENE_STATE.CREATE:
                //玩吧建角
                if (DataManager.instance.channel == EChannel.CHANNEL_WANBA) {
                    DataManager.instance.loginM.onSendCreateMessage(SDKManager.loginInfo.nickName);
                }
                else {
                    var create = new CreateRoleView();
                    this.sceneLayer.addChild(create);
                }
                break;
            //游戏
            case MAINSCENE_STATE.GAME:
                this.onStartGame();
                break;
        }
    };
    MainScene.prototype.onRegist = function () {
        GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.CREATE_ROLE_MESSAGE.toString(), this.onGameSucceed, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.LOGIN_SERVER_MESSAGE.toString(), this.onEnterSucceed, this);
        GameDispatcher.instance.addEventListener(GameEvent.GAME_RELOGIN_EVENT, this.onLoginSucceed, this);
    };
    /**登录 */
    MainScene.prototype.onLoginSucceed = function () {
        _GF.instance.netChanel = NET_CHANNEL.GAME;
        _GF.instance.net.setUrl(DataManager.instance.loginM.gameURL, NET_CHANNEL.GAME);
        DataManager.instance.loginM.onSendLoginServMessage();
    };
    /**建角 */
    MainScene.prototype.onGameSucceed = function () {
        MainScene.state = MAINSCENE_STATE.CREATE;
        this.onChangeState();
    };
    /**进入游戏 */
    MainScene.prototype.onEnterSucceed = function () {
        MainScene.state = MAINSCENE_STATE.GAME;
        this.onChangeState();
    };
    //地图层
    MainScene.prototype.getMapLayer = function () {
        return this._mapLayer;
    };
    /**舞台尺寸发生变化**/
    MainScene.prototype.onResize = function () {
        if (_GF.IS_PC_GAME) {
            this.promptLayer.x = Globar_Pos.x;
            try {
                this._moduleLayer.onResizeLayer();
                this._mapLayer.onResizeLayer();
            }
            catch (e) {
            }
        }
    };
    return MainScene;
}(egret.DisplayObjectContainer));
__reflect(MainScene.prototype, "MainScene");
var MAINSCENE_STATE;
(function (MAINSCENE_STATE) {
    MAINSCENE_STATE[MAINSCENE_STATE["LOGIN"] = 0] = "LOGIN";
    MAINSCENE_STATE[MAINSCENE_STATE["CREATE"] = 1] = "CREATE";
    MAINSCENE_STATE[MAINSCENE_STATE["GAME"] = 2] = "GAME";
})(MAINSCENE_STATE || (MAINSCENE_STATE = {}));
//# sourceMappingURL=MainScene.js.map