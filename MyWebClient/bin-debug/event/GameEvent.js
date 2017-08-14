var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameEvent = (function () {
    function GameEvent() {
    }
    return GameEvent;
}());
//游戏震屏
GameEvent.GAME_EARTHQUAKE_STRAT = "GAME_EARTHQUAKE_STRAT";
GameEvent.PLAYER_CURRENCY_UPDATE = "player_currency_update";
/**window**/
GameEvent.MODULE_WINDOW_OPEN = "game_module_window_open";
GameEvent.MODULE_WINDOW_CLOSE = "game_module_window_close";
GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM = "game_module_window_open_with_param";
GameEvent.MODULE_GOTYPE_OPEN_WINDOW = "game_module_gotype_open_window";
GameEvent.MODULE_WINDOW_ALLREMOVED = "game_module_window_allremoved"; //所有面板都处于关闭状态
GameEvent.TABBTN_TOUCH_EVENT = "tabbtn_touch_event";
GameEvent.GAME_RELOGIN_EVENT = "game_player_relogin_event";
/**科技**/
GameEvent.TECHNOLOGY_UPGRADE_UPDATE = "game_technology_upgrade_update"; //科技升级更新
/**图鉴详情点击事件**/
GameEvent.FIELDGUIDE_INFO_TOUCH_EVENT = "fieldguide_info_touch_event";
/**图鉴按钮点击事件**/
GameEvent.FIELDGUIDE_BTN_TOUCH_EVENT = "fieldguide_info_touch_event";
/**图鉴解锁事件**/
GameEvent.FIELDGUIDE_DEBLOCKING_EVENT = "fieldguide_deblocking_event";
/**图鉴领奖**/
GameEvent.FIELDGUIDE_REWARD_EVENT = "fieldguide_reward_event";
/**重置遮罩层级**/
GameEvent.RESET_MASK_CHILD_INDEX = "reset_mask_child_index";
/**查看其它玩家鱼缸**/
GameEvent.LOOK_OVER_OTHER_FISHTANK = "look_over_other_fishtank";
/**卖出鱼**/
GameEvent.FISH_SELL_EVENT = "fish_sell_event";
GameEvent.UPGRADE_FISH_CHANGE_EVENT = "upgrade_fish_change_event";
/**选择鱼缸 */
GameEvent.DECORATE_SELECT_SCENE = "decorate_select_scene_event";
/**选择鱼缸好友家 */
GameEvent.DECORATE_SELECT_SCENE_OTHER = "decorate_select_scene_other_event";
GameEvent.DECORATE_TANK_UNLOCK = "decorate_tank_unlock_event";
/**鱼食更新**/
GameEvent.FISH_FOOD_UPDATE = "game_fishfood_update";
/**鱼类升级**/
GameEvent.FISH_UPGRADE_EVENT = "fish_upgrade_event";
/**每日奖励更新**/
GameEvent.DAILY_TASK_UPDATE_EVT = "daily_task_update_event";
/**成就更新**/
GameEvent.ACHIEVE_UPDATE_EVENT = "game_achieve_update_event";
/**添加或删除buff时间**/
GameEvent.ADD_OR_DEL_BUFF_EVENT = "add_buff_event";
/**协议读写错误**/
GameEvent.NET_EVENT_ERROR = "net_event_error";
/**红点触发**/
GameEvent.GAME_REDPOINT_TRIGGER = "game_redpoint_trigger";
/**点击菜单按钮**/
GameEvent.TOUCH_TAB_EVENT = "touch_tab_event";
/**装扮鱼缸**/
GameEvent.FISH_TANK_EQUIP_EVENT = "game_fishtank_equip_event";
/**掉线事件**/
GameEvent.OFFLINE_EVENT = "offline_event";
/**显示秒产增加**/
GameEvent.SHOW_SECOUTPUT_ADD = "show_secoutput_add";
/**更新欢乐度**/
GameEvent.UPDATA_HAPPINESS_EVENT = "updata_happness_event";
GameEvent.GAME_CREATE_ROLE = "game_create_role";
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map