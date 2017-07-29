var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DropIcon = (function (_super) {
    __extends(DropIcon, _super);
    function DropIcon() {
        var _this = _super.call(this) || this;
        _this.isTouch = false;
        _this.cd = 2000;
        _this.value = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    DropIcon.prototype.onAddToStage = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    DropIcon.prototype.onTouchTap = function () {
        if (!this.isTouch) {
            egret.Tween.removeTweens(this);
            GameDispatcher.instance.dispatcherEventWith(FishTankEevent.DROP_TOUCH_EVENT, false, this);
            this.isTouch = true;
            if (this._data.type == GOODS_TYPE.GOLD) {
                this.value = UnitDefine.getTrueValue(this._data.num);
                DataManager.instance.playerM.player.addGold(this.value);
                GameDispatcher.instance.dispatcherEventWith(GameEvent.PLAYER_CURRENCY_UPDATE, false, this);
            }
        }
    };
    Object.defineProperty(DropIcon.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (param) {
            this._data = param;
            this.onInit();
        },
        enumerable: true,
        configurable: true
    });
    DropIcon.prototype.onInit = function () {
        this._img = new eui.Image();
        switch (this._data.type) {
            case GOODS_TYPE.EXP:
                this._img.source = "icon_drop_exp_png";
                break;
            case GOODS_TYPE.GOLD:
                this._img.source = "icon_drop_gold_png";
                break;
            case GOODS_TYPE.GEM:
                var model = ModelManager.instance.modelItem[this._data.id];
                this._img.source = "icon_drop_gem" + model.icon + "_png";
                break;
            case GOODS_TYPE.CROWN:
                // var model: ModelItem = ModelManager.instance.modelItem[this._data.id];
                this._img.source = "icon_drop_crown0_png";
                break;
        }
        this.addChild(this._img);
    };
    DropIcon.prototype.onDestory = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    DropIcon.prototype.onRecycle = function () {
        if (!this.isTouch) {
            setTimeout(this.onTouchTap.bind(this), this.cd);
        }
    };
    return DropIcon;
}(egret.Sprite));
__reflect(DropIcon.prototype, "DropIcon", ["IModule"]);
//# sourceMappingURL=DropIcon.js.map