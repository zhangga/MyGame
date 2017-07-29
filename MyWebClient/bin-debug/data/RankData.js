var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RankData = (function () {
    function RankData(rank, value) {
        this._rank = 0;
        var vs = value.split(":");
        if (vs.length < 4)
            return;
        this._rank = rank;
        this._id = parseInt(vs[0]);
        this._name = vs[1];
        this._head = vs[2];
        this._value = vs[3];
    }
    Object.defineProperty(RankData.prototype, "rank", {
        get: function () {
            return this._rank;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RankData.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RankData.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RankData.prototype, "head", {
        get: function () {
            return this._head;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RankData.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    return RankData;
}());
__reflect(RankData.prototype, "RankData");
//# sourceMappingURL=RankData.js.map