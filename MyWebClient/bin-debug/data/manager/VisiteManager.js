var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VisiteManager = (function () {
    function VisiteManager() {
        this.player = new BeVisitedPlayer();
    }
    VisiteManager.prototype.onParseMessage = function (msg) {
        if (!this.player) {
            this.player = new BeVisitedPlayer();
        }
        this.player.onParseMessage(msg);
    };
    VisiteManager.prototype.onSendVisitMessage = function (playerID, type) {
        this.type = type;
        DataManager.instance.friendM.onSendBaifangMsg(playerID);
    };
    VisiteManager.prototype.onSendDoSomeTing = function (playerID, type) {
        var message = new Message(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY);
        message.setByte(type);
        message.setInt(playerID);
        _GF.instance.net.onAddMessage(message);
    };
    VisiteManager.prototype.onParseDoBack = function (msg) {
        var type = msg.getByte();
        this.reward = new InfiniteNumber(msg.getString());
        DataManager.instance.playerM.player.addGoldAndUpgrade(DataManager.instance.visite.reward);
    };
    return VisiteManager;
}());
__reflect(VisiteManager.prototype, "VisiteManager");
//# sourceMappingURL=VisiteManager.js.map