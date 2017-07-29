class FishBase extends egret.Sprite implements IFish {
	private _move: boolean = false;
	protected _id: number;
	public direction: number = 1;
	private speedType: number;
	private speed: number = 2;
	private moveType: number;
	private moveDir: number = FISH_MOVE_DIR.ROW;
	private angle: number;
	private distance: number[] = [100, 150];
	private targetPos: egret.Point = new egret.Point();
	private time: number;
	private walkNum: number;
	private colNum: number;
	protected anim: Animation;
	private _offX: number;
	private _offY: number;
	private randomColTime: number;
	private tw: egret.Tween;
	protected _data: FishData;
	protected isTurn: boolean = false;
	private isDestroy: boolean = false;
	protected size: number;
	protected fishLayer: eui.Group;
	public constructor(id: number) {
		super();
		this._id = id;
		// this.graphics.beginFill(0xFFFFFF, 1);
		// this.graphics.drawRect(0, 0, 200, 200);
		// this.graphics.endFill();
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	//添加到舞台
	protected onAddToStage(): void {
		this.offX = this.x;
		this.offY = this.y;
	}
	public set data(data: FishData) {
		this._data = data;
		this.onInit();
	}
	public get model(): ModelFish {
		return this._data.model;
	}
	protected onInit() {
		this.width = this.model.size.x;
		this.height = this.model.size.y;
		this.touchChildren = true;
		this.touchEnabled = true;
		this.fishLayer = new eui.Group();
		this.addChild(this.fishLayer);
		this.anim = new Animation(this._data.moveRes);
		this.fishLayer.addChild(this.anim);
		this.model.size
		var max: number = Math.max(this.model.size.x, this.model.size.y);
		this.size = max / 130 * 2;
		this.onResetSize();
	}
	public onResetSize() {
		// var offLv: number = Math.ceil(this._data.model.lvMax / 10);
		// var size = (0.75 + Math.floor((this._data.lv - 1) / offLv) * 0.025) * 0.5;
		// size = Math.min(1, size);
		// this.anim.scaleY = size;
		// this.anim.scaleX = this.anim.scaleX > 0 ? size : -size;
	}
	public get data() {
		return this._data;
	}
	public get id() {
		return this._id;
	}
	private get offY() {
		return this._offY;
	}
	private get offX() {
		return this._offX;
	}
	private set offY(param) {
		if (param < GameDefine.FISHTANK_GAP_TOP) {
			this.y = GameDefine.FISHTANK_GAP_TOP;
			if (this.anim && this.anim.rotation != 0) {
				this.anim.rotation = 0;
			}
		} else if (param > GameDefine.FISHTANK_HEIGHT - GameDefine.FISHTANK_GAP_BOTTON) {
			this.y = GameDefine.FISHTANK_HEIGHT - GameDefine.FISHTANK_GAP_BOTTON;
			if (this.anim && this.anim.rotation != 0) {
				this.anim.rotation = 0;
			}
		} else {
			this.y = param;
		}
		this._offY = param;
	}
	private set offX(param) {
		if (param < GameDefine.FISHTANK_GAP_LEFT + this.width / 2) {
			this.x = GameDefine.FISHTANK_GAP_LEFT + this.width / 2;
		} else if (param > GameDefine.FISHTANK_WIDTH - GameDefine.FISHTANK_GAP_RIGHT) {
			this.x = GameDefine.FISHTANK_WIDTH - GameDefine.FISHTANK_GAP_RIGHT;
		} else {
			this.x = param;
		}
		this._offX = param;
	}
	public onAction() {
		if (this.isDestroy) return;
		if (!this._move) {
			this.onDo();
		}
	}
	public onDestory() {
		this.isDestroy = true;
		if (this.anim) {
			egret.Tween.removeTweens(this.anim);
			this.anim.onDestroy();
			this.anim = null;
		}
		egret.Tween.removeTweens(this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
	public onDo() {
		this._move = true;
		var percent;
		if ((this.x > GameDefine.FISHTANK_WIDTH - GameDefine.FISH_TURN_MARGIN_RIGHT - this.width / 2 && this.direction > 0)
			|| (this.x < GameDefine.FISH_TURN_MARGIN_LEFT + this.width / 2 && this.direction < 0)) {
			this.onTurn();
		} else {
			percent = Math.random() * 1000;
			if (this.walkNum >= 2 && percent < 200) {
				this.onTurn();
			} else {
				if (percent < 600) {
					this.angle = 0;
				}
				this.onMove();
			}
		}
	}
	private onTurn() {
		this.isTurn = true;
		var percent = Math.random() * 10000;
		switch (this.moveDir) {
			case FISH_MOVE_DIR.COL:
				if (this.colNum >= this.randomColTime) {
					this.moveDir = FISH_MOVE_DIR.ROW;
					this.angle = 0;
					this.colNum = 0;
				} else {
					if (percent > 5000) {
						this.moveDir = FISH_MOVE_DIR.ROW;
						this.angle = 0;
						this.colNum = 0;
					} else {
						this.angle = this.angle * -this.direction;
					}
				}
				this.colNum++;
				break;
			case FISH_MOVE_DIR.ROW:
				this.angle = 0;
				if (percent < 3000) {
					this.colNum = 0;
					this.randomColTime = Math.floor(Math.random()) * 5 + 1;
					this.moveDir = FISH_MOVE_DIR.COL;
					if (this.y >= GameDefine.FISHTANK_HEIGHT / 2) {
						this.angle = Math.ceil(this.angle - (30 * Math.random()));
					} else if (this.y <= GameDefine.FISH_TURN_MARGIN_LEFT) {
						this.angle = Math.ceil(this.angle + (30 * Math.random()));
					} else if (this.y >= GameDefine.FISHTANK_HEIGHT - GameDefine.FISH_TURN_MARGIN_LEFT) {
						this.angle = Math.ceil(this.angle - (30 * Math.random()));
					} else {
						this.angle = Math.ceil(this.angle + (30 * Math.random()));
					}
				}
				break;
		}
		this.anim.onUpdateRes(this._data.turnRes, "action", 1);
		this.onTurnBack();
	}
	private onTurnBack() {
		this.tw = egret.Tween.get(this.anim);
		this.tw.to({ rotation: this.angle }, 375, egret.Ease.circOut).call(this.onActionTurnDone, this);
	}

	private onMove() {
		this.moveType = FISH_MOVE_TYPE.LINE;
		var percent = Math.random() * 100;
		if (percent > 25) {
			this.speedType = FISH_MOVE_SPEED.CONSTANT;
		} else {
			this.speedType = FISH_MOVE_SPEED.CHANGE;
		}
		this.onGetTargetPos();
		this.onWalk();
		this.walkNum++;
	}

	private onWalk() {
		this.tw = egret.Tween.get(this);
		switch (this.speedType) {
			case FISH_MOVE_SPEED.CONSTANT:
				this.tw.to({ offX: this.targetPos.x, offY: this.targetPos.y }, this.time).call(this.onActionDone);
				break;
			case FISH_MOVE_SPEED.CHANGE:
				this.tw.to({ offX: this.targetPos.x, offY: this.targetPos.y }, 600, egret.Ease.circOut).call(this.onActionDone);
				break;
		}

	}
	private onActionTurnDone() {
		if (this.isTurn) {
			this.anim.scaleX = -this.anim.scaleX;
			this.anim.onUpdateRes(this._data.moveRes, "action", -1);
			this.isTurn = false;
			this.walkNum = 0;
			this.onActionDone();
		}

	}
	private onActionDone() {
		this._move = false;
		this.direction = 1;
		if (this.anim.scaleX < 0) {
			this.direction = -1;
		}
		this.offX = this.x;
		this.offY = this.y;
	}

	public onGetTargetPos(): void {
		var distance;
		switch (this.speedType) {
			case FISH_MOVE_SPEED.CONSTANT:
				distance = Math.floor(Math.random() * (this.distance[1] - this.distance[0]) + this.distance[0]);
				break;
			case FISH_MOVE_SPEED.CHANGE:
				distance = (this.distance[0]);
				break;
		}
		var point = egret.Point.polar(distance, Math.PI / 180 * this.anim.rotation);
		if (point.y != 0) {
			point.y;
		}
		this.targetPos.x = this.x + Math.floor(point.x) * this.direction;
		this.targetPos.y = this.y + Math.floor(point.y) * this.direction;
		this.time = distance / this.speed * 30;
	}
	//点击鱼捕捉
	public onBeCatch() {
	}
}
enum FISH_MOVE_TYPE {
	LINE = 0,
	ROW = 1
}
enum FISH_MOVE_SPEED {
	CONSTANT = 0,//匀速
	CHANGE = 1//变速
}
enum FISH_MOVE_DIR {
	ROW = 0,//横向
	COL = 1//纵向
}