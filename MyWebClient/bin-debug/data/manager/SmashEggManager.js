var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SmashEggManager = (function () {
    function SmashEggManager() {
        this._hammerNum = 0; //锤子数量
        this._invitegiftNum = 0; //今日邀请获得的锤子数
        this._sharegiftNum = 0; //今日分享获得的锤子数
        this._actLefttime = 0; //活动剩余倒计时
        this.smashUserInfos = [];
        this._actLefttime = 100000 * 1000 + egret.getTimer();
    }
    SmashEggManager.prototype.onParaseListInfoMsg = function (msg) {
        this._hammerNum = msg.getInt();
        this._sharegiftNum = msg.getByte();
        this._invitegiftNum = msg.getByte();
        if (this.smashUserInfos.length > 0) {
            for (var i = this.smashUserInfos.length - 1; i >= 0; i--) {
                this.smashUserInfos[i] = null;
                this.smashUserInfos.splice(i, 1);
            }
        }
        var infos_len = msg.getByte();
        for (var i = 0; i < infos_len; i++) {
            var infoData = new SmashEggUserInfo();
            infoData.onParse(msg);
            this.smashUserInfos.push(infoData);
        }
    };
    SmashEggManager.prototype.onParseBeviewdMsg = function (msg) {
        var _egglotteryParam = new SmashEggLotteryParam();
        _egglotteryParam.onParse(msg);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("SmashEggLotteryPanel", _egglotteryParam));
    };
    /**通过角色ID获取对应的砸蛋信息**/
    SmashEggManager.prototype.getSmashEggUserInfoById = function (userId) {
        for (var i = 0; i < this.smashUserInfos.length; i++) {
            if (this.smashUserInfos[i].userId == userId) {
                return this.smashUserInfos[i];
            }
        }
        return null;
    };
    Object.defineProperty(SmashEggManager.prototype, "hammerNum", {
        /**获得锤子的总数**/
        get: function () {
            return this._hammerNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmashEggManager.prototype, "invitegiftNum", {
        /**获取今日分享获得的锤子数**/
        get: function () {
            return this._invitegiftNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmashEggManager.prototype, "sharegiftNum", {
        /**今日邀请获得的锤子数**/
        get: function () {
            return this._sharegiftNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmashEggManager.prototype, "actLefttime", {
        /**获取活动剩余时间**/
        get: function () {
            return Math.max(0, Math.ceil((this._actLefttime - egret.getTimer()) / 1000));
        },
        enumerable: true,
        configurable: true
    });
    /**发送消息**/
    //请求砸蛋好友列表
    SmashEggManager.prototype.onSendSmashUserlistMsg = function () {
        var userlistMsg = new Message(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG);
        _GF.instance.net.onAddMessage(userlistMsg);
    };
    //进入玩家的砸蛋场景
    SmashEggManager.prototype.onSendSmashPreviewMsg = function (userId) {
        var previewMsg = new Message(MESSAGE_ID.SMASHEGG_BE_VIEWD_MSG);
        previewMsg.setInt(userId);
        _GF.instance.net.onAddMessage(previewMsg);
    };
    //发送砸蛋请求
    SmashEggManager.prototype.onSendSmashAcitionMsg = function (userId, eggindex) {
        var _smasheggMsg = new Message(MESSAGE_ID.SMASHEGG_BE_REWARD_MSG);
        _smasheggMsg.setInt(userId);
        _smasheggMsg.setByte(eggindex);
        _GF.instance.net.onAddMessage(_smasheggMsg);
    };
    return SmashEggManager;
}());
__reflect(SmashEggManager.prototype, "SmashEggManager");
var SmashEggUserInfo = (function () {
    function SmashEggUserInfo() {
    }
    SmashEggUserInfo.prototype.onParse = function (msg) {
        this.userId = msg.getInt();
        this.eggCount = msg.getByte();
        this.hammerCount = msg.getByte();
        this._secondCount = msg.getInt() * 1000 + egret.getTimer();
    };
    Object.defineProperty(SmashEggUserInfo.prototype, "lefttime", {
        get: function () {
            return Math.max(0, Math.ceil((this._secondCount - egret.getTimer()) / 1000));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SmashEggUserInfo.prototype, "friendData", {
        get: function () {
            return DataManager.instance.friendM.getFriendDataById(this.userId);
        },
        enumerable: true,
        configurable: true
    });
    return SmashEggUserInfo;
}());
__reflect(SmashEggUserInfo.prototype, "SmashEggUserInfo");
//# sourceMappingURL=SmashEggManager.js.map