/** 进入游戏的信息标志 */
interface IPlayerInfo {
    id:number;
    level;
    sex:number;
    name:string;
    getDiamond():number;
    getGold():number;
}