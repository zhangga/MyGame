class TabBtnGroup extends eui.Component {
	private _keys: string[];
	private _data: string[];
	private subLayer: eui.Group;
	private topLayer: eui.Group;
	private isLoaded: boolean = false;
	private tabs;
	private _selectIndex: number;
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.TabBtnGroupSkin;
	}
	private onLoadComplete(): void {
		this.isLoaded = true;
		if (this._data) {
			this.onInit();
		}
	}
	public onUpdate(source: string[], keys?: string[]) {
		this._data = source;
		this._keys = keys;
		if (this.isLoaded) {
			this.onInit();
		}
	}
	public set selectIndex(index: number) {
		for (var key in this.tabs) {
			this.tabs[key].visible = parseInt(key) == index;
		}
		this._selectIndex = index;
	}
	public get selectIndex() {
		return this._selectIndex;
	}
	private onInit() {
		this.tabs = {};
		this.subLayer.removeChildren();
		this.topLayer.removeChildren();
		var item: TabBtnItem;
		for (var i: number = 0; i < this._data.length; i++) {
			item = new TabBtnItem(0);
			item.data = this._data[i];
			item.name = i.toString();
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
			this.subLayer.addChild(item);
			item = new TabBtnItem(1);
			item.data = this._data[i];
			this.topLayer.addChild(item);
			this.tabs[i] = item;
		}
	}

	private onTouchItem(e: egret.Event): void {
		var index: number = parseInt(e.currentTarget.name);
		if (this.selectIndex != index) {
			this.selectIndex = index;
			GameDispatcher.instance.dispatcherEventWith(GameEvent.TABBTN_TOUCH_EVENT, false, this.selectIndex);
		}
	}
}
class TabBtnItem extends eui.Component {
	private _data: string;
	private isLoaded: boolean = false;
	private _type: number;
	private img_bg: eui.Image;
	private img_lab: eui.Image;
	public constructor(type: number) {
		super();
		this._type = type;
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.TabBtnItemSkin;
	}
	private onLoadComplete(): void {
		this.isLoaded = true;
		if (this._data) {
			this.onInit();
		}
	}
	public set data(source: string) {
		this._data = source;
		if (this.isLoaded) {
			this.onInit();
		}
	}
	private onInit() {
		if (this._type == 0) {//下层
			this.img_bg.source = "public_tab_selected_png";
			this.img_lab.source = `${this._data}0_png`;
		} else {
			this.img_bg.source = "public_tab_unselected_png";
			this.img_lab.source = `${this._data}1_png`;
		}

	}
}