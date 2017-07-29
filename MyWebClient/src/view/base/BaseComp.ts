class BaseComp extends eui.Component implements eui.UIComponent {
	protected _data;
	protected isLoaded: boolean = false;
	public constructor() {
		super();
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.onLoadComplete();
	}
	protected onLoadComplete(): void {
		this.isLoaded = true;
		if (this._data) {
			this.onInit();
		}
	}
	public set data(source) {
		this._data = source;
		if (this.isLoaded) {
			this.onInit();
		}
	}
	protected onInit() {

	}
}