
/** 初始登录信息 */
interface IDefaultInfo {
    /** 渠道 */
    channel: number;
    /** 子渠道 */
    subChannel?:number;
}

declare module SDKDefaultJS{
    function init(targetData:IDefaultInfo): void; 
}
declare module SDKUtil
{
    function getQueryString(name:string) : string;
    function getDecodedString(name:string) : string;
    function loadScript(libs:Array<string>, success:()=>void) :void;
}

