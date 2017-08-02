/**
 * 消息号
 * @author 
 * 
 */
enum MESSAGE_ID {

    GAME_LOGON_MESSAGE = 100,   //登录服
    ERROR_TIP_MESSAGE = 110,    //错误提示信息


















    GAME_TICK_MESSAGE = 99,  //游戏心跳
    LOGIN_SERVER_MESSAGE = 103,//登录游戏服
    CREATE_ROLE_MESSAGE = 104,	//创建角色
    ENTER_GAME_MESSAGE = 105,	//进入游戏
    PLAYER_MESSAGE = 106,		//玩家消息
    GAME_SYNC_MESSAGE = 107,         //同步数据消息
    GAME_TOKEN_MESSAGE = 109,       //游戏token
    
    TIMEOUT_MESSAGE = 111,		    //登录超时
    REPEAT_LOGIN_MESSAGE = 112,		//重复登录
    PALYER_HAPPINESS_MSG = 160,     //玩家欢乐度
    PALYER_DAILY_RECORD = 161,      //玩家的日常记录
    PALYER_BUFF_RECORD = 162,       //玩家buff记录

    /**----好友----**/
    FRIEND_LISTINIT_MSG = 201,//好友列表初始化
    FRIEND_SEACH_MSG = 202,//搜索好友
    FRIEND_ADD_MSG = 203,//添加好友
    FRIEND_DELETE_MSG = 204,//删除好友
    FRIEND_AGREE_APPLY_MSG = 205,//同意申请
    FRIEND_REJECT_APPLY_MSG = 206,//拒绝申请
    FRIEND_GIFT_MESAAGE = 207,//赠送鱼食
    FRIEND_APPLYUPDATYE_MSG = 208,//好友申请
    FRIEND_GIVEFOOD_MSG = 209,//被好友赠送鱼食
    FRIEND_ADD_SUCCESS_MSG = 210,//添加好友成功

    ENEMY_LIST_MSG = 211,//仇人列表

    FRIEND_BE_VIEWED_MSG = 220,//好友被查看信息
    PLAYER_TO_DO_SOMEBODY = 221,//对其他人的操作：拜访，盗取，污染

    /**赚钻石**/
    INIVTEGIFT_FRIENDLIST_MSG = 222,//赚钻石好友列表
    INIVTEGIFT_REWARD_MSG = 223,//领取钻石
    /**砸蛋**/
    SMASHEGG_FRIEND_INFO_MSG = 230,//砸蛋好友信息列表
    SMASHEGG_BE_VIEWD_MSG = 231,//砸蛋详情信息查看
    SMASHEGG_BE_REWARD_MSG = 232,//请求砸蛋

    HEAVEN_REWARD_MSG = 302,//领取图鉴奖励

    /**装饰、神器**/
    DECORATE_SHOW_MESSAGE = 351,//装饰显示修改
    DECORATE_GASHAPON_MESSAGE = 352,//装饰扭蛋机

    /**排行榜 */
    TOPRANK_LIST_MESSAGE = 360,//排行榜列表

    /**月卡、终生卡 */
    MONTHLY_CARD_REWARD_MESSAGE = 370,//月卡领奖
    SHOP_BUY_GOLD_MESSAGE = 371,//购买钻石

    /**科技**/
    TECHNOLOGY_INIT_MSG = 401,//初始化科技
    TECHNOLOGY_UPGRADE_MSG = 402,//升级科技

    /**转盘**/
    TURNPLATE_LOTTERY_MSG = 501,//转盘

    /**离线收益**/
    PLAYER_OFFLINE_EARNINGS = 601,//离线收益

    /**鱼食恢复**/
    FISH_FOOD_RECIVE_MSG = 701,

    /**日常任务**/
    DAILY_TASK_UPDATE_MSG = 801,//每日任务更新
    DAILY_TASK_REWARD_MSG = 802,//每日任务领奖

    /**成就**/
    ACHIEVEMENT_INIT_MSG = 901,//成就列表初始化
    ACHIEVEMENT_UPDATE_MSG = 902,//成就列表更新
    ACHIEVEMENT_REWARD_MSG = 903,//成就列表领取

    /**成就**/
    SHARE_REWARD_MESSAGE = 1001,//领取分享奖励

    /**邮件**/
    PLAYER_MAIL_MESSAGE = 190,//邮件信息
    PLAYER_MAIL_READ_MESSAGE = 191,//阅读邮件
    PLAYER_MAIL_GET_ACCESSORY_MESSAGE = 192,//领取单个附件
    PLAYER_MAIL_DELETE_MESSAGE = 193,//删除邮件

    PLAYER_UPDATA_CURRENCY = 163,//更新货币
}