/**
 * 玩吧支付参数
 */
interface IWanBaPayOption{
    /** 实际价格 */
    defaultScore:number,
    appid:string,
    paySuccess:()=>void,
    payError:()=>void,
    payClose:()=>void,
}

/**
 * 玩吧分享参数
 */
interface IWanBaShareOption{
    title,
    desc,
    image,
    url
}

/**
 * 玩吧快捷方式参数
 */
interface IWanBaShotcutOption{
    title,
    image,
}

declare module SDKWanBaJS{
    function init(shotcutOption:IWanBaShotcutOption):void;
    //function getOpenDataAsync(callback): void;
    /** 同步获取opendata */
    function getOpenDataSync(): any;
    function pay(option: IWanBaPayOption): void;
    /** 设置分享按钮监听事件处理 */
    function setOnShareHandler(option:IWanBaShareOption, callback:(retCode)=>void);
    /** 调用分享菜单 */
    function showShareMenu(option:IWanBaShareOption, callback:(retCode)=>void);
    /** 调用分享接口 */
    function doShare(type:number, option:IWanBaShareOption, callback:(retCode)=>void);

    /** report */
    function register():void;
    function login():void;
}


