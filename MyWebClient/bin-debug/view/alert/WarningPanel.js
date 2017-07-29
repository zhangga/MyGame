var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WarningPanel = (function (_super) {
    __extends(WarningPanel, _super);
    function WarningPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    WarningPanel.prototype.onSkinName = function () {
        this.skinName = skins.WarnPanelSkin;
    };
    WarningPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    WarningPanel.prototype.onRefresh = function () {
        var alertTxt = GameCommon.instance.readStringToHtml(this.param.texts);
        alertTxt = alertTxt.replace(/\\n/g, "\n");
        this.labelAlert.textFlow = (new egret.HtmlTextParser).parser(alertTxt);
    };
    WarningPanel.prototype.onEventOk = function () {
        this.onEventBack();
        egret.callLater(this.param.callback, this.param.target, this.param.param);
    };
    WarningPanel.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    WarningPanel.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
    };
    WarningPanel.prototype.onEventBack = function () {
        this.onHide();
    };
    WarningPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
    };
    WarningPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
        this.btn_cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
    };
    return WarningPanel;
}(BaseWindowPanel));
__reflect(WarningPanel.prototype, "WarningPanel");
var WarningParam = (function () {
    function WarningParam(texts, callback, target, param) {
        if (param === void 0) { param = null; }
        this.callback = callback;
        this.target = target;
        this.param = param;
        this.texts = texts;
    }
    return WarningParam;
}());
__reflect(WarningParam.prototype, "WarningParam");
//# sourceMappingURL=WarningPanel.js.map