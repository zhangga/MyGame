class CrownBar extends BaseComp {
	protected _data: CrownData;
	private btn_type: eui.RadioButton;
	private lab_num: eui.Label;
	public constructor() {
		super();
		this.skinName = skins.CrownBarSkin;
	}
	protected onInit() {
		// this.lab_num.text = `${this._data.crown}/${this._data.model.starMax}`
	}
}