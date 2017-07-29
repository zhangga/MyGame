var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelDecorate = (function (_super) {
    __extends(ModelDecorate, _super);
    function ModelDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelDecorate.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.name = this.getXmlValue(result, "name");
        this.waixing = this.getXmlValue(result, "waixing");
        this.buwei = this.getXmlValueNumber(result, "buwei");
        this.icon = this.getXmlValue(result, "icon");
        this.pinzhi = this.getXmlValueNumber(result, "pinzhi");
    };
    ModelDecorate.getEffect = function (quality, lv) {
        return ModelDecorate.QUALITY_PERCENT[quality] * lv;
    };
    return ModelDecorate;
}(ModelBase));
ModelDecorate.QUALITY_PERCENT = [100, 200, 500, 1000, 2000];
__reflect(ModelDecorate.prototype, "ModelDecorate");
//# sourceMappingURL=ModelDecorate.js.map