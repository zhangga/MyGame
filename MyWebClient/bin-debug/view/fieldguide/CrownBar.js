var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CrownBar = (function (_super) {
    __extends(CrownBar, _super);
    function CrownBar() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.CrownBarSkin;
        return _this;
    }
    CrownBar.prototype.onInit = function () {
        // this.lab_num.text = `${this._data.crown}/${this._data.model.starMax}`
    };
    return CrownBar;
}(BaseComp));
__reflect(CrownBar.prototype, "CrownBar");
//# sourceMappingURL=CrownBar.js.map