var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelMonthCard = (function (_super) {
    __extends(ModelMonthCard, _super);
    function ModelMonthCard() {
        return _super.call(this) || this;
    }
    ModelMonthCard.prototype.parseXML = function (result) {
        _super.prototype.parseXML.call(this, result);
        this.id = this.getXmlValueNumber(result, "id");
        this.name = this.getXmlValue(result, "name");
        this.rewards = this.getXmlValue(result, "rewards");
        this.keepDay = this.getXmlValueNumber(result, "keepDay");
        this.diejia = this.getXmlValueNumber(result, "diejia") == 1;
        this.effect = this.getXmlValueNumber(result, "effect");
    };
    return ModelMonthCard;
}(ModelBase));
__reflect(ModelMonthCard.prototype, "ModelMonthCard");
//# sourceMappingURL=ModelMonthCard.js.map