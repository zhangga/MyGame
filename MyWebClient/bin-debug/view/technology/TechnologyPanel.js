var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TechnologyPanel = (function (_super) {
    __extends(TechnologyPanel, _super);
    function TechnologyPanel(owner) {
        return _super.call(this, owner) || this;
    }
    TechnologyPanel.prototype.onSkinName = function () {
        this.skinName = skins.TechnologyPanelSkin;
    };
    TechnologyPanel.prototype.onInit = function () {
        this.items = [];
        this.technology_list.itemRenderer = TechnologyItem;
        this.technology_list.itemRendererSkinName = skins.TechnologyItemSkin;
        this.technology_list.useVirtualLayout = true;
        this.scorll.viewport = this.technology_list;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    TechnologyPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        GameDispatcher.instance.addEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpgradeSuccess, this);
        GameDispatcher.instance.addEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
    };
    TechnologyPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        GameDispatcher.instance.removeEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpgradeSuccess, this);
        GameDispatcher.instance.removeEventListener(GameEvent.PLAYER_CURRENCY_UPDATE, this.onTimecall, this);
    };
    Object.defineProperty(TechnologyPanel.prototype, "player", {
        get: function () {
            return DataManager.instance.playerM.player;
        },
        enumerable: true,
        configurable: true
    });
    TechnologyPanel.prototype.onRefresh = function () {
        var _fishDatas = this.player.getFishByLoction(this.player.currFGID);
        var _fishtankModel = ModelManager.instance.modelFieldGuide[this.player.currFGID + "_1"];
        var _technologyIDs = [];
        for (var i = 0; i < _fishtankModel.kejiId.length; i++) {
            var _techID = parseInt(_fishtankModel.kejiId[i]);
            if (DataManager.instance.technology.getNextModel(_techID))
                _technologyIDs.push(_techID);
        }
        for (var i = 0; i < _fishDatas.length; i++) {
            var _fishModel = _fishDatas[i].model;
            for (var j = 0; j < _fishModel.kejiId.length; j++) {
                var _tecID = parseInt(_fishModel.kejiId[j]);
                if (DataManager.instance.technology.getNextModel(_tecID) && _technologyIDs.indexOf(_tecID) < 0) {
                    _technologyIDs.push(_tecID);
                }
            }
        }
        _technologyIDs = _technologyIDs.sort(function (aID, bID) {
            var modelA = DataManager.instance.technology.getNextModel(aID);
            var modelB = DataManager.instance.technology.getNextModel(bID);
            var sortA = modelA ? modelA.cost.num : TECHNOLOGY_TYPE.SIZE - DataManager.instance.technology.getCurrModel(aID).type;
            var sortB = modelB ? modelB.cost.num : TECHNOLOGY_TYPE.SIZE - DataManager.instance.technology.getCurrModel(bID).type;
            return sortA - sortB;
        });
        this.technology_list.dataProvider = new eui.ArrayCollection(_technologyIDs);
    };
    TechnologyPanel.prototype.onUpgradeSuccess = function (event) {
        var _technologyID = event.data;
        var itemsAry = this.technology_list.dataProvider;
        var itemSoures = this.technology_list.dataProvider["source"];
        var index = 0;
        for (var i = 0; i < itemSoures.length; i++) {
            var _id = itemSoures[i];
            if (_id == _technologyID) {
                index = i;
                break;
            }
        }
        if (!DataManager.instance.technology.getNextModel(_technologyID)) {
            itemsAry.removeItemAt(index);
        }
        else {
            itemsAry.itemUpdated(itemsAry.getItemAt(index));
        }
    };
    TechnologyPanel.prototype.onTimecall = function () {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].trigger();
        }
    };
    return TechnologyPanel;
}(BaseTabView));
__reflect(TechnologyPanel.prototype, "TechnologyPanel");
var TechnologyItem = (function (_super) {
    __extends(TechnologyItem, _super);
    function TechnologyItem(id) {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    TechnologyItem.prototype.onComplete = function () {
        this.upgrade_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    TechnologyItem.prototype.dataChanged = function () {
        var technology_id = this.data;
        this.points[0].register(this.upgrade_btn, GameDefine.RED_TECHNOLOGY_BTN, DataManager.instance.technology, "onCheckTechnologyByType", technology_id);
        var currLevel = DataManager.instance.technology.getTechnologyLevel(technology_id);
        this.level_label.text = "Lv." + currLevel;
        var currModel = DataManager.instance.technology.getCurrModel(technology_id);
        var nextModel = DataManager.instance.technology.getNextModel(technology_id);
        var model = currModel ? currModel : nextModel;
        var addValueStr = "";
        if (nextModel) {
            addValueStr = Math.floor((nextModel.baifenbi + 100) / (currModel ? currModel.baifenbi + 100 : 100) * 100) + "%";
        }
        this.name_label.text = Language.instance.getDescByKey(model.name);
        this.icon.source = model.icon;
        if (addValueStr)
            this.desc_label.text = Language.instance.getDescByKey("technology" + model.type + "_desc", addValueStr);
        else
            this.desc_label.text = "";
        this.consume_grp.visible = nextModel ? true : false;
        if (nextModel) {
            var consumeObj = GameCommon.instance.getThingModel(nextModel.cost.type, nextModel.cost.id);
            this.money_icon.source = consumeObj.icon;
            this.consume_label.text = nextModel.cost.numFormat;
        }
        this.trigger();
    };
    TechnologyItem.prototype.onupdateCost = function () {
        var nextModel = DataManager.instance.technology.getNextModel(this.data);
        if (nextModel) {
            this.upgrade_btn.visible = true;
            var hasMoneyNum = DataManager.instance.playerM.player.getCurrency(nextModel.cost.type);
            var costMoneyNum = nextModel.cost.num;
            this.upgrade_btn.enabled = hasMoneyNum >= costMoneyNum;
            this.full_desc_label.visible = false;
        }
        else {
            this.upgrade_btn.visible = false;
            this.full_desc_label.visible = true;
        }
    };
    TechnologyItem.prototype.onUpgrade = function () {
        DataManager.instance.technology.onSendUpgradeMsg(this.data);
        GameCommon.instance.addAnimation(this, "liebiaoshuaxin", new egret.Point(287, 64), 1, true);
    };
    TechnologyItem.prototype.trigger = function () {
        this.points[0].checkPoint();
        this.onupdateCost();
    };
    return TechnologyItem;
}(eui.ItemRenderer));
__reflect(TechnologyItem.prototype, "TechnologyItem");
//# sourceMappingURL=TechnologyPanel.js.map