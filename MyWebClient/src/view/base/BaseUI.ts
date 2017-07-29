class BaseUI extends eui.Component {
	private onloadComp: boolean;
	public constructor() {
		super();
		this.once(eui.UIEvent.COMPLETE, this.onLoadComplete, this);
	}
	//皮肤加载完成
	protected onLoadComplete(): void {
		this.onInit();
		this.onRegist();
	}
	//供子类覆盖
	protected onInit(): void {
	}
	protected onRegist(): void {
	}
	protected onRemove(): void {
	}
	public onDestory(): void {
		this.onRemove();
	}
}