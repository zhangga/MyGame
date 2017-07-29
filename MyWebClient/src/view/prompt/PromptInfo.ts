/**
 * 提示信息
 */
class PromptInfo extends eui.Component {

	private _type: PROMPT_TYPE;
	private _label: eui.Label = new eui.Label;
	// private _isNext: boolean = false;
	private timer: egret.Timer;
	public boo: boolean = true;
	public speed: number = 5;
	public constructor(type: PROMPT_TYPE) {
		super();
		this._type = type;
		this.touchEnabled = false;
		this.touchChildren = false;
		if (!this.timer) {
			this.timer = new egret.Timer(1500, 1);
		}

		// this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
		this.timer.start();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event: egret.Event): void {
		this.setStyle();
		// this.setAnim();

		this._label.fontFamily = "Microsoft YaHei";
		this._label.size = 26;
		this._label.bold = true;
		// this._label.strokeColor = 0;
		// this._label.stroke = 2;
		// this._label.alpha = 1;
		this._label.anchorOffsetX = this._label.width / 2;
		this._label.anchorOffsetY = this._label.height / 2;
		this.addChild(this._label);
	}

	private setStyle(): void {
		switch (this._type) {
			case PROMPT_TYPE.ERROR:
				this._label.textColor = 0xFFFFFF;
				var bg: eui.Image = new eui.Image();
				bg.y = -this._label.height / 2 - 4;
				bg.source = "public_tipbg_png";
				// bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
				bg.width = this._label.width;
				bg.height = this._label.height + 8;
				bg.anchorOffsetX = bg.width / 2;
				this.addChild(bg);
				break;
			case PROMPT_TYPE.FUN:
				this._label.textColor = 0xFFFECE;
				//this._label.textColor = 0xFF0000;
				var bg: eui.Image = new eui.Image();
				bg.y = -this._label.height / 2 - 4;
				// bg.source = "public_tipbg_png2_png";
				bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
				bg.width = this._label.width;
				bg.height = this._label.height + 8;
				bg.anchorOffsetX = bg.width / 2;
				this.addChild(bg);
				break;
			case PROMPT_TYPE.GAIN:
				//this._label.textColor = 0xFF0000;
				var bg: eui.Image = new eui.Image();
				bg.y = -this._label.height / 2 - 4;
				// bg.source = "public_tipbg_png2_png";
				bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
				bg.width = this._label.width;
				bg.height = this._label.height + 8;
				bg.anchorOffsetX = bg.width / 2;
				this.addChild(bg);
				break;
			case PROMPT_TYPE.CUSTOM:
				//this._label.textColor = 0xFF0000;
				var bg: eui.Image = new eui.Image();
				bg.y = -this._label.height / 2 - 4;
				// bg.source = "public_tipbg_png2_png";
				bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
				bg.width = this._label.width;
				bg.height = this._label.height + 8;
				bg.anchorOffsetX = bg.width / 2;
				this.addChild(bg);
				break;
		}
	}
	public get height(): number {
		return this._label ? this._label.textHeight + 10 : 30;
	}
	private timerComFunc() {
		this.boo = false;
		this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
		this.timer = null;
	}

	public get proboodate() {
		return this.boo;
	}
	public onRemove(): void {
		this.removeChildren();
		this._label = null;
		if (this.parent)
			this.parent.removeChild(this);
	}

	// private onNext(): void {
	// 	this._isNext = true;
	// }

	// public isNext(): boolean {
	// 	return this._isNext;
	// }

	public setText(text: string): void {
		this._label.text = text;
	}

	public getText(): string {
		return this._label.text;
	}

	public setTextFlow(text: Array<egret.ITextElement>): void {
		this._label.textFlow = text;
	}

	public get type(): PROMPT_TYPE {
		return this._type;
	}
}