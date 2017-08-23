var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AchievementPanel = (function (_super) {
    __extends(AchievementPanel, _super);
    function AchievementPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.Item_Max = 0;
        return _this;
    }
    AchievementPanel.prototype.onSkinName = function () {
        this.skinName = skins.AchievementPanelSkin;
    };
    AchievementPanel.prototype.onInit = function () {
        this.setTitle("chengjiu_png");
        this.items = {};
        for (var id in ModelManager.instance.modelAchieve) {
            var model = ModelManager.instance.modelAchieve[id];
            var item = new AchievementItem(model);
            this.list_grp.addChild(item);
            this.items[model.id] = item;
            this.Item_Max++;
        }
        _super.prototype.onInit.call(this);
    };
    AchievementPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        for (var index in this.items) {
            var item = this.items[index];
            item.onRegist();
            item.onRefresh();
        }
        GameDispatcher.instance.addEventListener(GameEvent.ACHIEVE_UPDATE_EVENT, this.onUpdate, this);
    };
    AchievementPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        for (var index in this.items) {
            var item = this.items[index];
            item.onRemove();
        }
        GameDispatcher.instance.removeEventListener(GameEvent.ACHIEVE_UPDATE_EVENT, this.onUpdate, this);
    };
    AchievementPanel.prototype.onUpdate = function (event) {
        var achieveId = event.data;
        var item = this.items[achieveId];
        if (item) {
            item.onRefresh();
        }
    };
    return AchievementPanel;
}(BaseWindowPanel));
__reflect(AchievementPanel.prototype, "AchievementPanel");
var AchievementItem = (function (_super) {
    __extends(AchievementItem, _super);
    function AchievementItem(model) {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.model = model;
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        _this.skinName = skins.AchievementItemSkin;
        return _this;
    }
    AchievementItem.prototype.onInit = function () {
        this.icon.source = this.model.icon;
        var modelThing = GameCommon.instance.getThingModel(this.model.reward.type, this.model.reward.id);
        if (modelThing)
            this.award_icon.source = modelThing.icon;
        this.points[0].register(this.award_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.achieveM, "onCheckAchieveReceiveByID", this.model.id);
    };
    AchievementItem.prototype.onRefresh = function () {
        var _achieveData = DataManager.instance.achieveM.getAchieveData(this.model.id);
        var _currTargetPro = DataManager.instance.achieveM.getCurrTargetPro(this.model.id);
        this.progress_label.text = "\u8FDB\u5EA6\uFF1A" + _achieveData.progress.toTextFormat() + "/" + GameCommon.toTextFormat(_currTargetPro);
        this.name_label.text = Language.instance.getDescByKey(this.model.name, GameCommon.toTextFormat(_currTargetPro));
        this.award_num_label.text = "×" + this.model.reward.num;
        if (_achieveData.progress.num >= _currTargetPro) {
            this.award_btn.enabled = (_achieveData.rewardPro.num < this.model.end);
            this.award_btn.skinName = skins.Comn_Btn_GreenSkin;
            this.award_btn.icon = this.award_btn.enabled ? "btn_icon_confirm_png" : "btn_icon_reward_png";
        }
        else {
            this.award_btn.skinName = skins.Comn_Btn_BlueSkin;
            this.award_btn.icon = "btn_icon_goto_png";
            this.award_btn.enabled = true;
        }
        this.trigger();
    };
    AchievementItem.prototype.trigger = function () {
        this.points[0].checkPoint();
    };
    AchievementItem.prototype.onRegist = function () {
        this.award_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    AchievementItem.prototype.onRemove = function () {
        this.award_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    AchievementItem.prototype.onTouchBtn = function () {
        if (this.award_btn.icon == "btn_icon_goto_png") {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, false, new ViewGoType(this.model.goType, null));
        }
        else if (this.award_btn.icon == "btn_icon_confirm_png") {
            DataManager.instance.achieveM.onSendAchieveRewardMsg(this.model.id);
        }
    };
    return AchievementItem;
}(eui.Component));
__reflect(AchievementItem.prototype, "AchievementItem");
//# sourceMappingURL=AchievementPanel.js.map