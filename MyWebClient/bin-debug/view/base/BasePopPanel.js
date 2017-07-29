var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BasePopPanel = (function (_super) {
    __extends(BasePopPanel, _super);
    function BasePopPanel(owner) {
        var _this = _super.call(this) || this;
        _this.windowChildNum = 0;
        _this.owner = owner;
        _this.basic = new eui.Component();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.once(egret.Event.COMPLETE, _this.onLoadComplete, _this);
        return _this;
    }
    //添加到舞台
    BasePopPanel.prototype.onAddToStage = function () {
        this.onSkinName();
    };
    //皮肤加载完成
    BasePopPanel.prototype.onLoadComplete = function () {
        this.onloadComp = true;
        this.onInit();
    };
    //供子类覆盖
    BasePopPanel.prototype.onInit = function () {
        // GameCommon.getInstance().setComponentAllTextFont(this);
        // if (DataManager.IS_PC_Game) {
        //     var findMask: boolean = GameCommon.getInstance().setWindowMaskSize(this.basic);
        //     if (!findMask) {
        //         GameCommon.getInstance().setWindowMaskSize(this);
        //     }
        // }
        this.onRegist();
    };
    BasePopPanel.prototype.onAddedHandler = function (event) {
        if (egret.is(event.currentTarget, "egret.DisplayObjectContainer")) {
            this.updateWindowTextFont(event.currentTarget);
        }
    };
    BasePopPanel.prototype.onRefresh = function () {
    };
    BasePopPanel.prototype.onSkinName = function () {
    };
    BasePopPanel.prototype.onShow = function () {
        if (this.parentLayer) {
            if (this.onloadComp) {
                this.onAddToWindowLayer();
                this.onRegist();
                this.onRefresh();
            }
            else {
                this.onAddToWindowLayer();
            }
            this.isShow = true;
        }
    };
    BasePopPanel.prototype.onAddToWindowLayer = function () {
        this.parentLayer.addChild(this);
        this.adjustHierarchy();
    };
    BasePopPanel.prototype.adjustHierarchy = function () {
        var base;
        var len = this.parentLayer.numChildren;
        for (var j = len - 1; j >= 0; j--) {
            for (var i = 0; i < len; i++) {
                base = this.parentLayer.getChildAt(i);
                if (base.layerIndex == j) {
                    this.parentLayer.setChildIndex(base, 0);
                }
            }
        }
    };
    // private onUpdateText: boolean;
    BasePopPanel.prototype.updateWindowTextFont = function (container) {
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
    BasePopPanel.prototype.onShowWithParam = function (param) {
        this.onShow();
    };
    BasePopPanel.prototype.onRegist = function () {
        if (this.basic["closeBtn1"])
            this.basic["closeBtn1"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        if (this.basic["closeBtn2"])
            this.basic["closeBtn2"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.addEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    };
    BasePopPanel.prototype.onHide = function () {
        if (this.parent) {
            this.onRemove();
            this.parent.removeChild(this);
            this.isShow = false;
        }
    };
    BasePopPanel.prototype.onRemove = function () {
        if (this.basic["closeBtn1"])
            this.basic["closeBtn1"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        if (this.basic["closeBtn2"])
            this.basic["closeBtn2"].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHide, this);
        this.removeEventListener(egret.Event.ADDED, this.onAddedHandler, this);
    };
    Object.defineProperty(BasePopPanel.prototype, "parentLayer", {
        get: function () {
            return this.owner.hintBar;
        },
        enumerable: true,
        configurable: true
    });
    BasePopPanel.prototype.setTitle = function (title) {
        this.basic["panel_title"].source = title;
    };
    return BasePopPanel;
}(eui.Component));
__reflect(BasePopPanel.prototype, "BasePopPanel", ["IPop"]);
//带参数的面板
var PopParam = (function () {
    function PopParam(popName, param) {
        this.popName = popName;
        this.param = param;
    }
    return PopParam;
}());
__reflect(PopParam.prototype, "PopParam");
//# sourceMappingURL=BasePopPanel.js.map