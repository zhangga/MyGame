var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 提示信息
 */
var PromptInfo = (function (_super) {
    __extends(PromptInfo, _super);
    function PromptInfo(type) {
        var _this = _super.call(this) || this;
        _this._label = new eui.Label;
        _this.boo = true;
        _this.speed = 5;
        _this._type = type;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        if (!_this.timer) {
            _this.timer = new egret.Timer(1500, 1);
        }
        // this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        _this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        _this.timer.start();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    PromptInfo.prototype.onAddToStage = function (event) {
        this.setStyle();
        // this.setAnim();
        this._label.fontFamily = "Microsoft YaHei";
        this._label.size = 26;
        this._label.bold = true;
        // this._label.strokeColor = 0;
        // this._label.stroke = 2;
        // this._label.alpha = 1;
        this._label.anchorOffsetX = this._label.width / 2;
        this._label.anchorOffsetY = this._label.height / 2;
        this.addChild(this._label);
    };
    PromptInfo.prototype.setStyle = function () {
        switch (this._type) {
            case PROMPT_TYPE.ERROR:
                this._label.textColor = 0xFFFFFF;
                var bg = new eui.Image();
                bg.y = -this._label.height / 2 - 4;
                bg.source = "public_tipbg_png";
                // bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
                bg.width = this._label.width;
                bg.height = this._label.height + 8;
                bg.anchorOffsetX = bg.width / 2;
                this.addChild(bg);
                break;
            case PROMPT_TYPE.FUN:
                this._label.textColor = 0xFFFECE;
                //this._label.textColor = 0xFF0000;
                var bg = new eui.Image();
                bg.y = -this._label.height / 2 - 4;
                // bg.source = "public_tipbg_png2_png";
                bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
                bg.width = this._label.width;
                bg.height = this._label.height + 8;
                bg.anchorOffsetX = bg.width / 2;
                this.addChild(bg);
                break;
            case PROMPT_TYPE.GAIN:
                //this._label.textColor = 0xFF0000;
                var bg = new eui.Image();
                bg.y = -this._label.height / 2 - 4;
                // bg.source = "public_tipbg_png2_png";
                bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
                bg.width = this._label.width;
                bg.height = this._label.height + 8;
                bg.anchorOffsetX = bg.width / 2;
                this.addChild(bg);
                break;
            case PROMPT_TYPE.CUSTOM:
                //this._label.textColor = 0xFF0000;
                var bg = new eui.Image();
                bg.y = -this._label.height / 2 - 4;
                // bg.source = "public_tipbg_png2_png";
                bg.scale9Grid = new egret.Rectangle(10, 10, 40, 10);
                bg.width = this._label.width;
                bg.height = this._label.height + 8;
                bg.anchorOffsetX = bg.width / 2;
                this.addChild(bg);
                break;
        }
    };
    Object.defineProperty(PromptInfo.prototype, "height", {
        get: function () {
            return this._label ? this._label.textHeight + 10 : 30;
        },
        enumerable: true,
        configurable: true
    });
    PromptInfo.prototype.timerComFunc = function () {
        this.boo = false;
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer = null;
    };
    Object.defineProperty(PromptInfo.prototype, "proboodate", {
        get: function () {
            return this.boo;
        },
        enumerable: true,
        configurable: true
    });
    PromptInfo.prototype.onRemove = function () {
        this.removeChildren();
        this._label = null;
        if (this.parent)
            this.parent.removeChild(this);
    };
    // private onNext(): void {
    // 	this._isNext = true;
    // }
    // public isNext(): boolean {
    // 	return this._isNext;
    // }
    PromptInfo.prototype.setText = function (text) {
        this._label.text = text;
    };
    PromptInfo.prototype.getText = function () {
        return this._label.text;
    };
    PromptInfo.prototype.setTextFlow = function (text) {
        this._label.textFlow = text;
    };
    Object.defineProperty(PromptInfo.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return PromptInfo;
}(eui.Component));
__reflect(PromptInfo.prototype, "PromptInfo");
//# sourceMappingURL=PromptInfo.js.map