var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelEffect = (function (_super) {
    __extends(ModelEffect, _super);
    function ModelEffect() {
        return _super.call(this) || this;
    }
    ModelEffect.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.type = this.getXmlValueNumber(result, "type");
        var xmlEffect = ModelAward.onParseParams(this.getXmlValue(result, "effect"));
        this.effect = parseInt(xmlEffect[0]);
        this.time = xmlEffect.length > 0 ? parseInt(xmlEffect[1]) : 0;
        this.desc = this.getXmlValue(result, "desc");
    };
    return ModelEffect;
}(ModelBase));
__reflect(ModelEffect.prototype, "ModelEffect");
//# sourceMappingURL=ModelEffect.js.map