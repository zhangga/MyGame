var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//地图信息，处理地图逻辑
var MapInfo = (function () {
    function MapInfo() {
        this.MAP_WIDTH = 1200;
        this.MAP_HEIGHT = 2136;
    }
    return MapInfo;
}());
__reflect(MapInfo.prototype, "MapInfo");
//# sourceMappingURL=MapInfo.js.map