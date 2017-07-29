/** sdk处理器标识 */
interface ISDKHandler {
    /** 
     * 登录信息 
     * 就是SDKManager里的info
     */
    info: ILoginInfo;

    init:()=>void;
    /** 登录成功回调 */
    loginCallback:()=>void;
    /** 登录失败回调 */
    loginFailed:()=>void;
    /** SDK登录 */
    login:()=> void;
    /** 充值 */
    pay:(payInfo: IPayInfo, owner:ISDKPayContainer)=>void;
    /** 关注 */
    subscribe?:()=>void;
    /** 分享 */
    share?:(owner:ISDKShareContainer)=>void;
    /** 分享到指定对象 */
    shareTo?:(owner:ISDKShareContainer, to:EShareTo)=>void;
    /** 登录游戏 */
    onEnterGame?:(player:IPlayerInfo)=>void;
    /** 获取登录礼包 */
    getGift?:(owner:ISDKPayContainer)=>void;
}
