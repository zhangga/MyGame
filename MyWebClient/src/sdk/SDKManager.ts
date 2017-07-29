/**性别**/
enum SHARE_TYPE {
    QQ = 0,//QQ好友；
    QZONE = 1,//QQ空间；
    WX = 2,//微信好友；
    TL = 3//微信朋友圈。
}

/**
 * 不要在SDK模块中引用任何游戏逻辑
 * 方便下一步分离
 */
class SDKManager {
    public static loginInfo: ILoginInfo = {
        channel: EChannel.CHANNEL_WYCX,
        subChannel: EChannel.CHANNEL_WYCX,
        serverId: null,
        url: ChannelDefine.getUrl(EChannel.CHANNEL_WYCX),
        account: null,
        playerId: null,
        platform: EPlatform.PLATFORM_NONE,
        inviter: 0
    };
    public static loginFlag: boolean = false;

    /**
     * SDK功能处理器mapping
     */
    private static _handlers = {
        CHANNEL_WANBA: SDKWanBa.getInstance()
    };
    /**
     * SDK统计mapping
     */
    private static _statistics = {
        CHANNEL_WANBA: SaTalkingData.getInstance(),
    };
    /**
     * SDK分享btn显示
     */
    private static _resource_config;
    private static loadResourceConfig() {
        // TODO reload
        var configs = SDKManager._resource_config;
        if (!configs) {
            configs = {};
            // AWY
            var awyConfig: ISDKResourceConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoAWYSkin",
                sdkDesc: "加QQ群还会获得额外礼包，群号：",
            }
            configs[EChannel.CHANNEL_AWY] = awyConfig;
            // CRAZY
            var crazyConfig: ISDKResourceConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "加QQ群还会获得额外礼包，群号：",
            }
            configs[EChannel.CHANNEL_CRAZY] = crazyConfig;
            // EGRET 
            var egretConfig: ISDKResourceConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "",
            }
            configs[EChannel.CHANNEL_EGRET] = egretConfig;
            // WANBA
            var wanbaConfig: ISDKResourceConfig = {
                forcusBtnImg: "sdk_guanzhu_png",
                shareBtnImg: "sdk_fenxiang_png",
                shareInfoSkin: "skins.ShareInfoCrazySkin",
                sdkDesc: "",
            }
            // configs[EChannel.CHANNEL_WANBA] = wanbaConfig;
            SDKManager._resource_config = configs;
        }
    }

    public static getHandler(channel?: EChannel): ISDKHandler {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        var key = EChannel[targetChannel];
        return SDKManager._handlers[key];
    }

    public static getStatistics(channel?: EChannel): ISDKStatistics {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        var key = EChannel[targetChannel];
        return SDKManager._statistics[key];
    }

    private static getResourceConfig(channel?: EChannel): ISDKResourceConfig {
        var targetChannel = channel;
        if (!targetChannel) {
            targetChannel = SDKManager.loginInfo.channel;
        }
        return SDKManager._resource_config[targetChannel];
    }

    public constructor() {

    }
    /**
     * SDK数据初始化
     */
    public static init(): void {

        SDKManager.loadResourceConfig();
        var channel: number = <number><any>SDKUtil.getQueryString("myChannel");
        var loginInfo = SDKManager.loginInfo;

        // update info
        if (channel) {
            loginInfo.channel = channel;
        } else {
            // 20170420 为玩吧修改 不从canvasURL获取到channel的情况读取默认配置
            SDKDefaultJS.init(loginInfo);
            channel = loginInfo.channel;
        }
        var subchannel = SDKUtil.getQueryString("subchannel");
        if (subchannel) {
            loginInfo.subChannel = <number><any>subchannel;
        } else {
            loginInfo.subChannel = loginInfo.channel;
        }
        loginInfo.url = ChannelDefine.getUrl(loginInfo.channel);
        // load js
        var jsLibs: Array<string> = ChannelDefine.getLibs(loginInfo.channel);

        var onLoadScriptSuccess = SDKManager.login;
        if (jsLibs) {
            try {
                SDKManager.loadScripts(jsLibs, onLoadScriptSuccess);
            } catch (e) {
                egret.error("SDKManager.loadScrpt() failed. " + e.message);
                if (confirm("Net Error.")) {
                    SDKManager.retry();
                }
            }
        } else {
            onLoadScriptSuccess();
        }
    }

    public static loadScripts(libs: Array<string>, success: () => void): void {
        SDKUtil.loadScript(libs, success);
    }

    /**
     * sdk登录处理
     */
    public static login(): void {
        //egret.log("SDKManager.login() start.");
        var logininfo = SDKManager.loginInfo;

        var statistics: ISDKStatistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.init(SDKManager.loginInfo);
        }
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler) {
            handler.init();
            // 赋值了 一个引用
            handler.info = logininfo;
            handler.loginCallback = SDKManager.loginCallback;

            handler.loginFailed = SDKManager.retry;
            handler.login();
        } else {
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
    }

    public static loginCallback() {
        //egret.log("SDKManager.loginCallback() start.");
        var info = SDKManager.loginInfo;
        if (info.subChannel) {
            info.subChannel = info.subChannel;
        }
        SDKManager.loginFlag = true;

        var statistics: ISDKStatistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.login(SDKManager.loginInfo);
        }

        //SaTalkingData.getInstance().login(SDKManager.loginInfo);
    }

    /**
     * 登录重试
     */
    public static retry() {
        // FIXME 刷新不能解决所有问题 可能需要logout->login
        //location.reload();
    }

    /**
     * 获取当前渠道号
     */
    public static getChannel(): number {
        return SDKManager.loginInfo.channel;
    }

    /**
     * 检查登录状态
     */
    public static isLogin(): boolean {
        return SDKManager.loginFlag;
    }

    /**
     * 发起支付
     */
    public static pay(payInfo: IPayInfo, owner: ISDKPayContainer) {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler) {
            // 暂时屏蔽支付功能
            handler.pay(payInfo, owner);
        }
    }

    /**
     * 登录游戏服回调
     */
    public static onEnterGame(player: IPlayerInfo) {
        this.loginInfo.playerId = player.id;
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.onEnterGame) {
            handler.onEnterGame(player);
        }
        var statistics: ISDKStatistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.onEnterGame(SDKManager.loginInfo, player);
        }
        // FIXME
        //SaTalkingData.getInstance().onEnterGame(SDKManager.loginInfo, player);
    }

    /**
     * 建角回调
     */
    public static onCreateRole(playerInfo: IPlayerInfo) {
        var statistics: ISDKStatistics = SDKManager.getStatistics();
        if (statistics) {
            statistics.onCreateRole(SDKManager.loginInfo, playerInfo);
        }
        // FIXME 
        //SaTalkingData.getInstance().onCreateRole(SDKManager.loginInfo, playerInfo);
    }

    /**
     * 获取关注图标
     */
    public static getFocusSkin(): string {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            var config: ISDKResourceConfig = SDKManager.getResourceConfig();
            if (config) {
                return config.forcusBtnImg;
            }
        }
        return null;
    }

    /**
     * 发起关注
     */
    public static subscribe() {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            handler.subscribe();
        }
    }

    /**
     * 获取分享图标
     */
    public static getShareSkin(): string {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.share) {
            var config: ISDKResourceConfig = SDKManager.getResourceConfig();
            if (config) {
                return config.shareBtnImg;
            }
        }
        return null;
    }

    /**
     * 发起分享
     */
    public static share(owner: ISDKShareContainer) {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.share) {
            handler.share(owner);
        }
    }


    /**
     * 发起分享到指定目标
     */
    public static shareTo(owner: ISDKShareContainer, to: EShareTo) {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.shareTo) {
            handler.shareTo(owner, to);
        }
    }

    /**
     * 获取分享信息skin
     */
    public static getShareInfoSkin(): string {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.share) {
            var config: ISDKResourceConfig = SDKManager.getResourceConfig();
            if (config) {
                return config.shareInfoSkin;
            }
        }
        return null;
    }

    /**
    * 获取CDKey描述
    */
    public static getCDKeyDesc(): string {
        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.subscribe) {
            var config: ISDKResourceConfig = SDKManager.getResourceConfig();
            if (config) {
                return config.sdkDesc;
            }
        }
        return "这里是SDK对应的激活码描述区";
    }

    /**
     * 领取礼包
     */
    public static getGift(owner: ISDKGiftContainer): void {
        //SDKWanBa.getInstance().getGift(owner);

        var handler: ISDKHandler = SDKManager.getHandler();
        if (handler && handler.getGift) {
            handler.getGift(owner);
        }
    }

    /**
     * 钻石变更
     */
    public static onDiamondUpdate(changeType, changeValue: number, currency: number): void {
    }

    /**
    * 金币变更
    */
    public static onMoneyUpdate(changeType, changeValue: number, currency: number): void {
    }

    public static onLevelUp(playerInfo: IPlayerInfo): void {
    }

}