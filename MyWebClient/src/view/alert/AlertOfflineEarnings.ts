class AlertOfflineEarnings extends BaseWindowPanel {
	private btn_sure: eui.Button;
	private lab_hint: eui.Label;
	private bmpLab_num: eui.BitmapLabel;
	private img_icon: eui.Image;
	public priority: PANEL_HIERARCHY_TYPE = PANEL_HIERARCHY_TYPE.II;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.AlertOfflineEarningsSkin;
	}
	protected onInit(): void {
		this.setTitle("offline_title_png");
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
	}
	protected onRemove(): void {
		super.onRemove();
		this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
	}
	public onShowWithParam(param): void {
		this.onShow();
	}
	protected onRefresh(): void {
		this.lab_hint.text = `离线时间${GameCommon.instance.getTimeStrForSec1(DataManager.instance.offline.time, 0, 1)}，获得以下收益`
		this.bmpLab_num.text = `${DataManager.instance.offline.gold.toTextFormat()}`;
	}
}