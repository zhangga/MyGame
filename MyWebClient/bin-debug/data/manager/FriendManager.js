var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FriendManager = (function () {
    function FriendManager() {
        this._firends = [];
        this._applys = [];
        this._givemeFoods = [];
        this._giftFoods = [];
        this._invitegifts = [];
    }
    /**初始化好友列表**/
    FriendManager.prototype.onParseInit = function (msg) {
        this._firends = [];
        this._applys = [];
        this._givemeFoods = [];
        this._giftFoods = [];
        var fsize = msg.getShort();
        for (var i = 0; i < fsize; i++) {
            var friendPlayer = new SimplePlayer();
            friendPlayer.parsePlayer(msg);
            this._firends.push(friendPlayer);
            var isgive = msg.getBoolean(); //是否送过鱼食
            if (isgive) {
                this._giftFoods.push(friendPlayer.id);
            }
            var isbegive = msg.getBoolean(); //是否被送鱼食
            if (isbegive) {
                this._givemeFoods.push(friendPlayer.id);
            }
            friendPlayer.rankNum = msg.getInt();
        }
        this.onSortFriendList();
        var applySize = msg.getShort();
        for (var i = 0; i < applySize; i++) {
            this.onParseApplyAdd(msg, true);
        }
        DataManager.instance.playerM.player.fishfood = msg.getInt();
        this.giftFishFoodNum = msg.getByte();
        DataManager.instance.turnplateM.reciveTime = msg.getInt();
    };
    /**增加好友列表**/
    FriendManager.prototype.onParseAdd = function (player) {
        for (var i = 0; i < this._firends.length; i++) {
            if (player.id == this._firends[i].id) {
                return;
            }
        }
        this._firends.push(player);
        this.onSortFriendList();
    };
    /**删除好友列表**/
    FriendManager.prototype.onParseDelte = function (msg) {
        var playerid = msg.getInt();
        for (var i = 0; i < this._firends.length; i++) {
            var friendPlayer = this._firends[i];
            if (friendPlayer.id == playerid) {
                this._firends.splice(i, 1);
                friendPlayer = null;
                return;
            }
        }
    };
    /**好友列表排序**/
    FriendManager.prototype.onSortFriendList = function () {
        this._firends.sort(function (a, b) {
            return a.rankNum - b.rankNum;
        });
    };
    /**增加申请列表**/
    FriendManager.prototype.onParseApplyAdd = function (msg, isInit) {
        if (isInit === void 0) { isInit = false; }
        var applyPlayer = new SimplePlayer();
        applyPlayer.parsePlayer(msg);
        applyPlayer.rankNum = msg.getInt();
        if (!isInit) {
            for (var i = 0; i < this._applys.length; i++) {
                if (applyPlayer.id == this._applys[i].id) {
                    return;
                }
            }
        }
        this._applys.push(applyPlayer);
    };
    /**删除申请列表**/
    FriendManager.prototype.onParseApplyRemove = function (playerId, isDelete) {
        if (isDelete === void 0) { isDelete = true; }
        for (var i = 0; i < this._applys.length; i++) {
            var applyPlayer = this._applys[i];
            if (applyPlayer.id == playerId) {
                this._applys.splice(i, 1);
                if (isDelete) {
                    applyPlayer = null;
                }
                return applyPlayer;
            }
        }
    };
    /**赠送好友鱼食成功**/
    FriendManager.prototype.onParseGiftSuccess = function (msg) {
        var playerId = msg.getInt();
        if (this._giftFoods.indexOf(playerId) < 0) {
            this._giftFoods.push(playerId);
            GameCommon.instance.addAlert(Language.instance.getDescByKey("fishfood_gift_Success"));
        }
    };
    /**接受到其他玩家送来的鱼食**/
    FriendManager.prototype.onParseGiveFoodMsg = function (msg) {
        var playerId = msg.getInt();
        if (this._givemeFoods.indexOf(playerId) < 0) {
            this._givemeFoods.push(playerId);
            DataManager.instance.playerM.player.fishfood = DataManager.instance.playerM.player.fishfood + 1;
        }
    };
    Object.defineProperty(FriendManager.prototype, "leftGiftNum", {
        /**获取剩余的赠送次数**/
        get: function () {
            return Math.max(GameDefine.FRIEND_GIFT_MAX - this._giftFoods.length, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendManager.prototype, "giftReciveNum", {
        /**获取剩余的接受礼物次数**/
        get: function () {
            return this._givemeFoods.length;
        },
        enumerable: true,
        configurable: true
    });
    /**通过ID判断玩家是不是赠送过我鱼食**/
    FriendManager.prototype.onCheckIsGive = function (playerId) {
        return this._givemeFoods.indexOf(playerId) >= 0;
    };
    /**通过ID判断玩家是不是收到过我的鱼食**/
    FriendManager.prototype.onCheckIsGift = function (playerId) {
        return this._giftFoods.indexOf(playerId) >= 0;
    };
    /**通过PlayerId找到好友**/
    FriendManager.prototype.getFriendDataById = function (playerId) {
        var friendPlayer;
        for (var i = 0; i < this._firends.length; i++) {
            if (playerId == this._firends[i].id) {
                friendPlayer = this._firends[i];
                break;
            }
        }
        return friendPlayer;
    };
    Object.defineProperty(FriendManager.prototype, "firends", {
        get: function () {
            return this._firends;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendManager.prototype, "friendsNum", {
        get: function () {
            return this._firends.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendManager.prototype, "applys", {
        get: function () {
            return this._applys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendManager.prototype, "gives", {
        get: function () {
            return this._givemeFoods;
        },
        enumerable: true,
        configurable: true
    });
    //赚钻石的好友列表
    FriendManager.prototype.onUpdateInviteGiftList = function (msg) {
        this._invitegifts = [];
        var _len = msg.getByte();
        for (var i = 0; i < _len; i++) {
            var _inviteGiftObj = new FriendInviteGift();
            _inviteGiftObj.onParseInfo(msg);
            this._invitegifts.push(_inviteGiftObj);
        }
    };
    //赚钻石更新领奖状态
    FriendManager.prototype.onUpdateInviteGiftReward = function (msg) {
        var playerId = msg.getInt();
        for (var i = 0; i < this._invitegifts.length; i++) {
            var giftFriend = this._invitegifts[i];
            if (giftFriend.id == playerId && !giftFriend.isReceived) {
                giftFriend.isReceived = true;
                DataManager.instance.playerM.player.addDiamond(GameDefine.INVITE_GIFT_DIAMOND);
                GameDispatcher.instance.dispatcherEventWith(MESSAGE_ID.INIVTEGIFT_REWARD_MSG + "_TO_VIEW", false, giftFriend);
                break;
            }
        }
    };
    //获取对应位置的赚钻石好友
    FriendManager.prototype.getInvitegiftFrined = function (index) {
        return this._invitegifts[index];
    };
    /**-----发送消息------**/
    //搜索玩家
    FriendManager.prototype.onSendSeachPlayerMsg = function (playerId) {
        var seachMsg = new Message(MESSAGE_ID.FRIEND_SEACH_MSG);
        seachMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(seachMsg);
    };
    //添加玩家
    FriendManager.prototype.onSendAddPlayerMsg = function (playerId) {
        var addFriendMsg = new Message(MESSAGE_ID.FRIEND_ADD_MSG);
        addFriendMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(addFriendMsg);
    };
    //删除好友
    FriendManager.prototype.onSendDeletePlayerMsg = function (playerId) {
        var deleteMsg = new Message(MESSAGE_ID.FRIEND_DELETE_MSG);
        deleteMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(deleteMsg);
    };
    //同意申请
    FriendManager.prototype.onSendAgreeMsg = function (playerId) {
        var agreeMsg = new Message(MESSAGE_ID.FRIEND_AGREE_APPLY_MSG);
        agreeMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(agreeMsg);
    };
    //拒绝申请
    FriendManager.prototype.onSendRejectMsg = function (playerId) {
        var rejectMsg = new Message(MESSAGE_ID.FRIEND_REJECT_APPLY_MSG);
        rejectMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(rejectMsg);
    };
    //赠送鱼食
    FriendManager.prototype.onSendFriendGiftMsg = function (playerId) {
        var giftMsg = new Message(MESSAGE_ID.FRIEND_GIFT_MESAAGE);
        giftMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(giftMsg);
    };
    //查看其他玩家
    FriendManager.prototype.onSendBaifangMsg = function (playerId) {
        var baifangMsg = new Message(MESSAGE_ID.FRIEND_BE_VIEWED_MSG);
        baifangMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(baifangMsg);
    };
    //请求赚钻石好友列表
    FriendManager.prototype.onSendIniviteGiftListMsg = function () {
        var invitegiftlistMsg = new Message(MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG);
        _GF.instance.net.onAddMessage(invitegiftlistMsg);
    };
    //领取赚钻石好友奖励
    FriendManager.prototype.onSendRewardInviteGiftMsg = function (playerId) {
        var rewardgiftMsg = new Message(MESSAGE_ID.INIVTEGIFT_REWARD_MSG);
        rewardgiftMsg.setInt(playerId);
        _GF.instance.net.onAddMessage(rewardgiftMsg);
    };
    //redPoint相关
    FriendManager.prototype.onCheckRedPoint = function () {
        if (this.onCheckCanGiveFishFood())
            return true;
        if (this.onCheckhasApply())
            return true;
        return false;
    };
    FriendManager.prototype.onCheckhasApply = function () {
        if (this._applys.length > 0)
            return true;
        return false;
    };
    FriendManager.prototype.onCheckCanGiveFishFood = function () {
        if (this._firends.length == 0)
            return false;
        if (this.leftGiftNum == 0)
            return false;
        for (var key in this._firends) {
            if (this._giftFoods.indexOf(this._firends[key].id) == -1)
                return true;
        }
        return false;
    };
    return FriendManager;
}());
__reflect(FriendManager.prototype, "FriendManager");
var FriendInviteGift = (function () {
    function FriendInviteGift() {
        this.name = ""; //玩家姓名
        this.avatarUrl = ""; //头像的URL
        this.isReceived = false; //是否领奖
    }
    FriendInviteGift.prototype.onParseInfo = function (msg) {
        this.id = msg.getInt();
        this.sex = msg.getByte();
        this.name = msg.getString();
        this.isReceived = msg.getBoolean();
    };
    return FriendInviteGift;
}());
__reflect(FriendInviteGift.prototype, "FriendInviteGift");
//# sourceMappingURL=FriendManager.js.map