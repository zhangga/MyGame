var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelDecorateLv = (function (_super) {
    __extends(ModelDecorateLv, _super);
    function ModelDecorateLv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelDecorateLv.prototype.parseXML = function (result) {
        this.selfId = this.getXmlValueNumber(result, "id");
        this.lv = this.getXmlValueNumber(result, "lv");
        this.id = this.selfId + "_" + this.lv;
        this.effect = this.getXmlValueNumber(result, "effect");
    };
    return ModelDecorateLv;
}(ModelBase));
__reflect(ModelDecorateLv.prototype, "ModelDecorateLv");
//# sourceMappingURL=ModelDecorateLv.js.map