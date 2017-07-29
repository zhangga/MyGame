var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TechnologyManager = (function () {
    function TechnologyManager() {
        this._technologys = {};
    }
    /**解析初始化科技**/
    TechnologyManager.prototype.onParaeMsg = function (msg) {
        var size = msg.getByte();
        for (var i = 0; i < size; i++) {
            this.onParseUpgrade(msg, false);
        }
        DataManager.instance.playerM.onUpdateSocOutPutByID(DataManager.instance.playerM.player.currFGID); //刷新一下当前鱼缸鱼的秒出
    };
    /**解析升级消息**/
    TechnologyManager.prototype.onParseUpgrade = function (msg, isUpgrade) {
        if (isUpgrade === void 0) { isUpgrade = true; }
        var id = msg.getByte();
        var level = msg.getByte();
        var technologyModel = ModelManager.instance.modelTechnology[id + "_" + level];
        this._technologys[id] = level;
        if (isUpgrade) {
            /**消耗**/
            DataManager.instance.playerM.player.updateCurrency(technologyModel.cost, -1);
            GameDispatcher.instance.dispatcherEventWith(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, false, id);
            DataManager.instance.playerM.onUpdateSocOutPutByID(DataManager.instance.playerM.player.currFGID); //刷新一下当前鱼缸鱼的秒出
            DataManager.instance.playerM.showSubtractSecOutput();
        }
    };
    /**根据科技类型获取当前科技等级**/
    TechnologyManager.prototype.getTechnologyLevel = function (id) {
        return this._technologys[id] ? this._technologys[id] : 0;
    };
    /**获取当前科技对应的model**/
    TechnologyManager.prototype.getCurrModel = function (id) {
        var currLevel = this.getTechnologyLevel(id);
        var model = ModelManager.instance.modelTechnology[id + "_" + currLevel];
        return model;
    };
    /**获取下一等级科技model**/
    TechnologyManager.prototype.getNextModel = function (id) {
        var currLevel = this.getTechnologyLevel(id) + 1;
        var model = ModelManager.instance.modelTechnology[id + "_" + currLevel];
        return model;
    };
    /**发送服务器消息**/
    //升级消息
    TechnologyManager.prototype.onSendUpgradeMsg = function (id) {
        var nextModel = DataManager.instance.technology.getNextModel(id);
        if (!nextModel) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("error_tips7"));
            return;
        }
        var hasMoneyNum = DataManager.instance.playerM.player.getCurrency(nextModel.cost.type);
        var costMoneyNum = nextModel.cost.num;
        if (costMoneyNum > hasMoneyNum) {
            var error_tips = "error_tips1";
            switch (nextModel.cost.type) {
                case GOODS_TYPE.GOLD:
                    error_tips = "error_tips3";
                    break;
                case GOODS_TYPE.DIAMOND:
                    error_tips = "error_tips4";
                    break;
            }
            GameCommon.instance.addAlert(Language.instance.getDescByKey(error_tips));
            return;
        }
        var upgradeMsg = new Message(MESSAGE_ID.TECHNOLOGY_UPGRADE_MSG);
        upgradeMsg.setByte(id);
        _GF.instance.net.onAddMessage(upgradeMsg);
    };
    //检测科技红点
    TechnologyManager.prototype.onCheckRedPoint = function (tankId) {
        var player = DataManager.instance.playerM.player;
        //鱼的科技
        var _fishDatas = player.getFishByLoction(tankId);
        for (var i = 0; i < _fishDatas.length; i++) {
            var _fishModel = _fishDatas[i].model;
            for (var j = 0; j < _fishModel.kejiId.length; j++) {
                var _tecID = parseInt(_fishModel.kejiId[j]);
                if (this.onCheckTechnologyByType(_tecID))
                    return true;
            }
        }
        var _fishtankModel = ModelManager.instance.modelFieldGuide[tankId + "_1"];
        for (var i = 0; i < _fishtankModel.kejiId.length; i++) {
            var _techID = parseInt(_fishtankModel.kejiId[i]);
            if (this.onCheckTechnologyByType(_tecID))
                return true;
        }
        return false;
    };
    TechnologyManager.prototype.onCheckTechnologyByType = function (id) {
        var nextModel = this.getNextModel(id);
        if (!nextModel)
            return false;
        if (DataManager.instance.playerM.player.getCurrency(nextModel.cost.type) >= nextModel.cost.num)
            return true;
        return false;
    };
    return TechnologyManager;
}());
__reflect(TechnologyManager.prototype, "TechnologyManager");
var TECHNOLOGY_TYPE;
(function (TECHNOLOGY_TYPE) {
    TECHNOLOGY_TYPE[TECHNOLOGY_TYPE["SECOUTPUT"] = 1] = "SECOUTPUT";
    TECHNOLOGY_TYPE[TECHNOLOGY_TYPE["COMEIN"] = 2] = "COMEIN";
    TECHNOLOGY_TYPE[TECHNOLOGY_TYPE["FISHTANK_SECOUT"] = 3] = "FISHTANK_SECOUT";
    TECHNOLOGY_TYPE[TECHNOLOGY_TYPE["SIZE"] = 4] = "SIZE";
})(TECHNOLOGY_TYPE || (TECHNOLOGY_TYPE = {}));
//# sourceMappingURL=TechnologyManager.js.map