var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FactoryManager = (function () {
    function FactoryManager() {
    }
    FactoryManager.onBuildFish = function (ids) {
        var len = ids.length;
        var one;
        var ret = [];
        for (var i = 0; i < len; i++) {
            one = this.onBuildFishOne(ids[i]);
            ret.push(one);
        }
        return ret;
    };
    FactoryManager.onBuildFishOne = function (id) {
        var one = new Fish(id);
        return one;
    };
    FactoryManager.onBuildEnjoyFishOne = function (id) {
        var one = new EnjoyFish(id);
        return one;
    };
    return FactoryManager;
}());
__reflect(FactoryManager.prototype, "FactoryManager");
//# sourceMappingURL=FactoryManager.js.map