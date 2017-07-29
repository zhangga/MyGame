var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SimplePlayer = (function () {
    function SimplePlayer() {
        this.avatarUrl = ""; //头像的URL
        //非必须
        this._rankNum = 0; //排行名次
        this.reviceGift = 0; //收到鱼食的数量
    }
    /**普通玩家数据解析**/
    SimplePlayer.prototype.parsePlayer = function (msg) {
        this.id = msg.getInt();
        if (this.id >= 0) {
            this.name = msg.getString();
            this.sex = msg.getByte();
            this.money = new InfiniteNumber(msg.getString());
            this.avatarUrl = msg.getString();
        }
    };
    Object.defineProperty(SimplePlayer.prototype, "rankNum", {
        get: function () {
            return this._rankNum;
        },
        set: function (value) {
            this._rankNum = Math.max(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    return SimplePlayer;
}());
__reflect(SimplePlayer.prototype, "SimplePlayer");
//# sourceMappingURL=SimplePlayer.js.map