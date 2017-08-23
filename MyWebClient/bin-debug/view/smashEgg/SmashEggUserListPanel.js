var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SmashEggUserListPanel = (function (_super) {
    __extends(SmashEggUserListPanel, _super);
    function SmashEggUserListPanel(owner) {
        var _this = _super.call(this, owner) || this;
        /**倒计时操作**/
        _this._timerStart = false;
        return _this;
    }
    SmashEggUserListPanel.prototype.onSkinName = function () {
        this.skinName = skins.SmashEggUserListSkin;
    };
    SmashEggUserListPanel.prototype.onInit = function () {
        this.setTitle("smash_egg_title_png");
        this.friend_list.itemRenderer = SmashEggUserListItem;
        this.friend_list.itemRendererSkinName = skins.SmashEggUserListItemSkin;
        this.friend_list.useVirtualLayout = true;
        this.scorll.viewport = this.friend_list;
        _super.prototype.onInit.call(this);
    };
    SmashEggUserListPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG.toString(), this.onUpdate, this);
        this.onRequestUserListMsg();
    };
    SmashEggUserListPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseBtn, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.SMASHEGG_FRIEND_INFO_MSG.toString(), this.onUpdate, this);
        this.onCloseRecTimer();
    };
    SmashEggUserListPanel.prototype.onRequestUserListMsg = function () {
        DataManager.instance.smasheggM.onSendSmashUserlistMsg();
    };
    SmashEggUserListPanel.prototype.onUpdate = function () {
        this.onStartTimer();
        this.onUpdateHammerNum();
        this.friend_list.dataProvider = new eui.ArrayCollection(this.smashM.smashUserInfos);
    };
    SmashEggUserListPanel.prototype.onUpdateHammerNum = function () {
        this.invite_giftnum_label.text = this.smashM.sharegiftNum + "/" + GameDefine.SMASHEGG_INVITE_MAX;
        this.chuizi_num_label.text = "\u00D7" + this.smashM.hammerNum;
    };
    Object.defineProperty(SmashEggUserListPanel.prototype, "smashM", {
        get: function () {
            return DataManager.instance.smasheggM;
        },
        enumerable: true,
        configurable: true
    });
    SmashEggUserListPanel.prototype.onStartTimer = function () {
        if (!this._timerStart) {
            this._timerStart = true;
            Tool.addTimer(this.onTimerDown, this, 1000);
        }
    };
    SmashEggUserListPanel.prototype.onTimerDown = function () {
        var _lefttime = DataManager.instance.smasheggM.actLefttime;
        if (_lefttime >= 0) {
            this.act_lefttime_label.text = GameCommon.instance.getTimeStrForSec1(_lefttime);
            for (var i = 0; i < this.friend_list.numChildren; i++) {
                var _listItem = this.friend_list.getChildAt(i);
                if (_listItem)
                    _listItem.onRefreshLefttime();
            }
        }
        else {
            this.onCloseRecTimer();
        }
    };
    SmashEggUserListPanel.prototype.onCloseRecTimer = function () {
        this._timerStart = false;
        Tool.removeTimer(this.onTimerDown, this, 1000);
    };
    return SmashEggUserListPanel;
}(BaseWindowPanel));
__reflect(SmashEggUserListPanel.prototype, "SmashEggUserListPanel");
var SmashEggUserListItem = (function (_super) {
    __extends(SmashEggUserListItem, _super);
    function SmashEggUserListItem() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    SmashEggUserListItem.prototype.onComplete = function () {
        this.item_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewOther, this);
    };
    SmashEggUserListItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info.userId == DataManager.instance.playerM.player.id) {
            this.currentState = "my";
            this.name_label.text = DataManager.instance.playerM.player.name;
        }
        else {
            this.currentState = "other";
            this.name_label.text = info.friendData ? info.friendData.name : "";
        }
        this.left_eggnum_label.text = Language.instance.getDescByKey("smashegg_left_num") + "\uFF1A" + info.eggCount;
        this.hummer_num_label.text = Language.instance.getDescByKey("smashegg_comsume_num") + "\uFF1A" + info.hammerCount;
    };
    SmashEggUserListItem.prototype.onRefreshLefttime = function () {
        this.left_time_label.text = GameCommon.instance.getTimeStrForSec2(this.data.lefttime);
    };
    SmashEggUserListItem.prototype.onPreviewOther = function () {
        DataManager.instance.smasheggM.onSendSmashPreviewMsg(this.data.userId);
    };
    return SmashEggUserListItem;
}(eui.ItemRenderer));
__reflect(SmashEggUserListItem.prototype, "SmashEggUserListItem");
//# sourceMappingURL=SmashEggUserListPanel.js.map