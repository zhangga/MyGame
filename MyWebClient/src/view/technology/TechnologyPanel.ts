class TechnologyPanel extends BaseTabView {
	private scorll: eui.Scroller;
	private technology_list: eui.List;

	private items: TechnologyItem[];

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.TechnologyPanelSkin;
	}
	protected onInit(): void {
		this.items = [];
		this.technology_list.itemRenderer = TechnologyItem;
		this.technology_list.itemRendererSkinName = skins.TechnologyItemSkin;
		this.technology_list.useVirtualLayout = true;
		this.scorll.viewport = this.technology_list;

		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpgradeSuccess, this);
		GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpgradeSuccess, this);
		GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
	}
	private get player(): Player {
		return DataManager.instance.playerM.player;
	}
	protected onRefresh(): void {
		var _fishDatas: FishData[] = this.player.getFishByLoction(this.player.currFGID);
		var _fishtankModel: ModelFieldGuide = ModelManager.instance.modelFieldGuide[this.player.currFGID + "_1"];
		var _technologyIDs: number[] = [];
		for (var i: number = 0; i < _fishtankModel.kejiId.length; i++) {
			var _techID: number = parseInt(_fishtankModel.kejiId[i])
			if (DataManager.instance.technology.getNextModel(_techID))
				_technologyIDs.push(_techID);
		}
		for (var i: number = 0; i < _fishDatas.length; i++) {
			var _fishModel: ModelFish = _fishDatas[i].model;
			for (var j: number = 0; j < _fishModel.kejiId.length; j++) {
				var _tecID: number = parseInt(_fishModel.kejiId[j]);
				if (DataManager.instance.technology.getNextModel(_tecID) && _technologyIDs.indexOf(_tecID) < 0) {
					_technologyIDs.push(_tecID);
				}
			}
		}
		_technologyIDs = _technologyIDs.sort((aID, bID) => {
			var modelA: ModelTechnology = DataManager.instance.technology.getNextModel(aID);
			var modelB: ModelTechnology = DataManager.instance.technology.getNextModel(bID);
			var sortA: number = modelA ? modelA.cost.num : TECHNOLOGY_TYPE.SIZE - DataManager.instance.technology.getCurrModel(aID).type;
			var sortB: number = modelB ? modelB.cost.num : TECHNOLOGY_TYPE.SIZE - DataManager.instance.technology.getCurrModel(bID).type;
			return sortA - sortB;
		});
		this.technology_list.dataProvider = new eui.ArrayCollection(_technologyIDs);
	}
	private onUpgradeSuccess(event: egret.Event): void {
		var _technologyID: number = event.data as number;
		var itemsAry: eui.ArrayCollection = this.technology_list.dataProvider as eui.ArrayCollection;
		var itemSoures = this.technology_list.dataProvider["source"];
		var index: number = 0;
		for (var i: number = 0; i < itemSoures.length; i++) {
			var _id: number = itemSoures[i];
			if (_id == _technologyID) {
				index = i;
				break;
			}
		}
		if (!DataManager.instance.technology.getNextModel(_technologyID)) {
			itemsAry.removeItemAt(index);
		} else {
			itemsAry.itemUpdated(itemsAry.getItemAt(index));
		}
	}
	private onTimecall(): void {
		for (var i: number = 0; i < this.items.length; i++) {
			(this.items[i] as TechnologyItem).trigger();
		}
	}
}
class TechnologyItem extends eui.ItemRenderer {
	private name_label: eui.Label;
	private level_label: eui.Label;
	private desc_label: eui.Label;
	private consume_label: eui.Label;
	private consume_grp: eui.Group;
	private upgrade_btn: eui.Button;
	private money_icon: eui.Image;
	private icon: eui.Image;
	private full_desc_label: eui.Label;

	protected points: RedPoint[] = RedPointManager.createPoint(1);
	public constructor(id: number) {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.upgrade_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
	}
	protected dataChanged(): void {
		var technology_id: number = this.data;
		this.points[0].register(this.upgrade_btn, GameDefine.RED_TECHNOLOGY_BTN, DataManager.instance.technology, "onCheckTechnologyByType", technology_id);
		var currLevel: number = DataManager.instance.technology.getTechnologyLevel(technology_id);
		this.level_label.text = "Lv." + currLevel;
		var currModel: ModelTechnology = DataManager.instance.technology.getCurrModel(technology_id);
		var nextModel: ModelTechnology = DataManager.instance.technology.getNextModel(technology_id);
		var model: ModelTechnology = currModel ? currModel : nextModel;
		var addValueStr: string = "";
		if (nextModel) {
			addValueStr = Math.floor((nextModel.baifenbi + 100) / (currModel ? currModel.baifenbi + 100 : 100) * 100) + "%";
		}
		this.name_label.text = Language.instance.getDescByKey(model.name);
		this.icon.source = model.icon;
		if (addValueStr)
			this.desc_label.text = Language.instance.getDescByKey(`technology${model.type}_desc`, addValueStr);
		else
			this.desc_label.text = "";
		this.consume_grp.visible = nextModel ? true : false;
		if (nextModel) {
			var consumeObj: ModelThing = GameCommon.instance.getThingModel(nextModel.cost.type, nextModel.cost.id);
			this.money_icon.source = consumeObj.icon;
			this.consume_label.text = nextModel.cost.numFormat;
		}
		this.trigger();
	}
	private onupdateCost(): void {
		var nextModel: ModelTechnology = DataManager.instance.technology.getNextModel(this.data);
		if (nextModel) {
			this.upgrade_btn.visible = true;
			var hasMoneyNum: number = DataManager.instance.playerM.player.getCurrency(nextModel.cost.type);
			var costMoneyNum: number = nextModel.cost.num;
			this.upgrade_btn.enabled = hasMoneyNum >= costMoneyNum;
			this.full_desc_label.visible = false;
		} else {
			this.upgrade_btn.visible = false;
			this.full_desc_label.visible = true;
		}
	}
	private onUpgrade(): void {
		DataManager.instance.technology.onSendUpgradeMsg(this.data);
		GameCommon.instance.addAnimation(this, `liebiaoshuaxin`, new egret.Point(287, 64), 1, true);
	}
	public trigger(): void {
		this.points[0].checkPoint();
		this.onupdateCost();
	}
	//The end
}