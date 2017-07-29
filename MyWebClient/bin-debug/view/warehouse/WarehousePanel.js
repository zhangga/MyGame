var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WarehousePanel = (function (_super) {
    __extends(WarehousePanel, _super);
    function WarehousePanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    WarehousePanel.prototype.onSkinName = function () {
        this.skinName = skins.WarehousePanelSkin;
    };
    WarehousePanel.prototype.onInit = function () {
        var sysQueue = [];
        var param = new RegisterSystemParam();
        param.sysName = "BagPanel";
        // param.redP = this.points[1];
        // param.redP.addTriggerFuc(DataManager.getInstance().forgeManager, "getGemPointShow");
        sysQueue.push(param);
        this.registerPage(sysQueue, "forgeGrp", GameDefine.RED_TAB_POS);
        this.tabGrp.onUpdate(["warehouse_tab_bag"]);
        this.tabGrp.selectIndex = this.index;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    WarehousePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        // GameCommon.getInstance().addMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().addEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    WarehousePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        // GameCommon.getInstance().removeMsgEventListener(MESSAGE_ID.ACTIVITY_MESSAGE.toString(), this.onRefresh, this);
        // GameDispatcher.getInstance().removeEventListener(GameEvent.ACTIVITI_HALL_OVER, this.onRefresh, this);
    };
    WarehousePanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
    };
    WarehousePanel.prototype.onTouchTab = function (e) {
        _super.prototype.onTouchTab.call(this, e);
        this.tabGrp.selectIndex = this.index;
    };
    return WarehousePanel;
}(BaseSystemPanel));
__reflect(WarehousePanel.prototype, "WarehousePanel");
//# sourceMappingURL=WarehousePanel.js.map