var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelFishLv = (function (_super) {
    __extends(ModelFishLv, _super);
    function ModelFishLv() {
        return _super.call(this) || this;
    }
    ModelFishLv.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.lv = this.getXmlValueNumber(result, "lv");
        this.commonReward = ModelAward.onParseByString(this.getXmlValue(result, "commonReward"));
        this.bubbleTime = this.getXmlValueNumber(result, "bubbleTime");
        this.bubbleReward = ModelAward.onParseQueueByString(this.getXmlValue(result, "bubbleReward"));
        this.lvConsume = ModelAward.onParseByString(this.getXmlValue(result, "lvConsume"));
        this.id = this.id + "_" + this.lv;
    };
    return ModelFishLv;
}(ModelBase));
__reflect(ModelFishLv.prototype, "ModelFishLv");
//# sourceMappingURL=ModelFishLv.js.map