var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelTurnplate = (function (_super) {
    __extends(ModelTurnplate, _super);
    function ModelTurnplate() {
        return _super.call(this) || this;
    }
    ModelTurnplate.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.effectId = this.getXmlValueNumber(result, "effectId");
        this.icon = this.getXmlValue(result, "icon");
        this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
        this.gailv = this.getXmlValueNumber(result, "gailv");
    };
    return ModelTurnplate;
}(ModelBase));
__reflect(ModelTurnplate.prototype, "ModelTurnplate");
//# sourceMappingURL=ModelTurnplate.js.map