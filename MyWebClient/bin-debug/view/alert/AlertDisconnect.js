/**断线重连面板
 * @author	lzn
 *
 * **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertDisconnect = (function (_super) {
    __extends(AlertDisconnect, _super);
    function AlertDisconnect(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    AlertDisconnect.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    AlertDisconnect.prototype.onSkinName = function () {
        this.skinName = skins.AlertDisconnectSkin;
    };
    AlertDisconnect.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
    };
    AlertDisconnect.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_connect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
    };
    AlertDisconnect.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_connect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnConnect, this);
    };
    AlertDisconnect.prototype.onRefresh = function () {
        this.lab_hint.text = Language.instance.getDescByKey(this.param.hint);
    };
    AlertDisconnect.prototype.onTouchBtnConnect = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_RELOGIN_EVENT, false);
    };
    return AlertDisconnect;
}(BaseWindowPanel));
__reflect(AlertDisconnect.prototype, "AlertDisconnect");
var AlertDisconnectParam = (function () {
    function AlertDisconnectParam(state, hint) {
        this.state = state;
        this.hint = hint;
    }
    return AlertDisconnectParam;
}());
__reflect(AlertDisconnectParam.prototype, "AlertDisconnectParam");
var ALERT_DISCONNECT_STATE;
(function (ALERT_DISCONNECT_STATE) {
    ALERT_DISCONNECT_STATE[ALERT_DISCONNECT_STATE["TIMEOUT"] = 0] = "TIMEOUT";
    ALERT_DISCONNECT_STATE[ALERT_DISCONNECT_STATE["REPEAT"] = 1] = "REPEAT";
    ALERT_DISCONNECT_STATE[ALERT_DISCONNECT_STATE["SYNC_ERROR"] = 2] = "SYNC_ERROR";
})(ALERT_DISCONNECT_STATE || (ALERT_DISCONNECT_STATE = {}));
//# sourceMappingURL=AlertDisconnect.js.map