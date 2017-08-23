var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SecOutputAddAnim = (function (_super) {
    __extends(SecOutputAddAnim, _super);
    function SecOutputAddAnim() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        _this.skinName = skins.SecOutputAddAnimSkin;
        return _this;
    }
    SecOutputAddAnim.prototype.onLoadComplete = function () {
        if (this._data) {
            this.onInit();
        }
    };
    Object.defineProperty(SecOutputAddAnim.prototype, "data", {
        set: function (param) {
            this._data = param;
            this.onInit();
        },
        enumerable: true,
        configurable: true
    });
    SecOutputAddAnim.prototype.onInit = function () {
        this.bmpLab_num.text = this._data.toTextFormat();
    };
    SecOutputAddAnim.prototype.onDestory = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return SecOutputAddAnim;
}(eui.Component));
__reflect(SecOutputAddAnim.prototype, "SecOutputAddAnim", ["IModule"]);
//# sourceMappingURL=SecOutputAddAnim.js.map