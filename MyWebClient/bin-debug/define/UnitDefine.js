var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UnitDefine = (function () {
    function UnitDefine() {
    }
    UnitDefine.addPercentage = function (value, perc, base_perc) {
        if (base_perc === void 0) { base_perc = UnitDefine.BASE_PERCENTAGE; }
        value = value * perc / base_perc;
        return value;
    };
    UnitDefine.getTrueValue = function (value) {
        var player = DataManager.instance.playerM.player;
        value = this.addPercentage(value, player.happiness_rate);
        value = this.addPercentage(value, player.artifact_rate);
        value = this.addPercentage(value, player.buff_rate);
        return InfiniteNumber.toFixedFormat(value);
    };
    UnitDefine.getTrueInfinite = function (value) {
        if (value instanceof InfiniteNumber) {
            value.num = this.getTrueValue(value.num);
            return value;
        }
        var typeName = typeof (value);
        switch (typeName) {
            case "number":
                value = this.getTrueValue(value);
                return new InfiniteNumber(value);
        }
    };
    return UnitDefine;
}());
UnitDefine.BASE_PERCENTAGE = 10000;
__reflect(UnitDefine.prototype, "UnitDefine");
//# sourceMappingURL=UnitDefine.js.map