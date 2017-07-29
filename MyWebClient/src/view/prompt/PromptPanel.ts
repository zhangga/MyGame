/**
 * 提示面板
 */
class PromptPanel extends egret.DisplayObjectContainer {

	private static _promptPanel: PromptPanel;

	public static getInstance(): PromptPanel {
		if (!this._promptPanel) {
			this._promptPanel = new PromptPanel();
		}
		return this._promptPanel;
	}

	private _infoArray1: Array<PromptInfo> = new Array<PromptInfo>();
	private _newestPromp1: PromptInfo = null;
	private _infoArray2: Array<PromptInfo> = new Array<PromptInfo>();
	private _newestPromp2: PromptInfo = null;

	private _noviceGuidePanel: NoviceGuidePanel;
	public guideIsShow: boolean = true;

	public constructor() {
		super();
		this._onMoveTxtAry1 = [];
		this._onMoveTxtAry2 = [];
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event: egret.Event): void {
		// this.addChild(this._noviceGuidePanel);
		// GameDispatcher.getInstance().addEventListener(GameEvent.PLAYER_POWER_UPDATE, this.fightingAnimShow, this);
	}

	private _onMoveTxtAry1: PromptInfo[];
	private _onMoveTxtAry2: PromptInfo[];
	private targetY2: number = 5;
	private targetY1: number = 5;
	private onEnterFrame(e: egret.Event): void {
		if (this._infoArray1.length > 0) {
			if (this._newestPromp1 == null || this._newestPromp1.y < 950 - this._newestPromp1.height) {
				this._newestPromp1 = this._infoArray1.shift();
				this.addPrompTxtToStage(this._newestPromp1);
			}
		}
		for (var i: number = this._onMoveTxtAry1.length - 1; i >= 0; i--) {
			var _promptBody1: PromptInfo = this._onMoveTxtAry1[i];
			if (_promptBody1.proboodate == false) {
				if (this._newestPromp1 == _promptBody1)
					this._newestPromp1 = null;
				_promptBody1.onRemove();
				_promptBody1 = null;
				this._onMoveTxtAry1.splice(i, 1);
			} else {
				if (this._onMoveTxtAry1[i + 1]) {
					if (this._onMoveTxtAry1[i].y > this._onMoveTxtAry1[i + 1].y - (this._onMoveTxtAry1[i + 1].height)) {
						this._onMoveTxtAry1[i].y -= 10;
					}
				}

				if (_promptBody1.y >= 530) {
					_promptBody1.y -= _promptBody1.speed;
				} else {
					_promptBody1.y -= Number(0);
				}
			}
		}
		if (this._infoArray2.length > 0) {
			if (this._newestPromp2 == null || this._newestPromp2.y < 950) {
				this._newestPromp2 = this._infoArray2.shift();
				this.addPrompTxtToStage(this._newestPromp2);
			}
		}
		for (var i: number = this._onMoveTxtAry2.length - 1; i >= 0; i--) {
			var _promptBody2: PromptInfo = this._onMoveTxtAry2[i];
			if (_promptBody2.proboodate == false) {
				if (this._newestPromp2 == _promptBody2)
					this._newestPromp2 = null;
				_promptBody2.onRemove();
				_promptBody2 = null;
				this._onMoveTxtAry2.splice(i, 1);
			} else {
				if (this._onMoveTxtAry2[i + 1]) {
					if (this._onMoveTxtAry2[i].y > this._onMoveTxtAry2[i + 1].y - (this._onMoveTxtAry2[i + 1].height)) {
						this._onMoveTxtAry2[i].y -= 10;
					}
				}
				if (_promptBody2.y >= 530) {
					_promptBody2.y -= _promptBody2.speed;
				} else {
					_promptBody2.y -= Number(0);
				}
			}
		}
	}

	public addPromptError(text: string, isNotDuplicate: boolean = true) {
		if (isNotDuplicate) {
			if (this._infoArray1.length > 0 && this._infoArray1[this._infoArray1.length - 1].getText() == text) {
				return;
			}
		}
		var promptInfo: PromptInfo = new PromptInfo(PROMPT_TYPE.ERROR);
		promptInfo.setText(text);
		this._infoArray2.push(promptInfo);
	}

	public addPromptFun(text: string) {
		var promptInfo: PromptInfo = new PromptInfo(PROMPT_TYPE.FUN);
		promptInfo.setText(text);
		this._infoArray1.push(promptInfo);
	}

	public addPromptGain(text: Array<egret.ITextElement>) {
		var promptInfo: PromptInfo = new PromptInfo(PROMPT_TYPE.GAIN);
		promptInfo.setTextFlow(text);
		this._infoArray1.push(promptInfo);
	}

	public addPromptCustom(text: Array<egret.ITextElement>) {
		var promptInfo: PromptInfo = new PromptInfo(PROMPT_TYPE.CUSTOM);
		promptInfo.setTextFlow(text);
		this._infoArray1.push(promptInfo);
	}

	private addPrompTxtToStage(promptInfo: PromptInfo): void {

		this.addChild(promptInfo);
		if (promptInfo.type == PROMPT_TYPE.CUSTOM || promptInfo.type == PROMPT_TYPE.FUN) {
			this._onMoveTxtAry2.push(promptInfo);
			promptInfo.x = 300;
			promptInfo.y = 550;
		} else {
			this._onMoveTxtAry1.push(promptInfo);
			promptInfo.x = 300;
			promptInfo.y = 550;//-this._onMoveTxtAry1[this._onMoveTxtAry1.length-1].y
		}
	}

	//新手引导
	public get guidePanel(): NoviceGuidePanel {
		if (!this._noviceGuidePanel) {
			this._noviceGuidePanel = new NoviceGuidePanel();
		}
		return this._noviceGuidePanel;
	}
}

enum PROMPT_TYPE {
	ERROR,
	FUN,
	GAIN,
	CUSTOM,
}