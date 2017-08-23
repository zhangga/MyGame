var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**性别**/
var SHARE_TYPE;
(function (SHARE_TYPE) {
    SHARE_TYPE[SHARE_TYPE["QQ"] = 0] = "QQ";
    SHARE_TYPE[SHARE_TYPE["QZONE"] = 1] = "QZONE";
    SHARE_TYPE[SHARE_TYPE["WX"] = 2] = "WX";
    SHARE_TYPE[SHARE_TYPE["TL"] = 3] = "TL"; //微信朋友圈。
})(SHARE_TYPE || (SHARE_TYPE = {}));
/**
 * 不要在SDK模块中引用任何游戏逻辑
 * 方便下一步分离
 */
var SDKManager = (function () {
    function SDKManager() {
    }
    SDKManager.loadResourceConfig = function () {
        // TODO reload
        var configs = SDKManager._resource_config;
        if (!configs) {
            configs = {};
            // AWY
            var awyConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoAWYSkin",
                sdkDesc: "加QQ群还会获得额外礼包，群号：",
            };
            configs[EChannel.CHANNEL_AWY] = awyConfig;
            // CRAZY
            var crazyConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "加QQ群还会获得额外礼包，群号：",
            };
            configs[EChannel.CHANNEL_CRAZY] = crazyConfig;
            // EGRET 
            var egretConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "",
            };
            configs[EChannel.CHANNEL_EGRET] = egretConfig;
            // WANBA
            var wanbaConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "",
            };
            // configs[EChannel.CHANNEL_WANBA] = wanbaConfig;
            SDKManager._resource_config = configs;
        }
    };
    SDKManager.getHandler = function (channel) {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        var key = EChannel[targetChannel];
        return SDKManager._handlers[key];
    };
    SDKManager.getStatistics = function (channel) {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        var key = EChannel[targetChannel];
        return SDKManager._statistics[key];
    };
    SDKManager.getResourceConfig = function (channel) {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        return SDKManager._resource_config[targetChannel];
    };
    /**
     * SDK数据初始化
     */
    SDKManager.init = function () {
        SDKManager.loadResourceConfig();
        var channel = SDKUtil.getQueryString("myChannel");
        var loginInfo = SDKManager.loginInfo;
        // update info
        if (channel) {
            loginInfo.channel = channel;
        }
        else {
            // 20170420 为玩吧修改 不从canvasURL获取到channel的情况读取默认配置
            SDKDefaultJS.init(loginInfo);
            channel = loginInfo.channel;
        }
        var subchannel = SDKUtil.getQueryString("subchannel");
        if (subchannel) {
            loginInfo.subChannel = subchannel;
        }
        else {
            loginInfo.subChannel = loginInfo.channel;
        }
        loginInfo.url = ChannelDefine.getUrl(loginInfo.channel);
        // load js
        var jsLibs = ChannelDefine.getLibs(loginInfo.channel);
        var onLoadScriptSuccess = SDKManager.login;
        if (jsLibs) {
            try {
                SDKManager.loadScripts(jsLibs, onLoadScriptSuccess);
            }
            catch (e) {
                egret.error("SDKManager.loadScrpt() failed. " + e.message);
                if (confirm("Net Error.")) {
                    SDKManager.retry();
                }
            }
        }
        else {
            onLoadScriptSuccess();
        }
    };
    SDKManager.loadScripts = function (libs, success) {
        SDKUtil.loadScript(libs, success);
    };
    /**
     * sdk登录处理
     */
    SDKManager.login = function () {
        //egret.log("SDKManager.login() start.");
        var logininfo = SDKManager.loginInfo;
        var statistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.init(SDKManager.loginInfo);
        }
        var handler = SDKManager.getHandler();
        if (handler) {
            handler.init();
            // 赋值了 一个引用
            handler.info = logininfo;
            handler.loginCallback = SDKManager.loginCallback;
            handler.loginFailed = SDKManager.retry;
            handler.login();
        }
        else {
            SDKManager.loginCallback();
        }
        //    logininfo.account = "hehe";
        //    logininfo.channel = 1005;
        //    logininfo.subChannel = 1005;
        //     logininfo.url = "http://192.168.0.200:30000";
        //     var adInfo:IADInfo = {
        //         adFrom:111,
        //         deviceId: "xxx",
        //         imei:"ime",
        //         brand: "huawei",
        //         mac: "mac",
        //         model: "xx",
        //         spid: "20409",
        //         wd: "0",
        //         netType: "1"
        //     }
        //     logininfo.adFrom = adInfo;
    };
    SDKManager.loginCallback = function () {
        //egret.log("SDKManager.loginCallback() start.");
        var info = SDKManager.loginInfo;
        if (info.subChannel) {
            info.subChannel = info.subChannel;
        }
        SDKManager.loginFlag = true;
        var statistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.login(SDKManager.loginInfo);
        }
        //SaTalkingData.getInstance().login(SDKManager.loginInfo);
    };
    /**
     * 登录重试
     */
    SDKManager.retry = function () {
        // FIXME 刷新不能解决所有问题 可能需要logout->login
        //location.reload();
    };
    /**
     * 获取当前渠道号
     */
    SDKManager.getChannel = function () {
        return SDKManager.loginInfo.channel;
    };
    /**
     * 检查登录状态
     */
    SDKManager.isLogin = function () {
        return SDKManager.loginFlag;
    };
    /**
     * 发起支付
     */
    SDKManager.pay = function (payInfo, owner) {
        var handler = SDKManager.getHandler();
        if (handler) {
            // 暂时屏蔽支付功能
            handler.pay(payInfo, owner);
        }
    };
    /**
     * 登录游戏服回调
     */
    SDKManager.onEnterGame = function (player) {
        this.loginInfo.playerId = player.id;
        var handler = SDKManager.getHandler();
        if (handler && handler.onEnterGame) {
            handler.onEnterGame(player);
        }
        var statistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.onEnterGame(SDKManager.loginInfo, player);
        }
        // FIXME
        //SaTalkingData.getInstance().onEnterGame(SDKManager.loginInfo, player);
    };
    /**
     * 建角回调
     */
    SDKManager.onCreateRole = function (playerInfo) {
        var statistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.onCreateRole(SDKManager.loginInfo, playerInfo);
        }
        // FIXME 
        //SaTalkingData.getInstance().onCreateRole(SDKManager.loginInfo, playerInfo);
    };
    /**
     * 获取关注图标
     */
    SDKManager.getFocusSkin = function () {
        var handler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            var config = SDKManager.getResourceConfig();
            if (config) {
                return config.forcusBtnImg;
            }
        }
        return null;
    };
    /**
     * 发起关注
     */
    SDKManager.subscribe = function () {
        var handler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            handler.subscribe();
        }
    };
    /**
     * 获取分享图标
     */
    SDKManager.getShareSkin = function () {
        var handler = SDKManager.getHandler();
        if (handler && handler.share) {
            var config = SDKManager.getResourceConfig();
            if (config) {
                return config.shareBtnImg;
            }
        }
        return null;
    };
    /**
     * 发起分享
     */
    SDKManager.share = function (owner) {
        var handler = SDKManager.getHandler();
        if (handler && handler.share) {
            handler.share(owner);
        }
    };
    /**
     * 发起分享到指定目标
     */
    SDKManager.shareTo = function (owner, to) {
        var handler = SDKManager.getHandler();
        if (handler && handler.shareTo) {
            handler.shareTo(owner, to);
        }
    };
    /**
     * 获取分享信息skin
     */
    SDKManager.getShareInfoSkin = function () {
        var handler = SDKManager.getHandler();
        if (handler && handler.share) {
            var config = SDKManager.getResourceConfig();
            if (config) {
                return config.shareInfoSkin;
            }
        }
        return null;
    };
    /**
    * 获取CDKey描述
    */
    SDKManager.getCDKeyDesc = function () {
        var handler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            var config = SDKManager.getResourceConfig();
            if (config) {
                return config.sdkDesc;
            }
        }
        return "这里是SDK对应的激活码描述区";
    };
    /**
     * 领取礼包
     */
    SDKManager.getGift = function (owner) {
        //SDKWanBa.getInstance().getGift(owner);
        var handler = SDKManager.getHandler();
        if (handler && handler.getGift) {
            handler.getGift(owner);
        }
    };
    /**
     * 钻石变更
     */
    SDKManager.onDiamondUpdate = function (changeType, changeValue, currency) {
    };
    /**
    * 金币变更
    */
    SDKManager.onMoneyUpdate = function (changeType, changeValue, currency) {
    };
    SDKManager.onLevelUp = function (playerInfo) {
    };
    return SDKManager;
}());
SDKManager.loginInfo = {
    channel: EChannel.CHANNEL_WYCX,
    subChannel: EChannel.CHANNEL_WYCX,
    serverId: null,
    url: ChannelDefine.getUrl(EChannel.CHANNEL_WYCX),
    account: null,
    playerId: null,
    platform: EPlatform.PLATFORM_NONE,
    inviter: 0
};
SDKManager.loginFlag = false;
/**
 * SDK功能处理器mapping
 */
SDKManager._handlers = {
    CHANNEL_WANBA: SDKWanBa.getInstance()
};
/**
 * SDK统计mapping
 */
SDKManager._statistics = {
    CHANNEL_WANBA: SaTalkingData.getInstance(),
};
__reflect(SDKManager.prototype, "SDKManager");
//# sourceMappingURL=SDKManager.js.map