var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OfflineManager = (function () {
    function OfflineManager() {
        this.has = false;
    }
    OfflineManager.prototype.onParseMessage = function (msg) {
        this.time = msg.getInt();
        var gold = msg.getString();
        this.gold = new InfiniteNumber(gold);
        this.has = true;
    };
    return OfflineManager;
}());
__reflect(OfflineManager.prototype, "OfflineManager");
//# sourceMappingURL=OfflineManager.js.map