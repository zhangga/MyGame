var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelShop = (function (_super) {
    __extends(ModelShop, _super);
    function ModelShop() {
        return _super.call(this) || this;
    }
    ModelShop.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.type = this.getXmlValueNumber(result, "type");
        this.reward = ModelAward.onParseByString(this.getXmlValue(result, "rewrad"));
        this.cosume = ModelAward.onParseQueueByString(this.getXmlValue(result, "cosume"));
    };
    return ModelShop;
}(ModelBase));
__reflect(ModelShop.prototype, "ModelShop");
//# sourceMappingURL=ModelShop.js.map