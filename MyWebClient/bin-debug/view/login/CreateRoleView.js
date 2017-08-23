var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CreateRoleView = (function (_super) {
    __extends(CreateRoleView, _super);
    function CreateRoleView() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.CreateRoleViewSkin;
        return _this;
    }
    CreateRoleView.prototype.onRegist = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    CreateRoleView.prototype.onRemove = function () {
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    CreateRoleView.prototype.onRefresh = function () {
    };
    CreateRoleView.prototype.onTouchBtn = function () {
        GameDispatcher.instance.addEventListener(GameEvent.GAME_CREATE_ROLE, this.onCreateSuccess, this);
        DataManager.instance.loginM.onSendCreateMessage(this.lab_name.text);
    };
    CreateRoleView.prototype.onCreateSuccess = function () {
        egret.log("onCreateSuccess");
        SDKManager.onCreateRole(DataManager.instance.playerM.player);
    };
    return CreateRoleView;
}(BaseUI));
__reflect(CreateRoleView.prototype, "CreateRoleView");
//# sourceMappingURL=CreateRoleView.js.map