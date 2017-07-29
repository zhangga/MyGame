class DecoratePanel extends BaseTabView {
	private scorll: eui.Scroller;
	private btn_buweis: TabBtnGroup2;
	private list_buwei: eui.List;
	private niudan_btn: eui.Button;

	private curr_index: number = 0;
	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.DecoratePanelSkin;
	}
	protected onInit(): void {
		this.scorll.verticalScrollBar.autoVisibility = false;
		this.scorll.verticalScrollBar.visible = false;

		this.list_buwei.itemRenderer = DecorateBuwei;
		this.list_buwei.itemRendererSkinName = skins.DecorateBuweiSkin;
		this.list_buwei.useVirtualLayout = true;
		this.scorll.viewport = this.list_buwei;

		super.onInit();
		//所有的部位
		this.initAllBuWei();
		this.btn_buweis.points[0].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");
		this.btn_buweis.points[1].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");
		this.btn_buweis.points[2].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");

		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		this.niudan_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
		GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
		GameDispatcher.instance.addEventListener(GameEvent.FISH_TANK_EQUIP_EVENT, this.onUpdateOne, this);
		GameDispatcher.instance.addEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onRefresh, this);
		GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_PART_EVENT, this.tigger, this);
		this.tigger();
	}
	protected onRemove(): void {
		super.onRemove();
		this.niudan_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
		GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
		GameDispatcher.instance.removeEventListener(GameEvent.FISH_TANK_EQUIP_EVENT, this.onUpdateOne, this);
		GameDispatcher.instance.removeEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onRefresh, this);
		GameDispatcher.instance.removeEventListener(FishTankEevent.TANK_REFRESH_PART_EVENT, this.tigger, this);
	}
	protected onRefresh(): void {
		this.curr_index = -1;
		super.onRefresh();
		this.onTabBtnTouch();
	}
	public tigger(): void {
		this.btn_buweis.points[0].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE1);
		this.btn_buweis.points[1].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE2);
		this.btn_buweis.points[2].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE3);
	}
	/**
	 * 初始化所有的部位
	 */
	private initAllBuWei(): void {
		var buweis: string[] = [];
		for (var i: number = 1; i <= DECORATE_TYPE.SIZE; i++) {
			buweis.push("buwei" + i);
		}
		this.btn_buweis.onUpdate(buweis);
		this.onTabBtnTouch();
		this.btn_buweis.selectIndex = this.curr_index;
	}
	/**
	 * 获取
	 */
	private onGet(): void {
		GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DecorateGashaponPanel");
	}
	/**
	 * 切换部位TAB列表
	 */
	private onTabBtnTouch(): void {
		if (this.btn_buweis.selectIndex && this.curr_index == this.btn_buweis.selectIndex)
			return;
		var player: Player = DataManager.player;
		if (!this.btn_buweis.selectIndex)
			this.btn_buweis.selectIndex = 0;
		this.curr_index = this.btn_buweis.selectIndex;
		var models: ModelDecorate[] = [];
		var modelDecorates = ModelManager.instance.modelDecorate;
		var index = 0;
		for (var key in modelDecorates) {
			var modelDecorate: ModelDecorate = modelDecorates[key];
			//对应的部位
			if (!modelDecorate || modelDecorate.buwei != this.curr_index + 1) {
				continue;
			}
			if (player.decorate_active[modelDecorate.id]) {
				if (!player.decorate_show[player.currFGID + "_" + modelDecorate.buwei])
					models.unshift(modelDecorate);
				else
					models.splice(index, 0, modelDecorate);
				index++;
			} else {
				models.push(modelDecorate);
			}
		}
		this.list_buwei.dataProvider = new eui.ArrayCollection(models);
	}
	//更新某一个神器状态
	private onUpdateOne(event: egret.Event): void {
		var _shenqiID: number = event.data as number;
		var itemsAry: eui.ArrayCollection = this.list_buwei.dataProvider as eui.ArrayCollection;
		var itemSoures = this.list_buwei.dataProvider["source"];
		var index: number = 0;
		for (var i: number = 0; i < itemSoures.length; i++) {
			var _data: ModelDecorate = itemSoures[i];
			if (_shenqiID == _data.id) {
				index = i;
				break;
			}
		}
		itemsAry.itemUpdated(itemsAry.getItemAt(index));
		this.tigger();
	}
}
class DecorateItem extends eui.Component {
	public id;
	public pos_X: number = 0;
	private scene_item: eui.Group;
	private label_scene: eui.Label;
	private scene_icon: eui.Image;
	private select_bg: eui.Image;
	private img_lock: eui.Image;
	private img_mask: eui.Image;
	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor(id) {
		super();
		this.skinName = skins.DecorateItemSkin;
		this.id = id;
		this.select_bg.visible = false;
		this.scene_item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeScene, this);
	}
	/**
	 * 修改鱼塘背景
	 */
	public onChangeScene(): void {
		if (this._selected)
			return;
		var player: Player = DataManager.player;
		//好友家
		if (player.inOtherHome) {
			if (!this.img_lock.visible) {
				GameDispatcher.instance.dispatcherEventWith(GameEvent.DECORATE_SELECT_SCENE_OTHER, false, this.id);
			}
		}
		//自家
		else {
			if (this.img_lock.visible) {
				var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[this.id + "_0"];
				//显示解锁面板
				var name = Language.instance.getDescByKey(model.name);
				var bl = player.getIsUnlockedAllFishByBook(this.id - 1);
				var type: number = ALERT_TYPE.COIN;
				if (!bl) {
					type = ALERT_TYPE.UNLOCK;
				}
				var alertParam: AlertHintParam = new AlertHintParam(type, Language.instance.getDescByKey("yugang_unlock", name),
					ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, model.cost.num));
				alertParam.gameEvent = GameEvent.DECORATE_TANK_UNLOCK;
				alertParam.eventParam = this.id;
				var windowParam: WindowParam = new WindowParam("AlertHint", alertParam);
				GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, windowParam);
				return;
			}
			GameDispatcher.instance.dispatcherEventWith(GameEvent.DECORATE_SELECT_SCENE, false, this.id);
			//修改背景图
			player.currFGID = this.id;
			GameDispatcher.instance.dispatcherEventWith(FishTankEevent.TANK_REFRESH_SHOW_EVENT, false);
		}
	}

	private onUnlockTank(): void {

	}

	private _selected: boolean = false;
	public onSelect(bool: boolean): void {
		if (this._selected != bool) {
			this._selected = bool;
			this.select_bg.visible = this._selected;
			var player: Player = DataManager.player;
		}
	}

	public onRefresh(): void {

		//好友家
		if (DataManager.player.inOtherHome) {
			var otherPlayer: BeVisitedPlayer = DataManager.instance.visite.player;
			var book: BookData = otherPlayer.book[this.id];
			if (book) {
				this.img_lock.visible = false;
				this.img_mask.visible = false;
			} else {
				this.img_lock.visible = true;
				this.img_mask.visible = true;
			}
		}
		//自家
		else {
			this.points[0].register(this, GameDefine.RED_MAIN_POS, DataManager.instance.playerM.player, "onCheckBookRedPointByBID", this.id);
			this.trigger();
			var player: Player = DataManager.player;
			var book: BookData = player.getBookByID(this.id);
			if (book) {
				this.img_lock.visible = false;
				this.img_mask.visible = false;
			} else {
				this.img_lock.visible = true;
				this.img_mask.visible = !player.getIsUnlockedAllFishByBook(this.id - 1);
			}
		}
		var models = ModelManager.instance.modelFieldGuide;
		var model: ModelFieldGuide = models[this.id + "_0"];
		if (!model) {
			return;
		}
		this.label_scene.text = Language.instance.getDescByKey(model.name);
		this.scene_icon.source = model.icon;
	}
	public trigger(): void {
		if (this.points[0]) {
			this.points[0].checkPoint();
		}
	}

}

