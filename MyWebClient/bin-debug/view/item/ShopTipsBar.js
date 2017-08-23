var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopTipsBar = (function (_super) {
    __extends(ShopTipsBar, _super);
    function ShopTipsBar(owner) {
        return _super.call(this, owner) || this;
    }
    ShopTipsBar.prototype.initSkinName = function () {
        this.skinName = skins.ShopTipsBarSkin;
    };
    //注册
    ShopTipsBar.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.Btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
        this.buyBar.onRegist();
        this.buyBar.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBuy, this);
    };
    //移除
    ShopTipsBar.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.Btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
        this.buyBar.onRemove();
        this.buyBar.btn_buy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBuy, this);
    };
    ShopTipsBar.prototype.onUpdate = function (param) {
        // super.onUpdate(param);
        // var fishd = new FishData(param.data.reward.id, 1);
        // this.img_fish.source = `${fishd.moveRes}_png`;
        // var model: ModelShop = this.param.data;
        // this.buyBar.currentState = "buy";
        // this.buyBar.onUpdate(model);
    };
    ShopTipsBar.prototype.onTouchBuy = function () {
        if (this.param.data.type == SHOP_TYPE.GOLD) {
            if (DataManager.instance.playerM.player.fishLen >= 120) {
                GameCommon.instance.addAlert(Language.instance.getDescByKey("is_own_upper_limit"));
                return;
            }
            if (this.buyBar.sum > this.buyBar.ownCurrency()) {
                GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips3"));
                return;
            }
            var one;
            var len = this.buyBar.num;
            DataManager.instance.syncM.onAddMessage(SyncFactory.onPackExchange(this.param.data.id, this.buyBar.num));
            for (var i = 0; i < len; i++) {
                one = DataManager.instance.playerM.player.getNewOneFish(this.param.data.reward.id);
                GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
            }
            DataManager.instance.playerM.player.addGoldAndUpgrade(-this.param.data.cosume[0].num);
        }
        this.onTouchClose();
    };
    ShopTipsBar.prototype.onTouchClose = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "ItemIntroducebar");
    };
    return ShopTipsBar;
}(BaseTipsBar));
__reflect(ShopTipsBar.prototype, "ShopTipsBar");
//# sourceMappingURL=ShopTipsBar.js.map