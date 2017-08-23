var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author	lzn
 * 正弦曲线
 *
 */
var SineBase = (function () {
    function SineBase(cycleCall, crest, xoff, yoff) {
        if (cycleCall === void 0) { cycleCall = 100; }
        if (crest === void 0) { crest = 15; }
        if (xoff === void 0) { xoff = 0; }
        if (yoff === void 0) { yoff = 0; }
        this.kfire = 0; //y轴偏移量
        this.Afire = 15; //峰值
        this.wfire = 1;
        this.time = 100;
        this.n = 0;
        this.speed = 0;
        this.xfire = 0;
        this.nfire = 0; //x轴偏移量
        this.onInitParam(cycleCall, crest, xoff, yoff);
    }
    /**
     *
     * @author	lzn
     * 正弦曲线初始化参数函数
     *
     */
    SineBase.prototype.onInitParam = function (cycleCall, crest, xoff, yoff) {
        if (cycleCall === void 0) { cycleCall = 100; }
        if (crest === void 0) { crest = 15; }
        if (xoff === void 0) { xoff = 0; }
        if (yoff === void 0) { yoff = 0; }
        this.nfire = xoff;
        this.kfire = yoff;
        this.Afire = crest;
        this.time = cycleCall;
        this.speed = Math.PI * 2 / this.time;
    };
    SineBase.prototype.flotage = function () {
        this.yfire = this.Afire * Math.sin(this.wfire * this.xfire + this.nfire) + this.kfire;
        this.xfire += this.speed;
        this.n += 1;
        if (this.n >= this.time) {
            this.n = 0;
            this.xfire = 0;
        }
        return this.yfire;
    };
    return SineBase;
}());
__reflect(SineBase.prototype, "SineBase");
//# sourceMappingURL=SineBase.js.map