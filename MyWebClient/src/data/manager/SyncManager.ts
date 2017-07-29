class SyncManager {
	private isSync: boolean = true;
	private timestamp: number;
	private startTime: number;

	private integrateQue: SyneBase[] = [];
	private sendQue: SyneBase[] = [];

	private time: number = 0;
	private currTime: number;

	public constructor() {
		GameDispatcher.instance.addEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
		this.currTime = egret.getTimer();
	}
	public onParseMessage(msg: Message) {
		this.timestamp = msg.getInt();
		var goldStr: string = msg.getString();
		var secOutPut: string = msg.getString();
		var num = new InfiniteNumber(goldStr);
		if (num.num < DataManager.instance.playerM.player.gold.num && this.isSync) {
			DataManager.instance.playerM.player.gold = num;
		}
		Tool.log("金币总量：" + goldStr + " <-> 本地金币:" + DataManager.instance.playerM.player.gold.num);
		Tool.log("秒产：" + secOutPut);
		this.startTime = egret.getTimer();
	}
	private onStartLottery(): void {
		this.isSync = false;
	}
	public onOpenSync(): void {
		this.isSync = true;
	}
	public onTime() {
		this.time++;
		// Tool.log(this.time);
		// this.onIntegrateQue();
		if (this.time == 5) {//执行同步服务端操作
			this.time = 0;
			this.onSendQue();
		}
		var curr: number = egret.getTimer();
		var pass: number = Math.floor((curr - this.currTime) / 1000);
		if (pass >= 120) {
			MessageErrorManager.instance.errorMsgHandler(MESSAGE_ID.TIMEOUT_MESSAGE);
		}
		this.currTime = curr;
	}
	//整合采集操作
	private onIntegrateQue(): void {
		var msg: SyneBase;
		for (var i: number = 0; i < this.integrateQue.length; i++) {

		}
		this.sendQue.push(msg);
		this.integrateQue = [];
	}

	public onSendQue(): void {
		var len: number = this.sendQue.length;
		var msg: Message = new Message(MESSAGE_ID.GAME_SYNC_MESSAGE);
		msg.setByte(len);
		if (len > 0) {
			for (var i: number = 0; i < len; i++) {
				msg.setByte(this.sendQue[i].type);
				msg.setInt(this.sendQue[i].timestamp);
				this.sendQue[i].onInject(msg);
			}
			this.sendQue = [];
		}
		_GF.instance.net.onAddMessage(msg);
	}
	public onAddMessage(base: SyneBase): void {
		this.sendQue.push(base);
		// if (base.type != SYNC_TYPE.OUTPUTSEC) {
		// 	GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_REDPOINT_TRIGGER, false, new RedPointTrigger(null));
		// }
	}
	public getTimestamp(): number {
		return this.timestamp + Math.floor((egret.getTimer() - this.startTime) / 1000);
	}
}
enum SYNC_TYPE {
	EXCHANGE = 1,
	COLLECT = 2,
	MOVE = 3,
	SELL = 4,
	UPGRADE = 6,
	FIELDGUIDE_BUY = 7,
	FIELDGUIDE_UNLOCK = 8,
	PEACH = 10,
	SMILINGFACE = 11,
	OUTPUTSEC = 13,//秒产
	FISHTANK_ADVANCE = 14,//鱼缸进阶
	FISH_ADVANCE = 15,//突破
}

class SyneBase {
	// byte 1:兑换 2:采集 3:移动 4:出售 6:升级 7:图鉴购买
	public type: number;
	public timestamp: number;
	public itemId: number;
	public num: number;
	public fishID: number;
	public collectType: number;
	public uid: number;
	public pool: number;
	public fgID: number;
	public constructor() {
		this.timestamp = DataManager.instance.syncM.getTimestamp();
	}
	public onInjectExchange(msg: Message): void {
		msg.setInt(this.itemId);
		msg.setInt(this.num);
	}
	public onInjectCollect(msg: Message): void {
		msg.setInt(this.uid);
		msg.setByte(this.collectType);
	}
	public onInjectMove(msg: Message): void {
		msg.setInt(this.uid);
		msg.setByte(this.pool);
	}
	public onInjectSell(msg: Message): void {
		msg.setInt(this.uid);
	}
	public onInjectUpgrade(msg: Message): void {
		msg.setInt(this.uid);
	}
	public onInjectFieldGuideBuy(msg: Message): void {
		msg.setInt(this.fishID);
		msg.setInt(this.num);
	}
	public onInjectUnlockFieldGuide(msg: Message): void {
		msg.setByte(this.fgID);
	}
	public onInjectTouchPeachEvent(msg: Message): void {
		msg.setInt(this.uid);
		msg.setShort(this.num);
	}
	public onInjectTouchSmilingFaceEvent(msg: Message): void {
		msg.setInt(this.uid);
	}
	public onInjectOutPutSec(msg: Message): void {
	}
	public onInjectFishTankAdvance(msg: Message): void {
		msg.setByte(this.fgID);
	}
	public onInjectFishAdvance(msg: Message): void {
		msg.setInt(this.uid);
	}
	public onInject(msg: Message): void {
		switch (this.type) {
			case SYNC_TYPE.EXCHANGE:
				this.onInjectExchange(msg);
				break;
			case SYNC_TYPE.COLLECT:
				this.onInjectCollect(msg);
				break;
			case SYNC_TYPE.MOVE:
				this.onInjectMove(msg);
				break;
			case SYNC_TYPE.SELL:
				this.onInjectSell(msg);
				break;
			case SYNC_TYPE.UPGRADE:
				this.onInjectUpgrade(msg);
				break;
			case SYNC_TYPE.FIELDGUIDE_BUY:
				this.onInjectFieldGuideBuy(msg);
				break;
			case SYNC_TYPE.FIELDGUIDE_UNLOCK:
				this.onInjectUnlockFieldGuide(msg);
				break;
			case SYNC_TYPE.PEACH:
				this.onInjectTouchPeachEvent(msg);
				break;
			case SYNC_TYPE.SMILINGFACE:
				this.onInjectTouchSmilingFaceEvent(msg);
				break;
			case SYNC_TYPE.OUTPUTSEC:
				this.onInjectOutPutSec(msg);
				break;
			case SYNC_TYPE.FISHTANK_ADVANCE:
				this.onInjectFishTankAdvance(msg);
				break;
			case SYNC_TYPE.FISH_ADVANCE:
				this.onInjectFishAdvance(msg);
				break;
		}
	}
}