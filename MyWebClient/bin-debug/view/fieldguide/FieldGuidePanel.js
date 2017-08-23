var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FieldGuidePanel = (function (_super) {
    __extends(FieldGuidePanel, _super);
    function FieldGuidePanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.points = RedPointManager.createPoint(3);
        return _this;
    }
    FieldGuidePanel.prototype.onSkinName = function () {
        this.skinName = skins.FieldGuidePanelSkin;
    };
    FieldGuidePanel.prototype.onInit = function () {
        this.setTitle("fieldGuide_title_png", true, "public_pop_titleBg2_png");
        DataManager.instance.fieldGuide;
        var models = ModelManager.instance.modelFieldGuide;
        this.pos = [];
        for (var i = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
            this.pos.push(new egret.Point(this["item" + i].x, this["item" + i].y));
            this["item" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToucItemhHandler, this);
        }
        this.points[0].register(this.btn_left, GameDefine.RED_TAB_POS, DataManager.instance.fieldGuide, "onCheckRedPointByFDID");
        this.points[1].register(this.btn_right, GameDefine.RED_TAB_POS, DataManager.instance.fieldGuide, "onCheckRedPointByFDID");
        this.points[2].register(this.btn_unLock, GameDefine.RED_TAB_POS, this, "onCheckUnlockNew");
        _super.prototype.onInit.call(this);
        this.index = DataManager.instance.playerM.player.openFGID;
    };
    FieldGuidePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.trigger, this);
        GameDispatcher.instance.addEventListener(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, this.onRefresh, this);
        this.btn_unLock.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnLockHandler, this);
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
        DataManager.instance.syncM.onSendQue(); //提前同步5秒操作
    };
    FieldGuidePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.trigger, this);
        GameDispatcher.instance.removeEventListener(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, this.onRefresh, this);
        this.btn_unLock.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnLockHandler, this);
        this.btn_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
        this.btn_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
    };
    FieldGuidePanel.prototype.onRefresh = function () {
        // var player = DataManager.instance.playerM.player;
        // this.lab_crownNum.text = `x${player.crown}`;
        // var modelFish: ModelFish;
        // var models = ModelManager.instance.modelFieldGuide;
        // var model: ModelFieldGuide = ModelManager.instance.modelFieldGuide[this.index];
        // var param: number;
        // for (var i: number = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
        // 	param = parseInt(model.jiegou[i]);
        // 	this[`item${i}`].visible = param != 0;
        // 	if (param != 0) {
        // 		this[`item${i}`].data = new FieldGuideItemParam(param, model.jiegou);
        // 		modelFish = ModelManager.instance.modelFish[param];
        // 		if (modelFish) {
        // 			this[`item${i}`].y = this.pos[i].y + modelFish.offY;
        // 		}
        // 	}
        // }
        // var nextID: number = Number(this.index) + 1;
        // var next: ModelFieldGuide = ModelManager.instance.modelFieldGuide[nextID];
        // if (next && player.openFGID < nextID) {
        // 	var crownInfo = player.getCrownHasAndTotalByPage(next.tiaojian.id);
        // 	this.btn_unLock.visible = true;
        // 	this.btn_unLock.scaleY = 1;
        // 	if (crownInfo[0] >= next.tiaojian.num && next.tiaojian.type == FIELDGUIDE_UNLOCK_TYPE.NEDD_CROWN_NUM) {
        // 		this.btn_unLock.enabled = true;
        // 	} else {
        // 		this.btn_unLock.enabled = false;
        // 	}
        // 	this.lab_total.visible = true;
        // 	this.lab_total.text = `当前页累计皇冠${crownInfo[0]}/${next.tiaojian.num}`;
        // } else {
        // 	this.lab_total.visible = false;
        // 	this.btn_unLock.visible = false;
        // 	this.btn_unLock.scaleY = 0;
        // }
        // this.lab_page.text = `${this.index}/${GameDefine.PLAYER_FIELDGUIDE_MAX}`;
        // this.layerUp.visible = this.index != 1;
        // this.layerDown.visible = (this.index != GameDefine.PLAYER_FIELDGUIDE_MAX && this.index < DataManager.instance.playerM.player.openFGID);
        // this.trigger();
    };
    FieldGuidePanel.prototype.onCheckUnlockNew = function () {
        return this.btn_unLock.enabled;
    };
    FieldGuidePanel.prototype.onTouchLeftHander = function () {
        if (this.index > 1) {
            this.index--;
        }
    };
    FieldGuidePanel.prototype.onTouchRightHander = function () {
        if (this.index + 1 > DataManager.instance.playerM.player.openFGID) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("fieldGuide_not_unlock"));
            return;
        }
        if (this.index < GameDefine.PLAYER_FIELDGUIDE_MAX) {
            this.index++;
        }
    };
    FieldGuidePanel.prototype.onTouchBtnHandler = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "WarehousePanel");
    };
    FieldGuidePanel.prototype.onTouchBtnLockHandler = function () {
        ++DataManager.instance.playerM.player.openFGID;
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackUnlockFieldGuide(DataManager.instance.playerM.player.openFGID));
        GameDispatcher.instance.dispatcherEventWith(GameEvent.FIELDGUIDE_DEBLOCKING_EVENT, false);
    };
    Object.defineProperty(FieldGuidePanel.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (param) {
            if (this.index != param) {
                this._index = param;
                this.onRefresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    FieldGuidePanel.prototype.onToucItemhHandler = function (e) {
    };
    FieldGuidePanel.prototype.trigger = function () {
        this.points[0].checkPoint(true, this.index - 1);
        this.points[1].checkPoint(true, this.index + 1);
        this.points[2].checkPoint();
        for (var i = 0; i < GameDefine.FIELDGUIDE_PAGE_NUM; i++) {
            this["item" + i].trigger();
        }
    };
    return FieldGuidePanel;
}(BaseWindowPanel));
__reflect(FieldGuidePanel.prototype, "FieldGuidePanel");
var FieldGuideItemBase = (function (_super) {
    __extends(FieldGuideItemBase, _super);
    function FieldGuideItemBase() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.FieldGuideItemBaseSkin;
        return _this;
    }
    FieldGuideItemBase.prototype.onInit = function () {
        // var player = DataManager.instance.playerM.player;
        // this.crownInfo = player.getCrownInfoByID(this._data);//解锁情况
        // this.img_fish.source = this.crownInfo.model.icon;
        // this.lab_name.text = Language.instance.getDescByKey(this.crownInfo.model.name);
        // this.crownbar.data = this.crownInfo;
        // this._isUnlock = this.crownInfo.isUnlock;
        // this.lockLayer.visible = !this.state;
        // this.bg_img.source = this.crownInfo.crown == this.crownInfo.model.starMax ? "fieldGuide_item_bg2_png" : "fieldGuide_item_bg_png";
    };
    Object.defineProperty(FieldGuideItemBase.prototype, "state", {
        get: function () {
            return this._isUnlock;
        },
        enumerable: true,
        configurable: true
    });
    return FieldGuideItemBase;
}(BaseComp));
__reflect(FieldGuideItemBase.prototype, "FieldGuideItemBase");
var FieldGuideItem = (function (_super) {
    __extends(FieldGuideItem, _super);
    function FieldGuideItem() {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.skinName = skins.FieldGuideItemSkin;
        return _this;
    }
    FieldGuideItem.prototype.onInit = function () {
        // if (!this.infoLayer.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
        // 	this.infoLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchInfoHandler, this)
        // }
        // this.fishID = this._data.fishID;
        // this.points[0].register(this, GameDefine.RED_FIELD_ITEM_POS, DataManager.instance.fieldGuide, "onCheckRedPontByFishID", this.fishID);
        // this.infoLayer.data = this._data.fishID;
        // this.crownInfo = this.infoLayer.crownInfo;
        // var player = DataManager.instance.playerM.player;
        // this.infoLayer.rotation = this.infoLayer.crownInfo.model.angle;
        // this.price = UnitDefine.getTrueInfinite(this.crownInfo.modelLvFirst.lvConsume.num, PLAYER_EFFECT.PRICE_RATE).num;
        // var fishIndex: number = this._data.jiegou.indexOf(this._data.fishID.toString());
        // var len: number = this.crownInfo.model.next.length;
        // var childIndex: number;
        // for (var i: number = 0; i < 5; i++) {
        // 	this[`img_${i}`].visible = false;
        // }
        // for (var i: number = 0; i < len; i++) {
        // 	if (this.crownInfo.model.next[i] == "0") continue;
        // 	childIndex = this._data.jiegou.indexOf(this.crownInfo.model.next[i]);
        // 	var distance: number = childIndex - fishIndex;
        // 	distance = Math.max(0, distance);
        // 	this[`img_${distance}`].visible = true;
        // 	if (this[`img_${distance}`].visible) {
        // 		if (!player.getCrownInfoByID(parseInt(this.crownInfo.model.next[i])).isUnlock) {
        // 			this[`img_${distance}`].source = `fieldGuide_${distance == 3 || distance == 1 || distance == 5 ? "arrow" : "line"}_0_png`;
        // 			this.arrowLayer.addChild(this[`img_${distance}`]);
        // 		} else {
        // 			this[`img_${distance}`].source = `fieldGuide_${distance == 3 || distance == 1 || distance == 5 ? "arrow" : "line"}_1_png`;
        // 		}
        // 	}
        // }
        // this.trigger();
    };
    FieldGuideItem.prototype.onTouchInfoHandler = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("ItemIntroducebar", new IntroduceBarParam(INTRODUCE_TYPE.FIELDGUIDE, this)));
    };
    FieldGuideItem.prototype.onTouchBtnHandler = function () {
        // var player = DataManager.instance.playerM.player;
        // if (this.infoLayer.state) {
        // 	if (!player.getFishIsCanBuy(this.crownInfo.id)) {
        // 		GameCommon.instance.addAlert(Language.instance.getDescByKey(`is_fish_upper_limit`));
        // 		return;
        // 	}
        // 	if (this.crownInfo.modelLvFirst.lvConsume.type == SHOP_TYPE.GOID) {
        // 		if (this.price > player.getCurrency(SHOP_TYPE.GOID)) {
        // 			GameCommon.instance.addAlert(Language.instance.getDescByKey(`error_tips3`));
        // 			return;
        // 		}
        // 		var warnParam: WarningParam = new WarningParam(Language.instance.getDescByKey("fieldguide_buy_fish_notice", Language.instance.getDescByKey(this.crownInfo.model.name)), this.onBuyHandler, this);
        // 		GameCommon.instance.onShowWarnigPanel(warnParam);
        // 	}
        // }
    };
    FieldGuideItem.prototype.onBuyHandler = function () {
        var player = DataManager.instance.playerM.player;
        DataManager.instance.syncM.onAddMessage(SyncFactory.onPackFieldGuideBuy(this._data.fishID, 1));
        var one = player.getNewOneFish(this._data.fishID);
        GameDispatcher.instance.dispatcherEventWith(FishTankEevent.FISH_INPUT_EVENT, false, one);
        player.addGoldAndUpgrade(-this.price);
        var hint = Language.instance.getDescByKey("fieldguide_buy_fish_succeed", Language.instance.getDescByKey(this.crownInfo.model.name));
        GameCommon.instance.addAlert(hint);
    };
    FieldGuideItem.prototype.trigger = function () {
        this.points[0].checkPoint();
    };
    return FieldGuideItem;
}(BaseComp));
__reflect(FieldGuideItem.prototype, "FieldGuideItem");
var FieldGuideItemParam = (function () {
    function FieldGuideItemParam(fishID, jiegou) {
        this.fishID = fishID;
        this.jiegou = jiegou;
    }
    return FieldGuideItemParam;
}());
__reflect(FieldGuideItemParam.prototype, "FieldGuideItemParam");
var FieldGuideTabBtn = (function (_super) {
    __extends(FieldGuideTabBtn, _super);
    function FieldGuideTabBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.FieldGuideTabBtnSkin;
        return _this;
    }
    FieldGuideTabBtn.prototype.onInit = function () {
        this.btn_type.label = Language.instance.getDescByKey(this._data.name);
    };
    Object.defineProperty(FieldGuideTabBtn.prototype, "selected", {
        set: function (param) {
            this.btn_type.selected = param;
        },
        enumerable: true,
        configurable: true
    });
    FieldGuideTabBtn.prototype.setEnabled = function (param) {
        this.btn_type.enabled = param;
    };
    return FieldGuideTabBtn;
}(BaseComp));
__reflect(FieldGuideTabBtn.prototype, "FieldGuideTabBtn");
//# sourceMappingURL=FieldGuidePanel.js.map