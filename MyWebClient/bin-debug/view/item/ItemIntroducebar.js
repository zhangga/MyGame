var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemIntroducebar = (function (_super) {
    __extends(ItemIntroducebar, _super);
    function ItemIntroducebar(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    ItemIntroducebar.prototype.onSkinName = function () {
        this.skinName = skins.ItemIntroducebarSkin;
    };
    ItemIntroducebar.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    ItemIntroducebar.prototype.onShow = function () {
        if (this.param) {
            _super.prototype.onShow.call(this);
        }
    };
    ItemIntroducebar.prototype.getTipsView = function () {
        if (!this._allTipsViews)
            this._allTipsViews = {};
        var tipType = this.param.location;
        if (this._allTipsViews[tipType]) {
            return this._allTipsViews[tipType];
        }
        switch (tipType) {
            case INTRODUCE_TYPE.SHOP:
                this._allTipsViews[tipType] = new ShopTipsBar(this);
                break;
            case INTRODUCE_TYPE.FIELDGUIDE:
                this._allTipsViews[tipType] = new FieldGuideTipsBar(this);
                break;
        }
        return this._allTipsViews[tipType];
    };
    ItemIntroducebar.prototype.onShowTips = function () {
        this.onHideTips();
        this._currTipsBar = this.getTipsView();
        if (this._currTipsBar) {
            this._currTipsBar.onRegist();
            this._currTipsBar.onUpdate(this.param);
            this.addChild(this._currTipsBar);
        }
    };
    /**移除Tips 界面处理**/
    ItemIntroducebar.prototype.onHideTips = function () {
        if (this._currTipsBar) {
            this._currTipsBar.onRemove();
            this._currTipsBar = null;
        }
    };
    ItemIntroducebar.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    ItemIntroducebar.prototype.onRefresh = function () {
        this.onShowTips();
    };
    ItemIntroducebar.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.tips_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    };
    ItemIntroducebar.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.tips_mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    };
    ItemIntroducebar.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.onHideTips();
    };
    return ItemIntroducebar;
}(BaseWindowPanel));
__reflect(ItemIntroducebar.prototype, "ItemIntroducebar");
var IntroduceBarParam = (function () {
    function IntroduceBarParam(location, data) {
        this.location = 0;
        this.location = location;
        this.data = data;
    }
    return IntroduceBarParam;
}());
__reflect(IntroduceBarParam.prototype, "IntroduceBarParam");
var INTRODUCE_TYPE;
(function (INTRODUCE_TYPE) {
    INTRODUCE_TYPE[INTRODUCE_TYPE["SHOP"] = 0] = "SHOP";
    INTRODUCE_TYPE[INTRODUCE_TYPE["FIELDGUIDE"] = 1] = "FIELDGUIDE"; //图鉴
})(INTRODUCE_TYPE || (INTRODUCE_TYPE = {}));
//# sourceMappingURL=ItemIntroducebar.js.map