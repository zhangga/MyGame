var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 飘动提示
 *
 *
 * **/
var FlutterHint = (function (_super) {
    __extends(FlutterHint, _super);
    function FlutterHint() {
        var _this = _super.call(this) || this;
        _this.value = 0;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        _this.skinName = skins.FlutterHintSkin;
        return _this;
    }
    FlutterHint.prototype.onLoadComplete = function () {
        this.onInit();
    };
    Object.defineProperty(FlutterHint.prototype, "data", {
        set: function (param) {
            this._data = param;
            this.onInit();
        },
        enumerable: true,
        configurable: true
    });
    FlutterHint.prototype.onInit = function () {
        if (!this._data)
            return;
        switch (this._data.type) {
            case GOODS_TYPE.EXP:
                this.img_icon.source = "icon_hint_exp_png";
                break;
            case GOODS_TYPE.GOLD:
                this.img_icon.source = "icon_hint_gold_png";
                break;
            case GOODS_TYPE.GEM:
                var model = ModelManager.instance.modelItem[this._data.id];
                this.img_icon.source = "icon_hint_gem" + model.icon + "_png";
                break;
        }
        var value = this._data.num;
        this.bmLab_add.text = "+" + UnitDefine.getTrueInfinite(value).toTextFormat();
        switch (this._data.type) {
            case GOODS_TYPE.GOLD:
                this.value = UnitDefine.getTrueValue(this._data.num);
                DataManager.instance.playerM.player.addGoldAndUpgrade(this.value);
                break;
        }
    };
    FlutterHint.prototype.onDestory = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return FlutterHint;
}(eui.Component));
__reflect(FlutterHint.prototype, "FlutterHint", ["IModule"]);
//# sourceMappingURL=FlutterHint.js.map