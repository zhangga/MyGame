var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelSynthetic = (function (_super) {
    __extends(ModelSynthetic, _super);
    function ModelSynthetic() {
        return _super.call(this) || this;
    }
    ModelSynthetic.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.type = this.getXmlValueNumber(result, "type");
        this.cost = ModelAward.onParseQueueByString(this.getXmlValue(result, "cost"));
        this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
    };
    return ModelSynthetic;
}(ModelBase));
__reflect(ModelSynthetic.prototype, "ModelSynthetic");
//# sourceMappingURL=ModelSynthetic.js.map