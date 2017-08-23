var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopPanel = (function (_super) {
    __extends(ShopPanel, _super);
    function ShopPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.curr_type = SHOP_TYPE.GOLD;
        return _this;
    }
    ShopPanel.prototype.onSkinName = function () {
        this.skinName = skins.ShopPanelSkin;
    };
    ShopPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.scorll.verticalScrollBar.autoVisibility = true;
        this.scorll.verticalScrollBar.visible = true;
        this.initShopTab();
        this.onRefresh();
    };
    ShopPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    };
    ShopPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
    };
    ShopPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        this.onTabBtnTouch();
    };
    ShopPanel.prototype.initShopTab = function () {
        var tabs = [];
        for (var type in SHOP_TYPE) {
            var num = parseInt(type);
            if (isNaN(num))
                break;
            tabs.push("shoptype" + num);
        }
        this.tab_btn_group.onUpdate(tabs);
    };
    /**
     * 切换商城类型TAB列表
     */
    ShopPanel.prototype.onTabBtnTouch = function () {
        if (this.tab_btn_group.selectIndex && this.curr_type == this.tab_btn_group.selectIndex + 1)
            return;
        if (!this.tab_btn_group.selectIndex)
            this.tab_btn_group.selectIndex = 0;
        this.curr_type = this.tab_btn_group.selectIndex + 1;
        this.updateShopList();
    };
    //刷新商品列表
    ShopPanel.prototype.updateShopList = function () {
        this.shop_list.removeChildren();
        for (var key in ModelManager.instance.modelShop) {
            var model = ModelManager.instance.modelShop[key];
            if (model.type != this.curr_type)
                continue;
            var shopItem = new ShopItem();
            shopItem.data = model;
            this.shop_list.addChild(shopItem);
        }
    };
    return ShopPanel;
}(BaseWindowPanel));
__reflect(ShopPanel.prototype, "ShopPanel");
var SHOP_TYPE;
(function (SHOP_TYPE) {
    SHOP_TYPE[SHOP_TYPE["GOLD"] = 1] = "GOLD";
    SHOP_TYPE[SHOP_TYPE["DIAMOND"] = 2] = "DIAMOND";
})(SHOP_TYPE || (SHOP_TYPE = {}));
//# sourceMappingURL=ShopPanel.js.map