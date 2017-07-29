abstract class BaseTipsBar extends eui.Component {
    protected param: IntroduceBarParam;
    protected owner: ItemIntroducebar;
    protected item_frame: eui.Image;
    protected item_icon: eui.Image;
    protected name_label: eui.Label;
    protected level_label: eui.Label;
    protected desc_label: eui.Label;
    protected limitTimeLabel: eui.Label;
    protected item_bg: eui.Image;
    constructor(owner) {
        super();
        this.owner = owner;
        this.initSkinName();
    }
    //皮肤
    protected initSkinName(): void {
    }
    //注册
    public onRegist(): void {
    }
    //移除
    public onRemove(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
    //更新
    public onUpdate(param: IntroduceBarParam): void {
        this.param = param;
    }
    //更新通用属性
    protected onRefreshCommonUI(): void {
        // this.item_icon.source = model.icon;
        // quality = quality != -1 ? quality : model.quality
        // this.item_frame.source = GameCommon.getInstance().getIconFrame(quality);
        // this.name_label.textFlow = new Array<egret.ITextElement>(
        //     { text: model.name, style: { textColor: GameDefine.color[quality] } },
        // );
        // var lvLimitObj = GameCommon.getInstance().getLimitLevelObj(model.level);
        // var levelDesc: string = lvLimitObj.zsLevel > 0 ? `${lvLimitObj.zsLevel}转` : `Lv.${lvLimitObj.level}`;
        // this.level_label.text = levelDesc;
        // if (this.desc_label)
        //     this.desc_label.text = model.des;

        // if (this.item_bg) {
        //     this.item_bg.source = GameCommon.getInstance().getIconBack(quality);
        // }

        // if (this.timeGoods && model.limitTime > 0) {
        //     Tool.addTimer(this.updateLimitTime, this);
        // }
    }
    //关闭面板
    public onHide(): void {
        this.owner.onHide();
    }
}