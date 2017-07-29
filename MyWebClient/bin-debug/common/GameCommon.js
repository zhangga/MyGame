var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameCommon = (function () {
    function GameCommon() {
    }
    Object.defineProperty(GameCommon, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GameCommon();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameCommon.prototype.addChildByLayer = function (target, parent, pos, register) {
        if (register) {
            target.anchorOffsetX = register.x;
            target.anchorOffsetY = register.y;
        }
        target.x = pos.x;
        target.y = pos.y;
        parent.addChild(target);
    };
    GameCommon.prototype.getPos = function (row, col, rowOff, rowBottom) {
        if (rowOff === void 0) { rowOff = 2; }
        if (rowBottom === void 0) { rowBottom = 4; }
        var offX = Math.floor(col * Math.random()) * _GF.stageWidth / col + Math.floor(_GF.stageWidth / col * Math.random());
        var offY = Math.floor(((row - rowBottom) * Math.random() + rowOff)) * _GF.stageHeight / row + Math.floor(_GF.stageHeight / row * Math.random());
        return new egret.Point(offX, offY);
    };
    GameCommon.prototype.addAlert = function (text) {
        PromptPanel.getInstance().addPromptError(text);
    };
    GameCommon.prototype.addAlertError = function (id) {
        this.addAlert(GameErrorTip.getInstance().getGameErrorTip(id));
    };
    //根据id 和 type 获取物品的model
    GameCommon.prototype.getThingModel = function (type, modelId, quality) {
        var _model;
        switch (type) {
            case GOODS_TYPE.GOLD:
                if (!ModelManager.instance.modelItem["BIND_MONEY"]) {
                    var _bindMoneyModel = new ModelItem();
                    _bindMoneyModel.name = Language.instance.getDescByKey("money_" + type);
                    _bindMoneyModel.quality = GoodsQuality.Purple;
                    _bindMoneyModel.icon = "mainview_gold_png";
                    _bindMoneyModel.dropicon = "mainview_gold_png";
                    _bindMoneyModel.payIcon = "mainview_gold_png";
                    _bindMoneyModel.type = type;
                    _bindMoneyModel.des = "罕见货币，通过活动及游戏内系统产出，可以在商场中购买各种道具。";
                    ModelManager.instance.modelItem["BIND_MONEY"] = _bindMoneyModel;
                }
                _model = ModelManager.instance.modelItem["BIND_MONEY"];
                break;
            case GOODS_TYPE.DIAMOND:
                if (!ModelManager.instance.modelItem["GOLD"]) {
                    var _goldModel = new ModelItem();
                    _goldModel.name = Language.instance.getDescByKey("money_" + type);
                    _goldModel.icon = "icon_goods_diamond_png";
                    _goldModel.dropicon = "mainview_gold_png";
                    _goldModel.payIcon = "mainview_gold_png";
                    _goldModel.quality = GoodsQuality.Orange;
                    _goldModel.type = type;
                    _goldModel.des = "珍稀的货币，仅可通过充值获得，可用于在商城中购买各种道具以及参与各类活动。";
                    ModelManager.instance.modelItem["GOLD"] = _goldModel;
                }
                _model = ModelManager.instance.modelItem["GOLD"];
                break;
            case GOODS_TYPE.ARTIFACT:
                if (!ModelManager.instance.modelItem["ARTIFACT"]) {
                    var _goldModel = new ModelItem();
                    _goldModel.name = Language.instance.getDescByKey("money_" + type);
                    _goldModel.icon = "icon_goods_shenqidian_png";
                    _goldModel.dropicon = "icon_goods_shenqidian_png";
                    _goldModel.payIcon = "icon_goods_shenqidian_png";
                    _goldModel.quality = GoodsQuality.Orange;
                    _goldModel.type = type;
                    _goldModel.des = "珍稀的货币，仅可通过充值获得，可用于在商城中购买各种道具以及参与各类活动。";
                    ModelManager.instance.modelItem["ARTIFACT"] = _goldModel;
                }
                _model = ModelManager.instance.modelItem["ARTIFACT"];
                break;
            case GOODS_TYPE.DECORATE:
                if (!ModelManager.instance.modelItem["DECORATE"]) {
                    var _decorateModel = ModelManager.instance.modelDecorate[modelId];
                    if (_decorateModel) {
                        var _decorateItem = new ModelItem();
                        _decorateItem.name = _decorateModel.name;
                        _decorateItem.icon = _decorateModel.icon;
                        _decorateItem.quality = _decorateModel.pinzhi;
                        _decorateItem.type = type;
                        ModelManager.instance.modelItem["ARTIFACT"] = _decorateItem;
                    }
                }
                _model = ModelManager.instance.modelItem["ARTIFACT"];
                break;
        }
        return _model;
    };
    GameCommon.prototype.addHintBar = function (message) {
        var code = message.getShort();
        Tool.log("400 - code:" + code);
        this.addAlert(GameErrorTip.getInstance().getGameErrorTip(code));
    };
    //配置带颜色的HTML字 格式：[#00ff00XXXXXXXX] 转化成<font color='#00ff00'>XXXXXXX</font>
    GameCommon.prototype.readStringToHtml = function (oldString) {
        var _newHtmlString = "";
        if (oldString) {
            var matchStrAry = oldString.match(/\[#[0-9a-fA-F]{6}.*?]/g);
            if (matchStrAry) {
                for (var i = 0; i < matchStrAry.length; i++) {
                    var matchStr = matchStrAry[i];
                    var _colorStr = matchStr.slice(1, 8);
                    var _descStr = matchStr.slice(8, matchStr.length - 1);
                    var _htmlStr = "<font color='" + _colorStr + "'>" + _descStr + "</font>";
                    oldString = oldString.replace(/\[#[0-9a-fA-F]{6}.*?]/, _htmlStr);
                }
            }
            _newHtmlString = oldString;
        }
        return _newHtmlString;
    };
    /**显示警告界面**/
    GameCommon.prototype.onShowWarnigPanel = function (param) {
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("WarningPanel", param));
    };
    /**显示奖励界面**/
    GameCommon.prototype.onShowAwardHint = function (descKey, award) {
        var _alertParam = new AlertHintParam(0, Language.instance.getDescByKey(descKey), award);
        GameDispatcher.instance.dispatcherEventWith(GameEvent.MODULE_WINDOW_OPEN_WITH_PARAM, false, new WindowParam("AlertHint", _alertParam));
    };
    GameCommon.prototype.getQualityFrame = function (quality) {
        return "item_quality_frame" + quality + "_png";
    };
    GameCommon.prototype.getQualityBar = function (quality) {
        return "item_quality_bar" + quality + "_png";
    };
    /**
      * 添加动画到某层
      *
      **/
    GameCommon.prototype.addAnimation = function (display, resName, pos, playNum, autoRemove) {
        if (pos === void 0) { pos = new egret.Point(); }
        if (playNum === void 0) { playNum = -1; }
        if (autoRemove === void 0) { autoRemove = false; }
        var anim = new Animation(resName, playNum, autoRemove);
        anim.x = pos.x;
        anim.y = pos.y;
        display.addChild(anim);
        return anim;
    };
    GameCommon.toTextFormat = function (num) {
        if (num.valueOf() >= 1000) {
            var str = num.toExponential(6);
            var param = str.split("e+");
            var index = param[0].indexOf(".");
            var param2 = param[0].split(".");
            var offbit = 0;
            if (index > 1) {
                offbit = Math.ceil(parseInt(param2[0]) / 10);
            }
            var amountS = param2.join("");
            var unit = Math.floor((parseInt(param[1]) + offbit) / 3);
            offbit = (parseInt(param[1]) + offbit) % 3;
            var pointL = amountS.substr(0, index + offbit);
            var pointR = amountS.substr(index + offbit, 2);
            return pointL + "." + pointR + this.unitName2Id[unit];
        }
        else {
            var showNum = num.valueOf();
            if (showNum < 1000) {
                showNum = Math.floor(showNum);
            }
            return showNum.toString();
        }
    };
    GameCommon.onInitUnit = function () {
        var ret = [];
        var array = ["0", "K", "M", "B", "G", "T"];
        for (var i = 0; i < array.length; i++) {
            ret.push(array[i]);
        }
        var preLength = array.length;
        var loop = 26;
        // AA~ZZ
        for (var i = 0; i < loop; i++) {
            var l = String.fromCharCode("A".charCodeAt(0) + i);
            for (var j = 0; j < loop; j++) {
                var r = String.fromCharCode("A".charCodeAt(0) + j);
                var lr = l + r;
                ret.push(lr);
            }
        }
        return ret;
    };
    //通过秒来获得时间格式 天时分秒，keep保持显示第几位 秒分时天
    GameCommon.prototype.getTimeStrForSec1 = function (sec, keepNum, Accurate) {
        if (keepNum === void 0) { keepNum = 2; }
        if (Accurate === void 0) { Accurate = 0; }
        var timeDesc = "";
        var _dayNum = Math.floor(sec / 86400);
        if (_dayNum > 0)
            timeDesc += _dayNum + "天";
        else if (keepNum >= 3)
            timeDesc += "0天";
        sec = sec - _dayNum * 86400;
        if (Accurate == 3)
            return timeDesc;
        var _hoursNum = Math.floor(sec / 3600);
        if (_hoursNum > 0)
            timeDesc += _hoursNum + "小时";
        else if (keepNum >= 2)
            timeDesc += "0小时";
        sec = sec - _hoursNum * 3600;
        if (Accurate == 2)
            return timeDesc;
        var _minutesNum = Math.floor(sec / 60);
        if (_minutesNum > 0) {
            timeDesc += _minutesNum < 10 ? "0" + _minutesNum + "分" : _minutesNum + "分";
        }
        else if (keepNum >= 1) {
            timeDesc += "00分";
        }
        if (Accurate == 1)
            return timeDesc;
        sec = sec - _minutesNum * 60;
        var _secondsNum = Math.floor(sec);
        timeDesc += _secondsNum < 10 ? "0" + _secondsNum + "秒" : _secondsNum + "秒";
        return timeDesc;
    };
    GameCommon.prototype.getTimeStrForSec2 = function (sec, hasHours) {
        if (hasHours === void 0) { hasHours = true; }
        var timeDesc = "";
        var _hoursNum = Math.floor(sec / 3600);
        if (hasHours || _hoursNum > 0) {
            timeDesc += _hoursNum < 10 ? "0" + _hoursNum : _hoursNum + "";
            timeDesc += "：";
            sec = sec - _hoursNum * 3600;
        }
        var _minutesNum = Math.floor(sec / 60);
        timeDesc += _minutesNum < 10 ? "0" + _minutesNum : _minutesNum + "";
        timeDesc += "：";
        sec = sec - _minutesNum * 60;
        var _secondsNum = Math.floor(sec);
        timeDesc += _secondsNum < 10 ? "0" + _secondsNum : _secondsNum + "";
        return timeDesc;
    };
    GameCommon.prototype.getOnlineTime = function (sec) {
        if (sec <= 0)
            return "\u5728\u7EBF";
        var _dayNum = Math.floor(sec / 86400);
        if (_dayNum > 0)
            return _dayNum + "\u5929\u524D";
        var _hoursNum = Math.floor(sec / 3600);
        if (_hoursNum > 0)
            return _hoursNum + "\u5C0F\u65F6\u524D";
        var _minutesNum = Math.floor(sec / 60);
        if (_minutesNum > 0) {
            return _minutesNum + "\u5206\u949F\u524D";
        }
        else {
            return "\u521A\u521A";
        }
    };
    /**
     * 返回区间[min, max]的随机数
     */
    GameCommon.prototype.getRangedRandom = function (min, max) {
        if (min >= max) {
            return min;
        }
        else {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
    return GameCommon;
}());
GameCommon.unitName2Id = GameCommon.onInitUnit();
__reflect(GameCommon.prototype, "GameCommon");
//# sourceMappingURL=GameCommon.js.map