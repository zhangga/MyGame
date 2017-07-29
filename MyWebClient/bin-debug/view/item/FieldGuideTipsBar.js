var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FieldGuideTipsBar = (function (_super) {
    __extends(FieldGuideTipsBar, _super);
    function FieldGuideTipsBar(owner) {
        return _super.call(this, owner) || this;
    }
    FieldGuideTipsBar.prototype.initSkinName = function () {
        this.skinName = skins.FieldGuideTipsBarSkin;
    };
    //注册
    FieldGuideTipsBar.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_done.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDone, this);
    };
    //移除
    FieldGuideTipsBar.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_done.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDone, this);
    };
    FieldGuideTipsBar.prototype.onRefreshCommonUI = function () {
        // this.btn_done.enabled = true;
        // var player = DataManager.instance.playerM.player;
        // this.fgItemBase.data = this.param.data.fishID;
        // this.fData = this.param.data.crownInfo;
        // if (this.fData.isUnlock) {
        // 	if (!player.getFishIsCanBuy(this.fData.id)) {
        // 		this.currentState = "award";
        // 		this.lab_hasCrown.text = `${this.fData.crown}/${this.fData.model.starMax}`;
        // 		if (this.fData.crown == this.fData.model.starMax) {
        // 			this.btn_done.enabled = !this.fData.hasArtifact;
        // 			this.btn_done.icon = this.fData.hasArtifact ? "btn_icon_reward_png" : "btn_icon_confirm_png";
        // 		} else {
        // 			this.btn_done.enabled = false;
        // 			this.btn_done.icon = "btn_icon_confirm_png";
        // 		}
        // 	} else {
        // 		this.currentState = "buy";
        // 		this.lab_hasCrown.text = `${this.fData.crown}/${this.fData.model.starMax}`;
        // 		this.price = UnitDefine.getTrueInfinite(this.fData.modelLvFirst.lvConsume.num, PLAYER_EFFECT.PRICE_RATE).num;
        // 		this.curr.data = new CurrencyParam("价格：", ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, this.price), true);
        // 		this.lab_buyTime.text = `${DataManager.instance.playerM.player.getFishAndCrownSum(this.fData.id)}/${this.fData.model.starMax}`;
        // 		this.btn_done.icon = "btn_icon_buy_png";
        // 	}
        // 	this.currArtifact.data = new CurrencyParam("", ModelAward.onParseByParam(GOODS_TYPE.ARTIFACT, 0, this.fData.model.shenqidian), true);
        // } else {
        // 	this.currentState = "lock";
        // 	var tiaojian = this.fData.model.tiaojian;
        // 	var currAward: ModelAward;
        // 	var currStr: string = "";
        // 	var model: ModelFish;
        // 	for (var key in tiaojian) {
        // 		currAward = tiaojian[key];
        // 		if (currAward.type == FIELDGUIDE_UNLOCK_TYPE.NEED_FISH_CROWN) {
        // 			model = ModelManager.instance.modelFish[currAward.id];
        // 			// currStr += `${Language.instance.getDescByKey(model.name)}获得${model.starMax}个皇冠\n`;
        // 		}
        // 	}
        // 	this.lab_unlockDsc.text = currStr;
        // }
        // this.currency_gold.data = new CurrencyParam("", this.fData.modelLvFirst.commonReward, true);
        // this.currency_outPut.data = new CurrencyParam("", this.fData.modelLvFirst.bubbleReward[0], true);
        // this.lab_desc.text = `${Language.instance.getDescByKey(this.fData.model.desc)}`;
    };
    FieldGuideTipsBar.prototype.onUpdate = function (param) {
        _super.prototype.onUpdate.call(this, param);
        this.onRefreshCommonUI();
    };
    FieldGuideTipsBar.prototype.onTouchDone = function () {
        // switch (this.currentState) {
        // 	case "buy":
        // 		this.onTouchBtnHandler();
        // 		break;
        // 	case "lock":
        // 		break;
        // 	case "award":
        // 		DataManager.instance.playerM.onSendRewardHeavenMsg(this.fData.id);
        // 		this.onTouchClose();
        // 		break;
        // }
    };
    FieldGuideTipsBar.prototype.onTouchBtnHandler = function () {
        // var player = DataManager.instance.playerM.player;
        // if (!player.getFishIsCanBuy(this.fData.id)) {
        // 	GameCommon.instance.addAlert(Language.instance.getDescByKey(`is_fish_upper_limit`));
        // 	return;
        // }
        // if (this.fData.modelLvFirst.lvConsume.type == SHOP_TYPE.GOID) {
        // 	if (this.price > player.getCurrency(SHOP_TYPE.GOID)) {
        // 		GameCommon.instance.addAlert(Language.instance.getDescByKey(`error_tips3`));
        // 		return;
        // 	}
        // }
        // this.onBuyHandler();
    };
    FieldGuideTipsBar.prototype.onBuyHandler = function () {
        // var player = DataManager.instance.playerM.player;
        // var one = player.getNewOneFish(this.fData.id);
        // if (player.isInFieldGuideByIndex(this.fData.id)) {
        // 	GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
        // }
        // player.addGoldAndUpgrade(-this.price);
        // var hint: string = Language.instance.getDescByKey(`fieldguide_buy_fish_succeed`, Language.instance.getDescByKey(this.fData.model.name));
        // GameCommon.instance.addAlert(hint);
        // DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFieldGuideBuy(this.fData.id, 1));
        // this.onRefreshCommonUI();
    };
    FieldGuideTipsBar.prototype.onTouchBuy = function () {
        // if (this.param.data.type == SHOP_TYPE.GOID) {
        // 	if (this.buyBar.sum > this.buyBar.ownCurrency()) {
        // 		GameCommon.instance.addAlert(`货币不足`);
        // 		return;
        // 	}
        // 	var one: FishData;
        // 	var len = this.buyBar.num;
        // 	DataManager.instance.syncM.onAddMessage(SyncFactory.onPackExchange(this.param.data.id, this.buyBar.num));
        // 	for (var i: number = 0; i < len; i++) {
        // 		one = DataManager.instance.playerM.player.getNewOneFish(this.param.data.reward.id);
        // 		if (DataManager.instance.playerM.player.getFishByLoction(FISH_POST.WATERVAT).length < 20) {
        // 			one.pool = FISH_POST.WATERVAT;
        // 			DataManager.instance.syncM.onAddMessage(SyncFactory.onPackMove(one.uid, FISH_POST.WATERVAT));
        // 			GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
        // 		}
        // 	}
        // 	DataManager.instance.playerM.player.addGoldAndUpgrade(-this.param.data.cosume[0].num);
        // }
        // this.onTouchClose();
    };
    FieldGuideTipsBar.prototype.onTouchClose = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_CLOSE, false, "ItemIntroducebar");
    };
    return FieldGuideTipsBar;
}(BaseTipsBar));
__reflect(FieldGuideTipsBar.prototype, "FieldGuideTipsBar");
//# sourceMappingURL=FieldGuideTipsBar.js.map