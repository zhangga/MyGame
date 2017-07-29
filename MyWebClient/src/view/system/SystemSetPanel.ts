class SystemSetPanel extends BaseWindowPanel {
	private version_label: eui.Label;
	private player_name_label: eui.Label;
	private player_id_label: eui.Label;

	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.SystemSetPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("");

		this.player_name_label.text = this.player.name;
		this.player_id_label.text = "ID：" + this.player.id;
		this.version_label.text = "版本号：" + _GF.version;

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
	}
	private get player(): Player {
		return DataManager.instance.playerM.player;
	}
	//The end
}