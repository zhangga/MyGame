var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelItem = (function (_super) {
    __extends(ModelItem, _super);
    function ModelItem() {
        return _super.call(this) || this;
    }
    ModelItem.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.type = this.getXmlValueNumber(result, "type");
        this.name = this.getXmlValue(result, "name");
        this.icon = this.getXmlValue(result, "icon");
    };
    return ModelItem;
}(ModelThing));
__reflect(ModelItem.prototype, "ModelItem");
//# sourceMappingURL=ModelItem.js.map