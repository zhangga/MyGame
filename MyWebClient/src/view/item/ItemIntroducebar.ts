class ItemIntroducebar extends BaseWindowPanel {
    private tips_mask: eui.Image;
    private param: IntroduceBarParam;
    public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

    public constructor(owner: ModuleLayer) {
        super(owner);
    }
    protected onSkinName(): void {
        this.skinName = skins.ItemIntroducebarSkin;
    }

    public onShowWithParam(param: IntroduceBarParam): void {
        this.param = param;
        this.onShow();
    }
    public onShow(): void {
        if (this.param) {
            super.onShow();
        }
    }
    /**获取当前的Tips**/
    private _allTipsViews;//所有Tips引用
    private getTipsView(): BaseTipsBar {
        if (!this._allTipsViews)
            this._allTipsViews = {};

        var tipType: number = this.param.location;
        if (this._allTipsViews[tipType]) {
            return this._allTipsViews[tipType];
        }
        switch (tipType) {
            case INTRODUCE_TYPE.SHOP:
                this._allTipsViews[tipType] = new ShopTipsBar(this);
                break;
            case INTRODUCE_TYPE.FIELDGUIDE:
                this._allTipsViews[tipType] = new FieldGuideTipsBar(this);
                break;
        }
        return this._allTipsViews[tipType];
    }
    /**显示Tips 界面处理**/
    private _currTipsBar: BaseTipsBar;
    private onShowTips(): void {
        this.onHideTips();
        this._currTipsBar = this.getTipsView();
        if (this._currTipsBar) {
            this._currTipsBar.onRegist();
            this._currTipsBar.onUpdate(this.param);
            this.addChild(this._currTipsBar);
        }
    }
    /**移除Tips 界面处理**/
    private onHideTips(): void {
        if (this._currTipsBar) {
            this._currTipsBar.onRemove();
            this._currTipsBar = null;
        }
    }
    protected onInit(): void {
        super.onInit();
        this.onRefresh();
    }
    protected onRefresh(): void {
        this.onShowTips();
    }
    protected onRegist(): void {
        super.onRegist();
        this.tips_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    }
    protected onRemove(): void {
        super.onRemove();
        this.tips_mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
    }
    public onHide(): void {
        super.onHide();
        this.onHideTips();
    }
}
class IntroduceBarParam {
    public location: number = 0;
    public data;
    public constructor(location: number, data) {
        this.location = location;
        this.data = data;
    }
}
enum INTRODUCE_TYPE {
    SHOP = 0,//购买物品
    FIELDGUIDE = 1//图鉴
}