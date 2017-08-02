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
    //供子类覆盖
    MainScene.prototype.onChangeState = function () {
        this.sceneLayer.removeChildren();
        if (_GF.instance.isDemo) {
            MainScene.state = MAINSCENE_STATE.GAME;
        }
        switch (MainScene.state) {
            case MAINSCENE_STATE.LOGIN:
                var login = new LoginView();
                this.sceneLayer.addChild(login);
                break;
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
            case MAINSCENE_STATE.GAME:
                if (!this.layer) {
                    this.layer = new ModuleLayer();
                }
                else {
                    this.layer.onReset();
                }
                this.sceneLayer.addChild(this.layer);
                break;
        }
    };
    MainScene.prototype.onRegist = function () {
        GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.CREATE_ROLE_MESSAGE.toString(), this.onGameSucceed, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.ENTER_GAME_MESSAGE.toString(), this.onEnterSucceed, this);
        GameDispatcher.instance.addEventListener(GameEvent.GAME_RELOGIN_EVENT, this.onLoginSucceed, this);
    };
    MainScene.prototype.onLoginSucceed = function () {
        _GF.instance.netChanel = NET_CHANNEL.GAME;
        _GF.instance.net.setUrl(DataManager.instance.loginM.gameURL, NET_CHANNEL.GAME);
        DataManager.instance.loginM.onSendLoginServMessage();
    };
    MainScene.prototype.onGameSucceed = function () {
        MainScene.state = MAINSCENE_STATE.CREATE;
        this.onChangeState();
    };
    MainScene.prototype.onEnterSucceed = function () {
        MainScene.state = MAINSCENE_STATE.GAME;
        this.onChangeState();
    };
    MainScene.prototype.onErrorHandler = function () {
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