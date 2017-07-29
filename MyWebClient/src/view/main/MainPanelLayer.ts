class MainPanelLayer extends BaseSystemPanel {
	public constructor(owner) {
		super(owner);
	}
	public onInit(): void {
		var sysQueue = [];

		var param = new RegisterSystemParam();
		param.sysName = "UpgradePanel";
		sysQueue.push(param);

		param = new RegisterSystemParam();
		param.sysName = "TechnologyPanel";
		sysQueue.push(param);

		param = new RegisterSystemParam();
		param.sysName = "DecoratePanel";
		sysQueue.push(param);

		param = new RegisterSystemParam();
		param.sysName = "FishTankAdvancePanel";
		sysQueue.push(param);

		this.registerPage(sysQueue, "mainGrp", null, false);
		this.index = 0;
		this.onRefresh();
	}
	protected onShowPanel() {
		if (this.currPanel) {
			this.currPanel.onHide();
			this.isShowAlert = false;
		}
		this.currPanel = this.allwindows[this.index];
		if (!this.currPanel) {
			var windowName: string = this.windowNames[this.index];
			if (!windowName) return;
			this.currPanel = new window[windowName](this);
			this.allwindows[this.index] = this.currPanel;
			this["tabLayer"].addChild(this.currPanel);
		} else {
			this["tabLayer"].addChild(this.currPanel);
			this.currPanel.onShow();
		}
		if (this.tabs[this.index]) {
			this.tabs[this.index].selected = true;
		}
	}
	protected onRegist(): void {
	}
	protected onRemove(): void {
	}
	public onChangeTab(index: number) {
		if (this.index != index) {
			this.index = index;
			this.onRefresh();
		}
	}
	public onChangeFishTank(): void {
		this.onRefresh();
	}
}