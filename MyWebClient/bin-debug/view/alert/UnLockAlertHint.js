var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnLockAlertHint = (function (_super) {
    __extends(UnLockAlertHint, _super);
    function UnLockAlertHint(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    UnLockAlertHint.prototype.onSkinName = function () {
        this.skinName = skins.UnLockAlerttHintSkin;
    };
    UnLockAlertHint.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    UnLockAlertHint.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShareBtn, this);
    };
    UnLockAlertHint.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        this.share_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShareBtn, this);
    };
    UnLockAlertHint.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    UnLockAlertHint.prototype.onRefresh = function () {
        this.back_anim_grp.removeChildren();
        var f;
        for (var i = this.fishLayer.numChildren - 1; i >= 0; i--) {
            f = this.fishLayer.getChildAt(i);
            f.onDestory();
        }
        var model;
        var param = DataManager.instance.fieldGuide.fgHitRecord[0];
        this.unlock_title_img.source = "unlock_hint_title" + param.type + "_png";
        switch (param.award.type) {
            case GOODS_TYPE.FISH:
                model = ModelManager.instance.modelFish[param.award.id];
                GameCommon.instance.addAnimation(this.back_anim_grp, "jiesuoguanghuan", new egret.Point(0, 0));
                var fData = new FishData();
                fData.setParam(model.id, 1);
                GameCommon.instance.addAnimation(this.back_anim_grp, fData.moveRes, new egret.Point(0, 0));
                this.name_label.text = Language.instance.getDescByKey(model.name);
                Tool.callbackTime(function (model) {
                    if (model.id == 5002 && PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.OPENSHARE) {
                        PromptPanel.getInstance().guidePanel.showGuide(this.share_btn);
                    }
                }, this, 500, model);
                break;
        }
    };
    UnLockAlertHint.prototype.onTouchCloseBtn = function () {
        DataManager.instance.fieldGuide.fgHitRecord.shift();
        if (DataManager.instance.fieldGuide.fgHitRecord.length > 0) {
            this.onRefresh();
        }
        else {
            this.onHide();
        }
    };
    UnLockAlertHint.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this.onCheckGuide();
    };
    UnLockAlertHint.prototype.onTouchShareBtn = function () {
        SDKManager.share(new SDKShareContainer());
        this.onTouchCloseBtn();
    };
    UnLockAlertHint.prototype.onCheckGuide = function () {
        if (PromptPanel.getInstance().guideIsShow) {
            Tool.callbackTime(function () {
                if (PromptPanel.getInstance().guidePanel.guideIndex == GUIDE_TYPE.TURNPLATE) {
                    var btn = new egret.DisplayObject();
                    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                        var btn = event.currentTarget;
                        btn = null;
                        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN, false, "TurnplatePanel");
                    }, this);
                    PromptPanel.getInstance().guidePanel.showGuide(btn);
                }
            }, this, 500);
        }
    };
    return UnLockAlertHint;
}(BaseWindowPanel));
__reflect(UnLockAlertHint.prototype, "UnLockAlertHint");
var UnlockHintParam = (function () {
    function UnlockHintParam(type, award) {
        this.type = type;
        this.award = award;
    }
    return UnlockHintParam;
}());
__reflect(UnlockHintParam.prototype, "UnlockHintParam");
var UNLOCK_HINT_TYPE;
(function (UNLOCK_HINT_TYPE) {
    UNLOCK_HINT_TYPE[UNLOCK_HINT_TYPE["CROWN"] = 1] = "CROWN";
    UNLOCK_HINT_TYPE[UNLOCK_HINT_TYPE["NEWFISH"] = 2] = "NEWFISH";
})(UNLOCK_HINT_TYPE || (UNLOCK_HINT_TYPE = {}));
//# sourceMappingURL=UnLockAlertHint.js.map