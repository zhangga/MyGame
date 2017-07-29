class GoodsInstence extends BaseComp {
	private img_fish: eui.Image;
	private lab_name: eui.Label;
	protected _data: FishData;
	public constructor() {
		super();
		this.skinName = skins.GoodsInstenceSkin;
	}
	protected onInit() {
		this.img_fish.source = this._data.model.icon;
		this.lab_name.text = Language.instance.getDescByKey(this._data.model.name);
	}
}