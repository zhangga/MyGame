class GameEvent {

    //游戏震屏
    public static GAME_EARTHQUAKE_STRAT: string = "GAME_EARTHQUAKE_STRAT";

    //打开游戏场景
    public static GAME_SCENE_OPEN: string = "GAME_SCENE_OPEN";

    

















    public static PLAYER_CURRENCY_UPDATE: string = "player_currency_update";
    /**window**/
    public static MODULE_WINDOW_OPEN: string = "game_module_window_open";
    public static MODULE_WINDOW_CLOSE: string = "game_module_window_close";
    public static MODULE_WINDOW_OPEN_WITH_PARAM: string = "game_module_window_open_with_param";
    public static MODULE_GOTYPE_OPEN_WINDOW: string = "game_module_gotype_open_window";
    public static MODULE_WINDOW_ALLREMOVED: string = "game_module_window_allremoved";//所有面板都处于关闭状态

    public static TABBTN_TOUCH_EVENT: string = "tabbtn_touch_event";

    public static GAME_RELOGIN_EVENT: string = "game_player_relogin_event";

    /**科技**/
    public static TECHNOLOGY_UPGRADE_UPDATE: string = "game_technology_upgrade_update";//科技升级更新

    /**图鉴详情点击事件**/
    public static FIELDGUIDE_INFO_TOUCH_EVENT = "fieldguide_info_touch_event";

    /**图鉴按钮点击事件**/
    public static FIELDGUIDE_BTN_TOUCH_EVENT = "fieldguide_info_touch_event";

    /**图鉴解锁事件**/
    public static FIELDGUIDE_DEBLOCKING_EVENT = "fieldguide_deblocking_event";
    /**图鉴领奖**/
    public static FIELDGUIDE_REWARD_EVENT = "fieldguide_reward_event";

    /**重置遮罩层级**/
    public static RESET_MASK_CHILD_INDEX = "reset_mask_child_index";

    /**查看其它玩家鱼缸**/
    public static LOOK_OVER_OTHER_FISHTANK = "look_over_other_fishtank";

    /**卖出鱼**/
    public static FISH_SELL_EVENT = "fish_sell_event";

    public static UPGRADE_FISH_CHANGE_EVENT = "upgrade_fish_change_event";

    /**选择鱼缸 */
    public static DECORATE_SELECT_SCENE = "decorate_select_scene_event";
    /**选择鱼缸好友家 */
    public static DECORATE_SELECT_SCENE_OTHER = "decorate_select_scene_other_event";
    public static DECORATE_TANK_UNLOCK = "decorate_tank_unlock_event";

    /**鱼食更新**/
    public static FISH_FOOD_UPDATE: string = "game_fishfood_update";

    /**鱼类升级**/
    public static FISH_UPGRADE_EVENT: string = "fish_upgrade_event";

    /**每日奖励更新**/
    public static DAILY_TASK_UPDATE_EVT: string = "daily_task_update_event";

    /**成就更新**/
    public static ACHIEVE_UPDATE_EVENT: string = "game_achieve_update_event";

    /**添加或删除buff时间**/
    public static ADD_OR_DEL_BUFF_EVENT: string = "add_buff_event";

    /**协议读写错误**/
    public static NET_EVENT_ERROR: string = "net_event_error";

    /**红点触发**/
    public static GAME_REDPOINT_TRIGGER: string = "game_redpoint_trigger";

    /**点击菜单按钮**/
    public static TOUCH_TAB_EVENT: string = "touch_tab_event";

    /**装扮鱼缸**/
    public static FISH_TANK_EQUIP_EVENT: string = "game_fishtank_equip_event";

    /**掉线事件**/
    public static OFFLINE_EVENT: string = "offline_event";

    /**显示秒产增加**/
    public static SHOW_SECOUTPUT_ADD: string = "show_secoutput_add";

    /**更新欢乐度**/
    public static UPDATA_HAPPINESS_EVENT: string = "updata_happness_event";

    public static GAME_CREATE_ROLE: string = "game_create_role";

}