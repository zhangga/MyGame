class BuffManager {
	public addPercent: number = UnitDefine.BASE_PERCENTAGE;
	public totalTime: number;
	public remainTime: number;
	public hasTime: number = 0;
	public hasBuff: boolean = false;
	public currTime: number;
	public constructor() {
	}
	public onParseMessage(msg: Message) {
		this.addPercent = msg.getInt();
		this.addPercent = Math.abs(this.addPercent) * 100;
		this.totalTime = msg.getInt();
		this.remainTime = msg.getInt();
		this.currTime = egret.getTimer();
	}
	public onStart(): void {
		if (this.remainTime > 0) {
			this.hasBuff = true;
			this.hasTime = this.remainTime;
			GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.ADD);
		} else {
			GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.DEL);
		}
	}

	public onTime() {
		if (!this.hasBuff) return;
		var pass: number = Math.max(Math.floor((egret.getTimer() - this.currTime) / 1000), 1);
		this.hasTime = this.remainTime - pass;
		if (this.hasTime < 0) {
			this.hasTime = 0;
		}
		if (pass >= this.remainTime) {
			this.onDelBuff();
		}
	}
	private onDelBuff(): void {
		this.addPercent = UnitDefine.BASE_PERCENTAGE;
		this.remainTime = 0;
		this.hasBuff = false;
		GameDispatcher.instance.dispatcherEventWith(GameEvent.ADD_OR_DEL_BUFF_EVENT, false, Buff_STATE_TYPE.DEL);
	}
}
enum Buff_STATE_TYPE {
	ADD = 0,
	DEL = 1
}