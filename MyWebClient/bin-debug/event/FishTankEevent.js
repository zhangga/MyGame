var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FishTankEevent = (function () {
    function FishTankEevent() {
    }
    return FishTankEevent;
}());
FishTankEevent.FISH_OUT_PUT_EVENT = "fish_out_put_event";
FishTankEevent.DROP_TOUCH_EVENT = "drop_touch_event";
FishTankEevent.COIN_OUT_PUT_EVENT = "coin_out_put_event";
FishTankEevent.FISH_RECYCLE_CROWN_EVENT = "fish_recycle_crown_event";
FishTankEevent.FISH_INPUT_EVENT = "fish_input_event"; //鱼放入鱼缸事件
FishTankEevent.FISH_TOUCH_EVENT = "fish_touch_event";
FishTankEevent.TANK_REFRESH_BG_EVENT = "tank_refresh_bg_event"; //鱼缸背景显示变化
FishTankEevent.TANK_REFRESH_PART_EVENT = "tank_refresh_part_event"; //鱼缸部位显示变化
FishTankEevent.TANK_REFRESH_SHOW_EVENT = "tank_refresh_show_event"; //鱼缸整体显示变化
FishTankEevent.FISH_EVOLUTION_EVENT = "fish_evolution_event"; //随机事件触发
FishTankEevent.FISH_SHOW_EMOJI_EVENT = "fish_show_emoji_event"; //随机显示表情
__reflect(FishTankEevent.prototype, "FishTankEevent");
//# sourceMappingURL=FishTankEevent.js.map