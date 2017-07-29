var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 提示面板
 */
var PromptPanel = (function (_super) {
    __extends(PromptPanel, _super);
    function PromptPanel() {
        var _this = _super.call(this) || this;
        _this._infoArray1 = new Array();
        _this._newestPromp1 = null;
        _this._infoArray2 = new Array();
        _this._newestPromp2 = null;
        _this.guideIsShow = true;
        _this.targetY2 = 5;
        _this.targetY1 = 5;
        _this._onMoveTxtAry1 = [];
        _this._onMoveTxtAry2 = [];
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    PromptPanel.getInstance = function () {
        if (!this._promptPanel) {
            this._promptPanel = new PromptPanel();
        }
        return this._promptPanel;
    };
    PromptPanel.prototype.onAddToStage = function (event) {
        // this.addChild(this._noviceGuidePanel);
        // GameDispatcher.getInstance().addEventListener(GameEvent.PLAYER_POWER_UPDATE, this.fightingAnimShow, this);
    };
    PromptPanel.prototype.onEnterFrame = function (e) {
        if (this._infoArray1.length > 0) {
            if (this._newestPromp1 == null || this._newestPromp1.y < 950 - this._newestPromp1.height) {
                this._newestPromp1 = this._infoArray1.shift();
                this.addPrompTxtToStage(this._newestPromp1);
            }
        }
        for (var i = this._onMoveTxtAry1.length - 1; i >= 0; i--) {
            var _promptBody1 = this._onMoveTxtAry1[i];
            if (_promptBody1.proboodate == false) {
                if (this._newestPromp1 == _promptBody1)
                    this._newestPromp1 = null;
                _promptBody1.onRemove();
                _promptBody1 = null;
                this._onMoveTxtAry1.splice(i, 1);
            }
            else {
                if (this._onMoveTxtAry1[i + 1]) {
                    if (this._onMoveTxtAry1[i].y > this._onMoveTxtAry1[i + 1].y - (this._onMoveTxtAry1[i + 1].height)) {
                        this._onMoveTxtAry1[i].y -= 10;
                    }
                }
                if (_promptBody1.y >= 530) {
                    _promptBody1.y -= _promptBody1.speed;
                }
                else {
                    _promptBody1.y -= Number(0);
                }
            }
        }
        if (this._infoArray2.length > 0) {
            if (this._newestPromp2 == null || this._newestPromp2.y < 950) {
                this._newestPromp2 = this._infoArray2.shift();
                this.addPrompTxtToStage(this._newestPromp2);
            }
        }
        for (var i = this._onMoveTxtAry2.length - 1; i >= 0; i--) {
            var _promptBody2 = this._onMoveTxtAry2[i];
            if (_promptBody2.proboodate == false) {
                if (this._newestPromp2 == _promptBody2)
                    this._newestPromp2 = null;
                _promptBody2.onRemove();
                _promptBody2 = null;
                this._onMoveTxtAry2.splice(i, 1);
            }
            else {
                if (this._onMoveTxtAry2[i + 1]) {
                    if (this._onMoveTxtAry2[i].y > this._onMoveTxtAry2[i + 1].y - (this._onMoveTxtAry2[i + 1].height)) {
                        this._onMoveTxtAry2[i].y -= 10;
                    }
                }
                if (_promptBody2.y >= 530) {
                    _promptBody2.y -= _promptBody2.speed;
                }
                else {
                    _promptBody2.y -= Number(0);
                }
            }
        }
    };
    PromptPanel.prototype.addPromptError = function (text, isNotDuplicate) {
        if (isNotDuplicate === void 0) { isNotDuplicate = true; }
        if (isNotDuplicate) {
            if (this._infoArray1.length > 0 && this._infoArray1[this._infoArray1.length - 1].getText() == text) {
                return;
            }
        }
        var promptInfo = new PromptInfo(PROMPT_TYPE.ERROR);
        promptInfo.setText(text);
        this._infoArray2.push(promptInfo);
    };
    PromptPanel.prototype.addPromptFun = function (text) {
        var promptInfo = new PromptInfo(PROMPT_TYPE.FUN);
        promptInfo.setText(text);
        this._infoArray1.push(promptInfo);
    };
    PromptPanel.prototype.addPromptGain = function (text) {
        var promptInfo = new PromptInfo(PROMPT_TYPE.GAIN);
        promptInfo.setTextFlow(text);
        this._infoArray1.push(promptInfo);
    };
    PromptPanel.prototype.addPromptCustom = function (text) {
        var promptInfo = new PromptInfo(PROMPT_TYPE.CUSTOM);
        promptInfo.setTextFlow(text);
        this._infoArray1.push(promptInfo);
    };
    PromptPanel.prototype.addPrompTxtToStage = function (promptInfo) {
        this.addChild(promptInfo);
        if (promptInfo.type == PROMPT_TYPE.CUSTOM || promptInfo.type == PROMPT_TYPE.FUN) {
            this._onMoveTxtAry2.push(promptInfo);
            promptInfo.x = 300;
            promptInfo.y = 550;
        }
        else {
            this._onMoveTxtAry1.push(promptInfo);
            promptInfo.x = 300;
            promptInfo.y = 550; //-this._onMoveTxtAry1[this._onMoveTxtAry1.length-1].y
        }
    };
    Object.defineProperty(PromptPanel.prototype, "guidePanel", {
        //新手引导
        get: function () {
            if (!this._noviceGuidePanel) {
                this._noviceGuidePanel = new NoviceGuidePanel();
            }
            return this._noviceGuidePanel;
        },
        enumerable: true,
        configurable: true
    });
    return PromptPanel;
}(egret.DisplayObjectContainer));
__reflect(PromptPanel.prototype, "PromptPanel");
var PROMPT_TYPE;
(function (PROMPT_TYPE) {
    PROMPT_TYPE[PROMPT_TYPE["ERROR"] = 0] = "ERROR";
    PROMPT_TYPE[PROMPT_TYPE["FUN"] = 1] = "FUN";
    PROMPT_TYPE[PROMPT_TYPE["GAIN"] = 2] = "GAIN";
    PROMPT_TYPE[PROMPT_TYPE["CUSTOM"] = 3] = "CUSTOM";
})(PROMPT_TYPE || (PROMPT_TYPE = {}));
//# sourceMappingURL=PromptPanel.js.map