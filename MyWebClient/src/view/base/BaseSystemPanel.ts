class BaseSystemPanel extends eui.Component {
	protected owner: ModuleLayer;
	protected index: number = 0;
	protected basic: eui.Component;
	protected tabs = {};
	protected tabFs = {};
	protected allwindows = {};
	protected alerts = {};
	protected isShowAlert: boolean = false;
	protected windowNames = {};
	protected lockIDs = {};
	protected currPanel: BaseTabView;
	protected tabLayer: eui.Group;
	private onloadComp: boolean;
	public currParam;
	public constructor(owner) {
		super();
		this.owner = owner;
		this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
	}
	//添加到舞台
	private onAddToStage(): void {
		this.onSkinName();
	}
	//皮肤加载完成
	private onLoadComplete(): void {
		this.onloadComp = true;
		this.onInit();
	}
	protected onSkinName(): void {
	}
	protected onInit(): void {
	}
	protected onRegist(): void {
		var btn: eui.RadioButton;
		for (var key in this.tabFs) {
			this.tabFs[key].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
		}
		GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTouchTab, this);
	}
	protected onRemove(): void {
		for (var key in this.tabFs) {
			this.tabFs[key].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
		}
		this.index = 0;
		GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTouchTab, this);
	}
	protected registerPage(sysInfo: RegisterSystemParam[], btnGrp: string, pos: egret.Point = GameDefine.RED_TAB_POS, isResetIndex: boolean = false): void {
		
		if (!sysInfo) return;
		var btn: eui.RadioButton;
		var len: number = sysInfo.length;
		for (var i: number = 0; i < sysInfo.length; i++) {
			this.windowNames[i] = sysInfo[i].sysName;
		}
		var imgPoint: eui.Image;
		if (this.basic && this.basic["btnTabLayer"]) {
			if ((this.basic["btnTabLayer"] as eui.Group).numChildren > 0) {
				(this.basic["btnTabLayer"] as eui.Group).removeChildren();
			}
			this.lockIDs = {};
			this.tabFs = {};
			this.allwindows = {};
			if (isResetIndex) {
				this.index = 0;
			}
			for (var i: number = 0; i < len; i++) {
				if (sysInfo[i].btnRes == "") continue;
				var grp: eui.Group = new eui.Group();
				grp.touchEnabled = true;
				grp.name = i.toString();
				btn = new eui.RadioButton();
				btn.value = i;
				btn.groupName = btnGrp;
				btn.skinName = this.getTabButtonSkin(sysInfo[i].btnRes);
				btn.touchEnabled = false;
				this.tabs[i] = btn;
				this.tabFs[i] = grp;
				if (sysInfo[i].redP) {
					sysInfo[i].redP.addRedPointImg(btn, pos);
				}
				if (sysInfo[i].funcID != -1) {
					this.lockIDs[i] = sysInfo[i].funcID;
				}
				grp.addChild(btn);
				this.basic["btnTabLayer"].addChild(grp);
			}
		}
	}
	protected getTabButtonSkin(btnRes: string): string {
		return GameSkin.getBaseTabButtonSkin(btnRes);
	}
	protected onTouchTab(e: egret.Event): void {
		var index: number = parseInt(e.data);
		// if (this.lockIDs[index]) {
		// 	if (FunDefine.onIsLockandErrorHint(this.lockIDs[index])) return;
		// }
		if (this.index != index) {
			this.index = index;
			this.onRefresh();
		}
	}
	protected onRefresh(): void {
		this.onShowPanel();
		this.refreshFunOpen();
		this.trigger();
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
			this.tabLayer.addChild(this.currPanel);
		} else {
			this.tabLayer.addChild(this.currPanel);
			this.currPanel.onShow();
		}
		if (this.tabs[this.index]) {
			this.tabs[this.index].selected = true;
		}
	}
	public onShowAlertByName(panelName: string): void {
		if (this.currPanel) {
			this.currPanel.onHide();
		}
		this.currPanel = this.alerts[panelName];
		if (!this.currPanel) {
			this.currPanel = new window[panelName]();
			this.alerts[panelName] = this.currPanel;
			this.tabLayer.addChild(this.currPanel);
		} else {
			this.tabLayer.addChild(this.currPanel);
			this.currPanel.onShow();
		}
		this.isShowAlert = true;
	}

	protected refreshFunOpen(): void {
	}
	private onLevelChange(e: egret.Event): void {
		if (e.data) {
			this.refreshFunOpen();
		}
	}
	public addTabChild(panelName: string): void {
		if (this.currPanel) {
			this.currPanel.onHide();
		}
		this.currPanel = this.allwindows[panelName];
		if (!this.currPanel) {
			this.currPanel = new window[panelName](this.owner);
			this.allwindows[panelName] = this.currPanel;
		}
		this.tabLayer.addChild(this.currPanel);
		this.currPanel.onShow();
		this.index = -1;
	}
	public trigger(): void {
		if (this.currPanel) {
			this.currPanel.trigger();
		}
	}

	public get lockGroup() {
		if (this.basic) {
			return this.basic["lockGroup"];
		} else {
			return null;
		}
	}
	public onTimeOut(): void {

	}
	public get tab(): number {
		return this.index;
	}

}
class RegisterSystemParam {
	public sysName: string;
	public btnRes: string;
	public redP: RedPoint;
	public funcID: number = -1;
	public constructor(sysName?: string, btnRes?: string, redP?: RedPoint, funcID?: number) {
		this.sysName = sysName;
		this.btnRes = btnRes;
		this.redP = redP;
		this.funcID = funcID;
	}
}