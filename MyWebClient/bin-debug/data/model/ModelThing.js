var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ModelThing = (function (_super) {
    __extends(ModelThing, _super);
    function ModelThing() {
        return _super.call(this) || this;
    }
    ModelThing.prototype.parseXML = function (result) {
        this.id = this.getXmlValueNumber(result, "id");
        this.name = this.getXmlValue(result, "name");
        this.icon = this.getXmlValue(result, "icon");
        this.dropicon = this.getXmlValue(result, "Dropicon");
        this.quality = this.getXmlValueNumber(result, "quality") ? this.getXmlValueNumber(result, "quality") : 0;
        this.level = this.getXmlValueNumber(result, "level");
        // this.type = this.getXmlValueNumber(result, "type");
        this.des = this.getXmlValue(result, "des");
        this.price = this.getXmlValue(result, "price");
        this.useful = this.getXmlValueNumber(result, "useful");
        this.gotype = this.getXmlValueNumber(result, "gotype");
        this.tujing = this.getXmlValue(result, "tujing");
    };
    return ModelThing;
}(ModelBase));
__reflect(ModelThing.prototype, "ModelThing");
var GoodsQuality;
(function (GoodsQuality) {
    /** 物品品质 */
    GoodsQuality[GoodsQuality["White"] = 0] = "White";
    GoodsQuality[GoodsQuality["Green"] = 1] = "Green";
    GoodsQuality[GoodsQuality["Blue"] = 2] = "Blue";
    GoodsQuality[GoodsQuality["Purple"] = 3] = "Purple";
    GoodsQuality[GoodsQuality["Orange"] = 4] = "Orange";
    GoodsQuality[GoodsQuality["Red"] = 5] = "Red";
})(GoodsQuality || (GoodsQuality = {}));
//# sourceMappingURL=ModelThing.js.map