var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoviceGuidePanel = (function (_super) {
    __extends(NoviceGuidePanel, _super);
    function NoviceGuidePanel() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this._progress = 0; //新手引导的进度
        _this.isShow = false;
        _this.onInit();
        return _this;
    }
    NoviceGuidePanel.prototype.onInit = function () {
        this.touchLayer = new eui.Group();
        this.touchLayer.width = 600;
        this.touchLayer.height = 1067;
        this.touchLayer.touchEnabled = true;
        // this.touchLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClick, this);
        this.addChild(this.touchLayer);
        this.animLayer = new eui.Group();
        this.animLayer.width = 200;
        this.animLayer.height = 300;
        this.animLayer.touchEnabled = true;
        this.animLayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchGuide, this);
        this.addChild(this.animLayer);
        var _fishData = this.player.getFishByID(5001);
        if (_fishData.lv > 1)
            this._progress++;
        _fishData = this.player.getFishByID(5002);
        if (_fishData)
            this._progress += 4;
        this.onCheckHasGuide();
    };
    NoviceGuidePanel.prototype.onTouchClick = function (event) {
        ++this.count;
        if (this.count > 2) {
            this.closeGuide();
        }
    };
    NoviceGuidePanel.prototype.showGuide = function (touchobj) {
        if (!touchobj)
            return;
        if (this.isShow)
            return;
        this.isShow = true;
        this.count = 0;
        this.touchdisplayObj = touchobj;
        switch (this._progress) {
            case GUIDE_TYPE.UPLEVEL:
                this.onCreateGuide(390, 675);
                break;
            case GUIDE_TYPE.OPENFISH:
                this.onCreateGuide(200, 808);
                break;
            case GUIDE_TYPE.OPENSHARE:
                this.onCreateGuide(200, 685);
                break;
            case GUIDE_TYPE.TURNPLATE:
                this.onCreateGuide(460, 120);
                break;
            case GUIDE_TYPE.INVITEGIFT:
                this.onCreateGuide(460, 50);
                break;
            default:
                return;
        }
        PromptPanel.getInstance().addChild(this);
    };
    NoviceGuidePanel.prototype.onCreateGuide = function (x, y) {
        this.guideAnim = GameCommon.instance.addAnimation(this.animLayer, "xinshouyindao", new egret.Point(100, 120), -1, false);
        this.guideAnim.scaleX = 0.6;
        this.guideAnim.scaleY = 0.6;
        this.animLayer.x = x;
        this.animLayer.y = y;
    };
    NoviceGuidePanel.prototype.closeGuide = function () {
        this._progress++;
        this.onCheckHasGuide();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this.guideAnim) {
            this.guideAnim.onDestroy();
            this.guideAnim = null;
        }
        this.isShow = false;
    };
    NoviceGuidePanel.prototype.touchGuide = function () {
        if (this.touchdisplayObj) {
            this.touchdisplayObj.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
            this.touchdisplayObj = null;
        }
        this.closeGuide();
    };
    Object.defineProperty(NoviceGuidePanel.prototype, "guideIndex", {
        get: function () {
            return PromptPanel.getInstance().guideIsShow ? this._progress : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuidePanel.prototype, "player", {
        get: function () {
            return DataManager.instance.playerM.player;
        },
        enumerable: true,
        configurable: true
    });
    NoviceGuidePanel.prototype.onCheckHasGuide = function () {
        if (this._progress >= GUIDE_TYPE.SIZE) {
            PromptPanel.getInstance().guideIsShow = false;
        }
        else {
            PromptPanel.getInstance().guideIsShow = true;
        }
    };
    return NoviceGuidePanel;
}(egret.DisplayObjectContainer));
__reflect(NoviceGuidePanel.prototype, "NoviceGuidePanel");
var GUIDE_TYPE;
(function (GUIDE_TYPE) {
    GUIDE_TYPE[GUIDE_TYPE["UPLEVEL"] = 0] = "UPLEVEL";
    GUIDE_TYPE[GUIDE_TYPE["OPENFISH"] = 1] = "OPENFISH";
    GUIDE_TYPE[GUIDE_TYPE["OPENSHARE"] = 2] = "OPENSHARE";
    GUIDE_TYPE[GUIDE_TYPE["TURNPLATE"] = 3] = "TURNPLATE";
    GUIDE_TYPE[GUIDE_TYPE["INVITEGIFT"] = 4] = "INVITEGIFT";
    GUIDE_TYPE[GUIDE_TYPE["SIZE"] = 5] = "SIZE";
})(GUIDE_TYPE || (GUIDE_TYPE = {}));
//# sourceMappingURL=NoviceGuidePanel.js.map