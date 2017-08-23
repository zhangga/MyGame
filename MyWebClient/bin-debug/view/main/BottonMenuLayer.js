var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BottonMenuLayer = (function (_super) {
    __extends(BottonMenuLayer, _super);
    function BottonMenuLayer() {
        var _this = _super.call(this) || this;
        _this.points = RedPointManager.createPoint(4);
        // this.skinName = skins.BottonMenuLayerSkin;
        _this.once(eui.UIEvent.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    BottonMenuLayer.prototype.changeTab = function (type) {
        if (this["tab_" + type]) {
            this["tab_" + type].selected = true;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.TOUCH_TAB_EVENT, false, this["tab_" + type].value);
    };
    BottonMenuLayer.prototype.onLoadComplete = function () {
        this.addRedPoint();
        this.onRegister();
        this.addRedPoint();
    };
    BottonMenuLayer.prototype.onRegister = function () {
        for (var i = 1; i <= 4; i++) {
            this["tab_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTab, this);
        }
        GameDispatcher.instance.addEventListener(FishTankEevent.TANK_REFRESH_SHOW_EVENT, this.onTankRefreshShow, this);
    };
    BottonMenuLayer.prototype.onTankRefreshShow = function (e) {
        this.trigger();
    };
    BottonMenuLayer.prototype.onTouchTab = function (e) {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.TOUCH_TAB_EVENT, false, e.currentTarget.value);
    };
    BottonMenuLayer.prototype.addRedPoint = function () {
        this.points[0].register(this["tab_1"], GameDefine.RED_MAIN_II_POS, this, "onCheckFishCanUpgrade");
        this.points[1].register(this["tab_2"], GameDefine.RED_MAIN_II_POS, this, "onCheckTechnologyRedPoint");
        this.points[2].register(this["tab_3"], GameDefine.RED_MAIN_II_POS, this, "onCheckArtifactRedPoint");
        this.points[3].register(this["tab_4"], GameDefine.RED_MAIN_II_POS, this, "onCheckFTCanAdvance");
    };
    BottonMenuLayer.prototype.trigger = function () {
        var currID = DataManager.instance.playerM.player.currFGID;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].checkPoint(true, currID);
        }
    };
    BottonMenuLayer.prototype.onCheckFishCanUpgrade = function (curr) {
        if (DataManager.instance.playerM.player.onCheckFishCanUpgrade(curr))
            return true;
        return false;
    };
    BottonMenuLayer.prototype.onCheckTechnologyRedPoint = function (curr) {
        if (DataManager.instance.technology.onCheckRedPoint(curr))
            return true;
        return false;
    };
    BottonMenuLayer.prototype.onCheckArtifactRedPoint = function (curr) {
        if (DataManager.instance.playerM.player.onCheckDecorateRedPoint(curr))
            return true;
        return false;
    };
    BottonMenuLayer.prototype.onCheckFTCanAdvance = function (curr) {
        if (DataManager.instance.playerM.player.onCheckFTCanAdvance())
            return true;
        return false;
    };
    return BottonMenuLayer;
}(eui.Component));
__reflect(BottonMenuLayer.prototype, "BottonMenuLayer");
//# sourceMappingURL=BottonMenuLayer.js.map