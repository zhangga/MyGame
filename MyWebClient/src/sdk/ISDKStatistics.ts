/** SDK统计接口 */
interface ISDKStatistics {
    /** 初始化 */
    init:(loginInfo: ILoginInfo)=>void;
    /** 账户登录 */
    login:(loginInfo: ILoginInfo)=>void;
	/** 注册统计 */
    onCreateRole:(loginInfo: ILoginInfo, playerInfo: IPlayerInfo)=>void;
    /** 游戏登录统计 */
    onEnterGame:(loginInfo: ILoginInfo, playerInfo: IPlayerInfo)=> void;
    /** 加载统计 */
    //loadingSetAccount?(countType: GAMECOUNT_TYPE, desc: string): void;
}