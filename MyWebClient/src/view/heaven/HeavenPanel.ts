class HeavenPanel extends BaseWindowPanel {
	private scroll: eui.Scroller;
	private heaven_list: eui.List;

	private items: TechnologyItem[];
	private Max_Num: number = 5;

	public constructor(owner) {
		super(owner);
	}
	protected onSkinName(): void {
		this.skinName = skins.HeavenPanelSkin;
	}
	protected onInit(): void {
		this.setTitle("heaven_title_png");
		this.heaven_list.itemRenderer = HeavenListItem;
		this.heaven_list.itemRendererSkinName = skins.HeavenItemSkin;
		this.heaven_list.useVirtualLayout = true;
		this.scroll.viewport = this.heaven_list;
		super.onInit();
		this.onRefresh();
	}
	protected onRegist(): void {
		super.onRegist();
		GameDispatcher.instance.addEventListener(GameEvent.FIELDGUIDE_REWARD_EVENT, this.onRewardUpdate, this);
	}
	protected onRemove(): void {
		super.onRemove();
		GameDispatcher.instance.removeEventListener(GameEvent.FIELDGUIDE_REWARD_EVENT, this.onRewardUpdate, this);
	}
	protected onRefresh(): void {
		// var player = DataManager.instance.playerM.player;
		// var allFishs: FishData[] = [];
		// for (var fishId in ModelManager.instance.modelFish) {
		// 	var _fishModel: ModelFish = ModelManager.instance.modelFish[fishId];
		// 	if (player.openFGID < _fishModel.tujian) {//未解锁不计
		// 		continue;
		// 	}
		// 	var _crowndata: CrownData = player.getCrownInfoByID(_fishModel.id);
		// 	if (!_crowndata) {
		// 		continue;
		// 	}
		// 	if (!_crowndata.isUnlock || _crowndata.crown == 0) {
		// 		continue;
		// 	}
		// 	allFishs.push(new FishData(_fishModel.id, _fishModel.lvMax));
		// }
		// this.heaven_list.dataProvider = new eui.ArrayCollection(allFishs);
	}
	private onRewardUpdate(event: egret.Event): void {
		var fishID: number = event.data as number;
		var itemsAry: eui.ArrayCollection = this.heaven_list.dataProvider as eui.ArrayCollection;
		var itemSoures = this.heaven_list.dataProvider["source"];
		var index: number = 0;
		for (var i: number = 0; i < itemSoures.length; i++) {
			var _data: FishData = itemSoures[i];
			if (fishID == _data.id) {
				index = i;
				break;
			}
		}
		itemsAry.itemUpdated(itemsAry.getItemAt(index));
	}
	//The end
}
class HeavenListItem extends eui.ItemRenderer {
	private fish_goods: GoodsInstence;
	private name_label: eui.Label;
	private secoutput_label: eui.Label;
	private award_num_label: eui.Label;
	private unlock_label: eui.Label;
	private award_btn: eui.Button;
	private huangguan_grp: eui.Group;
	private huangguan_grp2: eui.Group;
	private huangguan_label: eui.Label;

	constructor() {
		super();
		this.once(egret.Event.COMPLETE, this.onComplete, this);
	}
	private onComplete(): void {
		this.award_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
	}
	protected dataChanged(): void {
		// var _fishData: FishData = this.data;
		// var player = DataManager.instance.playerM.player;
		// this.fish_goods.data = _fishData;
		// this.name_label.text = Language.instance.getDescByKey(_fishData.model.name);
		// var _crowndata: CrownData = player.getCrownInfoByID(_fishData.id);
		// if (_crowndata) {
		// 	//更新秒产数
		// 	var moneymodel: ModelThing = GameCommon.instance.getThingModel(_fishData.modelLv.commonReward.type, _fishData.modelLv.commonReward.id);
		// 	this.secoutput_label.text = new InfiniteNumber(_crowndata.crown * _fishData.modelLv.commonReward.num).toTextFormat() + moneymodel.name + "/" + Language.instance.getDescByKey("second");
		// 	//皇冠数量
		// 	this.huangguan_grp.removeChildren();
		// 	if (_fishData.model.starMax > 3) {
		// 		this.huangguan_grp.visible = false;
		// 		this.huangguan_grp2.visible = true;
		// 		this.huangguan_label.text = `${_crowndata.crown}/${_fishData.model.starMax}`;
		// 	} else {
		// 		this.huangguan_grp.visible = true;
		// 		this.huangguan_grp2.visible = false;
		// 		for (var i: number = 0; i < _fishData.model.starMax; i++) {
		// 			var hg_img: eui.Image = new eui.Image();
		// 			if (_crowndata.crown > i) {
		// 				hg_img.source = "item_crown_1_png";
		// 			} else {
		// 				hg_img.source = "item_crown_0_png";
		// 			}
		// 			this.huangguan_grp.addChild(hg_img);
		// 		}
		// 	}
		// 	//按钮状态
		// 	if (_crowndata.crown < _fishData.model.starMax) {
		// 		this.unlock_label.text = Language.instance.getDescByKey('unreward_heaven_artifact', _fishData.model.starMax);
		// 		this.award_btn.visible = false;
		// 	} else {
		// 		this.unlock_label.text = "";
		// 		this.award_btn.visible = true;
		// 		this.award_btn.enabled = !_crowndata.hasArtifact;
		// 		this.award_btn.icon = _crowndata.hasArtifact ? "btn_icon_reward_png" : "btn_icon_confirm_png";
		// 	}
		// }
		// this.award_num_label.text = _fishData.model.artifactNum + "";
	}
	private onReward(): void {
		var _fishData: FishData = this.data;
		DataManager.instance.playerM.onSendRewardHeavenMsg(_fishData.id);
	}
	//The end
} 