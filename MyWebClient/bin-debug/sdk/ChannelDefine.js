var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EChannel;
(function (EChannel) {
    EChannel[EChannel["CHANNEL_AWY"] = 1001] = "CHANNEL_AWY";
    EChannel[EChannel["CHANNEL_CRAZY"] = 1002] = "CHANNEL_CRAZY";
    EChannel[EChannel["CHANNEL_YYB"] = 1003] = "CHANNEL_YYB";
    EChannel[EChannel["CHANNEL_EGRET"] = 1004] = "CHANNEL_EGRET";
    EChannel[EChannel["CHANNEL_WANBA"] = 1005] = "CHANNEL_WANBA";
    EChannel[EChannel["CHANNEL_WYCX"] = 10000] = "CHANNEL_WYCX";
})(EChannel || (EChannel = {}));
;
var ChannelDefine = (function () {
    function ChannelDefine() {
    }
    ChannelDefine.checkResult = function (result) {
        if (!result[ChannelDefine.RET]) {
            return false;
        }
        if (result[ChannelDefine.RET] != ChannelDefine.SUCCESS) {
            return false;
        }
        return true;
    };
    Object.defineProperty(ChannelDefine, "PROTCOL", {
        get: function () {
            return this.isPublish ? "https" : "http";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取当前渠道须要的js库
     */
    ChannelDefine.getLibs = function (channel) {
        var name = EChannel[channel];
        return ChannelDefine.CHANNEL_LIBS[name];
    };
    /**
     * 获取当前渠道须要的logon地址
     */
    ChannelDefine.getUrl = function (channel) {
        var name = EChannel[channel];
        return ChannelDefine.LOGON_URL[name];
    };
    ChannelDefine.createSDKURL = function (loginInfo, path, params) {
        //egret.log("createURL.")
        var name = EChannel[loginInfo.channel];
        var url = ChannelDefine.SDK_URL[name] + "/sdk/" + path + ".do";
        if (params) {
            url += "?";
        }
        for (var v in params) {
            url += v + "=" + params[v] + "&";
        }
        return url;
    };
    return ChannelDefine;
}());
// public static PROTCOL = "https";
// public static PROTCOL = "https";
/** 游戏logo */
ChannelDefine.GAME_LOGO_URL = ChannelDefine.PROTCOL + "://mh.tcdn.myqcloud.com/aquarium/logo.jpg";
ChannelDefine.GAME_SHORT_TITLE = "梦幻水族箱";
ChannelDefine.GAME_TITLE = "梦幻水族箱";
ChannelDefine.GAME_DESC = "周游全世界，收集个性奇鱼，打造定制鱼缸，丰富互动等你来体验！";
ChannelDefine.isPublish = false;
ChannelDefine.RET = "ret";
ChannelDefine.SUCCESS = "0";
ChannelDefine.ERROR = "-1";
/**
 * js库
 */
ChannelDefine.CHANNEL_LIBS = {
    CHANNEL_AWY: ["libs/SDK/SDKAWYJS.js", "http://cdn.11h5.com/static/js/sdk.min.js"],
    CHANNEL_CRAZY: ["libs/SDK/SDKCrazyJS.js", "http://h5.hortorgames.com/sdk/sdk_agent.min.js"],
    CHANNEL_YYB: ["libs/SDK/SDKYYBJS.js", "http://qzonestyle.gtimg.cn/open/mobile/h5gamesdk/build/sdk.js"],
    CHANNEL_EGRET: [],
    CHANNEL_WANBA: ["libs/SDK/SDKWanBa.js"],
    CHANNEL_WYCX: [],
};
/**
 * 登录地址
 */
ChannelDefine.LOGON_URL = {
    CHANNEL_WANBA: ChannelDefine.PROTCOL + "://mh1.milgame.cn:10000",
    CHANNEL_WYCX: ChannelDefine.PROTCOL + "://127.0.0.1:10000",
};
ChannelDefine.SDK_URL = {
    CHANNEL_WANBA: ChannelDefine.PROTCOL + "://mh1.milgame.cn:20000",
};
__reflect(ChannelDefine.prototype, "ChannelDefine");
//# sourceMappingURL=ChannelDefine.js.map