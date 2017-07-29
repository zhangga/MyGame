class OfflineManager {
	public time: number;
	public gold: InfiniteNumber;
	public has: boolean = false;
	public constructor() {
	}
	public onParseMessage(msg: Message) {
		this.time = msg.getInt();
		var gold = msg.getString();
		this.gold = new InfiniteNumber(gold);
		this.has = true;
	}
}