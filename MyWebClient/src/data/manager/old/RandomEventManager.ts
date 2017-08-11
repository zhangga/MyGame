class RandomEventManager {
	private randRate: number[];
	private isInit: boolean = false;
	private eventBuff: RandomEventBase;
	private eventEmoji: RandomEventBase;
	public constructor() {
		this.onGetRandEventCD();
	}
	public onGetRandEventCD(): void {
		var model: ModelRandEvent = ModelManager.instance.modelRandEvent[1];
		// GameDefine.RANDOM_EVENT_CD = 10;
		GameDefine.RANDOM_EVENT_CD = model.time;
		var models = ModelManager.instance.modelRandEvent;
		var rate = [];
		this.randRate = [];
		for (var key in models) {
			model = models[key];
			rate.push(model.gailv);
		}
		var n: number = 0;
		for (var i: number = 0; i < rate.length; i++) {
			n = rate[i];
			for (var j: number = 0; j < i; j++) {
				n += rate[j];
			}
			this.randRate.push(n);
		}
		this.eventBuff = new RandomEventBase(GameDefine.RANDOM_EVENT_CD, this.onEeventBuff, this);
		this.eventEmoji = new RandomEventBase(GameDefine.EMOJI_EVENT_CD, this.onEeventEmoji, this);
		this.isInit = true;
	}
	public getScopeIndex(num: number, randRate: number[]): number {
		var index: number = -1;
		var i: number = 0;
		for (; i < randRate.length; i++) {
			if (randRate[i] >= num) {
				index = i;
				break;
			}
		}
		return index;
	}
	public onTime() {
		if (!this.isInit) return;
		this.eventBuff.onTime();
		this.eventEmoji.onTime();
	}
	public onEeventBuff(): void {
		var model: ModelRandEvent;
		var fdata: FishData = DataManager.instance.playerM.player.getRandFishEvolution();
		if (fdata) {
			var index: number = this.getScopeIndex(Tool.rand(1, 10000), this.randRate);
			if (index != -1) {
				model = ModelManager.instance.modelRandEvent[index + 1];
				if (model) {
					GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_EVOLUTION_EVENT, false, new RandEventParam(fdata.id, index, model));
				}
			}
		}
	}
	public onEeventEmoji(): void {
		var rand: number = Math.floor(Math.random() * 2 + 1);
		for (var i: number = 0; i < rand; i++) {
			this.onEeventEmojiByTime();
		}
	}
	public onEeventEmojiByTime(): void {
		var fdata: FishData = DataManager.instance.playerM.player.getRandFishEvolution();
		if (fdata) {
			GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_SHOW_EMOJI_EVENT, false, new RandEventParam(fdata.id, 0, null));
		}
	}
}
class RandEventParam {
	public uid: number;
	public type: number;
	public model: ModelRandEvent;
	public constructor(uid, type, model) {
		this.uid = uid;
		this.type = type;
		this.model = model;
	}
}
class RandomEventBase {
	public startTime: number;
	public CD: number;
	public backFcn: Function;
	public backObj;
	public param;
	public constructor(cd, backFcn, backObj, ...param) {
		this.CD = cd;
		this.backFcn = backFcn;
		this.backObj = backObj;
		this.param = param;
		this.reset();
	}
	public reset(): void {
		this.startTime = egret.getTimer();
	}
	public onTime() {
		var pass: number = Math.max(Math.floor((egret.getTimer() - this.startTime) / 1000), 1);
		if (pass >= this.CD) {
			Tool.callback(this.backFcn, this.backObj, ...this.param)
			this.reset();
		}
	}
}
enum RANDOM_EVENT_TYPE {
	PEACH = 0,
	SMILINGFACE = 1
}