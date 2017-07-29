var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InfiniteNumber = (function () {
    function InfiniteNumber(value) {
        this._num = 0;
        this._num = InfiniteNumber.toFixedFormat(value);
    }
    InfiniteNumber.toFixedFormat = function (value) {
        return Number(value);
    };
    InfiniteNumber.prototype.add = function (value) {
        if (value instanceof InfiniteNumber) {
            this._num += value.num;
        }
        var typeName = typeof (value);
        switch (typeName) {
            case "number":
                this._num += InfiniteNumber.toFixedFormat(value);
                break;
            case "string":
                this._num += InfiniteNumber.toFixedFormat(value);
                break;
        }
        this._num = InfiniteNumber.toFixedFormat(this._num);
        return this;
    };
    InfiniteNumber.prototype.subtract = function (value) {
        if (value instanceof InfiniteNumber) {
            this._num -= value.num;
        }
        var typeName = typeof (value);
        switch (typeName) {
            case "number":
                this._num -= InfiniteNumber.toFixedFormat(value);
                break;
            case "string":
                this._num -= InfiniteNumber.toFixedFormat(value);
                break;
        }
        this._num = InfiniteNumber.toFixedFormat(this._num);
        return this;
    };
    InfiniteNumber.prototype.multiply = function (value) {
        if (value instanceof InfiniteNumber) {
            this._num *= value.num;
        }
        var typeName = typeof (value);
        switch (typeName) {
            case "number":
                this._num *= InfiniteNumber.toFixedFormat(value);
                break;
            case "string":
                this._num *= InfiniteNumber.toFixedFormat(value);
                break;
        }
        this._num = InfiniteNumber.toFixedFormat(this._num);
        return this;
    };
    InfiniteNumber.prototype.divide = function (value) {
        if (value instanceof InfiniteNumber) {
            this._num /= value.num;
        }
        var typeName = typeof (value);
        switch (typeName) {
            case "number":
                this._num /= InfiniteNumber.toFixedFormat(value);
                break;
            case "string":
                this._num /= InfiniteNumber.toFixedFormat(value);
                break;
        }
        this._num = InfiniteNumber.toFixedFormat(this._num);
        return this;
    };
    Object.defineProperty(InfiniteNumber.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (param) {
            this._num = InfiniteNumber.toFixedFormat(param);
        },
        enumerable: true,
        configurable: true
    });
    InfiniteNumber.prototype.toTextFormat = function () {
        return GameCommon.toTextFormat(this._num);
    };
    return InfiniteNumber;
}());
__reflect(InfiniteNumber.prototype, "InfiniteNumber");
//# sourceMappingURL=InfiniteNumber.js.map