var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelFieldGuide = (function (_super) {
    __extends(ModelFieldGuide, _super);
    function ModelFieldGuide() {
        var _this = _super.call(this) || this;
        _this.limit = 500;
        return _this;
    }
    ModelFieldGuide.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.name = this.getXmlValue(result, "name");
        this.waixing = this.getXmlValue(result, "waixing");
        var jieduan = ModelAward.onParseParams(this.getXmlValue(result, "jieduan"));
        this.tier = parseInt(jieduan[0]);
        this.limit = parseInt(jieduan[1]);
        this.tiaojian = this.getXmlValue(result, "tiaojian");
        this.fishId = ModelAward.onParseParams(this.getXmlValue(result, "fishId"));
        this.uid = this.getXmlValue(result, "id");
        this.type = this.getXmlValueNumber(result, "type");
        this.icon = this.getXmlValue(result, "icon");
        this.kejiId = ModelAward.onParseParams(this.getXmlValue(result, "kejiId"));
        this.cost = ModelAward.onParseByString(this.getXmlValue(result, "cost"));
        this.id = this.type + "_" + this.tier;
    };
    return ModelFieldGuide;
}(ModelBase));
__reflect(ModelFieldGuide.prototype, "ModelFieldGuide");
//# sourceMappingURL=ModelFieldGuide.js.map