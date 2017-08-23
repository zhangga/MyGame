var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopGoldPanel = (function (_super) {
    __extends(ShopGoldPanel, _super);
    function ShopGoldPanel(owner) {
        return _super.call(this, owner) || this;
    }
    ShopGoldPanel.prototype.onSkinName = function () {
        this.skinName = skins.ShopGoldPanelSkin;
    };
    ShopGoldPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    ShopGoldPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
    };
    ShopGoldPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
    };
    ShopGoldPanel.prototype.onRefresh = function () {
        this.itemLayer.removeChildren();
        var models = ModelManager.instance.modelShop;
        var model;
        var item;
        for (var key in models) {
            model = models[key];
            if (model.type == SHOP_TYPE.GOLD) {
                item = new ShopItem();
                item.data = model;
                this.itemLayer.addChild(item);
            }
        }
    };
    return ShopGoldPanel;
}(BaseTabView));
__reflect(ShopGoldPanel.prototype, "ShopGoldPanel");
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.ShopItemSkin;
        return _this;
    }
    ShopItem.prototype.onInit = function () {
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
        var model = GameCommon.instance.getThingModel(this._data.cosume[0].type, this._data.cosume[0].id);
        this.img_coin.source = model.dropicon;
        this.lab_price.text = "" + this._data.cosume[0].num;
        // var fishD = new FishData(this._data.reward.id, 1);
        // this.img_fish.source = `${fishD.moveRes}_png`;
    };
    ShopItem.prototype.onTouch = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("ItemIntroducebar", new IntroduceBarParam(INTRODUCE_TYPE.SHOP, this._data)));
    };
    return ShopItem;
}(BaseComp));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopGoldPanel.js.map