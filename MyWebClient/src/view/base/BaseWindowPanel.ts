// TypeScript file
class BaseWindowPanel extends eui.Component {
    public funcID: number = -1;
    public isShow: boolean;
    private onloadComp: boolean;
    protected basic: eui.Component;
    private windowChildNum: number = 0;
    // private closeBtn1: eui.Button;
    // private closeBtn2: eui.Button;
    protected owner: ModuleLayer;
    public windowName: string;
    protected points: RedPoint[] = RedPointManager.createPoint(0);
    public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.I;
    constructor(owner: ModuleLayer) {
        super();
        this.owner = owner;
        this.basic = new eui.Component();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.once(eui.UIEvent.COMPLETE, this.onLoadComplete, this);
    }
    //添加到舞台
    private onAddToStage(): void {
        this.onSkinName();
    }
    //皮肤加载完成
    private onLoadComplete(): void {
        this.onloadComp = true;
        this.onInit();
    }
    //供子类覆盖
    protected onInit(): void {
        // this.anchorOffsetX = 344;
        // this.anchorOffsetY = 550;
        // GameCommon.getInstance().setComponentAllTextFont(this);
        // if (DataManager.IS_PC_Game && this.priority == PANEL_HIERARCHY_TYPE.II) {
        //     var findMask: boolean = GameCommon.getInstance().setWindowMaskSize(this.basic);
        //     if (!findMask) {
        //         GameCommon.getInstance().setWindowMaskSize(this);
        //     }
        // }
        this.onRegist();
    }
    protected onAddedHandler(event: egret.Event): void {
        if (egret.is(event.currentTarget, "egret.DisplayObjectContainer")) {
            this.updateWindowTextFont(event.currentTarget);
        }
    }
    protected onRefresh(): void {
    }
    protected onSkinName(): void {
    }
    public onShow(): void {
        // if (this.funcID != -1 && FunDefine.onIsLockandErrorHint(this.funcID)) return;
        if (this.parentLayer) {
            if (this.onloadComp) {
                if (!this.isShow) {
                    this.onAddToWindowLayer();
                    this.onRegist();
                }

                this.onRefresh();
            } else {
                if (!this.isShow) {
                    this.onAddToWindowLayer();
                }
            }
            this.isShow = true;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.RESET_MASK_CHILD_INDEX, false);
    }
    protected onAddToWindowLayer(): void {
        // this.x = 344;
        // this.y = 550;
        this.bottom = 0;
        this.parentLayer.addChild(this);
        // TweenLiteUtil.openWindowEffect(this);
    }
    // private onUpdateText: boolean;
    private updateWindowTextFont(container: egret.DisplayObjectContainer): void {
        // if (container) {
        //     GameCommon.getInstance().setComponentAllTextFont(container);
        // }
        // if (this.onUpdateText)
        //     return;
        // this.onUpdateText = true;
        // Tool.callbackTime(function () {
        //     GameCommon.getInstance().setComponentAllTextFont(this);
        //     this.onUpdateText=false;
        // }, this, 50);
    }
    public onShowWithParam(param): void {
        this.onShow();
    }
    protected onRegist(): void {
        if (this.basic["btn_back"])
            this.basic["btn_back"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this.basic["btn_back2"])
            this.basic["btn_back2"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this["close_touch_grp"])
            this["close_touch_grp"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.addEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    }
    protected onTouchCloseBtn(): void {
        this.onHide();
    }
    public onHide(): void {
        if (this.parent) {
            this.onRemove();
            this.parent.removeChild(this);
            this.isShow = false;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.RESET_MASK_CHILD_INDEX, false);
    }
    protected onRemove(): void {
        if (this.basic["btn_back"])
            this.basic["btn_back"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this.basic["btn_back2"])
            this.basic["btn_back2"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.removeEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    }
    protected get parentLayer(): egret.DisplayObjectContainer {
        return this.owner.popLayer;
    }
    public setTitle(title: string, isShow: boolean = false, bg: string = ""): void {
        this.basic["panel_title"].source = title;
        if (this.basic["panel_titleBg"]) {
            this.basic["panel_titleBg"].visible = isShow;
            this.basic["panel_titleBg"].source = bg;
        }
    }
    public setBg(bg: string): void {
        this.basic["panel_bg"].source = bg;
    }
    public set backLayerH(h: number) {
        if (this.basic["backLayer"]) {
            this.basic["backLayer"].height = h;
        }
    }
    public setTiltleOffY(offY: number): void {
        this.basic["panel_title"].y += offY;
    }
    public trigger(): void {
        for (var i: number = 0; i < this.points.length; i++) {
            this.points[i].checkPoint();
        }
    }
    //The end
}
//带参数的面板
class WindowParam {
    public windowName;
    public param;
    public constructor(windowName, param) {
        this.windowName = windowName;
        this.param = param;
    }
}
//层级类型
enum PANEL_HIERARCHY_TYPE {
    I = 0,
    II = 1,
}