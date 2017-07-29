class DecorateGashaponPanel extends BaseWindowPanel {

    public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

    private btn_close: eui.Button;
    private btn_artifact: eui.Group;
    private btn_diamond: eui.Group;

    private label_artifact: eui.Label;
    private label_diamond: eui.Label;
    private anim_zhuan: eui.Group;
    private anim_guang: eui.Group;
    private dans: eui.Group;
    private dan: eui.Image;

    public static COST_ARTIFACT: number = 100;
    public static COST_DIAMOND: number = 500;

    public constructor(owner) {
		super(owner);
	}

    protected onSkinName(): void {
		this.skinName = skins.DecorateGashaponSkin;
	}

    protected onInit(): void {
		super.onInit();
        this.dan.visible = true;
		this.dan.source = "dan"+GameCommon.instance.getRangedRandom(1, 7)+"_png";
		this.onRefresh();
	}

    protected onRegist(): void {
		super.onRegist();
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		this.btn_artifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponArtifact, this);
		this.btn_diamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponDiamond, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onGashapon, this);
	}

	protected onRemove(): void {
		super.onRemove();
		this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		this.btn_artifact.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponArtifact, this);
		this.btn_diamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponDiamond, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onGashapon, this);
	}

	protected onRefresh(): void {
		super.onRefresh();
        var player: Player = DataManager.instance.playerM.player;
        var diamond: number = player.diamond;
        var artifact: number = player.artifact;
        this.label_artifact.text = artifact+"/"+DecorateGashaponPanel.COST_ARTIFACT;
        if (artifact < DecorateGashaponPanel.COST_ARTIFACT) {
            this.label_artifact.textColor = 0xFF0000;
        } else {
             this.label_artifact.textColor = 0xFFFFFF;
        }
        this.label_diamond.text = diamond+"/"+DecorateGashaponPanel.COST_DIAMOND;
        if (diamond < DecorateGashaponPanel.COST_DIAMOND) {
            this.label_diamond.textColor = 0xFF0000;
        } else {
             this.label_diamond.textColor = 0xFFFFFF;
        }
	}

    /**
     * 神器点抽奖
     */
    private onGashaponArtifact(): void {
        if (DataManager.instance.playerM.player.artifact < DecorateGashaponPanel.COST_ARTIFACT) {
            GameCommon.instance.addAlertError(20);
            return;
        }
        //本地扣除神器点
        DataManager.instance.playerM.player.addArtifact(-DecorateGashaponPanel.COST_ARTIFACT);
        this.onRefresh();
        this.onPlayGashaponAnim();
        DataManager.instance.decorate.sendGashaponMsg(0);
    }

    /**
     * 钻石抽奖
     */
    private onGashaponDiamond(): void {
        if (DataManager.instance.playerM.player.diamond < DecorateGashaponPanel.COST_DIAMOND) {
            GameCommon.instance.addAlertError(4);
            return;
        }
        //本地扣除钻石
        DataManager.instance.playerM.player.addDiamond(-DecorateGashaponPanel.COST_DIAMOND);
        this.onRefresh();
        this.onPlayGashaponAnim();
        DataManager.instance.decorate.sendGashaponMsg(1);
    }

    /**
     * 播放扭蛋机动画
     */
    private onPlayGashaponAnim() {
        this.dans.visible = false;
        this.dan.visible = false;
        var animation = GameCommon.instance.addAnimation(this.anim_zhuan, "niudan", new egret.Point(0, 0), 1, true);
        animation.playFinishCallBack(this.onPlayEndZhuanAnim, this);
    }
    /**
     * 扭蛋机动画播放结束
     */
    private onPlayEndZhuanAnim() {
        this.dans.visible = true;
        this.dan.visible = true;
        this.dan.source = "dan"+GameCommon.instance.getRangedRandom(1, 7)+"_png";
        var animation = GameCommon.instance.addAnimation(this.anim_guang, "guang", new egret.Point(0, 0), 1, true);
        animation.playFinishCallBack(this.onPlayEndGuangAnim, this);
    }
    /**
     * 光动画播放结束
     */
    private onPlayEndGuangAnim() {
        var rewards = DataManager.instance.decorate.gashaponRewards;
        if (!rewards || rewards.length < 1)
            return;
        var model: ModelDecorate = ModelManager.instance.modelDecorate[rewards[0]];
        if (!model)
            return;
        //显示获得物品面板
        var alertParam: AlertHintParam = new AlertHintParam(0, Language.instance.getDescByKey("gashapon_reward", model.name), 
            ModelAward.onParseByParam(GOODS_TYPE.DECORATE, model.id, 1));
        var windowParam: WindowParam = new WindowParam("AlertHint", alertParam);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, windowParam);
    }

    private onGashapon(): void {
        // this.onPlayGashaponAnim();
    }

}