var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 提示弹出框
 */
var AlertHint = (function (_super) {
    __extends(AlertHint, _super);
    function AlertHint(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    AlertHint.prototype.onSkinName = function () {
        this.skinName = skins.AlertHintSkin;
    };
    AlertHint.prototype.onInit = function () {
        this.setTitle("hint_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    AlertHint.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSure, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
    };
    AlertHint.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSure, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
    };
    AlertHint.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    AlertHint.prototype.onRefresh = function () {
        var player = DataManager.instance.playerM.player;
        this.lab_hint.text = this.param.desc;
        this.bmpLab_num.text = "x" + this.param.award.numFormat;
        var modelthing = GameCommon.instance.getThingModel(this.param.award.type, this.param.award.id);
        if (modelthing) {
            this.img_turnplateIcon.source = modelthing.icon;
        }
        this.btn_sure.enabled = true;
        //弹出框类型
        switch (this.param.type) {
            case ALERT_TYPE.NORMAL:
                this.currentState = "normal";
                break;
            case ALERT_TYPE.SHARE:
                this.currentState = "share";
                break;
            case ALERT_TYPE.COIN:
                this.currentState = "coin";
                break;
            case ALERT_TYPE.UNLOCK:
                this.btn_sure.enabled = player.getIsUnlockedAllFishByBook(this.param.eventParam - 1);
                this.currentState = "unlock";
                break;
        }
        //ICON显示
        if (this.param.title) {
            this.basic["panel_title"].source = this.param.title;
        }
    };
    AlertHint.prototype.onClickSure = function () {
        //确定按钮响应事件
        if (this.param.gameEvent) {
            GameDispatcher.instance.dispatcherEventWith(this.param.gameEvent, false, this.param.eventParam);
        }
        this.onHide();
    };
    //分享处理
    AlertHint.prototype.onShare = function () {
        SDKManager.share(new SDKShareContainer());
        this.onHide();
    };
    return AlertHint;
}(BaseWindowPanel));
__reflect(AlertHint.prototype, "AlertHint");
/**
 * 提示弹出框参数
 */
var AlertHintParam = (function () {
    function AlertHintParam(type, desc, award) {
        this.type = type;
        this.desc = desc;
        this.award = award;
    }
    Object.defineProperty(AlertHintParam.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (title) {
            this._title = title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertHintParam.prototype, "gameEvent", {
        get: function () {
            return this._gameEvent;
        },
        set: function (gameEvent) {
            this._gameEvent = gameEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertHintParam.prototype, "eventParam", {
        get: function () {
            return this._eventParam;
        },
        set: function (eventParam) {
            this._eventParam = eventParam;
        },
        enumerable: true,
        configurable: true
    });
    return AlertHintParam;
}());
__reflect(AlertHintParam.prototype, "AlertHintParam");
var ALERT_TYPE;
(function (ALERT_TYPE) {
    ALERT_TYPE[ALERT_TYPE["NORMAL"] = 0] = "NORMAL";
    ALERT_TYPE[ALERT_TYPE["SHARE"] = 1] = "SHARE";
    ALERT_TYPE[ALERT_TYPE["COIN"] = 2] = "COIN";
    ALERT_TYPE[ALERT_TYPE["UNLOCK"] = 3] = "UNLOCK";
})(ALERT_TYPE || (ALERT_TYPE = {}));
//# sourceMappingURL=AlertHint.js.map