enum EChannel {
    CHANNEL_AWY = 1001, // 独角兽(爱微游)
    CHANNEL_CRAZY = 1002,   // 疯狂游乐场
    CHANNEL_YYB = 1003,   // 应用宝
    CHANNEL_EGRET = 1004,   // 白鹭
    CHANNEL_WANBA = 1005,   // 玩吧
    CHANNEL_WYCX = 10000,    // 万游
};


class ChannelDefine {
    // public static PROTCOL = "https";
    // public static PROTCOL = "https";
    /** 游戏logo */
    public static GAME_LOGO_URL = ChannelDefine.PROTCOL + "://mh.tcdn.myqcloud.com/aquarium/logo.jpg";
    public static GAME_SHORT_TITLE = "梦幻水族箱";
    public static GAME_TITLE = "梦幻水族箱";
    public static GAME_DESC = "周游全世界，收集个性奇鱼，打造定制鱼缸，丰富互动等你来体验！";
    public static isPublish: boolean = false;

    public static RET = "ret";
    public static SUCCESS = "0";
    public static ERROR = "-1";
    public static checkResult(result): boolean {
        if (!result[ChannelDefine.RET]) {
            return false;
        }
        if (result[ChannelDefine.RET] != ChannelDefine.SUCCESS) {
            return false;
        }
        return true;
    }

    public static get PROTCOL(): string {
        return this.isPublish ? "https" : "http";
    }
    /**
     * js库
     */
    private static CHANNEL_LIBS = {
        CHANNEL_AWY: ["libs/SDK/SDKAWYJS.js", "http://cdn.11h5.com/static/js/sdk.min.js"],
        CHANNEL_CRAZY: ["libs/SDK/SDKCrazyJS.js", "http://h5.hortorgames.com/sdk/sdk_agent.min.js"],
        CHANNEL_YYB: ["libs/SDK/SDKYYBJS.js", "http://qzonestyle.gtimg.cn/open/mobile/h5gamesdk/build/sdk.js"],
        CHANNEL_EGRET: [],
        CHANNEL_WANBA: ["libs/SDK/SDKWanBa.js"],
        CHANNEL_WYCX: [],
    };

    /**
     * 获取当前渠道须要的js库
     */
    public static getLibs(channel: EChannel): Array<string> {
        var name: string = EChannel[channel];
        return ChannelDefine.CHANNEL_LIBS[name];
    }

    /**
     * 登录地址
     */
    private static LOGON_URL = {
        CHANNEL_WANBA: ChannelDefine.PROTCOL + "://mh1.milgame.cn:10000",
        CHANNEL_WYCX: ChannelDefine.PROTCOL + "://127.0.0.1:10000",
    }

    private static SDK_URL = {
        CHANNEL_WANBA: ChannelDefine.PROTCOL + "://mh1.milgame.cn:20000",
    }

    /**
     * 获取当前渠道须要的logon地址
     */
    public static getUrl(channel: EChannel): string {
        var name: string = EChannel[channel];
        return ChannelDefine.LOGON_URL[name];
    }

    public static createSDKURL(loginInfo: ILoginInfo, path: string, params: any): string {
        //egret.log("createURL.")
        var name: string = EChannel[loginInfo.channel];
        var url = ChannelDefine.SDK_URL[name] + "/sdk/" + path + ".do";
        if (params) {
            url += "?";
        }
        for (var v in params) {
            url += v + "=" + params[v] + "&";
        }
        return url;
    }
}