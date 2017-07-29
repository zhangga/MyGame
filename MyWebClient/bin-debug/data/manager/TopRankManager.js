var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TopRankManager = (function () {
    function TopRankManager() {
        //排行榜-全部
        this._ranks_all = {};
        //排行榜-好友
        this._ranks_friend = {};
    }
    /**发送排行榜列表消息**/
    TopRankManager.prototype.sendTopRankListMsg = function (all, type) {
        var msg = new Message(MESSAGE_ID.TOPRANK_LIST_MESSAGE);
        msg.setBoolean(all);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
    };
    /**
     * 解析排行榜消息
     */
    TopRankManager.prototype.onParseTopRankListMsg = function (msg) {
        var all = msg.getBoolean();
        var type = msg.getByte();
        var size = msg.getByte();
        var rankList = [];
        for (var i = 0; i < size; i++) {
            var value = msg.getString();
            var data = new RankData(i + 1, value);
            rankList.push(data);
        }
        this.pushRanksByType(all, type, rankList);
    };
    TopRankManager.prototype.pushRanksByType = function (all, type, list) {
        if (all) {
            this._ranks_all[type] = list;
        }
        else {
            this._ranks_friend[type] = list;
        }
    };
    TopRankManager.prototype.getRankListByType = function (all, type) {
        if (all) {
            return this._ranks_all[type];
        }
        else {
            return this._ranks_friend[type];
        }
    };
    return TopRankManager;
}());
__reflect(TopRankManager.prototype, "TopRankManager");
//# sourceMappingURL=TopRankManager.js.map