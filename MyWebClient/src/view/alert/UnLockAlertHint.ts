class UnLockAlertHint extends BaseWindowPanel {
    private btn_back: eui.Button;
    private name_label: eui.Label;
    private share_btn: eui.Button;
    private anim_grp: eui.Group;
    private back_anim_grp: eui.Group;
    private unlock_title_img: eui.Image;
    private param: UnlockHintParam;
    private fishLayer: eui.Group;
    public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
    public constructor(owner) {
        super(owner);
    }
    protected onSkinName(): void {
        this.skinName = skins.UnLockAlerttHintSkin;
    }
    protected onInit(): void {
        super.onInit();
        this.onRefresh();
    }
    protected onRegist(): void {
        super.onRegist();
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShareBtn, this);
    }
    protected onRemove(): void {
        super.onRemove();
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.share_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShareBtn, this);
    }
    public onShowWithParam(param: AlertHintParam): void {
        this.param = param;
        this.onShow();
    }
    protected onRefresh(): void {
        this.back_anim_grp.removeChildren();
        var f: EnjoyFish;
        for (var i: number = this.fishLayer.numChildren - 1; i >= 0; i--) {
            f = this.fishLayer.getChildAt(i) as EnjoyFish;
            f.onDestory();
        }
        var model: ModelFish;
        var param: UnlockHintParam = DataManager.instance.fieldGuide.fgHitRecord[0];
        this.unlock_title_img.source = `unlock_hint_title${param.type}_png`;
        switch (param.award.type) {
            case GOODS_TYPE.FISH:
                model = ModelManager.instance.modelFish[param.award.id];
                GameCommon.instance.addAnimation(this.back_anim_grp, "jiesuoguanghuan", new egret.Point(0, 0));
                var fData = new FishData();
                fData.setParam(model.id, 1);
                GameCommon.instance.addAnimation(this.back_anim_grp, fData.moveRes, new egret.Point(0, 0));
                this.name_label.text = Language.instance.getDescByKey(model.name);
                Tool.callbackTime(function (model) {
                    if (model.id == 5002 && PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.OPENSHARE) {
                        PromptPanel.getInstance().guidePanel.showGuide(this.share_btn);
                    }
                }, this, 500, model);
                break;
        }
    }
    protected onTouchCloseBtn(): void {
        DataManager.instance.fieldGuide.fgHitRecord.shift();
        if (DataManager.instance.fieldGuide.fgHitRecord.length > 0) {
            this.onRefresh();
        } else {
            this.onHide();
        }
    }
    public onHide(): void {
        super.onHide();
        this.onCheckGuide();
    }
    private onTouchShareBtn(): void {
        SDKManager.share(new SDKShareContainer());
        this.onTouchCloseBtn();
    }
    private onCheckGuide(): void {
        if (PromptPanel.getInstance().guideIsShow) {
            Tool.callbackTime(function () {
                if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.TURNPLATE) {
                    var btn: egret.DisplayObject = new egret.DisplayObject();
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event: egret.Event) {
                        var btn: egret.DisplayObject = event.currentTarget;
                        btn = null;
                        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TurnplatePanel");
                    }, this);
                    PromptPanel.getInstance().guidePanel.showGuide(btn);
                }
            }, this, 500);
        }
    }
}
class UnlockHintParam {
    public type: UNLOCK_HINT_TYPE;
    public award: ModelAward;

    public constructor(type, award) {
        this.type = type;
        this.award = award;
    }
}
enum UNLOCK_HINT_TYPE {
    CROWN = 1,//解锁皇冠
    NEWFISH = 2,//解锁新鱼类
}
