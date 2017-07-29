class CurrencyBar extends eui.Component {
	private _data: CurrencyParam;
	private isLoaded: boolean;
	private label_l: eui.Label;
	private label_r: eui.Label;
	private img_icon: eui.Image;
	public img_rBg: eui.Image;
	constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
		// this.skinName = skins.CurrencyBarSkin;
	}
	private onLoadComplete(): void {
		this.isLoaded = true;
		if (this._data)
			this.onUpdate();
	}
	public set data(param: CurrencyParam) {
		this._data = param;
		this.onUpdate();
	}
	private onUpdate(): void {
		var model = GameCommon.instance.getThingModel(this._data.thing.type, this._data.thing.modelId);
		if (model) {
			this.visible = true;
			this.img_icon.source = model.dropicon;
			if (this._data.usingTitle) {
				this.label_l.text = this._data.title;
			} else {
				this.label_l.text = `消耗${model.name}`;
			}
			var _hasitemNum: number = 0;
			// switch (this._data.thing.type) {
			// 	case GOODS_TYPE.ITEM:
			// 		var _itemThing: ItemThing = DataManager.getInstance().bagManager.getGoodsThingById(model.id);
			// 		_hasitemNum = _itemThing ? _itemThing.num : 0;
			// 		break;
			// 	case GOODS_TYPE.GOLD:
			// 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
			// 		break;
			// 	case GOODS_TYPE.DIAMOND:
			// 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
			// 		break;
			// 	default:
			// 		_hasitemNum = DataManager.getInstance().playerManager.player.getICurrency(this._data.thing.type);
			// 		break;
			// }
			// if (this._data.thing.num == -1) {//从背包找数据
			// 	this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0xe9deb3>${_hasitemNum}</font>`);
			// } else {
			switch (this._data.thing.type) {
				// case GOODS_TYPE.ITEM:
				// 	if (_hasitemNum >= this._data.thing.num) {
				// 		this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0x28e828>${_hasitemNum}/${this._data.thing.num}</font>`);
				// 	} else {
				// 		this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0xe63232>${_hasitemNum}/${this._data.thing.num}</font>`);
				// 	}
				// 	break;
				default:
					this.label_r.textFlow = (new egret.HtmlTextParser).parser(`${this._data.thing.numFormat}`);
					break;
			}
			// }
		} else {
			this.label_l.text = this._data.title;
		}
		if (this._data.type != -1) {
			this.label_r.textFlow = this.label_r.textFlow = (new egret.HtmlTextParser).parser(`<font color=0x590A0A>${this._data.thing.num}</font>`);
		}
	}
}
class CurrencyParam {
	public title: string = "";
	public thing;
	public usingTitle: boolean;
	public type: number;
	public constructor(title, thing, usingTitle: boolean = true, type: number = -1) {
		this.title = title;
		this.thing = thing;
		this.usingTitle = usingTitle;
		this.type = type;
	}
}