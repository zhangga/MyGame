var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModelAward = (function () {
    function ModelAward() {
    }
    Object.defineProperty(ModelAward.prototype, "numFormat", {
        get: function () {
            return this._num.toTextFormat();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelAward.prototype, "num", {
        get: function () {
            return this._num.num;
        },
        set: function (param) {
            this._num.num = new InfiniteNumber(param).num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModelAward.prototype, "price", {
        get: function () {
            return this._price.num;
        },
        set: function (param) {
            this._price.num = new InfiniteNumber(param).num;
        },
        enumerable: true,
        configurable: true
    });
    ModelAward.onParseByString = function (type_id_num) {
        var model = new ModelAward();
        var param = type_id_num.split(",");
        if (param.length == 0)
            return model;
        model.type = parseInt(param[0]);
        if (param.length == 1)
            return model;
        model.id = parseInt(param[1]);
        if (param.length == 2)
            return model;
        model._num = new InfiniteNumber(param[2]);
        if (param.length == 3)
            return model;
        model._price = new InfiniteNumber(param[3]);
        return model;
    };
    ModelAward.onParseByParam = function (type, id, num) {
        var model = new ModelAward();
        model.type = type;
        model.id = id;
        model._num = new InfiniteNumber(num);
        return model;
    };
    ModelAward.onParseQueueByString = function (param) {
        var ret = [];
        var awardStrAry;
        if (param.indexOf("#") >= 0) {
            awardStrAry = param.split("#");
        }
        else {
            awardStrAry = param.split(";");
        }
        for (var i = 0; i < awardStrAry.length; i++) {
            ret.push(this.onParseByString(awardStrAry[i]));
        }
        return ret;
    };
    ModelAward.onParseParams = function (params) {
        var param = params.split(",");
        return param;
    };
    ModelAward.prototype.copy = function () {
        return ModelAward.onParseByParam(this.type, this.id, this.num);
    };
    return ModelAward;
}());
__reflect(ModelAward.prototype, "ModelAward");
//# sourceMappingURL=ModelAward.js.map