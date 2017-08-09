var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//地图信息，处理地图逻辑
var MapInfo = (function () {
    function MapInfo() {
        this.MAP_WIDTH = GameDefine.MapRes_Width * 6;
        this.MAP_HEIGHT = GameDefine.MapRes_Height * 6;
    }
    return MapInfo;
}());
__reflect(MapInfo.prototype, "MapInfo");
//# sourceMappingURL=MapInfo.js.map