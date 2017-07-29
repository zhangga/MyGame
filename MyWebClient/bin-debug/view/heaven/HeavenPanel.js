var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeavenPanel = (function (_super) {
    __extends(HeavenPanel, _super);
    function HeavenPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.Max_Num = 5;
        return _this;
    }
    HeavenPanel.prototype.onSkinName = function () {
        this.skinName = skins.HeavenPanelSkin;
    };
    HeavenPanel.prototype.onInit = function () {
        this.setTitle("heaven_title_png");
        this.heaven_list.itemRenderer = HeavenListItem;
        this.heaven_list.itemRendererSkinName = skins.HeavenItemSkin;
        this.heaven_list.useVirtualLayout = true;
        this.scroll.viewport = this.heaven_list;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    HeavenPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(GameEvent.FIELDGUIDE_REWARD_EVENT, this.onRewardUpdate, this);
    };
    HeavenPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(GameEvent.FIELDGUIDE_REWARD_EVENT, this.onRewardUpdate, this);
    };
    HeavenPanel.prototype.onRefresh = function () {
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
    };
    HeavenPanel.prototype.onRewardUpdate = function (event) {
        var fishID = event.data;
        var itemsAry = this.heaven_list.dataProvider;
        var itemSoures = this.heaven_list.dataProvider["source"];
        var index = 0;
        for (var i = 0; i < itemSoures.length; i++) {
            var _data = itemSoures[i];
            if (fishID == _data.id) {
                index = i;
                break;
            }
        }
        itemsAry.itemUpdated(itemsAry.getItemAt(index));
    };
    return HeavenPanel;
}(BaseWindowPanel));
__reflect(HeavenPanel.prototype, "HeavenPanel");
var HeavenListItem = (function (_super) {
    __extends(HeavenListItem, _super);
    function HeavenListItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    HeavenListItem.prototype.onComplete = function () {
        this.award_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
    };
    HeavenListItem.prototype.dataChanged = function () {
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
    };
    HeavenListItem.prototype.onReward = function () {
        var _fishData = this.data;
        DataManager.instance.playerM.onSendRewardHeavenMsg(_fishData.id);
    };
    return HeavenListItem;
}(eui.ItemRenderer));
__reflect(HeavenListItem.prototype, "HeavenListItem");
//# sourceMappingURL=HeavenPanel.js.map