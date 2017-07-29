//tab容器内显示对象
class BaseTabView extends eui.Component {
	protected owner;
	private onloadComp: boolean;
	protected points: RedPoint[] = RedPointManager.createPoint(0);
	public constructor(owner) {
		super();
		this.owner = owner;
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
	}
	//添加到舞台
	private onAddToStage(): void {
		this.onSkinName();
	}
	//设置皮肤
	protected onSkinName(): void {
	}
	//皮肤加载完成
	private onLoadComplete(): void {
		this.onloadComp = true;
		this.onInit();
		this.onRegist();
	}
	//供子类覆盖
	protected onInit(): void {
	}
	protected onRefresh(): void {
	}
	protected onRegist(): void {

	}
	protected onRemove(): void {
	}
	public onShow(): void {
		if (this.onloadComp) {
			this.onRegist();
			this.onRefresh();
		}
	}
	public onHide(): void {
		this.onRemove();
		if (this.parent)
			this.parent.removeChild(this);
	}
	public onBtnAdvanceClick(param?): void {

	}
	public trigger(): void {
		for (var i: number = 0; i < this.points.length; i++) {
			this.points[i].checkPoint();
		}
	}
	public onChangeRole(): void {

	}

}