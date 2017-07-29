class EnemyManager {
	public list: EnemyPlayer[];
	public constructor() {
	}
	public onParseMessage(msg: Message): void {
		this.list = [];
		var len: number = msg.getByte();
		var player: EnemyPlayer;
		for (var i: number = 0; i < len; i++) {
			player = new EnemyPlayer();
			player.onParseMessage(msg);
			this.list.push(player);
		}
	}
	public onSendMessage(): void {
		var msg: Message = new Message(MESSAGE_ID.ENEMY_LIST_MSG);
		_GF.instance.net.onAddMessage(msg);
	}
}
class EnemyPlayer {
	public id: number;
	public name: string = "other";
	public head: string = "";
	public sex: number;
	public type: number;
	public timestamp: number;
	public constructor() {

	}
	public onParseMessage(msg: Message) {
		this.id = msg.getInt();
		this.sex = msg.getByte();
		this.name = msg.getString();
		this.head = msg.getString();
		this.type = msg.getByte();
		this.timestamp = msg.getInt();
	}
}