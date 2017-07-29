var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DailyTaskPanel = (function (_super) {
    __extends(DailyTaskPanel, _super);
    function DailyTaskPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.Item_Max = 0;
        return _this;
    }
    DailyTaskPanel.prototype.onSkinName = function () {
        this.skinName = skins.DailyTaskPanelSkin;
    };
    DailyTaskPanel.prototype.onInit = function () {
        this.setTitle("dailytask_title_png");
        this.items = {};
        this.award_num_label.text = "×" + GameDefine.DAILYTASK_COMP_NUM;
        for (var id in ModelManager.instance.modelDailyTask) {
            var model = ModelManager.instance.modelDailyTask[id];
            var item = new DailyTaskItem(model);
            this.list_grp.addChild(item);
            this.items[model.id] = item;
            this.Item_Max++;
        }
        this.points[0].register(this.reward_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.taskM, "onCheckAllTaskAwardRedPoint");
        _super.prototype.onInit.call(this);
    };
    DailyTaskPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        for (var index in this.items) {
            var item = this.items[index];
            item.onRegist();
            item.onRefresh();
        }
        GameDispatcher.instance.addEventListener(GameEvent.DAILY_TASK_UPDATE_EVT, this.onUpdate, this);
        this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
        this.onRefreshCompNum();
        this.points[0].checkPoint();
    };
    DailyTaskPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        for (var index in this.items) {
            var item = this.items[index];
            item.onRemove();
        }
        GameDispatcher.instance.removeEventListener(GameEvent.DAILY_TASK_UPDATE_EVT, this.onUpdate, this);
        this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReward, this);
    };
    DailyTaskPanel.prototype.onUpdate = function (event) {
        var taskId = event.data;
        var item = this.items[taskId];
        if (item) {
            item.onRefresh();
        }
        this.onRefreshCompNum();
    };
    DailyTaskPanel.prototype.onRefreshCompNum = function () {
        var _taskcompNum = DataManager.instance.taskM.DailyTaskCompNum;
        this.total_pro_label.text = _taskcompNum + "/" + this.Item_Max;
        var _taskData = DataManager.instance.taskM.getDailyTaskData(0);
        if (_taskcompNum >= this.Item_Max) {
            this.reward_btn.enabled = !_taskData.isReward;
            this.reward_btn.icon = !_taskData.isReward ? "btn_icon_confirm_png" : "btn_icon_reward_png";
        }
        else {
            this.reward_btn.enabled = false;
            this.reward_btn.icon = "btn_icon_confirm_png";
        }
    };
    DailyTaskPanel.prototype.onReward = function () {
        DataManager.instance.taskM.onSendDailyTaskRewardMsg(0);
    };
    return DailyTaskPanel;
}(BaseWindowPanel));
__reflect(DailyTaskPanel.prototype, "DailyTaskPanel");
var DailyTaskItem = (function (_super) {
    __extends(DailyTaskItem, _super);
    function DailyTaskItem(model) {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(1);
        _this.model = model;
        _this.once(egret.Event.COMPLETE, _this.onInit, _this);
        _this.skinName = skins.DailyTaskItemSkin;
        return _this;
    }
    DailyTaskItem.prototype.onInit = function () {
        this.icon.source = this.model.icon;
        this.name_label.text = this.model.name;
        var effectModel = ModelManager.instance.modelEffect[this.model.effectId];
        this.awd_desc_label.text = "奖励：" + effectModel.desc;
    };
    DailyTaskItem.prototype.onRefresh = function () {
        this.points[0].register(this.award_btn, GameDefine.RED_DAILYTASK_POS, DataManager.instance.taskM, "onCheckDailyTaskReceiveByID", this.model.id);
        var _taskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
        this.progress_label.text = "\u8FDB\u5EA6\uFF1A" + _taskData.progress + "/" + this.model.count;
        if (_taskData.progress >= this.model.count) {
            this.award_btn.enabled = !_taskData.isReward;
            this.award_btn.skinName = skins.Comn_Btn_GreenSkin;
            this.award_btn.icon = !_taskData.isReward ? "btn_icon_confirm_png" : "btn_icon_reward_png";
        }
        else {
            this.award_btn.skinName = skins.Comn_Btn_BlueSkin;
            this.award_btn.icon = "btn_icon_goto_png";
            this.award_btn.enabled = true;
        }
        this.trigger();
    };
    DailyTaskItem.prototype.trigger = function () {
        this.points[0].checkPoint();
    };
    DailyTaskItem.prototype.onRegist = function () {
        this.award_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    DailyTaskItem.prototype.onRemove = function () {
        this.award_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    };
    DailyTaskItem.prototype.onTouchBtn = function () {
        var _taskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
        if (_taskData.progress >= this.model.count) {
            if (!_taskData.isReward) {
                DataManager.instance.taskM.onSendDailyTaskRewardMsg(this.model.id);
            }
        }
        else {
            GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_GOTYPE_OPEN_WINDOW, false, new ViewGoType(this.model.goType, null));
        }
    };
    Object.defineProperty(DailyTaskItem.prototype, "sort", {
        //序号
        get: function () {
            var _sortIndex = this.model.id;
            var _taskData = DataManager.instance.taskM.getDailyTaskData(this.model.id);
            if (_taskData.isReward) {
                _sortIndex = _sortIndex * 100;
            }
            else if (_taskData.progress < this.model.count) {
                _sortIndex = _sortIndex * 10;
            }
            return _sortIndex;
        },
        enumerable: true,
        configurable: true
    });
    return DailyTaskItem;
}(eui.Component));
__reflect(DailyTaskItem.prototype, "DailyTaskItem");
//# sourceMappingURL=DailyTaskPanel.js.map