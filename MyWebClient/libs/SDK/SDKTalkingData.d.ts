/**
 * 账户标识
 */
interface IAccount{
    /** 账号 */
    accountId : string;
    /** 账户类型: 0，匿名账户 */
    accountType? : number;
    /** 账户名：如：昵称，邮箱名 */
    accountName?: string;
    /** 等级 */
    level: number;
    /** 性别：1，男；2，女； */
    gender: number;
    /** 服务器 */
    gameServer : string;

}

declare module SDKTalkingDataJS
{
    function setAccount(account: IAccount): void;
    function onEvent(key, value): void;
    //function pay(option:any) :void;
}

