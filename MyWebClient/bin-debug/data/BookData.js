var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BookData = (function () {
    function BookData(id) {
        this.level = 0;
        this.id = id;
    }
    BookData.prototype.onParseMessage = function (msg) {
        this.id = msg.getByte();
        this.level = msg.getByte();
    };
    Object.defineProperty(BookData.prototype, "key", {
        get: function () {
            return this.id + "_" + this.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookData.prototype, "nextKey", {
        get: function () {
            return this.id + "_" + (this.level + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookData.prototype, "model", {
        get: function () {
            return ModelManager.instance.modelFieldGuide[this.key];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookData.prototype, "nextModel", {
        get: function () {
            return ModelManager.instance.modelFieldGuide[this.nextKey];
        },
        enumerable: true,
        configurable: true
    });
    return BookData;
}());
__reflect(BookData.prototype, "BookData");
//# sourceMappingURL=BookData.js.map