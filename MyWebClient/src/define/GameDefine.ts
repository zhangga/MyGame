class GameDefine {
	/**屏幕宽高 */
	public static SCREEN_WIDTH: number = 600;
	public static SCREEN_HEIGHT: number = 1068;
	
	/**地图切片的宽高 */
	public static MapRes_Width: number = 450;
	public static MapRes_Height: number = 554;

	//横竖多预加载几个图
    public static MapRes_RelaodNum: number = 1;
	//最大缓存多张地图
	public static MapCache_MaxNum: number = 200;





	public static FISHTANK_WIDTH: number = 600;
	public static FISHTANK_HEIGHT: number = 643;
	/*鱼转方向的边缘*/
	public static FISH_TURN_MARGIN_LEFT: number = 80;
	public static FISH_TURN_MARGIN_RIGHT: number = 140;

	public static FISHTANK_GAP_TOP = 210;
	public static FISHTANK_GAP_LEFT = 40;
	public static FISHTANK_GAP_RIGHT = 120;
	public static FISHTANK_GAP_BOTTON = 120;

	public static RED_TAB_POS: egret.Point = new egret.Point(70, 0);

	public static FISHFOOD_MAX: number = 20;//鱼食最大数量

	public static FRIEND_MAX: number = 999;//好友的最大数量
	public static FRIEND_GIFT_MAX: number = 5;//每天可以赠送鱼食的最大数量
	public static FRIEND_RECGIFT_MAX: number = 4;//每日可以接收鱼食最大数量
	public static SMASHEGG_INVITE_MAX: number = 10;//砸蛋每日分享能获得最大锤子数
	public static SMASHEGG_SHARE_MAX: number = 10;//砸蛋每日邀请能获得的最大锤子数
	public static INVITE_GIFT_DIAMOND: number = 100;//赚钻石邀请好友成功赠送钻石数

	public static CLEAR_FISHTANK_MAX: number = 15;//最大清理鱼缸次数

	public static CLEAR_FISHTANK_BY_ONE_MAX: number = 2;//最大清理鱼缸次数

	public static RANDOM_EVENT_CD: number = 0;

	public static EMOJI_EVENT_CD: number = 30;
	public static EMOJI_EVENT_CONTINUE_CD: number = 5;

	public static PLAYER_HAPPINESS_MAX: number = 10;
	public static PLAYER_HAPPINESS_MIN: number = -10;

	public static PLAYER_FIELDGUIDE_MAX: number = 1;

	public static DAILYTASK_COMP_NUM: number = 100;//每日任务完成获得钻石数量

	public static FIELDGUIDE_PAGE_NUM: number = 9;

	public static RED_MAIN_POS: egret.Point = new egret.Point(60, 0);
	
	public static RED_DAILYTASK_POS: egret.Point = new egret.Point(110, 0);

	public static RED_MAIN_II_POS: egret.Point = new egret.Point(110, 0);

	public static RED_FIELD_ITEM_POS: egret.Point = new egret.Point(194, 40);

	public static RED_UPGRADE_BTN: egret.Point = new egret.Point(150, 0);
	public static RED_TECHNOLOGY_BTN: egret.Point = new egret.Point(150, 0);

	public constructor() {
	}
}
/**性别**/
enum SEX_TYPE {
	MALE = 0,
	FEMALE = 1,
}

/**排行榜 */
enum RANK_TYPE {
	GOLD = 0,
}