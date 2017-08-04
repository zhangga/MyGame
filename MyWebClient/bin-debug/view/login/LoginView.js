var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginView = (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.LoginViewSkin;
        return _this;
    }
    //供子类覆盖
    LoginView.prototype.onInit = function () {
        var account = SDKManager.loginInfo.account;
        if (account || ChannelDefine.isPublish) {
            this.loginLayer.visible = false;
            DataManager.instance.loginM.onSendLoginMessage();
        }
        else {
            this.loginLayer.visible = true;
            this.tInp.text = window.localStorage.getItem("wycxaccount");
        }
    };
    LoginView.prototype.onRegist = function () {
        this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
    };
    LoginView.prototype.onRemove = function () {
        this.btn_login.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.GAME_LOGON_MESSAGE.toString(), this.onLoginSucceed, this);
    };
    LoginView.prototype.onLoginSucceed = function () {
        this.loginLayer.visible = false;
    };
    LoginView.prototype.onDestroy = function () {
        _super.prototype.onDestory.call(this);
        this.parent.removeChild(this);
    };
    LoginView.prototype.onTouchBtn = function () {
        if (this.tInp.text && this.tInp.text != "") {
            DataManager.instance.account = this.tInp.text;
            DataManager.instance.loginM.onSendLoginMessage();
        }
        window.localStorage.setItem("wycxaccount", this.tInp.text);
    };
    return LoginView;
}(BaseUI));
__reflect(LoginView.prototype, "LoginView");
//# sourceMappingURL=LoginView.js.map