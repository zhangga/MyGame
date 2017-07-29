/**
 * 被拜访的信息
 * 
 * 
 **/
class BeVisitedPlayer {
	public id: number;
	public name: string = "other";
	public sex: number;
	public lv: number;
	public loginTime: number;
	public happiness: number = 0;
	public fishs;
	public book;
	/**神器装饰：K--ID，V--鱼缸ID */
	public decorate_show = {};

	public constructor() {
	}
	public onParseMessage(msg: Message) {
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
		var size: number = msg.getByte();
		for (var i: number = 0; i < size; i++) {
			var id = msg.getShort();
			var tank = msg.getByte();
			this.decorate_show[id] = tank;
		}
	}
	public onParseFishData(msg: Message): void {
		var len = msg.getShort();
		this.fishs = {};
		var fData: FishData;
		for (var i: number = 0; i < len; i++) {
			fData = new FishData();
			fData.onParseMessage(msg);
			this.fishs[fData.id] = fData;
		}
	}
	//鱼缸信息
	public onParseBookData(msg: Message): void {
		this.book = {};
		var len = msg.getByte();
		var fishID: number;
		var tankData: BookData;
		for (var i: number = 0; i < len; i++) {
			tankData = new BookData();
			tankData.onParseMessage(msg);
			this.book[tankData.id] = tankData;
		}
	}
	public getFishByLoction(loc: FISH_POST): FishData[] {
		var ret: FishData[] = [];
		var data: FishData;
		for (var key in this.fishs) {
			data = this.fishs[key];
			ret.push(data);
		}
		return ret;
	}
}