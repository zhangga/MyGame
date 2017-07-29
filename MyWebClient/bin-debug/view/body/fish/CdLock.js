var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CdLock = (function () {
    function CdLock(id, cd) {
        this.isCanDo = true;
        this.reset(id, cd);
    }
    CdLock.prototype.reset = function (id, cd) {
        this.id = id;
        this.cd = cd;
        this.getCanDo();
    };
    CdLock.prototype.setCanDo = function (bl) {
        this.isCanDo = bl;
    };
    CdLock.prototype.onRun = function (param) {
        this.isCanDo = true;
        if (this.back) {
        }
    };
    CdLock.prototype.getCanDo = function (param) {
        if (param === void 0) { param = null; }
        var ret = this.isCanDo;
        if (this.isCanDo) {
            this.isCanDo = false;
            setTimeout(this.onRun.bind(this), this.cd, param);
        }
        return ret;
    };
    CdLock.prototype.initGame = function (cb, thisObj) {
        cb.bind(thisObj)();
    };
    return CdLock;
}());
__reflect(CdLock.prototype, "CdLock");
//# sourceMappingURL=CdLock.js.map