class DecorateBuwei extends eui.ItemRenderer {
	private label_name: eui.Label;
	private label_lv: eui.Label;
	private icon: eui.Image;
	private itemq: eui.Image;
	private label_desc: eui.Label;
	private label_cloth: eui.Label;
	private cloth_label: eui.Label;
	private btn_cloth: eui.Button;

	public constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
		// this.skinName = skins.DecorateBuweiSkin;
	}

	private onComplete(): void {
		this.btn_cloth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClothHanlder, this);
	}

	protected dataChanged(): void {
		var player: Player = DataManager.instance.playerM.player;
		var model: ModelDecorate = this.data;
		var lv = player.decorate_active[model.id];
		if (!model) {
			return;
		}
		if (model.icon.length > 3)
			this.icon.source = model.icon;
		this.itemq.source = GameCommon.instance.getQualityFrame(model.pinzhi);//shenqi_add_desc
		this.label_name.text = model.name;
		if (lv > 0) {
			this.label_desc.text = Language.instance.getDescByKey("shenqi_add_desc",
				(ModelDecorate.getEffect(model.pinzhi, lv) / 100) + "%");
			this.label_lv.text = "Lv." + lv;
			this.btn_cloth.enabled = true;
		} else {
			this.label_desc.text = Language.instance.getDescByKey("shenqi_add_desc",
				(ModelDecorate.getEffect(model.pinzhi, 1) / 100) + "%");
			this.label_lv.text = "未激活";
			this.btn_cloth.enabled = false;
		}
		this.cloth_label.text = "";
		var _currClothId: number = player.decorate_show[player.currFGID + "_" + model.buwei];
		var _modelId: number = parseInt(model.id);
		if (_currClothId && _currClothId == _modelId) {
			this.btn_cloth.visible = false;
			this.label_cloth.visible = true;
		} else {
			this.btn_cloth.visible = true;
			this.label_cloth.visible = false;
			for (var key in player.decorate_show) {
				var _shenqiID: number = player.decorate_show[key];
				if (_shenqiID == _modelId) {
					var _tankId: number = parseInt(key.slice(0, key.search("_")));
					var _tankmodel: ModelFieldGuide = ModelManager.instance.modelFieldGuide[_tankId + "_0"];
					this.cloth_label.text = `装配于：${Language.instance.getDescByKey(_tankmodel.name)}`;
					break;
				}
			}
		}
	}

	private onClothHanlder(): void {
		var model: ModelDecorate = this.data;
		var player: Player = DataManager.instance.playerM.player;
		var lv = player.decorate_active[this.data.id];
		if (!lv || lv == 0) {
			GameCommon.instance.addAlertError(19);
			return;
		}
		//修改部位图
		var saveKey: string = player.currFGID + "_" + model.buwei;
		var _oldShenqiId: number = player.decorate_show[saveKey];

		for (var key in player.decorate_show) {
			var _shenqiID: number = player.decorate_show[key];
			if (_shenqiID == parseInt(model.id)) {
				delete player.decorate_show[key];
				break;
			}
		}
		player.decorate_show[saveKey] = model.id;
		if (_oldShenqiId) {
			GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_TANK_EQUIP_EVENT, false, _oldShenqiId);
		}
		GameDispatcher.instance.dispatcherEventWith(FishTankEevent.TANK_REFRESH_PART_EVENT, false);
		DataManager.instance.decorate.sendShowChangeMsg(model.id, player.currFGID);
		this.dataChanged();
		// GameCommon.instance.addAnimation(this, "shenqizhuangpei", new egret.Point(50, 340), 1, true);
	}
}