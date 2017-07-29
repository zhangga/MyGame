class SDKWanBa implements ISDKHandler {
    public info: ILoginInfo;
    public loginCallback: () => void;
    public loginFailed: () => void;
    private static _instance: SDKWanBa;
    constructor() { }

    // 没有强制限制，仿一个Singleton
    public static getInstance(): SDKWanBa {
        if (this._instance == null) {
            this._instance = new SDKWanBa();
        }
        return this._instance;
    }

    private APPID = "1106221968";
    /** 用户openid 默认从url取 */
    private openid: string;
    /** 用户openkey 默认从url取 */
    private openkey: string;
    /** 充值平台标识 默认从url取 */
    private pf: string;
    /** 区ID，用于区分用户是在哪一款平台下(Android、IOS等) */
    private platform: string;
    /** 礼包码 */
    private gift: string;
    /** 邀请人 */
    private inviter: string;

    // 登录请求路径
    private loginPath: string = "wanba/login";
    // 获取余额请求路径
    private balancePath: string = "wanba/balance";
    // 扣费发货请求路径
    private payPath: string = "wanba/pay";
    // 礼包领取请求路径
    private giftPath: string = "wanba/gift";

    private ParamDefine = {
        openid: "openid",
        openkey: "openkey",
        pf: "pf",
        zoneid: "zoneid",
        platform: "platform",
        inviter: "inviteId",
    };

    // 分享参数
    private SHARE_OPTION: IWanBaShareOption = {
        title: ChannelDefine.GAME_TITLE,
        desc: ChannelDefine.GAME_DESC,
        image: ChannelDefine.GAME_LOGO_URL,
        url: null
    }

    // 快捷方式参数
    private SHOTCUT_OPTION: IWanBaShotcutOption = {
        title: ChannelDefine.GAME_SHORT_TITLE,
        image: ChannelDefine.GAME_LOGO_URL,
    }

    public init() {
        SDKWanBaJS.init(this.SHOTCUT_OPTION);
        SDKWanBaJS.setOnShareHandler(this.SHARE_OPTION, this.shareCallback);
    };

    /**
     * 登录
     */
    public login(): void {
        var openData: any = SDKWanBaJS.getOpenDataSync();
        egret.log(openData);

        this.openid = openData.openid;
        this.openkey = openData.openkey;
        this.pf = openData.pf;
        this.platform = openData.platform;

        this.inviter = SDKUtil.getQueryString(this.ParamDefine.inviter);
        this.gift = SDKUtil.getQueryString("GIFT");

        // egret.log("userToken=" + userToken + ",fuid=" + fuid + ",focus=" + focus);
        var url = ChannelDefine.createSDKURL(
            this.info,
            this.loginPath,
            {
                openid: this.openid,
                openkey: this.openkey,
                pf: this.pf,
            });
        HttpUtil.sendGetRequest(url, this.onGetUserInfoComplete, this);
    }

    private onGetUserInfoComplete(event: egret.Event): void {
        var request = <egret.HttpRequest>event.currentTarget;
        var info = JSON.parse(request.response);
        egret.log("result:" + request.response);
        if ((!info.ret)) {
            this.info.account = this.openid,
                this.info.nickName = decodeURI(info.nickname),
                this.info.avatarUrl = info.figureurl,
                this.info.platform = <any>this.platform,
                this.info.inviter = this.inviter ? <any>this.inviter : 0,
                this.loginCallback();
            try {
                SDKWanBaJS.register();
            } catch (e) {
                Tool.log("Register report failed:" + e.message);
            }
        } else {
            this.loginFailed();
        }
    }

    public onEnterGame(player: IPlayerInfo) {
        var openData: any = SDKWanBaJS.getOpenDataSync();
        var shareUrl = openData && openData.shareurl || window.location.href;
        shareUrl += "&" + this.ParamDefine.inviter + "=" + player.id;
        //window.alert("shareUrl:" + shareUrl);
        // 分享链接更新
        this.SHARE_OPTION.url = shareUrl;
        SDKWanBaJS.setOnShareHandler(this.SHARE_OPTION, this.shareCallback);
        try {
            SDKWanBaJS.login();
        } catch (e) {
            Tool.log("Login report failed:" + e.message);
        }
    }

    /**
     * zoneid=1 安卓充值项
     */
    private static ZONE1_GOODS_DEFINE = {
        28: 13620,
        80: 13621,
        6: 13622,
        30: 13623,
        98: 13624,
        198: 13625,
        328: 13626,
        648: 13627,
        // fixme TEST CODE
        1: 13425
    }

    /**
     * zoneid=2 IOS充值项
     */
    private static ZONE2_GOODS_DEFINE = {
        28: 13628,
        80: 13629,
        6: 13630,
        30: 13631,
        98: 13632,
        198: 13633,
        328: 13634,
        648: 13635,
    }


    /** 
     * 支付 
     * 1.游戏调用购买道具的接口（接口文档：http://wiki.open.qq.com/wiki/v3/user/buy_playzone_item）
     * 2.如果余额不足则呼起充值界面（呼起方式见第三点）。
     * 3.如果余额充足，则直接扣款并兑换道具.
     * 同时，也提供了接口可以给游戏侧直接查询余额（接口文档：http://wiki.open.qq.com/wiki/v3/user/get_playzone_userinfo）。
     */
    public pay(payInfo: IPayInfo, owner: ISDKPayContainer): void {
        try {
            var self = this;
            //1.获取余额
            var onGetBalance = function (event: egret.Event) {
                var request = <egret.HttpRequest>event.currentTarget;
                var result = JSON.parse(request.response);
                if (result.code != 0) {
                    owner.showTips("支付失败:" + result.code + "," + result.msg);
                    return;
                }
                var balance = result.data[0].score;
                //2.余额不足
                var amount = payInfo.amount;
                var onError = function () {
                    owner.showTips("支付失败");
                };

                //3.支付成功 余额充足，则直接扣款并兑换道具
                var onSuccess = function () {
                    var itemid = (self.platform == <any>EPlatform.PLATFORM_ANDROID) ?
                        SDKWanBa.ZONE1_GOODS_DEFINE[payInfo.amount] :
                        SDKWanBa.ZONE2_GOODS_DEFINE[payInfo.amount];
                    self.requestPay(itemid, owner);
                };
                var onClose = function () {
                    owner.showTips("支付取消");
                };

                var targetBalance = amount * 10;
                if (balance < targetBalance) {
                    SDKWanBaJS.pay({
                        defaultScore: targetBalance,
                        appid: self.APPID,
                        paySuccess: onSuccess,
                        payError: onError,
                        payClose: onClose,
                    });
                } else {
                    onSuccess();
                }
            };
            this.requestBalance(onGetBalance);
        } catch (e) {
            owner.showTips("支付失败:" + e.message);
        }
    }

    /**
     * 请求余额
     */
    private requestBalance(onGetBalance: (event: egret.Event) => void) {
        var url = ChannelDefine.createSDKURL(
            this.info,
            this.balancePath,
            {
                openid: this.openid,
                openkey: this.openkey,
                pf: this.pf,
                zoneid: this.platform
            });
        HttpUtil.sendGetRequest(url, onGetBalance, this);
    }

    /** 
     * 支付成功请求 
     * 扣款并兑换道具
     */
    public requestPay(itemid, owner: ISDKPayContainer): void {
        var url = ChannelDefine.createSDKURL(
            this.info,
            this.payPath,
            {
                openid: this.openid,
                openkey: this.openkey,
                pf: this.pf,
                zoneid: this.platform,
                itemid: itemid,
                serverid: this.info.serverId,
                playerid: this.info.playerId,
            });
        var onPayCompleted = function (event: egret.Event) {
            var request = <egret.HttpRequest>event.currentTarget;
            var result = JSON.parse(request.response);
            //egret.log("pay " + result.ret);
            if ((!result.ret)) {
                owner.showTips("余额不足");
            } else {
                owner.showTips("支付成功");
            }
        };
        HttpUtil.sendGetRequest(url, onPayCompleted, this);
    }

    /** 获取登录礼包 */
    public getGift(owner: ISDKPayContainer): void {
        // this.gift = SDKUtil.getQueryString("GIFT");
        // this.info = SDKManager.loginInfo;
        // this.info.platform = 0;
        // this.platform = "0";

        if (!this.gift) {
            return null;
        }
        var url = ChannelDefine.createSDKURL(
            this.info,
            this.giftPath,
            {
                openid: this.info.account,
                zoneid: this.info.platform,
                serverid: this.info.serverId,
                playerid: this.info.playerId,
                boxid: this.gift
            });
        HttpUtil.sendGetRequest(
            url,
            function (event: egret.Event) {
                var request = <egret.HttpRequest>event.currentTarget;
                var result = JSON.parse(request.response);
                if (result) {
                    var box = result.ret;
                    var success: boolean = box > 0;
                    var resultObj = success ?
                        { result: success, box: box } :
                        { result: success, box: this.gift };
                    owner.showTips(resultObj);
                }
            },
            this);
    }


    public shareContainer: ISDKShareContainer;

    /**
     * 发起分享
     */
    public share(owner: ISDKShareContainer): void {
        this.shareContainer = owner;
        SDKWanBaJS.showShareMenu(this.SHARE_OPTION, this.shareCallback);
    }

    /**
     * 分享到指定对象
     */
    public shareTo(owner: ISDKShareContainer, to: EShareTo): void {
        this.shareContainer = owner;
        SDKWanBaJS.doShare(to, this.SHARE_OPTION, this.shareCallback);
    }

    /**
     * 0 -- 用户点击发送，完成整个分享流程
     * 1 -- 用户点击取消，中断分享流程
     * 2 -- IOS端分享到微信或朋友圈时，手动取消分享将返回-2
     */
    public shareCallback(result): void {
        //window.alert("shareCallback:" + result.retCode);
        if (!result.retCode) {
            return;
        }
        var shareContainer: ISDKShareContainer = SDKWanBa.getInstance().shareContainer;
        if (shareContainer) {
            shareContainer.shareComplete();
        }
    }

}