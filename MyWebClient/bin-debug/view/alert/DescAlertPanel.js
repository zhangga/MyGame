var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DescAlertPanel = (function (_super) {
    __extends(DescAlertPanel, _super);
    function DescAlertPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    DescAlertPanel.prototype.onSkinName = function () {
        this.skinName = skins.DescAlertPanelSkin;
    };
    DescAlertPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    DescAlertPanel.prototype.onRefresh = function () {
        var alertTxt = GameCommon.instance.readStringToHtml(this.param);
        alertTxt = alertTxt.replace(/\\n/g, "\n");
        this.labelAlert.textFlow = (new egret.HtmlTextParser).parser(alertTxt);
    };
    DescAlertPanel.prototype.onEventOk = function () {
        this.onEventBack();
    };
    DescAlertPanel.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    DescAlertPanel.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
    };
    DescAlertPanel.prototype.onEventBack = function () {
        this.onHide();
    };
    DescAlertPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
    };
    DescAlertPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventOk, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEventBack, this);
    };
    return DescAlertPanel;
}(BaseWindowPanel));
__reflect(DescAlertPanel.prototype, "DescAlertPanel");
//# sourceMappingURL=DescAlertPanel.js.map