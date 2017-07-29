var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelAchieve = (function (_super) {
    __extends(ModelAchieve, _super);
    function ModelAchieve() {
        return _super.call(this) || this;
    }
    ModelAchieve.prototype.parseXML = function (result) {
        this.id = this.getXmlValueNumber(result, "id");
        this.icon = this.getXmlValue(result, "icon");
        this.goType = this.getXmlValueNumber(result, "goType");
        this.name = this.getXmlValue(result, "name");
        this.start = this.getXmlValueNumber(result, "start");
        this.dist = this.getXmlValueNumber(result, "dist");
        this.end = this.getXmlValueNumber(result, "end");
        this.reward = ModelAward.onParseByString(this.getXmlValue(result, "reward"));
    };
    return ModelAchieve;
}(ModelBase));
__reflect(ModelAchieve.prototype, "ModelAchieve");
//# sourceMappingURL=ModelAchieve.js.map