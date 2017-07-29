var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var ModelBase = (function () {
    function ModelBase() {
    }
    ModelBase.prototype.getXmlValue = function (xml, key) {
        return xml.attributes[key];
    };
    ModelBase.prototype.getXmlValueNumber = function (xml, key) {
        return parseInt(this.getXmlValue(xml, key) ? this.getXmlValue(xml, key) : 0);
    };
    ModelBase.prototype.parseXML = function (result) {
        this.id = this.getXmlValue(result, "id");
    };
    return ModelBase;
}());
__reflect(ModelBase.prototype, "ModelBase");
//# sourceMappingURL=ModelBase.js.map