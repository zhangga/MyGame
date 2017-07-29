var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelBron = (function (_super) {
    __extends(ModelBron, _super);
    function ModelBron() {
        return _super.call(this) || this;
    }
    ModelBron.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.reward = ModelAward.onParseQueueByString(this.getXmlValue(result, "reward"));
    };
    return ModelBron;
}(ModelBase));
__reflect(ModelBron.prototype, "ModelBron");
//# sourceMappingURL=ModelBron.js.map