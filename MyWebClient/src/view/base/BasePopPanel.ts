class BasePopPanel extends eui.Component implements IPop {
    public layerIndex: number;
    public isShow: boolean;
    private onloadComp: boolean;
    protected basic: eui.Component;
    private windowChildNum: number = 0;
    // private closeBtn1: eui.Button;
    // private closeBtn2: eui.Button;
    protected owner: ModuleLayer;
    constructor(owner: ModuleLayer) {
        super();
        this.owner = owner;
        this.basic = new eui.Component();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
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
        // GameCommon.getInstance().setComponentAllTextFont(this);
        // if (DataManager.IS_PC_Game) {
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
        if (this.parentLayer) {
            if (this.onloadComp) {
                this.onAddToWindowLayer();
                this.onRegist();
                this.onRefresh();
            } else {
                this.onAddToWindowLayer();
            }
            this.isShow = true;
        }
    }
    protected onAddToWindowLayer(): void {
        this.parentLayer.addChild(this);
        this.adjustHierarchy();
    }
    protected adjustHierarchy(): void {
        var base: BasePopPanel;
        var len: number = this.parentLayer.numChildren;
        for (var j: number = len - 1; j >= 0; j--) {
            for (var i: number = 0; i < len; i++) {
                base = this.parentLayer.getChildAt(i) as BasePopPanel;
                if (base.layerIndex == j) {
                    this.parentLayer.setChildIndex(base, 0);
                }
            }
        }
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
        if (this.basic["closeBtn1"])
            this.basic["closeBtn1"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        if (this.basic["closeBtn2"])
            this.basic["closeBtn2"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.addEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    }
    public onHide(): void {
        if (this.parent) {
            this.onRemove();
            this.parent.removeChild(this);
            this.isShow = false;
            // GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.GAME_REDPOINT_TRIGGER), new redPointTrigger(RADPOINT_TYPE.MASTER_EQUIP));
            // GameDispatcher.getInstance().dispatchEvent(new egret.Event(GameEvent.GAME_REDPOINT_TRIGGER), new redPointTrigger(RADPOINT_TYPE.ITEM));
        }
    }
    protected onRemove(): void {
        if (this.basic["closeBtn1"])
            this.basic["closeBtn1"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        if (this.basic["closeBtn2"])
            this.basic["closeBtn2"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.removeEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    }
    protected get parentLayer(): egret.DisplayObjectContainer {
        return this.owner.promptLayer;
    }
    public setTitle(title: string): void {
        this.basic["panel_title"].source = title;
    }
    //The end
}
interface IPop {
    // layerIndex: number;
    // onShowWithParam(param): void;
    // onHide():void;
}
//带参数的面板
class PopParam {
    public popName;
    public param;
    public constructor(popName, param) {
        this.popName = popName;
        this.param = param;
    }
}