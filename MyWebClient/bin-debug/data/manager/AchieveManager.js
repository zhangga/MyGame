var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AchieveManager = (function () {
    function AchieveManager() {
        this._achieveDatas = {};
    }
    //初始化解析成就列表
    AchieveManager.prototype.onParseInit = function (msg) {
        var _len = msg.getByte();
        for (var i = 0; i < _len; i++) {
            this.onParseUpdate(msg, true);
        }
    };
    //解析更新成就列表
    AchieveManager.prototype.onParseUpdate = function (msg, isInit) {
        if (isInit === void 0) { isInit = false; }
        var _achieveId = msg.getByte();
        var _achieveData = this.getAchieveData(_achieveId);
        if (_achieveData) {
            _achieveData.onParse(msg);
            this._achieveDatas[_achieveData.id] = _achieveData;
            if (!isInit) {
                GameDispatcher.instance.dispatcherEventWith(GameEvent.ACHIEVE_UPDATE_EVENT, false, _achieveData.id);
            }
        }
    };
    //解析奖励领取消息
    AchieveManager.prototype.onParseRewardMsg = function (msg) {
        var _achieveId = msg.getByte();
        var _achieveModel = ModelManager.instance.modelAchieve[_achieveId];
        if (_achieveModel) {
            var player = DataManager.instance.playerM.player;
            player.updateCurrency(_achieveModel.reward, 1);
        }
    };
    //获取对应的成就数据
    AchieveManager.prototype.getAchieveData = function (id) {
        if (!this._achieveDatas[id]) {
            this._achieveDatas[id] = new AchieveData(id);
        }
        return this._achieveDatas[id];
    };
    /**消息发送**/
    AchieveManager.prototype.onSendAchieveRewardMsg = function (id) {
        var rewardMsg = new Message(MESSAGE_ID.ACHIEVEMENT_REWARD_MSG);
        rewardMsg.setByte(id);
        _GF.instance.net.onAddMessage(rewardMsg);
    };
    /**检查红点**/
    AchieveManager.prototype.onCheckRedPoint = function () {
        for (var key in this._achieveDatas) {
            if (this.onCheckAchieveReceiveByID(parseInt(key)))
                return true;
        }
        return false;
    };
    AchieveManager.prototype.onCheckAchieveReceiveByID = function (_achieveId) {
        var model = ModelManager.instance.modelAchieve[_achieveId];
        var _achieveData = this.getAchieveData(_achieveId);
        var _currTargetPro = this.getCurrTargetPro(_achieveId);
        if (_achieveData.progress.num >= _currTargetPro && (_achieveData.rewardPro.num < model.end))
            return true;
        return false;
    };
    AchieveManager.prototype.getCurrTargetPro = function (_achieveId) {
        var model = ModelManager.instance.modelAchieve[_achieveId];
        var _achieveData = this.getAchieveData(_achieveId);
        var _currTargetPro = 0;
        if (_achieveData.rewardPro.num < model.start) {
            _currTargetPro = model.start;
        }
        else if (_achieveData.rewardPro.num >= model.end) {
            _currTargetPro = model.end;
        }
        else {
            _currTargetPro = _achieveData.rewardPro.num + model.dist;
        }
        return _currTargetPro;
    };
    return AchieveManager;
}());
__reflect(AchieveManager.prototype, "AchieveManager");
var AchieveData = (function () {
    function AchieveData(id) {
        this.id = id;
        this.progress = new InfiniteNumber(0);
        this.rewardPro = new InfiniteNumber(0);
    }
    AchieveData.prototype.onParse = function (msg) {
        this.progress = new InfiniteNumber(msg.getString());
        this.rewardPro = new InfiniteNumber(msg.getString());
    };
    return AchieveData;
}());
__reflect(AchieveData.prototype, "AchieveData");
//# sourceMappingURL=AchieveManager.js.map