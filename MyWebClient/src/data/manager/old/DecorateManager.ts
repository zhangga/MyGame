class DecorateManager {

    public gashaponRewards = [];

    public constructor() {

    }

    /**发送神器显示改变的消息**/
    public sendShowChangeMsg(id: number, tank: number): void {
        var msg: Message = new Message(MESSAGE_ID.DECORATE_SHOW_MESSAGE);
        msg.setShort(id);
        msg.setByte(tank);
        _GF.instance.net.onAddMessage(msg);
    }

    public sendGashaponMsg(type: number): void {
        var msg: Message = new Message(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE);
        msg.setByte(type);
        _GF.instance.net.onAddMessage(msg);
    }

    /**解析扭蛋机消息**/
    public onParseGashapon(msg: Message): void {
        var type: number = msg.getByte();
        var playerM: PlayerManager = DataManager.instance.playerM;
        var player: Player = playerM.player;
        this.gashaponRewards = [];
        var size: number = msg.getByte();
        for (var i: number = 0; i < size; i++) {
            var id: number = msg.getShort();
            var lv: number = player.decorate_active[id];
            if (!lv)
                lv = 0;
            player.decorate_active[id] = ++lv;
            this.gashaponRewards.push(id);
        }
        //刷新玩家秒产收益
        playerM.updateIncomeEffect(PLAYER_EFFECT.DECORATE);
        playerM.onUpdateSecOutput();
        playerM.showSubtractSecOutput();

    }
}
enum DECORATE_TYPE {
    TYPE1 = 1,
    TYPE2 = 2,
    TYPE3 = 3,
    SIZE = 3,
}