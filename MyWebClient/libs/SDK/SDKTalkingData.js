//http://doc.talkingdata.com/posts/70

var SDKTalkingDataJS;
(function (SDKTalkingDataJS) { 

function _setAccount(account) {
    //注册、登录、切换帐户、唤醒游戏时传入玩家账户信息
    TDGA.Account({
        accountId : account.accountId,
        level : account.level,
        gameServer : account.gameServer,
        accountType : account.accountType,
        age : 0,
        accountName : account.accountName,
        gender : account.gender
    });
}
SDKTalkingDataJS.setAccount = _setAccount;

function _onEvent(key, value){
    TDGA.onEvent(key, value);
}
SDKTalkingDataJS.onEvent = _onEvent;

})(SDKTalkingDataJS || (SDKTalkingDataJS = {}));