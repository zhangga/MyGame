class VisiteManager {
	public type: number;
	public player: BeVisitedPlayer;
	public reward: InfiniteNumber;
	public constructor() {
		this.player = new BeVisitedPlayer();
	}

	public onParseMessage(msg: Message) {
		if (!this.player) {
			this.player = new BeVisitedPlayer();
		}
		this.player.onParseMessage(msg);
	}
	public onSendVisitMessage(playerID: number, type: OTHER_BEHAVIOR_TYPE) {
		this.type = type;
		DataManager.instance.friendM.onSendBaifangMsg(playerID);
	}
	public onSendDoSomeTing(playerID: number, type: OTHER_BEHAVIOR_TYPE): void {
		var message: Message = new Message(MESSAGE_ID.PLAYER_TO_DO_SOMEBODY);
		message.setByte(type);
		message.setInt(playerID);
		_GF.instance.net.onAddMessage(message);
	}
	public onParseDoBack(msg: Message) {
		var type:number = msg.getByte();
		this.reward = new InfiniteNumber(msg.getString());
		DataManager.instance.playerM.player.addGoldAndUpgrade(DataManager.instance.visite.reward);
	}
}