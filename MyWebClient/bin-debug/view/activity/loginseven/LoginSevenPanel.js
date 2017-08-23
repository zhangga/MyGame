var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginSevenPanel = (function (_super) {
    __extends(LoginSevenPanel, _super);
    function LoginSevenPanel(owner) {
        return _super.call(this, owner) || this;
    }
    LoginSevenPanel.prototype.onSkinName = function () {
        this.skinName = skins.LoginSevenPanelSkin;
    };
    LoginSevenPanel.prototype.onInit = function () {
        this.loginItems = [];
        for (var i = 0; i < ModelManager.instance.modelSevenLogin.length; i++) {
            var item = new LoginSevenItem();
            this.itemGrp.addChild(item);
            this.loginItems.push(item);
        }
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    LoginSevenPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        // GameCommon.getInstance().addMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().addEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    LoginSevenPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        // GameCommon.getInstance().removeMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().removeEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    LoginSevenPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
    };
    return LoginSevenPanel;
}(BaseWindowPanel));
__reflect(LoginSevenPanel.prototype, "LoginSevenPanel");
var LoginSevenItem = (function (_super) {
    __extends(LoginSevenItem, _super);
    function LoginSevenItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        _this.skinName = skins.LoginSevenItemSkin;
        return _this;
    }
    LoginSevenItem.prototype.onInit = function () {
    };
    LoginSevenItem.prototype.onUpdate = function () {
    };
    return LoginSevenItem;
}(eui.Component));
__reflect(LoginSevenItem.prototype, "LoginSevenItem");
//# sourceMappingURL=LoginSevenPanel.js.map