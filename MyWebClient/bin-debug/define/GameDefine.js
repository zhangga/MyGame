var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameDefine = (function () {
    function GameDefine() {
    }
    return GameDefine;
}());
/**屏幕宽高 */
GameDefine.SCREEN_WIDTH = 600;
GameDefine.SCREEN_HEIGHT = 1068;
/**地图切片的宽高 */
GameDefine.MapRes_Width = 450;
GameDefine.MapRes_Height = 415;
/**地图每格子的宽高 */
GameDefine.MAP_GRID_WIDTH = 20;
GameDefine.MAP_GRID_HEIGHT = 20;
/**每张地图格子区间 第一格ID = mapId*MAP_GRID_MAX+1 */
GameDefine.MAP_GRID_MAX = 100000;
//横竖多预加载几个图
GameDefine.MapRes_RelaodNum = 1;
//最大缓存多张地图
GameDefine.MapCache_MaxNum = 200;
GameDefine.FISHTANK_WIDTH = 600;
GameDefine.FISHTANK_HEIGHT = 643;
/*鱼转方向的边缘*/
GameDefine.FISH_TURN_MARGIN_LEFT = 80;
GameDefine.FISH_TURN_MARGIN_RIGHT = 140;
GameDefine.FISHTANK_GAP_TOP = 210;
GameDefine.FISHTANK_GAP_LEFT = 40;
GameDefine.FISHTANK_GAP_RIGHT = 120;
GameDefine.FISHTANK_GAP_BOTTON = 120;
GameDefine.RED_TAB_POS = new egret.Point(70, 0);
GameDefine.FISHFOOD_MAX = 20; //鱼食最大数量
GameDefine.FRIEND_MAX = 999; //好友的最大数量
GameDefine.FRIEND_GIFT_MAX = 5; //每天可以赠送鱼食的最大数量
GameDefine.FRIEND_RECGIFT_MAX = 4; //每日可以接收鱼食最大数量
GameDefine.SMASHEGG_INVITE_MAX = 10; //砸蛋每日分享能获得最大锤子数
GameDefine.SMASHEGG_SHARE_MAX = 10; //砸蛋每日邀请能获得的最大锤子数
GameDefine.INVITE_GIFT_DIAMOND = 100; //赚钻石邀请好友成功赠送钻石数
GameDefine.CLEAR_FISHTANK_MAX = 15; //最大清理鱼缸次数
GameDefine.CLEAR_FISHTANK_BY_ONE_MAX = 2; //最大清理鱼缸次数
GameDefine.RANDOM_EVENT_CD = 0;
GameDefine.EMOJI_EVENT_CD = 30;
GameDefine.EMOJI_EVENT_CONTINUE_CD = 5;
GameDefine.PLAYER_HAPPINESS_MAX = 10;
GameDefine.PLAYER_HAPPINESS_MIN = -10;
GameDefine.PLAYER_FIELDGUIDE_MAX = 1;
GameDefine.DAILYTASK_COMP_NUM = 100; //每日任务完成获得钻石数量
GameDefine.FIELDGUIDE_PAGE_NUM = 9;
GameDefine.RED_MAIN_POS = new egret.Point(60, 0);
GameDefine.RED_DAILYTASK_POS = new egret.Point(110, 0);
GameDefine.RED_MAIN_II_POS = new egret.Point(110, 0);
GameDefine.RED_FIELD_ITEM_POS = new egret.Point(194, 40);
GameDefine.RED_UPGRADE_BTN = new egret.Point(150, 0);
GameDefine.RED_TECHNOLOGY_BTN = new egret.Point(150, 0);
__reflect(GameDefine.prototype, "GameDefine");
/**性别**/
var SEX_TYPE;
(function (SEX_TYPE) {
    SEX_TYPE[SEX_TYPE["MALE"] = 0] = "MALE";
    SEX_TYPE[SEX_TYPE["FEMALE"] = 1] = "FEMALE";
})(SEX_TYPE || (SEX_TYPE = {}));
/**排行榜 */
var RANK_TYPE;
(function (RANK_TYPE) {
    RANK_TYPE[RANK_TYPE["GOLD"] = 0] = "GOLD";
})(RANK_TYPE || (RANK_TYPE = {}));
//# sourceMappingURL=GameDefine.js.map