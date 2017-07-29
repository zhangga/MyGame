var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * TalkingData统计
 */
var SaTalkingData = (function () {
    function SaTalkingData() {
    }
    // 没有强制限制，仿一个Singleton
    SaTalkingData.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SaTalkingData();
        }
        return this._instance;
    };
    /** 初始化 */
    SaTalkingData.prototype.init = function (loginInfo) {
    };
    SaTalkingData.prototype.login = function (loginInfo) {
        egret.log("SaTalkingData.login()");
        this.setAccount(loginInfo);
    };
    SaTalkingData.prototype.onCreateRole = function (loginInfo, playerInfo) {
        egret.log("SaTalkingData.onCreateRole()");
        this.setAccount(loginInfo, playerInfo);
        if (loginInfo.inviter > 0) {
            this.onEvent("invite", 1);
        }
    };
    SaTalkingData.prototype.onEvent = function (key, value) {
        try {
            SDKTalkingDataJS.onEvent(key, value);
        }
        catch (e) {
            egret.error("SaTalkingData.onEvent() failed. key=" + key + ", value=" + value + ". " + e.message);
        }
    };
    SaTalkingData.prototype.setAccount = function (loginInfo, playerInfo) {
        if (!loginInfo || !loginInfo.account) {
            egret.error("No account.");
            return;
        }
        try {
            // 为什么不用另外var编译会被忽略？
            var name, level, gender;
            if (playerInfo) {
                name = playerInfo.id + "_" + playerInfo.name;
                level = playerInfo.level;
                gender = playerInfo.sex == SEX_TYPE.FEMALE ? 2 : 1;
            }
            else {
                name = "";
                level = 0;
                gender = 2;
            }
            var DEFINE = SaTalkingData;
            var account = {
                accountId: loginInfo.account + "_" + loginInfo.platform,
                accountName: name,
                accountType: loginInfo.platform,
                level: level,
                gender: gender,
                gameServer: "0"
            };
            SDKTalkingDataJS.setAccount(account);
            egret.log("SaTalkingData.setAccount() success. account=" + account.accountId);
        }
        catch (e) {
            egret.error("SaTalkingData.setAccount() failed. " + e.message);
        }
    };
    SaTalkingData.prototype.onEnterGame = function (loginInfo, playerInfo) {
        egret.log("SaTalkingData.onEnterGame()");
        this.setAccount(loginInfo, playerInfo);
    };
    return SaTalkingData;
}());
__reflect(SaTalkingData.prototype, "SaTalkingData", ["ISDKStatistics"]);
//# sourceMappingURL=SaTalkingData.js.map