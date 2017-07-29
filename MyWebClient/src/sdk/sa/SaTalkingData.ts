/**
 * TalkingData统计
 */
class SaTalkingData implements ISDKStatistics{
    private static _instance: SaTalkingData;
    constructor(){}

    // 没有强制限制，仿一个Singleton
    public static getInstance(): SaTalkingData {
        if (this._instance == null) {
            this._instance = new SaTalkingData();
        }
        return this._instance;
    }

    /** 初始化 */
    public init(loginInfo: ILoginInfo): void{
    }

    public login(loginInfo: ILoginInfo): void{
        egret.log("SaTalkingData.login()");
        this.setAccount(loginInfo);
    }

    public onCreateRole(loginInfo: ILoginInfo, playerInfo: IPlayerInfo) :void{
        egret.log("SaTalkingData.onCreateRole()");
        this.setAccount(loginInfo, playerInfo);
        if(loginInfo.inviter > 0){
            this.onEvent("invite", 1);
        }
    }  

    public onEvent(key, value){
        try{
            SDKTalkingDataJS.onEvent(key, value);
        }catch(e){
            egret.error("SaTalkingData.onEvent() failed. key=" + key + ", value=" + value + ". " + e.message);
        }
    }

    private setAccount(loginInfo: ILoginInfo, playerInfo?: IPlayerInfo):void{
        if(!loginInfo || !loginInfo.account){
            egret.error("No account.");
            return;
        }
        try{
            // 为什么不用另外var编译会被忽略？
            var name, level, gender;
            if(playerInfo){
                name = playerInfo.id + "_" + playerInfo.name;
                level = playerInfo.level;
                gender = playerInfo.sex == SEX_TYPE.FEMALE ? 2: 1;
            }else{
                name = "";
                level = 0;
                gender = 2;
            }
            var DEFINE = SaTalkingData;
            var account:IAccount = {
                accountId: loginInfo.account + "_" + loginInfo.platform ,
                accountName: name,
                accountType: loginInfo.platform,
                level: level,
                gender: gender,
                gameServer:"0"
            };
            SDKTalkingDataJS.setAccount(account);
            egret.log("SaTalkingData.setAccount() success. account=" + account.accountId);
        }catch(e){
            egret.error("SaTalkingData.setAccount() failed. " + e.message);
        }
    }

    public onEnterGame(loginInfo: ILoginInfo, playerInfo?: IPlayerInfo): void {
        egret.log("SaTalkingData.onEnterGame()");
        this.setAccount(loginInfo, playerInfo);
    }

}
