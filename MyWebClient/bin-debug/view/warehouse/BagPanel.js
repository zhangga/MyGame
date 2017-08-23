var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BagPanel = (function (_super) {
    __extends(BagPanel, _super);
    function BagPanel(owner) {
        return _super.call(this, owner) || this;
    }
    BagPanel.prototype.onSkinName = function () {
        this.skinName = skins.BagPanelSkin;
    };
    BagPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    BagPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT.toString(), this.onRefresh, this);
    };
    BagPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(FishTankEevent.FISH_INPUT_EVENT.toString(), this.onRefresh, this);
    };
    BagPanel.prototype.onRefresh = function () {
        this.itemLayer.removeChildren();
        var fishs = DataManager.instance.playerM.player.getFishByLoction(FISH_POST.BAG);
        var item;
        for (var i = 0; i < fishs.length; i++) {
            item = new BagInstance();
            item.data = fishs[i];
            this.itemLayer.addChild(item);
        }
    };
    return BagPanel;
}(BaseTabView));
__reflect(BagPanel.prototype, "BagPanel");
var BagInstance = (function (_super) {
    __extends(BagInstance, _super);
    function BagInstance() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.BagInstanceSkin;
        return _this;
    }
    BagInstance.prototype.onLoadComplete = function () {
        _super.prototype.onLoadComplete.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBack, this);
    };
    BagInstance.prototype.onInit = function () {
        this.goods.data = this._data;
    };
    BagInstance.prototype.onTouchBack = function () {
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, this._data);
    };
    return BagInstance;
}(BaseComp));
__reflect(BagInstance.prototype, "BagInstance");
//# sourceMappingURL=BagPanel.js.map