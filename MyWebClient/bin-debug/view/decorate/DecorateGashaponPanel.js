var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DecorateGashaponPanel = (function (_super) {
    __extends(DecorateGashaponPanel, _super);
    function DecorateGashaponPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    DecorateGashaponPanel.prototype.onSkinName = function () {
        this.skinName = skins.DecorateGashaponSkin;
    };
    DecorateGashaponPanel.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.dan.visible = true;
        this.dan.source = "dan" + GameCommon.instance.getRangedRandom(1, 7) + "_png";
        this.onRefresh();
    };
    DecorateGashaponPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.btn_artifact.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponArtifact, this);
        this.btn_diamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponDiamond, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onGashapon, this);
    };
    DecorateGashaponPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.btn_artifact.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponArtifact, this);
        this.btn_diamond.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGashaponDiamond, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onGashapon, this);
    };
    DecorateGashaponPanel.prototype.onRefresh = function () {
        _super.prototype.onRefresh.call(this);
        var player = DataManager.instance.playerM.player;
        var diamond = player.diamond;
        var artifact = player.artifact;
        this.label_artifact.text = artifact + "/" + DecorateGashaponPanel.COST_ARTIFACT;
        if (artifact < DecorateGashaponPanel.COST_ARTIFACT) {
            this.label_artifact.textColor = 0xFF0000;
        }
        else {
            this.label_artifact.textColor = 0xFFFFFF;
        }
        this.label_diamond.text = diamond + "/" + DecorateGashaponPanel.COST_DIAMOND;
        if (diamond < DecorateGashaponPanel.COST_DIAMOND) {
            this.label_diamond.textColor = 0xFF0000;
        }
        else {
            this.label_diamond.textColor = 0xFFFFFF;
        }
    };
    /**
     * 神器点抽奖
     */
    DecorateGashaponPanel.prototype.onGashaponArtifact = function () {
        if (DataManager.instance.playerM.player.artifact < DecorateGashaponPanel.COST_ARTIFACT) {
            GameCommon.instance.addAlertError(20);
            return;
        }
        //本地扣除神器点
        DataManager.instance.playerM.player.addArtifact(-DecorateGashaponPanel.COST_ARTIFACT);
        this.onRefresh();
        this.onPlayGashaponAnim();
        DataManager.instance.decorate.sendGashaponMsg(0);
    };
    /**
     * 钻石抽奖
     */
    DecorateGashaponPanel.prototype.onGashaponDiamond = function () {
        if (DataManager.instance.playerM.player.diamond < DecorateGashaponPanel.COST_DIAMOND) {
            GameCommon.instance.addAlertError(4);
            return;
        }
        //本地扣除钻石
        DataManager.instance.playerM.player.addDiamond(-DecorateGashaponPanel.COST_DIAMOND);
        this.onRefresh();
        this.onPlayGashaponAnim();
        DataManager.instance.decorate.sendGashaponMsg(1);
    };
    /**
     * 播放扭蛋机动画
     */
    DecorateGashaponPanel.prototype.onPlayGashaponAnim = function () {
        this.dans.visible = false;
        this.dan.visible = false;
        var animation = GameCommon.instance.addAnimation(this.anim_zhuan, "niudan", new egret.Point(0, 0), 1, true);
        animation.playFinishCallBack(this.onPlayEndZhuanAnim, this);
    };
    /**
     * 扭蛋机动画播放结束
     */
    DecorateGashaponPanel.prototype.onPlayEndZhuanAnim = function () {
        this.dans.visible = true;
        this.dan.visible = true;
        this.dan.source = "dan" + GameCommon.instance.getRangedRandom(1, 7) + "_png";
        var animation = GameCommon.instance.addAnimation(this.anim_guang, "guang", new egret.Point(0, 0), 1, true);
        animation.playFinishCallBack(this.onPlayEndGuangAnim, this);
    };
    /**
     * 光动画播放结束
     */
    DecorateGashaponPanel.prototype.onPlayEndGuangAnim = function () {
        var rewards = DataManager.instance.decorate.gashaponRewards;
        if (!rewards || rewards.length < 1)
            return;
        var model = ModelManager.instance.modelDecorate[rewards[0]];
        if (!model)
            return;
        //显示获得物品面板
        var alertParam = new AlertHintParam(0, Language.instance.getDescByKey("gashapon_reward", model.name), ModelAward.onParseByParam(GOODS_TYPE.DECORATE, model.id, 1));
        var windowParam = new WindowParam("AlertHint", alertParam);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, windowParam);
    };
    DecorateGashaponPanel.prototype.onGashapon = function () {
        // this.onPlayGashaponAnim();
    };
    return DecorateGashaponPanel;
}(BaseWindowPanel));
DecorateGashaponPanel.COST_ARTIFACT = 100;
DecorateGashaponPanel.COST_DIAMOND = 500;
__reflect(DecorateGashaponPanel.prototype, "DecorateGashaponPanel");
//# sourceMappingURL=DecorateGashaponPanel.js.map