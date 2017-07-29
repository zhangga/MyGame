var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var _GF = (function () {
    function _GF() {
        this.isDemo = false;
        this.isOpenSound = true;
    }
    Object.defineProperty(_GF, "instance", {
        get: function () {
            if (!this.fun) {
                this.fun = new _GF();
            }
            return this.fun;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF, "stage", {
        get: function () {
            return this._stage;
        },
        set: function (param) {
            this._stage = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF, "stageWidth", {
        get: function () {
            return this._stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF, "stageHeight", {
        get: function () {
            return this._stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF, "centerPos", {
        get: function () {
            return new egret.Point(this.stageWidth / 2, this.stageHeight / 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        set: function (param) {
            this._scene = param;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    _GF.prototype.onInit = function () {
        Language.instance.type = LANGUAGE_TYPE.CN;
        this._net = new HttpManager();
        this.netChanel = NET_CHANNEL.LOGIN;
    };
    Object.defineProperty(_GF.prototype, "net", {
        get: function () {
            return this._net;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_GF.prototype, "netChanel", {
        set: function (param) {
            this._net.chanel = param;
        },
        enumerable: true,
        configurable: true
    });
    return _GF;
}());
_GF._version = "v.0.0.1.170726"; //版本号
__reflect(_GF.prototype, "_GF");
//# sourceMappingURL=_GF.js.map