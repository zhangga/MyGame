var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelTechnology = (function (_super) {
    __extends(ModelTechnology, _super);
    function ModelTechnology() {
        return _super.call(this) || this;
    }
    ModelTechnology.prototype.parseXML = function (result) {
        this.tid = this.getXmlValueNumber(result, "id");
        this.type = this.getXmlValueNumber(result, "type");
        this.name = this.getXmlValue(result, "name");
        this.level = this.getXmlValueNumber(result, "lv");
        this.icon = this.getXmlValue(result, "icon");
        this.baifenbi = this.getXmlValueNumber(result, "baifenbi");
        this.cost = ModelAward.onParseByString(this.getXmlValue(result, "cost"));
        this.id = this.tid + "_" + this.level;
    };
    return ModelTechnology;
}(ModelBase));
__reflect(ModelTechnology.prototype, "ModelTechnology");
//# sourceMappingURL=ModelTechnology.js.map