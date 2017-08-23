var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GraphicsUtils = (function (_super) {
    __extends(GraphicsUtils, _super);
    function GraphicsUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphicsUtils.fillRect = function (g, color, alpha, x, y, w, h) {
        g.beginFill(color, alpha);
        g.drawRect(x, y, w, h);
        g.endFill();
    };
    return GraphicsUtils;
}(egret.HashObject));
__reflect(GraphicsUtils.prototype, "GraphicsUtils");
//# sourceMappingURL=GraphicsUtils.js.map