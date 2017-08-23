var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FriendSeachPanel = (function (_super) {
    __extends(FriendSeachPanel, _super);
    function FriendSeachPanel(owner) {
        var _this = _super.call(this, owner) || this;
        _this.priority = PANEL_HIERARCHY_TYPE.II;
        return _this;
    }
    FriendSeachPanel.prototype.onSkinName = function () {
        this.skinName = skins.FriendSeachPanelSkin;
    };
    FriendSeachPanel.prototype.onInit = function () {
        this.setTitle("friend_apply_title_png");
        this.myID_label.text = Language.instance.getDescByKey("my") + "UID：" + DataManager.instance.playerM.player.id;
        _super.prototype.onInit.call(this);
        this.onRefresh();
    };
    FriendSeachPanel.prototype.onRegist = function () {
        _super.prototype.onRegist.call(this);
        this.seach_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSeachFriend, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_SEACH_MSG.toString(), this.reqSeachFriend, this);
        GameDispatcher.instance.addEventListener(MESSAGE_ID.FRIEND_ADD_MSG.toString(), this.onAddSuccess, this);
        this.onResetView();
    };
    FriendSeachPanel.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        this.seach_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSeachFriend, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_SEACH_MSG.toString(), this.reqSeachFriend, this);
        GameDispatcher.instance.removeEventListener(MESSAGE_ID.FRIEND_ADD_MSG.toString(), this.onAddSuccess, this);
    };
    //面板重置
    FriendSeachPanel.prototype.onResetView = function () {
        this.currentState = "seach";
        this.seach_txt.text = "";
    };
    //查询玩家
    FriendSeachPanel.prototype.onSeachFriend = function () {
        if (this.currentState == "seach") {
            if (this.seach_txt.text.length == 0) {
                GameCommon.instance.addAlert(Language.instance.getDescByKey("input_not_null"));
                return;
            }
            var playerId = parseInt(this.seach_txt.text);
            if (playerId == DataManager.instance.playerM.player.id) {
                GameCommon.instance.addAlert(Language.instance.getDescByKey("input_not_selfid"));
                return;
            }
            DataManager.instance.friendM.onSendSeachPlayerMsg(playerId);
        }
        else if (this.currentState == "player") {
            if (this._seachPlayer) {
                DataManager.instance.friendM.onSendAddPlayerMsg(this._seachPlayer.id);
            }
        }
    };
    FriendSeachPanel.prototype.reqSeachFriend = function (msgEvent) {
        var message = msgEvent.data;
        this.currentState = "player";
        this._seachPlayer = new SimplePlayer();
        this._seachPlayer.parsePlayer(message);
        this.name_label.text = this._seachPlayer.name;
        this.findID_label.text = "UID：" + this._seachPlayer.id;
    };
    //添加成功
    FriendSeachPanel.prototype.onAddSuccess = function (msgEvent) {
        var message = msgEvent.data;
        var playerid = message.getInt();
        if (this._seachPlayer && playerid == this._seachPlayer.id) {
            GameCommon.instance.addAlert(Language.instance.getDescByKey("friend_apply_success"));
        }
        this.onHide();
    };
    return FriendSeachPanel;
}(BaseWindowPanel));
__reflect(FriendSeachPanel.prototype, "FriendSeachPanel");
//# sourceMappingURL=FriendSeachPanel.js.map