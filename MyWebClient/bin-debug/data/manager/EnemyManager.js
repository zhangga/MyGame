var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyManager = (function () {
    function EnemyManager() {
    }
    EnemyManager.prototype.onParseMessage = function (msg) {
        this.list = [];
        var len = msg.getByte();
        var player;
        for (var i = 0; i < len; i++) {
            player = new EnemyPlayer();
            player.onParseMessage(msg);
            this.list.push(player);
        }
    };
    EnemyManager.prototype.onSendMessage = function () {
        var msg = new Message(MESSAGE_ID.ENEMY_LIST_MSG);
        _GF.instance.net.onAddMessage(msg);
    };
    return EnemyManager;
}());
__reflect(EnemyManager.prototype, "EnemyManager");
var EnemyPlayer = (function () {
    function EnemyPlayer() {
        this.name = "other";
        this.head = "";
    }
    EnemyPlayer.prototype.onParseMessage = function (msg) {
        this.id = msg.getInt();
        this.sex = msg.getByte();
        this.name = msg.getString();
        this.head = msg.getString();
        this.type = msg.getByte();
        this.timestamp = msg.getInt();
    };
    return EnemyPlayer;
}());
__reflect(EnemyPlayer.prototype, "EnemyPlayer");
//# sourceMappingURL=EnemyManager.js.map