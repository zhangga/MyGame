var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerManager = (function () {
    function PlayerManager() {
        GameDispatcher.instance.addEventListener(FishTankEevent.FISH_INPUT_EVENT, this.onUpdateSecOutput, this);
        GameDispatcher.instance.addEventListener(GameEvent.TECHNOLOGY_UPGRADE_UPDATE, this.onUpdateSecOutput, this);
        GameDispatcher.instance.addEventListener(GameEvent.ADD_OR_DEL_BUFF_EVENT, this.onBuffHandler, this);
        this.player = new Player();
    }
    //领取图集奖励
    PlayerManager.prototype.onSendRewardHeavenMsg = function (fishId) {
        var rewardMsg = new Message(MESSAGE_ID.HEAVEN_REWARD_MSG);
        rewardMsg.setInt(fishId);
        _GF.instance.net.onAddMessage(rewardMsg);
    };
    /**增益效果集合**/
    //增益效果更新
    PlayerManager.prototype.updateIncomeEffect = function (type) {
        switch (type) {
            case PLAYER_EFFECT.HAPPINESS:
                this.updateHappinessRate();
                break;
            case PLAYER_EFFECT.DECORATE:
                this.updateDecorateRate();
                break;
            case PLAYER_EFFECT.BUFF:
                this.updateBuffRate();
                break;
            case PLAYER_EFFECT.All:
                this.updateHappinessRate();
                this.updateDecorateRate();
                this.updateBuffRate();
                break;
        }
    };
    PlayerManager.prototype.onBuffHandler = function (e) {
        this.updateIncomeEffect(PLAYER_EFFECT.BUFF);
        this.onUpdateSecOutput();
    };
    //秒产绝对值的增益
    PlayerManager.prototype.updateHappinessRate = function () {
        var add = this.player.happiness;
        if (add < -5) {
            add = -5;
        }
        this.player.happiness_rate = UnitDefine.BASE_PERCENTAGE + add * 1000;
    };
    //秒产百分比的增益
    PlayerManager.prototype.updateDecorateRate = function () {
        this.player.artifact_rate = UnitDefine.BASE_PERCENTAGE;
        //神器增加秒产
        for (var key in this.player.decorate_active) {
            var lv = this.player.decorate_active[key];
            if (!lv)
                continue;
            var model = ModelManager.instance.modelDecorate[key];
            if (!model)
                continue;
            this.player.artifact_rate += ModelDecorate.getEffect(model.pinzhi, lv);
        }
    };
    PlayerManager.prototype.updateBuffRate = function () {
        this.player.buff_rate = DataManager.instance.buff.addPercent;
    };
    PlayerManager.prototype.onUpdateSecOutput = function () {
        this.player.onUpdateSecOutput();
    };
    //接收分享奖励
    PlayerManager.prototype.parseShareReward = function (message) {
        var state = message.getByte();
        if (state == 1) {
            var type = message.getByte();
            if (type == GOODS_TYPE.GOLD) {
                var gold = message.getString();
                this.player.addGoldAndUpgrade(gold);
            }
            else if (type == GOODS_TYPE.DIAMOND) {
                var diamond = message.getInt();
                this.player.addDiamondAndUpgrade(diamond);
            }
        }
    };
    PlayerManager.prototype.onUpdateSocOutPutByID = function (fishTankID) {
        this.player.onUpdateSocOutPutByID(fishTankID);
        this.player.onUpdateSecOutput();
    };
    PlayerManager.prototype.onUpdateBookLv = function (currID, add) {
        if (add === void 0) { add = 1; }
        this.player.onUpdateBookLv(currID, add);
        // this.player.onUpdateSecOutput();
    };
    PlayerManager.prototype.onUpgradeAdvanceFish = function (id, add) {
        if (add === void 0) { add = 1; }
        this.player.onUpgradeAdvanceFish(id, add);
        this.onUpdateSecOutput();
        this.showSubtractSecOutput();
        GameDispatcher.instance.dispatcherEventWith(GameEvent.FISH_UPGRADE_EVENT, false, id);
    };
    PlayerManager.prototype.showSubtractSecOutput = function () {
        this.player.showSubtractSecOutput();
    };
    return PlayerManager;
}());
__reflect(PlayerManager.prototype, "PlayerManager");
//玩家的增益效果
var PLAYER_EFFECT;
(function (PLAYER_EFFECT) {
    PLAYER_EFFECT[PLAYER_EFFECT["HAPPINESS"] = 1] = "HAPPINESS";
    PLAYER_EFFECT[PLAYER_EFFECT["DECORATE"] = 2] = "DECORATE";
    PLAYER_EFFECT[PLAYER_EFFECT["BUFF"] = 3] = "BUFF";
    PLAYER_EFFECT[PLAYER_EFFECT["All"] = 4] = "All";
})(PLAYER_EFFECT || (PLAYER_EFFECT = {}));
//# sourceMappingURL=PlayerManager.js.map