var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainUpgradeItem = (function (_super) {
    __extends(MainUpgradeItem, _super);
    function MainUpgradeItem() {
        var _this = _super.call(this) || this;
        _this.isPlay = false;
        _this.point = new egret.Point();
        _this.skinName = skins.MainUpgradeItemSkin;
        return _this;
    }
    MainUpgradeItem.prototype.onLoadComplete = function () {
        _super.prototype.onLoadComplete.call(this);
        if (!this.it) {
            this.it = new egret.Timer(3000, 1);
            this.it.addEventListener(egret.TimerEvent.TIMER, this.onHideItem, this);
            this.it.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        }
        this.item.btn_upgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUpgrade, this);
        var shap = new egret.Shape();
        shap.graphics.beginFill(0xFFFFFF);
        shap.graphics.drawRect(0, 0, this.maskLayer.width, this.maskLayer.height);
        shap.graphics.endFill();
        this.maskLayer.addChild(shap);
        this.item.mask = this.maskLayer;
    };
    MainUpgradeItem.prototype.onInit = function () {
        this.item.data = this._data;
        this.it.reset();
        this.it.repeatCount = 1;
        this.it.start();
        if (this.isPlay) {
            if (this.point.y == -100) {
                egret.Tween.removeTweens(this.item);
                this.onShowItem();
            }
        }
        else {
            this.onShowItem();
        }
    };
    MainUpgradeItem.prototype.onShowItem = function () {
        this.point.x = 0;
        this.point.y = 0;
        this.isPlay = true;
        TweenLiteUtil.beelineTween(this.item, this.onDone, this, this.point, egret.Ease.cubicIn, 200);
    };
    MainUpgradeItem.prototype.onHideItem = function () {
        this.point.x = 0;
        this.point.y = -100;
        this.isPlay = true;
        TweenLiteUtil.beelineTween(this.item, this.onDone, this, this.point, egret.Ease.cubicOut, 200);
    };
    MainUpgradeItem.prototype.onDone = function () {
        this.isPlay = false;
    };
    MainUpgradeItem.prototype.timerComFunc = function () {
        // console.log("计时结束");
    };
    MainUpgradeItem.prototype.onTouchUpgrade = function () {
        this.onInit();
    };
    return MainUpgradeItem;
}(BaseComp));
__reflect(MainUpgradeItem.prototype, "MainUpgradeItem");
//# sourceMappingURL=MainUpgradeItem.js.map