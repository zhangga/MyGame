var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var MessageReceive = (function () {
    function MessageReceive() {
    }
    MessageReceive.prototype.receiveMessage = function (message) {
        var cmdID = message.getCmdId();
        switch (cmdID) {
            case MESSAGE_ID.GAME_LOGON_MESSAGE:
                DataManager.instance.loginM.onParseLogonMessage(message);
                break;
            case MESSAGE_ID.CREATE_ROLE_MESSAGE:
                break;
            case MESSAGE_ID.LOGIN_SERVER_MESSAGE:
                DataManager.instance.loginM.onParseLoginMessage(message);
                //因为没有建角成功的返回消息，只能在此处抛出可能的建角事件。配合CreateRole中的监听判断是否建角成功。
                GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_CREATE_ROLE, false);
                SDKManager.onEnterGame(DataManager.instance.playerM.player);
                break;
            case MESSAGE_ID.PLAYER_MESSAGE:
                DataManager.instance.playerM.player.onParseMessage(message);
                break;
            case MESSAGE_ID.GAME_SYNC_MESSAGE:
                DataManager.instance.syncM.onParseMessage(message);
                break;
            case MESSAGE_ID.ERROR_TIP_MESSAGE:
                GameCommon.instance.addHintBar(message);
                break;
            case MESSAGE_ID.GAME_TICK_MESSAGE:
            case MESSAGE_ID.TIMEOUT_MESSAGE:
            case MESSAGE_ID.REPEAT_LOGIN_MESSAGE:
                MessageErrorManager.instance.errorMsgHandler(cmdID);
                break;
            /**---------好友相关---------**/
            case MESSAGE_ID.FRIEND_LISTINIT_MSG:
                DataManager.instance.friendM.onParseInit(message);
                break;
            case MESSAGE_ID.FRIEND_SEACH_MSG:
                break;
            case MESSAGE_ID.FRIEND_ADD_MSG:
                break;
            case MESSAGE_ID.FRIEND_DELETE_MSG:
                DataManager.instance.friendM.onParseDelte(message);
                break;
            case MESSAGE_ID.FRIEND_AGREE_APPLY_MSG:
                var playerid = message.getInt();
                var player = DataManager.instance.friendM.onParseApplyRemove(playerid, false);
                DataManager.instance.friendM.onParseAdd(player);
                break;
            case MESSAGE_ID.FRIEND_REJECT_APPLY_MSG:
                var playerid = message.getInt();
                DataManager.instance.friendM.onParseApplyRemove(playerid);
                break;
            case MESSAGE_ID.FRIEND_APPLYUPDATYE_MSG:
                DataManager.instance.friendM.onParseApplyAdd(message);
                break;
            case MESSAGE_ID.FRIEND_GIFT_MESAAGE:
                DataManager.instance.friendM.onParseGiftSuccess(message);
                break;
            case MESSAGE_ID.FRIEND_GIVEFOOD_MSG:
                DataManager.instance.friendM.onParseGiveFoodMsg(message);
                break;
            case MESSAGE_ID.FRIEND_ADD_SUCCESS_MSG:
                var friendPlayer = new SimplePlayer();
                friendPlayer.parsePlayer(message);
                friendPlayer.rankNum = message.getInt();
                DataManager.instance.friendM.onParseAdd(friendPlayer);
                break;
            case MESSAGE_ID.DECORATE_GASHAPON_MESSAGE:
                DataManager.instance.decorate.onParseGashapon(message);
                break;
            case MESSAGE_ID.TOPRANK_LIST_MESSAGE:
                DataManager.instance.toprank.onParseTopRankListMsg(message);
                break;
            case MESSAGE_ID.TECHNOLOGY_INIT_MSG:
                DataManager.instance.technology.onParaeMsg(message);
                break;
            case MESSAGE_ID.TECHNOLOGY_UPGRADE_MSG:
                DataManager.instance.technology.onParseUpgrade(message);
                break;
            case MESSAGE_ID.FRIEND_BE_VIEWED_MSG:
                DataManager.instance.visite.onParseMessage(message);
                break;
            case MESSAGE_ID.PALYER_HAPPINESS_MSG:
                DataManager.instance.playerM.player.onParseHappiness(message);
                break;
            case MESSAGE_ID.SHOP_BUY_GOLD_MESSAGE:
                DataManager.instance.playerM.player.onParseBuyGold(message);
                break;
            case MESSAGE_ID.TURNPLATE_LOTTERY_MSG:
                DataManager.instance.turnplateM.onPasreLotteryMsg(message);
                break;
            case MESSAGE_ID.HEAVEN_REWARD_MSG:
                DataManager.instance.playerM.player.onParseAwardArtifact(message);
                break;
            case MESSAGE_ID.PLAYER_TO_DO_SOMEBODY:
                DataManager.instance.visite.onParseDoBack(message);
                break;
            case MESSAGE_ID.PALYER_DAILY_RECORD:
                DataManager.instance.playerM.player.onParseDailyRecord(message);
                break;
            case MESSAGE_ID.PLAYER_OFFLINE_EARNINGS:
                DataManager.instance.offline.onParseMessage(message);
                break;
            case MESSAGE_ID.FISH_FOOD_RECIVE_MSG:
                DataManager.instance.turnplateM.onParseRecivePowerMsg(message);
                break;
            case MESSAGE_ID.PALYER_BUFF_RECORD:
                DataManager.instance.buff.onParseMessage(message);
                break;
            case MESSAGE_ID.ENEMY_LIST_MSG:
                DataManager.instance.enemy.onParseMessage(message);
                break;
            case MESSAGE_ID.DAILY_TASK_UPDATE_MSG:
                DataManager.instance.taskM.onDailyTaskDataRefresh(message);
                break;
            case MESSAGE_ID.DAILY_TASK_REWARD_MSG:
                DataManager.instance.taskM.onParseRewardMsg(message);
                break;
            case MESSAGE_ID.ACHIEVEMENT_INIT_MSG:
                DataManager.instance.achieveM.onParseInit(message);
                break;
            case MESSAGE_ID.ACHIEVEMENT_UPDATE_MSG:
                DataManager.instance.achieveM.onParseUpdate(message);
                break;
            case MESSAGE_ID.ACHIEVEMENT_REWARD_MSG:
                DataManager.instance.achieveM.onParseRewardMsg(message);
                break;
            case MESSAGE_ID.SHARE_REWARD_MESSAGE:
                DataManager.instance.playerM.parseShareReward(message);
                break;
            case MESSAGE_ID.PLAYER_MAIL_MESSAGE:
                DataManager.instance.mailM.parseMail(message);
                break;
            case MESSAGE_ID.PLAYER_MAIL_READ_MESSAGE:
                DataManager.instance.mailM.parseMailRead(message);
                break;
            case MESSAGE_ID.PLAYER_MAIL_GET_ACCESSORY_MESSAGE:
                DataManager.instance.mailM.parseMailAccessory(message);
                break;
            case MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG:
                DataManager.instance.smasheggM.onParaseListInfoMsg(message);
                break;
            case MESSAGE_ID.SMASHEGG_BE_VIEWD_MSG:
                DataManager.instance.smasheggM.onParseBeviewdMsg(message);
                break;
            case MESSAGE_ID.PLAYER_MAIL_DELETE_MESSAGE:
                DataManager.instance.mailM.parseMailDelete(message);
                break;
            case MESSAGE_ID.INIVTEGIFT_FRIENDLIST_MSG:
                DataManager.instance.friendM.onUpdateInviteGiftList(message);
                break;
            case MESSAGE_ID.INIVTEGIFT_REWARD_MSG:
                DataManager.instance.friendM.onUpdateInviteGiftReward(message);
                break;
            case MESSAGE_ID.PLAYER_UPDATA_CURRENCY:
                var type = message.getByte();
                switch (type) {
                    case GOODS_TYPE.DIAMOND:
                        DataManager.instance.playerM.player.diamond = 0;
                        DataManager.instance.playerM.player.addDiamondAndUpgrade(message.getInt());
                        break;
                }
                break;
        }
        GameDispatcher.instance.dispatcherEventWith(cmdID.toString(), false, message);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_REDPOINT_TRIGGER, false, new RedPointTrigger(null));
    };
    return MessageReceive;
}());
__reflect(MessageReceive.prototype, "MessageReceive");
//# sourceMappingURL=MessageReceive.js.map