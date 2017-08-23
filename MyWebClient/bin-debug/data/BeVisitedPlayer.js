var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 被拜访的信息
 *
 *
 **/
var BeVisitedPlayer = (function () {
    function BeVisitedPlayer() {
        this.name = "other";
        this.happiness = 0;
        /**神器装饰：K--ID，V--鱼缸ID */
        this.decorate_show = {};
    }
    BeVisitedPlayer.prototype.onParseMessage = function (msg) {
        this.id = msg.getInt();
        this.sex = msg.getByte();
        this.name = msg.getString();
        this.lv = msg.getShort();
        this.loginTime = msg.getInt();
        this.happiness = msg.getInt();
        this.onParseBookData(msg);
        this.onParseFishData(msg);
        //鱼塘背景、装饰
        this.decorate_show = {};
        var size = msg.getByte();
        for (var i = 0; i < size; i++) {
            var id = msg.getShort();
            var tank = msg.getByte();
            this.decorate_show[id] = tank;
        }
    };
    BeVisitedPlayer.prototype.onParseFishData = function (msg) {
        var len = msg.getShort();
        this.fishs = {};
        var fData;
        for (var i = 0; i < len; i++) {
            fData = new FishData();
            fData.onParseMessage(msg);
            this.fishs[fData.id] = fData;
        }
    };
    //鱼缸信息
    BeVisitedPlayer.prototype.onParseBookData = function (msg) {
        this.book = {};
        var len = msg.getByte();
        var fishID;
        var tankData;
        for (var i = 0; i < len; i++) {
            tankData = new BookData();
            tankData.onParseMessage(msg);
            this.book[tankData.id] = tankData;
        }
    };
    BeVisitedPlayer.prototype.getFishByLoction = function (loc) {
        var ret = [];
        var data;
        for (var key in this.fishs) {
            data = this.fishs[key];
            ret.push(data);
        }
        return ret;
    };
    return BeVisitedPlayer;
}());
__reflect(BeVisitedPlayer.prototype, "BeVisitedPlayer");
//# sourceMappingURL=BeVisitedPlayer.js.map