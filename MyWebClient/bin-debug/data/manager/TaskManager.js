var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TaskManager = (function () {
    function TaskManager() {
        this._daliytaskDatas = {};
    }
    //初始化每日任务的状态
    TaskManager.prototype.onParseDailyTaskMsg = function (msg) {
        var taskSize = msg.getByte();
        for (var i = 0; i < taskSize; i++) {
            this.onDailyTaskDataRefresh(msg, true);
        }
    };
    //更新每日任务的状态
    TaskManager.prototype.onDailyTaskDataRefresh = function (msg, isInit) {
        if (isInit === void 0) { isInit = false; }
        var _taskId = msg.getByte();
        var dailytaskData = this.getDailyTaskData(_taskId);
        if (dailytaskData) {
            dailytaskData.onParse(msg);
            this._daliytaskDatas[dailytaskData.id] = dailytaskData;
            if (!isInit) {
                GameDispatcher.instance.dispatcherEventWith(GameEvent.DAILY_TASK_UPDATE_EVT, false, dailytaskData.id);
            }
        }
    };
    //解析领奖
    TaskManager.prototype.onParseRewardMsg = function (msg) {
        var player = DataManager.instance.playerM.player;
        var _taskId = msg.getByte();
        var dailytaskModel = ModelManager.instance.modelDailyTask[_taskId];
        if (dailytaskModel) {
            var _effectModel = ModelManager.instance.modelEffect[dailytaskModel.effectId];
            switch (_effectModel.type) {
                case LOTTERY_EFFECT.ADD_GOLD:
                    var _goldNum = new InfiniteNumber(msg.getString());
                    player.addGoldAndUpgrade(_goldNum.num);
                    // GameCommon.instance.addAlert('')
                    break;
            }
        }
        else {
            var _diamondNum = new InfiniteNumber(msg.getString());
            player.addDiamondAndUpgrade(_diamondNum.num);
        }
        var dailytaskData = this.getDailyTaskData(_taskId);
        if (!dailytaskData.isReward) {
            dailytaskData.isReward = true;
            GameDispatcher.instance.dispatcherEventWith(GameEvent.DAILY_TASK_UPDATE_EVT, false, dailytaskData.id);
        }
    };
    //获取每日任务数据
    TaskManager.prototype.getDailyTaskData = function (id) {
        if (!this._daliytaskDatas[id]) {
            this._daliytaskDatas[id] = new DailyTaskData(id);
        }
        return this._daliytaskDatas[id];
    };
    Object.defineProperty(TaskManager.prototype, "DailyTaskCompNum", {
        //获取每日任务完成数量
        get: function () {
            var _dailytaskCompNum = 0;
            for (var id in this._daliytaskDatas) {
                if (parseInt(id) == 0)
                    continue;
                var dailytaskData = this._daliytaskDatas[id];
                if (dailytaskData.isReward) {
                    _dailytaskCompNum++;
                }
            }
            return _dailytaskCompNum;
        },
        enumerable: true,
        configurable: true
    });
    /**发送消息部分**/
    TaskManager.prototype.onSendDailyTaskRewardMsg = function (taskId) {
        var rewardMsg = new Message(MESSAGE_ID.DAILY_TASK_REWARD_MSG);
        rewardMsg.setByte(taskId);
        _GF.instance.net.onAddMessage(rewardMsg);
    };
    /**检查红点**/
    TaskManager.prototype.onCheckRedPoint = function () {
        for (var key in this._daliytaskDatas) {
            if (this.onCheckDailyTaskReceiveByID(parseInt(key)))
                return true;
        }
        if (this.onCheckAllTaskAwardRedPoint())
            return true;
        return false;
    };
    TaskManager.prototype.onCheckAllTaskAwardRedPoint = function () {
        var _taskData = DataManager.instance.taskM.getDailyTaskData(0);
        if (!_taskData.isReward) {
            var _allReward = true;
            for (var id in this._daliytaskDatas) {
                if (parseInt(id) == 0)
                    continue;
                var dailytaskData = this._daliytaskDatas[id];
                if (!dailytaskData.isReward) {
                    _allReward = false;
                    break;
                }
            }
            if (_allReward) {
                return true;
            }
        }
        return false;
    };
    TaskManager.prototype.onCheckDailyTaskReceiveByID = function (taskID) {
        var model = ModelManager.instance.modelDailyTask[taskID];
        var _taskData = this.getDailyTaskData(taskID);
        if (!_taskData)
            return false;
        if (!model)
            return false;
        if (!_taskData.isReward && _taskData.progress >= model.count)
            return true;
        return false;
    };
    return TaskManager;
}());
__reflect(TaskManager.prototype, "TaskManager");
var DailyTaskData = (function () {
    function DailyTaskData(id) {
        this.progress = 0;
        this.isReward = false; //是否已领取
        this.id = id;
    }
    DailyTaskData.prototype.onParse = function (msg) {
        this.progress = msg.getInt();
        var state = msg.getByte();
        this.isReward = state == 2;
    };
    return DailyTaskData;
}());
__reflect(DailyTaskData.prototype, "DailyTaskData");
//# sourceMappingURL=TaskManager.js.map