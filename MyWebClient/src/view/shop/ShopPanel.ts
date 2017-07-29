class ShopPanel extends BaseWindowPanel {

	private scorll: eui.Scroller;
	private shop_list: eui.Group;

	private tab_btn_group: TabBtnGroup;
	private btn_back: eui.Button;
	private btn_close: eui.Image;

	private curr_type: SHOP_TYPE = SHOP_TYPE.GOLD;

	public constructor(owner) {
		super(owner);
	}

	protected onSkinName(): void {
		this.skinName = skins.ShopPanelSkin;
	}

	protected onInit(): void {
		super.onInit();
		this.scorll.verticalScrollBar.autoVisibility = true;
		this.scorll.verticalScrollBar.visible = true;
		this.initShopTab();
		this.onRefresh();
	}

	protected onRegist(): void {
		super.onRegist();
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
	}

	protected onRemove(): void {
		super.onRemove();
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
		GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
	}

	protected onRefresh(): void {
		super.onRefresh();
		this.onTabBtnTouch();
	}

	private initShopTab(): void {
        var tabs: string[] = [];
		for (var type in SHOP_TYPE) {
			var num: number = parseInt(type);
			if (isNaN(num))
				break;
			tabs.push("shoptype"+num);
		}
        this.tab_btn_group.onUpdate(tabs);
    }

	/**
	 * 切换商城类型TAB列表
	 */
    private onTabBtnTouch(): void {
        if (this.tab_btn_group.selectIndex && this.curr_type == this.tab_btn_group.selectIndex+1)
            return;
        if (!this.tab_btn_group.selectIndex)
            this.tab_btn_group.selectIndex = 0;
        this.curr_type = this.tab_btn_group.selectIndex+1;
		this.updateShopList();
    }

	//刷新商品列表
	private updateShopList(): void {
		this.shop_list.removeChildren();
		for (var key in ModelManager.instance.modelShop) {
			var model: ModelShop = ModelManager.instance.modelShop[key];
			if (model.type != this.curr_type)
				continue;
			var shopItem: ShopItem = new ShopItem();
			shopItem.data = model;
			this.shop_list.addChild(shopItem);
		}
	}

}

enum SHOP_TYPE {
	GOLD = 1,
	DIAMOND = 2,
}
