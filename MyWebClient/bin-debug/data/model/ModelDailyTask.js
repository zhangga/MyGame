var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModelDailyTask = (function (_super) {
    __extends(ModelDailyTask, _super);
    function ModelDailyTask() {
        return _super.call(this) || this;
    }
    ModelDailyTask.prototype.parseXML = function (result) {
        this.id = this.getXmlValueNumber(result, "id");
        this.icon = this.getXmlValue(result, "icon");
        this.goType = this.getXmlValueNumber(result, "goType");
        this.name = this.getXmlValue(result, "name");
        this.count = this.getXmlValueNumber(result, "count");
        this.effectId = this.getXmlValueNumber(result, "reward");
    };
    return ModelDailyTask;
}(ModelBase));
__reflect(ModelDailyTask.prototype, "ModelDailyTask");
//# sourceMappingURL=ModelDailyTask.js.map