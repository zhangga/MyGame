var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 鱼缸显示类
 *
 *
 * **/
var FishTankView = (function (_super) {
    __extends(FishTankView, _super);
    function FishTankView() {
        var _this = _super.call(this) || this;
        // private btn_left: eui.Button;
        // private btn_right: eui.Button;
        _this.fishs = {};
        _this.skinName = skins.FishTankViewSkin;
        return _this;
    }
    FishTankView.prototype.onInit = function () {
        this.onReset();
        this.onRefreshShow();
        this.fishTankShow.onAddAnimation();
    };
    //供子类覆盖
    FishTankView.prototype.onReset = function () {
        // this.onRefreshArrow();
        this.onDestoryFishs();
        var player = DataManager.instance.playerM.player;
        var fish;
        var pos;
        var id;
        var fishs = player.getFishByLoction(player.currFGID);
        for (var i = 0; i < fishs.length; i++) {
            fish = FactoryManager.onBuildFishOne(fishs[i].id);
            fish.data = fishs[i];
            pos = GameCommon.instance.getPos(12, 12, 1, 1);
            fish.x = pos.x;
            fish.y = pos.y;
            this.addFish(fish);
        }
    };
    FishTankView.prototype.onDestoryFishs = function () {
        var base;
        for (var key in this.fishs) {
            base = this.fishs[key];
            base.onDestory();
        }
        this.fishs = {};
    };
    FishTankView.prototype.onRegist = function () {
        // this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLeftHander, this);
        // this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchRightHander, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    FishTankView.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    FishTankView.prototype.onEnterFrame = function () {
        var base;
        for (var key in this.fishs) {
            base = this.fishs[key];
            base.onAction();
        }
    };
    FishTankView.prototype.onRefreshArrow = function () {
        var player = DataManager.instance.playerM.player;
        this.layerUp.visible = player.currFGID != 1;
        this.layerDown.visible = (player.currFGID != GameDefine.PLAYER_FIELDGUIDE_MAX && player.currFGID < DataManager.instance.playerM.player.openFGID);
    };
    FishTankView.prototype.onTouchLeftHander = function () {
        var player = DataManager.instance.playerM.player;
        if (player.currFGID > 1) {
            player.currFGID--;
            this.onReset();
        }
    };
    FishTankView.prototype.onTouchRightHander = function () {
        var player = DataManager.instance.playerM.player;
        if (player.currFGID < player.openFGID) {
            player.currFGID++;
            this.onReset();
        }
    };
    FishTankView.prototype.onTouchTap = function (e) {
        if (egret.is(e.target, "eui.Group")) {
            GameDispatcher.instance.dispatcherEventWith(FishTankEevent.COIN_OUT_PUT_EVENT, false, e);
        }
    };
    FishTankView.prototype.onTime = function () {
        var base;
        for (var key in this.fishs) {
            base = this.fishs[key];
            base.onTime();
        }
    };
    FishTankView.prototype.onPutInFishTank = function (e) {
        var data = e.data;
        this.onPutFish(data.id);
    };
    FishTankView.prototype.onPutFish = function (uid) {
        var data = DataManager.instance.playerM.player.getFishByID(uid);
        var fish = FactoryManager.onBuildFishOne(data.id);
        fish.data = data;
        var pos = GameCommon.instance.getPos(12, 12);
        fish.x = pos.x;
        fish.y = pos.y;
        this.addFish(fish);
    };
    FishTankView.prototype.addFish = function (fish) {
        this.fishs[fish.data.id] = fish;
        this.fishTankLayer.addChild(fish);
    };
    FishTankView.prototype.delFish = function (uid) {
        if (this.fishs[uid]) {
            var fish = this.fishs[uid];
            fish.onDestory();
            delete this.fishs[uid];
        }
    };
    /**
     * 刷新鱼缸显示
     */
    FishTankView.prototype.onRefreshShow = function () {
        var player = DataManager.instance.playerM.player;
        this.fishTankShow.onRefreshShow(player.currFGID, player.getBookLv(player.currFGID), player.decorate_show);
    };
    /**
     * 刷新鱼缸部位显示
     */
    FishTankView.prototype.onRefreshPart = function () {
        var player = DataManager.instance.playerM.player;
        this.fishTankShow.onRefreshPart(player.currFGID, player.decorate_show);
    };
    /**
     * 刷新鱼缸背景显示
     */
    FishTankView.prototype.onRefreshBg = function () {
        var player = DataManager.instance.playerM.player;
        this.fishTankShow.onRefreshBg(player.currFGID, player.getBookLv(player.currFGID));
    };
    FishTankView.prototype.onUpgradeHandler = function (e) {
        var base;
        var uid = e.data;
        base = this.fishs[uid];
        if (base) {
            base.onShowLevelUp();
        }
    };
    FishTankView.prototype.onGetFishByID = function (id) {
        return this.fishs[id];
    };
    FishTankView.prototype.onEvolutionHandler = function (e) {
        var param = e.data;
        var fish = this.fishs[param.uid];
        if (fish) {
            fish.onEvolutionHandler(param);
        }
    };
    FishTankView.prototype.onShowEmojiHandler = function (e) {
        var param = e.data;
        var fish = this.fishs[param.uid];
        if (fish) {
            fish.onShowEmojiHandler(param);
        }
    };
    return FishTankView;
}(BaseUI));
__reflect(FishTankView.prototype, "FishTankView");
//# sourceMappingURL=FishTankView.js.map