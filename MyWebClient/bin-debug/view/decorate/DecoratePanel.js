var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DecoratePanel = (function (_super) {
    __extends(DecoratePanel, _super);
    function DecoratePanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.curr_index = 0;
        return _this;
    }
    DecoratePanel.prototype.onSkinName = function () {
        this.skinName = skins.DecoratePanelSkin;
    };
    DecoratePanel.prototype.onInit = function () {
        this.scorll.verticalScrollBar.autoVisibility = false;
        this.scorll.verticalScrollBar.visible = false;
        this.list_buwei.itemRenderer = DecorateBuwei;
        this.list_buwei.itemRendererSkinName = skins.DecorateBuweiSkin;
        this.list_buwei.useVirtualLayout = true;
        this.scorll.viewport = this.list_buwei;
        _super.prototype.onInit.call(this);
        //所有的部位
        this.initAllBuWei();
        this.btn_buweis.points[0].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");
        this.btn_buweis.points[1].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");
        this.btn_buweis.points[2].addTriggerFuc(DataManager.instance.playerM.player, "onCheckDecorateCanDressUp");
        this.onRefresh();
    };
    DecoratePanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.niudan_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
        GameDispatcher.instance.addEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
        GameDispatcher.instance.addEventListener(GameEvent.FISH_TANK_EQUIP_EVENT, this.onUpdateOne, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onRefresh, this);
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_PART_EVENT, this.tigger, this);
        this.tigger();
    };
    DecoratePanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.niudan_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
        GameDispatcher.instance.removeEventListener(GameEvent.TABBTN_TOUCH_EVENT, this.onTabBtnTouch, this);
        GameDispatcher.instance.removeEventListener(GameEvent.FISH_TANK_EQUIP_EVENT, this.onUpdateOne, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.DECORATE_GASHAPON_MESSAGE.toString(), this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onRefresh, this);
        GameDispatcher.instance.removeEventListener(FishTankEevent.TANK_REFRESH_PART_EVENT, this.tigger, this);
    };
    DecoratePanel.prototype.onRefresh = function () {
        this.curr_index = -1;
        _super.prototype.onRefresh.call(this);
        this.onTabBtnTouch();
    };
    DecoratePanel.prototype.tigger = function () {
        this.btn_buweis.points[0].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE1);
        this.btn_buweis.points[1].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE2);
        this.btn_buweis.points[2].checkPoint(true, DataManager.instance.playerM.player.currFGID, DECORATE_TYPE.TYPE3);
    };
    /**
     * 初始化所有的部位
     */
    DecoratePanel.prototype.initAllBuWei = function () {
        var buweis = [];
        for (var i = 1; i <= DECORATE_TYPE.SIZE; i++) {
            buweis.push("buwei" + i);
        }
        this.btn_buweis.onUpdate(buweis);
        this.onTabBtnTouch();
        this.btn_buweis.selectIndex = this.curr_index;
    };
    /**
     * 获取
     */
    DecoratePanel.prototype.onGet = function () {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "DecorateGashaponPanel");
    };
    /**
     * 切换部位TAB列表
     */
    DecoratePanel.prototype.onTabBtnTouch = function () {
        if (this.btn_buweis.selectIndex && this.curr_index == this.btn_buweis.selectIndex)
            return;
        var player = DataManager.player;
        if (!this.btn_buweis.selectIndex)
            this.btn_buweis.selectIndex = 0;
        this.curr_index = this.btn_buweis.selectIndex;
        var models = [];
        var modelDecorates = ModelManager.instance.modelDecorate;
        var index = 0;
        for (var key in modelDecorates) {
            var modelDecorate = modelDecorates[key];
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
            }
            else {
                models.push(modelDecorate);
            }
        }
        this.list_buwei.dataProvider = new eui.ArrayCollection(models);
    };
    //更新某一个神器状态
    DecoratePanel.prototype.onUpdateOne = function (event) {
        var _shenqiID = event.data;
        var itemsAry = this.list_buwei.dataProvider;
        var itemSoures = this.list_buwei.dataProvider["source"];
        var index = 0;
        for (var i = 0; i < itemSoures.length; i++) {
            var _data = itemSoures[i];
            if (_shenqiID == _data.id) {
                index = i;
                break;
            }
        }
        itemsAry.itemUpdated(itemsAry.getItemAt(index));
        this.tigger();
    };
    return DecoratePanel;
}(BaseTabView));
__reflect(DecoratePanel.prototype, "DecoratePanel");
var DecorateItem = (function (_super) {
    __extends(DecorateItem, _super);
    function DecorateItem(id) {
        var _this = _super.call(this) || this;
        _this.pos_X = 0;
        _this.points = RedPointManager.createPoint(1);
        _this._selected = false;
        _this.skinName = skins.DecorateItemSkin;
        _this.id = id;
        _this.select_bg.visible = false;
        _this.scene_item.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChangeScene, _this);
        return _this;
    }
    /**
     * 修改鱼塘背景
     */
    DecorateItem.prototype.onChangeScene = function () {
        if (this._selected)
            return;
        var player = DataManager.player;
        //好友家
        if (player.inOtherHome) {
            if (!this.img_lock.visible) {
                GameDispatcher.instance.dispatcherEventWith(GameEvent.DECORATE_SELECT_SCENE_OTHER, false, this.id);
            }
        }
        else {
            if (this.img_lock.visible) {
                var model = ModelManager.instance.modelFieldGuide[this.id + "_0"];
                //显示解锁面板
                var name = Language.instance.getDescByKey(model.name);
                var bl = player.getIsUnlockedAllFishByBook(this.id - 1);
                var type = ALERT_TYPE.COIN;
                if (!bl) {
                    type = ALERT_TYPE.UNLOCK;
                }
                var alertParam = new AlertHintParam(type, Language.instance.getDescByKey("yugang_unlock", name), ModelAward.onParseByParam(GOODS_TYPE.GOLD, 0, model.cost.num));
                alertParam.gameEvent = GameEvent.DECORATE_TANK_UNLOCK;
                alertParam.eventParam = this.id;
                var windowParam = new WindowParam("AlertHint", alertParam);
                GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, windowParam);
                return;
            }
            GameDispatcher.instance.dispatcherEventWith(GameEvent.DECORATE_SELECT_SCENE, false, this.id);
            //修改背景图
            player.currFGID = this.id;
            GameDispatcher.instance.dispatcherEventWith(FishTankEevent.TANK_REFRESH_SHOW_EVENT, false);
        }
    };
    DecorateItem.prototype.onUnlockTank = function () {
    };
    DecorateItem.prototype.onSelect = function (bool) {
        if (this._selected != bool) {
            this._selected = bool;
            this.select_bg.visible = this._selected;
            var player = DataManager.player;
        }
    };
    DecorateItem.prototype.onRefresh = function () {
        //好友家
        if (DataManager.player.inOtherHome) {
            var otherPlayer = DataManager.instance.visite.player;
            var book = otherPlayer.book[this.id];
            if (book) {
                this.img_lock.visible = false;
                this.img_mask.visible = false;
            }
            else {
                this.img_lock.visible = true;
                this.img_mask.visible = true;
            }
        }
        else {
            this.points[0].register(this, GameDefine.RED_MAIN_POS, DataManager.instance.playerM.player, "onCheckBookRedPointByBID", this.id);
            this.trigger();
            var player = DataManager.player;
            var book = player.getBookByID(this.id);
            if (book) {
                this.img_lock.visible = false;
                this.img_mask.visible = false;
            }
            else {
                this.img_lock.visible = true;
                this.img_mask.visible = !player.getIsUnlockedAllFishByBook(this.id - 1);
            }
        }
        var models = ModelManager.instance.modelFieldGuide;
        var model = models[this.id + "_0"];
        if (!model) {
            return;
        }
        this.label_scene.text = Language.instance.getDescByKey(model.name);
        this.scene_icon.source = model.icon;
    };
    DecorateItem.prototype.trigger = function () {
        if (this.points[0]) {
            this.points[0].checkPoint();
        }
    };
    return DecorateItem;
}(eui.Component));
__reflect(DecorateItem.prototype, "DecorateItem");
var DecorateBuwei = (function (_super) {
    __extends(DecorateBuwei, _super);
    function DecorateBuwei() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
        // this.skinName = skins.DecorateBuweiSkin;
    }
    DecorateBuwei.prototype.onComplete = function () {
        this.btn_cloth.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClothHanlder, this);
    };
    DecorateBuwei.prototype.dataChanged = function () {
        var player = DataManager.instance.playerM.player;
        var model = this.data;
        var lv = player.decorate_active[model.id];
        if (!model) {
            return;
        }
        if (model.icon.length > 3)
            this.icon.source = model.icon;
        this.itemq.source = GameCommon.instance.getQualityFrame(model.pinzhi); //shenqi_add_desc
        this.label_name.text = model.name;
        if (lv > 0) {
            this.label_desc.text = Language.instance.getDescByKey("shenqi_add_desc", (ModelDecorate.getEffect(model.pinzhi, lv) / 100) + "%");
            this.label_lv.text = "Lv." + lv;
            this.btn_cloth.enabled = true;
        }
        else {
            this.label_desc.text = Language.instance.getDescByKey("shenqi_add_desc", (ModelDecorate.getEffect(model.pinzhi, 1) / 100) + "%");
            this.label_lv.text = "未激活";
            this.btn_cloth.enabled = false;
        }
        this.cloth_label.text = "";
        var _currClothId = player.decorate_show[player.currFGID + "_" + model.buwei];
        var _modelId = parseInt(model.id);
        if (_currClothId && _currClothId == _modelId) {
            this.btn_cloth.visible = false;
            this.label_cloth.visible = true;
        }
        else {
            this.btn_cloth.visible = true;
            this.label_cloth.visible = false;
            for (var key in player.decorate_show) {
                var _shenqiID = player.decorate_show[key];
                if (_shenqiID == _modelId) {
                    var _tankId = parseInt(key.slice(0, key.search("_")));
                    var _tankmodel = ModelManager.instance.modelFieldGuide[_tankId + "_0"];
                    this.cloth_label.text = "\u88C5\u914D\u4E8E\uFF1A" + Language.instance.getDescByKey(_tankmodel.name);
                    break;
                }
            }
        }
    };
    DecorateBuwei.prototype.onClothHanlder = function () {
        var model = this.data;
        var player = DataManager.instance.playerM.player;
        var lv = player.decorate_active[this.data.id];
        if (!lv || lv == 0) {
            GameCommon.instance.addAlertError(19);
            return;
        }
        //修改部位图
        var saveKey = player.currFGID + "_" + model.buwei;
        var _oldShenqiId = player.decorate_show[saveKey];
        for (var key in player.decorate_show) {
            var _shenqiID = player.decorate_show[key];
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
    };
    return DecorateBuwei;
}(eui.ItemRenderer));
__reflect(DecorateBuwei.prototype, "DecorateBuwei");
//# sourceMappingURL=DecoratePanel.js.map