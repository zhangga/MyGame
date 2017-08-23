var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoodsDefine = (function () {
    function GoodsDefine() {
    }
    return GoodsDefine;
}());
__reflect(GoodsDefine.prototype, "GoodsDefine");
var GOODS_TYPE;
(function (GOODS_TYPE) {
    GOODS_TYPE[GOODS_TYPE["GOLD"] = 1] = "GOLD";
    GOODS_TYPE[GOODS_TYPE["DIAMOND"] = 2] = "DIAMOND";
    GOODS_TYPE[GOODS_TYPE["POWER"] = 3] = "POWER";
    GOODS_TYPE[GOODS_TYPE["EXP"] = 4] = "EXP";
    GOODS_TYPE[GOODS_TYPE["FISH"] = 5] = "FISH";
    GOODS_TYPE[GOODS_TYPE["GEM"] = 6] = "GEM";
    GOODS_TYPE[GOODS_TYPE["CROWN"] = 7] = "CROWN";
    GOODS_TYPE[GOODS_TYPE["ARTIFACT"] = 8] = "ARTIFACT";
    GOODS_TYPE[GOODS_TYPE["DECORATE"] = 9] = "DECORATE";
})(GOODS_TYPE || (GOODS_TYPE = {}));
//# sourceMappingURL=GoodsDefine.js.map