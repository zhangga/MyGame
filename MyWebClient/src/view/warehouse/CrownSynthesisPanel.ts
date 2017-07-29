class CrownSynthesisPanel extends BaseTabView {
	private itemLayer: eui.Group;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.CrownSynthesisPanelSkin;
	}
	protected onInit(): void {
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
	}
	protected onRemove(): void {
		super.onRemove();
	}
	protected onRefresh(): void {
		this.itemLayer.removeChildren();
		var models = ModelManager.instance.modelSynthetic;
		var item: SynthesisItem;
		var model: ModelSynthetic;
		for (var key in models) {
			model = models[key];
			if (model.type == 2) {
				item = new SynthesisItem();
				this.itemLayer.addChild(item);
			}
		}
	}
}