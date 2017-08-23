var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var BaseWindowPanel = (function (_super) {
    __extends(BaseWindowPanel, _super);
    function BaseWindowPanel(owner) {
        var _this = _super.call(this) || this;
        _this.funcID = -1;
        _this.windowChildNum = 0;
        _this.points = RedPointManager.createPoint(0);
        _this.priority = PANEL_HIERARCHY_TYPE.I;
        _this.owner = owner;
        _this.basic = new eui.Component();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.once(eui.UIEvent.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    //添加到舞台
    BaseWindowPanel.prototype.onAddToStage = function () {
        this.onSkinName();
    };
    //皮肤加载完成
    BaseWindowPanel.prototype.onLoadComplete = function () {
        this.onloadComp = true;
        this.onInit();
    };
    //供子类覆盖
    BaseWindowPanel.prototype.onInit = function () {
        // this.anchorOffsetX = 344;
        // this.anchorOffsetY = 550;
        // GameCommon.getInstance().setComponentAllTextFont(this);
        // if (DataManager.IS_PC_Game && this.priority == PANEL_HIERARCHY_TYPE.II) {
        //     var findMask: boolean = GameCommon.getInstance().setWindowMaskSize(this.basic);
        //     if (!findMask) {
        //         GameCommon.getInstance().setWindowMaskSize(this);
        //     }
        // }
        this.onRegist();
    };
    BaseWindowPanel.prototype.onAddedHandler = function (event) {
        if (egret.is(event.currentTarget, "egret.DisplayObjectContainer")) {
            this.updateWindowTextFont(event.currentTarget);
        }
    };
    BaseWindowPanel.prototype.onRefresh = function () {
    };
    BaseWindowPanel.prototype.onSkinName = function () {
    };
    BaseWindowPanel.prototype.onShow = function () {
        // if (this.funcID != -1 && FunDefine.onIsLockandErrorHint(this.funcID)) return;
        if (this.parentLayer) {
            if (this.onloadComp) {
                if (!this.isShow) {
                    this.onAddToWindowLayer();
                    this.onRegist();
                }
                this.onRefresh();
            }
            else {
                if (!this.isShow) {
                    this.onAddToWindowLayer();
                }
            }
            this.isShow = true;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.RESET_MASK_CHILD_INDEX, false);
    };
    BaseWindowPanel.prototype.onAddToWindowLayer = function () {
        // this.x = 344;
        // this.y = 550;
        this.bottom = 0;
        this.parentLayer.addChild(this);
        // TweenLiteUtil.openWindowEffect(this);
    };
    // private onUpdateText: boolean;
    BaseWindowPanel.prototype.updateWindowTextFont = function (container) {
        // if (container) {
        //     GameCommon.getInstance().setComponentAllTextFont(container);
        // }
        // if (this.onUpdateText)
        //     return;
        // this.onUpdateText = true;
        // Tool.callbackTime(function () {
        //     GameCommon.getInstance().setComponentAllTextFont(this);
        //     this.onUpdateText=false;
        // }, this, 50);
    };
    BaseWindowPanel.prototype.onShowWithParam = function (param) {
        this.onShow();
    };
    BaseWindowPanel.prototype.onRegist = function () {
        if (this.basic["btn_back"])
            this.basic["btn_back"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this.basic["btn_back2"])
            this.basic["btn_back2"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this["close_touch_grp"])
            this["close_touch_grp"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.addEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    };
    BaseWindowPanel.prototype.onTouchCloseBtn = function () {
        this.onHide();
    };
    BaseWindowPanel.prototype.onHide = function () {
        if (this.parent) {
            this.onRemove();
            this.parent.removeChild(this);
            this.isShow = false;
        }
        GameDispatcher.instance.dispatcherEventWith(GameEvent.RESET_MASK_CHILD_INDEX, false);
    };
    BaseWindowPanel.prototype.onRemove = function () {
        if (this.basic["btn_back"])
            this.basic["btn_back"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        if (this.basic["btn_back2"])
            this.basic["btn_back2"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.removeEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    };
    Object.defineProperty(BaseWindowPanel.prototype, "parentLayer", {
        get: function () {
            return this.owner.PupoBar;
        },
        enumerable: true,
        configurable: true
    });
    BaseWindowPanel.prototype.setTitle = function (title, isShow, bg) {
        if (isShow === void 0) { isShow = false; }
        if (bg === void 0) { bg = ""; }
        this.basic["panel_title"].source = title;
        if (this.basic["panel_titleBg"]) {
            this.basic["panel_titleBg"].visible = isShow;
            this.basic["panel_titleBg"].source = bg;
        }
    };
    BaseWindowPanel.prototype.setBg = function (bg) {
        this.basic["panel_bg"].source = bg;
    };
    Object.defineProperty(BaseWindowPanel.prototype, "backLayerH", {
        set: function (h) {
            if (this.basic["backLayer"]) {
                this.basic["backLayer"].height = h;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseWindowPanel.prototype.setTiltleOffY = function (offY) {
        this.basic["panel_title"].y += offY;
    };
    BaseWindowPanel.prototype.trigger = function () {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].checkPoint();
        }
    };
    return BaseWindowPanel;
}(eui.Component));
__reflect(BaseWindowPanel.prototype, "BaseWindowPanel");
//带参数的面板
var WindowParam = (function () {
    function WindowParam(windowName, param) {
        this.windowName = windowName;
        this.param = param;
    }
    return WindowParam;
}());
__reflect(WindowParam.prototype, "WindowParam");
//层级类型
var PANEL_HIERARCHY_TYPE;
(function (PANEL_HIERARCHY_TYPE) {
    PANEL_HIERARCHY_TYPE[PANEL_HIERARCHY_TYPE["I"] = 0] = "I";
    PANEL_HIERARCHY_TYPE[PANEL_HIERARCHY_TYPE["II"] = 1] = "II";
})(PANEL_HIERARCHY_TYPE || (PANEL_HIERARCHY_TYPE = {}));
//# sourceMappingURL=BaseWindowPanel.js.map