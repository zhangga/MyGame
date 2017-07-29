var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EnjoyFish = (function (_super) {
    __extends(EnjoyFish, _super);
    function EnjoyFish(id) {
        var _this = _super.call(this, id) || this;
        _this.isEvolution = false;
        return _this;
    }
    EnjoyFish.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.output = new Bubble();
        this.addChild(this.output);
        this.output.visible = false;
        this.direction = this.anim.scaleX;
        this.chageState();
    };
    EnjoyFish.prototype.chageState = function () {
        this.onReSetRes();
    };
    EnjoyFish.prototype.onReSetRes = function () {
    };
    return EnjoyFish;
}(FishBase));
__reflect(EnjoyFish.prototype, "EnjoyFish");
//# sourceMappingURL=EnjoyFish.js.map