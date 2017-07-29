class TabBtnGroup2 extends eui.Component {
	private _keys: string[];
	private _data: string[];
	private subLayer: eui.Group;
	private topLayer: eui.Group;
	private redLayer: eui.Group;
	private isLoaded: boolean = false;
	private tabs;
	private _selectIndex: number;
	public points: RedPoint[] = RedPointManager.createPoint(3);
	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.TabBtnGroupSkin2;
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
		this.redLayer.removeChildren();
		var item: TabBtnItem2;
		this.points = RedPointManager.createPoint(this._data.length);
		for (var i: number = 0; i < this._data.length; i++) {
			item = new TabBtnItem2(0);
			item.data = this._data[i];
			item.name = i.toString();
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);

			this.subLayer.addChild(item);
			item = new TabBtnItem2(1);
			item.data = this._data[i];
			this.topLayer.addChild(item);
			this.tabs[i] = item;

			var gr: eui.Group = new eui.Group();
			this.redLayer.addChild(gr);
			this.points[i].addRedPointImg(gr, new egret.Point(110, 0));
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
class TabBtnItem2 extends eui.Component {
	private _data: string;
	private isLoaded: boolean = false;
	private _type: number;
	private img_bg: eui.Image;
	private img_lab: eui.Image;
	public constructor(type: number) {
		super();
		this._type = type;
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		this.skinName = skins.TabBtnItemSkin2;
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
			this.img_bg.source = "public_tab2_selected_png";//
			this.img_lab.source = `${this._data}0_png`;
		} else {
			this.img_bg.source = "public_tab_unselected_png";
			this.img_lab.source = `${this._data}1_png`;
		}

	}
}