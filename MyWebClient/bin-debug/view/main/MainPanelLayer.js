var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainPanelLayer = (function (_super) {
    __extends(MainPanelLayer, _super);
    function MainPanelLayer(owner) {
        return _super.call(this, owner) || this;
    }
    MainPanelLayer.prototype.onInit = function () {
        var sysQueue = [];
        var param = new RegisterSystemParam();
        param.sysName = "UpgradePanel";
        sysQueue.push(param);
        param = new RegisterSystemParam();
        param.sysName = "TechnologyPanel";
        sysQueue.push(param);
        param = new RegisterSystemParam();
        param.sysName = "DecoratePanel";
        sysQueue.push(param);
        param = new RegisterSystemParam();
        param.sysName = "FishTankAdvancePanel";
        sysQueue.push(param);
        this.registerPage(sysQueue, "mainGrp", null, false);
        this.index = 0;
        this.onRefresh();
    };
    MainPanelLayer.prototype.onShowPanel = function () {
        if (this.currPanel) {
            this.currPanel.onHide();
            this.isShowAlert = false;
        }
        this.currPanel = this.allwindows[this.index];
        if (!this.currPanel) {
            var windowName = this.windowNames[this.index];
            if (!windowName)
                return;
            this.currPanel = new window[windowName](this);
            this.allwindows[this.index] = this.currPanel;
            this["tabLayer"].addChild(this.currPanel);
        }
        else {
            this["tabLayer"].addChild(this.currPanel);
            this.currPanel.onShow();
        }
        if (this.tabs[this.index]) {
            this.tabs[this.index].selected = true;
        }
    };
    MainPanelLayer.prototype.onRegist = function () {
    };
    MainPanelLayer.prototype.onRemove = function () {
    };
    MainPanelLayer.prototype.onChangeTab = function (index) {
        if (this.index != index) {
            this.index = index;
            this.onRefresh();
        }
    };
    MainPanelLayer.prototype.onChangeFishTank = function () {
        this.onRefresh();
    };
    return MainPanelLayer;
}(BaseSystemPanel));
__reflect(MainPanelLayer.prototype, "MainPanelLayer");
//# sourceMappingURL=MainPanelLayer.js.map