class FishTankLayer extends BaseUI {
	private shine: Animation;
	private bubble: Animation;
	private bubble1: Animation;
	private bubble2: Animation;
	private ripple: Animation;
	private animLayer: eui.Group;

	private fishtank_bg_back: eui.Image;
	private fishtank_bg_font: eui.Image;
	private fishtank_dec_1: eui.Image;
	private fishtank_dec_2: eui.Image;
	private fishtank_dec_3: eui.Image;
	public constructor() {
		super();
		this.skinName = skins.FishTankLayerSkin;
	}
	public onAddAnimation(): void {
		this.shine = new Animation("yanggguang");
		this.shine.x = 300;
		this.shine.y = 341;
		this.animLayer.addChild(this.shine);
		this.bubble = new Animation("shuipao", 1);
		this.bubble.x = 240;
		this.bubble.y = 636;
		this.animLayer.addChild(this.bubble);
		this.bubble1 = new Animation("shuipao", 1);
		this.bubble1.x = 445;
		this.bubble1.y = 566;
		this.animLayer.addChild(this.bubble1);
		this.bubble2 = new Animation("shuipao", 1);
		this.bubble2.x = 140;
		this.bubble2.y = 534;
		this.animLayer.addChild(this.bubble2);
		this.ripple = new Animation("shuibowen");
		this.ripple.x = 300;
		this.ripple.y = 120;
		this.animLayer.addChild(this.ripple);
		this.onbubble();
		this.onbubble1();
		this.onbubble2();
	}
	private onbubble(): void {
		this.bubble.playFinishCallBack(this.bubblePlayDone, this);
		this.bubble.visible = true;
		this.bubble.playNum = 1;
	}
	private bubblePlayDone() {
		this.bubble.visible = false;
		var param: number = Tool.rand(2, 3, 1000);
		Tool.callbackTime(this.onbubble, this, param);
	}
	private onbubble1(): void {
		this.bubble1.playFinishCallBack(this.bubble1PlayDone, this);
		this.bubble1.visible = true;
		this.bubble1.playNum = 1;
	}
	private bubble1PlayDone() {
		this.bubble1.visible = false;
		var param: number = Tool.rand(3, 3, 1000);
		Tool.callbackTime(this.onbubble1, this, param);
	}
	private onbubble2(): void {
		this.bubble2.playFinishCallBack(this.bubble2PlayDone, this);
		this.bubble2.visible = true;
		this.bubble2.playNum = 1;
	}
	private bubble2PlayDone() {
		this.bubble2.visible = false;
		var param: number = Tool.rand(4, 3, 1000);
		Tool.callbackTime(this.onbubble2, this, param);
	}

	protected onRegist(): void {
	}
	protected onRemove(): void {
	}

	/**
	 * 刷新显示背景
	 */
	public onRefreshBg(id: number, lv: number): void {
		var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[id + "_" + lv];
		if (!model)
			return;
		var waixingstr: string = model.waixing.slice(0, model.waixing.length - 5);
		this.fishtank_bg_back.source = waixingstr + "1_png";
		this.fishtank_bg_font.source = model.waixing;
	}

	/**
	 * 刷新显示部位
	 */
	public onRefreshPart(tankId: number, decorate_show: {}): void {
		this.fishtank_dec_1.source = "";
		this.fishtank_dec_2.source = "";
		this.fishtank_dec_3.source = "";
		//遍历所有的装饰
		for (var i: number = 1; i <= DECORATE_TYPE.SIZE; i++) {
			var shenqiId: number = decorate_show[tankId + "_" + i];
			var model: ModelDecorate = ModelManager.instance.modelDecorate[shenqiId];
			if (!model)
				continue;
			this[`fishtank_dec_${i}`].source = model.waixing;
		}
	}

	/**
	 * 刷新鱼缸显示
	 */
	public onRefreshShow(id: number, lv: number, decorate_show: {}): void {
		this.onRefreshBg(id, lv);
		this.onRefreshPart(id, decorate_show);
	}

}