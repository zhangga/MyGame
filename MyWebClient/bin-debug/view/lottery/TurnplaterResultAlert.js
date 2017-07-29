var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TurnplaterResultAlert = (function (_super) {
    __extends(TurnplaterResultAlert, _super);
    function TurnplaterResultAlert(owner) {
        var _this = _super.call(this, owner) || this;
        _this.isVisit = false;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    TurnplaterResultAlert.prototype.onSkinName = function () {
        this.skinName = skins.TurnplaterResultAlertSkin;
    };
    TurnplaterResultAlert.prototype.onInit = function () {
        this.setTitle("turnplate_alert_title_png");
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    TurnplaterResultAlert.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
        this.btn_double.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDoubleBtnHandler, this);
    };
    TurnplaterResultAlert.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnHandler, this);
        this.btn_double.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDoubleBtnHandler, this);
    };
    TurnplaterResultAlert.prototype.onShowWithParam = function (param) {
        this.param = param;
        this.onShow();
    };
    TurnplaterResultAlert.prototype.onRefresh = function () {
        this.isVisit = false;
        this.img_turnplateIcon.source = this.param.model.icon;
        this.img_turnplate_desc.source = "turnplate_desc" + this.param.lotteryId + "_png";
        var currStr = "one";
        if (this.param.model.effectId > 0) {
            switch (this.param.effectModel.type) {
                case LOTTERY_EFFECT.ADD_GOLD:
                    currStr = "two";
                    break;
                case LOTTERY_EFFECT.POLLUTE:
                    this.isVisit = true;
                    DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.POLLUTE;
                    break;
                case LOTTERY_EFFECT.PILFERGE:
                    this.isVisit = true;
                    DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.ROB;
                    break;
                case LOTTERY_EFFECT.CLEAR:
                    this.isVisit = true;
                    DataManager.instance.visite.type = OTHER_BEHAVIOR_TYPE.VISIT;
                    break;
                case LOTTERY_EFFECT.DECLINE:
                case LOTTERY_EFFECT.PROMOTE:
                    break;
            }
            this.lab_hint.text = Language.instance.getDescByKey(this.param.effectModel.desc, this.param.reward.toTextFormat());
        }
        else {
            currStr = "two";
            var thing = GameCommon.instance.getThingModel(this.param.model.reward.type, this.param.model.reward.id);
            this.lab_hint.text = "\u83B7\u5F97" + this.param.model.reward.numFormat + thing.name;
        }
        this.currentState = currStr;
    };
    TurnplaterResultAlert.prototype.onTouchBtnHandler = function () {
        if (this.isVisit) {
            DataManager.instance.visite.onSendVisitMessage(this.param.targetRoleID, DataManager.instance.visite.type);
        }
        this.onHide();
    };
    TurnplaterResultAlert.prototype.onTouchDoubleBtnHandler = function () {
        SDKManager.share(new SDKShareContainer());
    };
    return TurnplaterResultAlert;
}(BaseWindowPanel));
__reflect(TurnplaterResultAlert.prototype, "TurnplaterResultAlert");
var TurnplaterResultParam = (function () {
    function TurnplaterResultParam(lotteryId) {
        this.reward = new InfiniteNumber("");
        this.lotteryId = lotteryId;
    }
    TurnplaterResultParam.prototype.onParseMessage = function (msg) {
        this.model = ModelManager.instance.modelTurnplate[this.lotteryId];
        if (this.model.effectId > 0) {
            this.effectModel = ModelManager.instance.modelEffect[this.model.effectId];
            switch (this.effectModel.type) {
                case LOTTERY_EFFECT.ADD_GOLD:
                    this.reward = new InfiniteNumber(msg.getString());
                    break;
                case LOTTERY_EFFECT.POLLUTE:
                case LOTTERY_EFFECT.PILFERGE:
                case LOTTERY_EFFECT.CLEAR:
                    this.targetRoleID = msg.getInt();
                    break;
                case LOTTERY_EFFECT.DECLINE:
                case LOTTERY_EFFECT.PROMOTE:
                    break;
            }
        }
    };
    return TurnplaterResultParam;
}());
__reflect(TurnplaterResultParam.prototype, "TurnplaterResultParam");
//# sourceMappingURL=TurnplaterResultAlert.js.map