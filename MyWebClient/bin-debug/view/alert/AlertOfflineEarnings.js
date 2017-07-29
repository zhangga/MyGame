var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AlertOfflineEarnings = (function (_super) {
    __extends(AlertOfflineEarnings, _super);
    function AlertOfflineEarnings(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    AlertOfflineEarnings.prototype.onSkinName = function () {
        this.skinName = skins.AlertOfflineEarningsSkin;
    };
    AlertOfflineEarnings.prototype.onInit = function () {
        this.setTitle("offline_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    AlertOfflineEarnings.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    };
    AlertOfflineEarnings.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    };
    AlertOfflineEarnings.prototype.onShowWithParam = function (param) {
        this.onShow();
    };
    AlertOfflineEarnings.prototype.onRefresh = function () {
        this.lab_hint.text = "\u79BB\u7EBF\u65F6\u95F4" + GameCommon.instance.getTimeStrForSec1(DataManager.instance.offline.time, 0, 1) + "\uFF0C\u83B7\u5F97\u4EE5\u4E0B\u6536\u76CA";
        this.bmpLab_num.text = "" + DataManager.instance.offline.gold.toTextFormat();
    };
    return AlertOfflineEarnings;
}(BaseWindowPanel));
__reflect(AlertOfflineEarnings.prototype, "AlertOfflineEarnings");
//# sourceMappingURL=AlertOfflineEarnings.js.map