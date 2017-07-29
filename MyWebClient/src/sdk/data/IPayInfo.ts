/** 支付信息标志 */
interface IPayInfo {
    /** 充值项名称 */
    goodsName: string;    
    /** 充值金额 */
    amount: number;
    /** 充值时的玩家信息 */
    playerInfo: IPlayerInfo;
}