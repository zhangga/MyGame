class Fish extends FishBase {
	private outputCD: number = 5000;
	private it: egret.Timer;
	private output: Bubble;
	private event: RandEevent;
	private eventEmoji: RandEevent;
	private isOnInit: boolean = false;
	private isEvolution: boolean = false;
	public outPutType: number = FISH_OUTPUT_TYPE.COMMON;
	public state: number = FISH_STATE.COMMON;
	public param: RandEventParam;
	public outPutNumType: number = 0;
	public touchTime: number = 0;
	public currTime: number;
	private animLayer: eui.Group;
	private randomEventAnim: Animation;
	private emoji: eui.Image;
	private sin: SineBase;
	public constructor(id: number) {
		super(id);
	}
	//添加到舞台
	protected onAddToStage(): void {
		super.onAddToStage();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
	}

	protected onInit() {
		super.onInit();
		this.output = new Bubble();
		this.event = new RandEevent();
		this.eventEmoji = new RandEevent();
		this.addChild(this.output);

		this.animLayer = new eui.Group();
		this.addChild(this.animLayer);

		this.emoji = new eui.Image();
		this.emoji.visible = false;
		// this.emoji.source = `icon_emoji_0_png`;
		this.emoji.anchorOffsetX = 90 / 2;
		this.emoji.anchorOffsetY = 117 / 2;
		this.emoji.y = -this.height / 2 - 20;
		this.addChild(this.emoji);
		this.sin = new SineBase(100, 5);
		this.emoji.scaleX = this.emoji.scaleY = 0.45;

		this.output.visible = false;
		this.direction = this.anim.scaleX;
		this.chageState();

		this.outputCD = this.model.paochanTime * 1000;
		if (this.outPutType == FISH_OUTPUT_TYPE.COMMON) {
			this.onStartOutPutTime();
		}
		this.touchTime = egret.getTimer();
	}

	//开启产出倒计时
	private onStartOutPutTime() {
		if (!this.it) {
			this.it = new egret.Timer(this.outputCD, 1);
			this.it.addEventListener(egret.TimerEvent.TIMER, this.onShowBubble, this);
			this.it.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
		}
		this.it.start();
		this.currTime = egret.getTimer();
	}
	private timerComFunc() {
		// console.log("计时结束");
	}
	//产出气泡和道具
	private onShowBubble(): void {
		this.onPause();
		this.state = FISH_STATE.OUTPUT;
		this.chageState();
		this.output.visible = true;
	}
	private onPause(): void {
		if (this.it) {
			this.it.reset();
			this.it.repeatCount = 1;
		}
	}


	public chageState(): void {
		if (this.isEvolution) {
			this.outPutType = FISH_OUTPUT_TYPE.EVENT;
		} else {
			this.outPutType = FISH_OUTPUT_TYPE.COMMON;
		}
		this.onReSetRes();
	}
	private onReSetRes(): void {
		if (!this.output) return;
		switch (this.outPutType) {
			case FISH_OUTPUT_TYPE.COMMON:
				this.output.onReSetRes("paopao_1", new egret.Point(0, 0), this.size / 2);
				this.onRemRandomEventAnim();
				break;
			case FISH_OUTPUT_TYPE.EVENT:
				var rand: number;
				switch (this.param.type) {
					case RANDOM_EVENT_TYPE.PEACH:
						rand = Tool.rand(1, 3);
						this.output.onReSetRes(`paopao${rand}`, new egret.Point(0, -this.model.size.y / 2 - 66));
						break;
					case RANDOM_EVENT_TYPE.SMILINGFACE:
						rand = Tool.rand(4, 3);
						this.output.onReSetRes(`paopao${rand}`, new egret.Point(0, -this.model.size.y / 2 - 66));
						break;
				}
				Tool.log(rand);
				this.onAddRandomEventAnim();
				this.output.visible = true;
				this.emoji.visible = false;
				this.state = FISH_STATE.OUTPUT;
				break;
		}
	}
	private onAddRandomEventAnim(): void {
		if (!this.randomEventAnim) {
			this.randomEventAnim = new Animation("dianliu1", -1);
			this.randomEventAnim.scaleX = this.randomEventAnim.scaleY = 0.5;
			this.animLayer.addChild(this.randomEventAnim);
		} else {
			this.randomEventAnim.visible = true;
			this.randomEventAnim.onPlay();
		}
	}
	private onRemRandomEventAnim(): void {
		if (this.randomEventAnim) {
			this.randomEventAnim.visible = false;
			this.randomEventAnim.onStop();
		}
	}
	private onPlayTouchTween(): void {
		egret.Tween.get(this.fishLayer).
			to({ scaleX: 0.75, scaleY: 1.25 }, 60, egret.Ease.circOut).
			to({ scaleX: 1, scaleY: 1 }, 60, egret.Ease.circIn).
			call(this.onBreakBubble, this);
	}

	private onBreakBubble(): void {
		var pass: number = Math.floor((egret.getTimer() - this.currTime));
		if (pass >= this.outputCD) {
			this.outPutNumType = 0;
		} else {
			this.outPutNumType = 1;
		}
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_OUT_PUT_EVENT, false, this);
		this.onPause();
		this.state = FISH_STATE.COMMON;
		this.output.visible = false;
		switch (this.outPutType) {
			case FISH_OUTPUT_TYPE.COMMON:
				this.onStartOutPutTime();
				break;
			case FISH_OUTPUT_TYPE.EVENT:
				switch (this.param.type) {
					case RANDOM_EVENT_TYPE.PEACH:
						this.output.visible = true;
						this.state = FISH_STATE.OUTPUT;
						break;
					case RANDOM_EVENT_TYPE.SMILINGFACE://一次性
						this.event.needCheck = true;
						this.output.visible = false;
						break;
				}
				break;
		}
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_TOUCH_EVENT, false, this);
	}

	private onTouchBegin(): void {
		var curr: number = egret.getTimer();
		var pass: number = Math.floor((curr - this.touchTime));
		if (pass < 200) return;
		this.touchTime = curr;
		switch (this.state) {
			case FISH_STATE.OUTPUT:
				this.onPlayTouchTween();
				break;
			case FISH_STATE.COMMON:
				this.onPlayTouchTween();
				break;
		}
	}
	private onTouchShowBubble(): void {
		this.onShowBubble();
	}

	public onAction() {
		super.onAction();
		this.emoji.y = -this.height / 2 - 20 + this.sin.flotage();
	}
	public onTime(): void {
		if (this.isEvolution) {
			if (this.event.check()) {
				this.isEvolution = false;
				this.chageState();
			}
		}
		if (this.eventEmoji.check()) {
			this.emoji.visible = false;
		}
	}
	public onResetSize(): void {
		super.onResetSize();
		this.isEvolution = false;
		this.chageState();
	}

	public onEvolutionHandler(param: RandEventParam): void {
		this.param = param;
		this.isEvolution = true;
		this.chageState();
		if (this.outPutType == FISH_OUTPUT_TYPE.EVENT) {
			switch (this.param.type) {
				case RANDOM_EVENT_TYPE.PEACH:
					this.event.reset(parseInt(param.model.effect[0]));
					break;
				case RANDOM_EVENT_TYPE.SMILINGFACE://一次性
					this.event.reset(-1);
					break;
			}

		} else {
			this.isEvolution = false;
		}
	}
	public onShowEmojiHandler(param: RandEventParam): void {
		if (this.output.visible && this.outPutType == FISH_OUTPUT_TYPE.EVENT) return;
		this.eventEmoji.reset(GameDefine.EMOJI_EVENT_CONTINUE_CD);
		this.emoji.visible = true;
		var rand = Math.floor(Math.random() * 6);
		this.emoji.source = `icon_emoji_${rand}_png`;
	}
	public onShowLevelUp(): void {
		this.onShowLevelUpHint();
	}
	private onShowLevelUpHint(): void {
		GameCommon.instance.addAnimation(this, `yushengji`, new egret.Point(0, 0), 1, true);
	}
	private onDone(e): void {
		var drop = e;
		drop.onDestory();
	}
	public onDestory() {
		if (this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}
		if (this.it) {
			this.it.stop();
			this.it.removeEventListener(egret.TimerEvent.TIMER, this.onShowBubble, this);
			this.it.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
			this.it = null;
		}
		if (this.output) {
			this.output.onDestroy();
			this.output = null;
		}
		super.onDestory();
	}
}
enum FISH_STATE {
	COMMON = 0,//普通状态
	OUTPUT = 1,//满产状态
}
enum FISH_OUTPUT_TYPE {
	COMMON = 0,//普通产出
	EVENT = 2,//随机事件产出
}