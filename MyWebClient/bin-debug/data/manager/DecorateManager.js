var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DecorateManager = (function () {
    function DecorateManager() {
        this.gashaponRewards = [];
    }
    /**发送神器显示改变的消息**/
    DecorateManager.prototype.sendShowChangeMsg = function (id, tank) {
        var msg = new Message(MESSAGE_ID.DECORATE_SHOW_MESSAGE);
        msg.setShort(id);
        msg.setByte(tank);
        _GF.instance.net.onAddMessage(msg);
    };
    DecorateManager.prototype.sendGashaponMsg = function (type) {
        var msg = new Message(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
    };
    /**解析扭蛋机消息**/
    DecorateManager.prototype.onParseGashapon = function (msg) {
        var type = msg.getByte();
        var playerM = DataManager.instance.playerM;
        var player = playerM.player;
        this.gashaponRewards = [];
        var size = msg.getByte();
        for (var i = 0; i < size; i++) {
            var id = msg.getShort();
            var lv = player.decorate_active[id];
            if (!lv)
                lv = 0;
            player.decorate_active[id] = ++lv;
            this.gashaponRewards.push(id);
        }
        //刷新玩家秒产收益
        playerM.updateIncomeEffect(PLAYER_EFFECT.DECORATE);
        playerM.onUpdateSecOutput();
        playerM.showSubtractSecOutput();
    };
    return DecorateManager;
}());
__reflect(DecorateManager.prototype, "DecorateManager");
var DECORATE_TYPE;
(function (DECORATE_TYPE) {
    DECORATE_TYPE[DECORATE_TYPE["TYPE1"] = 1] = "TYPE1";
    DECORATE_TYPE[DECORATE_TYPE["TYPE2"] = 2] = "TYPE2";
    DECORATE_TYPE[DECORATE_TYPE["TYPE3"] = 3] = "TYPE3";
    DECORATE_TYPE[DECORATE_TYPE["SIZE"] = 3] = "SIZE";
})(DECORATE_TYPE || (DECORATE_TYPE = {}));
//# sourceMappingURL=DecorateManager.js.map