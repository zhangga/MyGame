var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoodsInstence = (function (_super) {
    __extends(GoodsInstence, _super);
    function GoodsInstence() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.GoodsInstenceSkin;
        return _this;
    }
    GoodsInstence.prototype.onInit = function () {
        this.img_fish.source = this._data.model.icon;
        this.lab_name.text = Language.instance.getDescByKey(this._data.model.name);
    };
    return GoodsInstence;
}(BaseComp));
__reflect(GoodsInstence.prototype, "GoodsInstence");
//# sourceMappingURL=GoodsInstence.js.map