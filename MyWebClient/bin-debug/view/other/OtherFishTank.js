var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OtherFishTank = (function (_super) {
    __extends(OtherFishTank, _super);
    function OtherFishTank(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    OtherFishTank.prototype.onSkinName = function () {
        this.skinName = skins.OtherFishTankSkin;
    };
    OtherFishTank.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    OtherFishTank.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onInitScenes();
        this.onRefresh();
    };
    OtherFishTank.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this._feed.onRegist();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        GameDispatcher.instance.addEventListener(GameEvent.DECORATE_SELECT_SCENE_OTHER, this.onSelectScene, this);
    };
    OtherFishTank.prototype.onRemove = function () {
        DataManager.instance.playerM.player.inOtherHome = false;
        _super.prototype.onRemove.call(this);
        this._feed.onRemove();
        this.onDestoryFishs();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        GameDispatcher.instance.removeEventListener(GameEvent.DECORATE_SELECT_SCENE_OTHER, this.onSelectScene, this);
    };
    OtherFishTank.prototype.onRefresh = function () {
        this._feed.data = this.param;
        this.player = DataManager.instance.visite.player;
        if (!this.player)
            return;
        this.lab_fishTankname.text = this.player.name + "\u7684\u9C7C\u7F38";
        this.fishtank_bar.onUpdateAllItems();
        //好友的鱼缸
        this._currTankId = 1;
        var models = ModelManager.instance.modelFieldGuide;
        var lv;
        for (var key in this.player.book) {
            var _bookData = this.player.book[key];
            if (_bookData.level > 0) {
                this._currTankId = _bookData.id;
            }
        }
        this.onSelectScene();
    };
    OtherFishTank.prototype.onEnterFrame = function () {
        for (var i = this.fishTankLayer.numChildren - 1; i >= 0; i--) {
            var obj = this.fishTankLayer.getChildAt(i);
            obj.onAction();
        }
    };
    //供子类覆盖
    OtherFishTank.prototype.onReset = function () {
        this.onDestoryFishs();
        var fish;
        var pos;
        var id;
        var fishs = this.player.getFishByLoction(FISH_POST.WATERVAT);
        for (var i = 0; i < fishs.length; i++) {
            var _fishData = ModelManager.instance.modelFish[fishs[i].id];
            if (this._currTankId == _fishData.yugangId) {
                fish = FactoryManager.onBuildEnjoyFishOne(fishs[i].id);
                fish.data = fishs[i];
                pos = GameCommon.instance.getPos(12, 12);
                fish.x = pos.x;
                fish.y = pos.y;
                this.fishTankLayer.addChild(fish);
            }
        }
    };
    OtherFishTank.prototype.onDestoryFishs = function () {
        for (var i = this.fishTankLayer.numChildren - 1; i >= 0; i--) {
            var obj = this.fishTankLayer.getChildAt(i);
            obj.onDestory();
        }
    };
    /**
     * 初始化鱼缸列表
     */
    OtherFishTank.prototype.onInitScenes = function () {
        var _tankItems = [];
        //所有的场景
        var models = ModelManager.instance.modelFieldGuide;
        for (var key in models) {
            var model = models[key];
            if (model && model.tier == 0) {
                var sceneItem = new DecorateItem(model.type);
                // sceneItem.onRefresh();
                _tankItems.push(sceneItem);
            }
        }
        this.fishtank_bar.onRegist(_tankItems, 1, "open");
    };
    /**
     * 选择鱼缸
     */
    OtherFishTank.prototype.onSelectScene = function (e) {
        if (e === void 0) { e = null; }
        if (e) {
            this._currTankId = parseInt(e.data);
        }
        //去除选择框
        this.fishtank_bar.onSeletItem(this._currTankId);
        //刷新鱼缸显示
        var lv = this.player.decorate_show[this._currTankId];
        if (!lv)
            lv = 0;
        this.fishTankShow.onRefreshShow(this._currTankId, lv, this.player.decorate_show);
        this.onReset();
    };
    return OtherFishTank;
}(BaseWindowPanel));
__reflect(OtherFishTank.prototype, "OtherFishTank");
var OtherFishTankParam = (function () {
    function OtherFishTankParam(location, data) {
        this.data = data;
    }
    return OtherFishTankParam;
}());
__reflect(OtherFishTankParam.prototype, "OtherFishTankParam");
/**其他鱼缸行为类型**/
var OTHER_BEHAVIOR_TYPE;
(function (OTHER_BEHAVIOR_TYPE) {
    OTHER_BEHAVIOR_TYPE[OTHER_BEHAVIOR_TYPE["VISIT"] = 1] = "VISIT";
    OTHER_BEHAVIOR_TYPE[OTHER_BEHAVIOR_TYPE["POLLUTE"] = 2] = "POLLUTE";
    OTHER_BEHAVIOR_TYPE[OTHER_BEHAVIOR_TYPE["ROB"] = 3] = "ROB";
})(OTHER_BEHAVIOR_TYPE || (OTHER_BEHAVIOR_TYPE = {}));
//# sourceMappingURL=OtherFishTank.js.map