var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GiftTimeLimitPanel = (function (_super) {
    __extends(GiftTimeLimitPanel, _super);
    function GiftTimeLimitPanel(owner) {
        return _super.call(this, owner) || this;
    }
    GiftTimeLimitPanel.prototype.onSkinName = function () {
        this.skinName = skins.GiftTimeLimitPanelSkin;
    };
    GiftTimeLimitPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    GiftTimeLimitPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        // GameCommon.getInstance().addMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().addEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    GiftTimeLimitPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        // GameCommon.getInstance().removeMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().removeEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    GiftTimeLimitPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
    };
    return GiftTimeLimitPanel;
}(BaseWindowPanel));
__reflect(GiftTimeLimitPanel.prototype, "GiftTimeLimitPanel");
//# sourceMappingURL=GiftTimeLimitPanel.js.map