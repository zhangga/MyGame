var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SyncManager = (function () {
    function SyncManager() {
        this.isSync = true;
        this.integrateQue = [];
        this.sendQue = [];
        this.time = 0;
        GameDispatcher.instance.addEventListener(MESSAGE_ID.TURNPLATE_LOTTERY_MSG.toString(), this.onStartLottery, this);
        this.currTime = egret.getTimer();
    }
    SyncManager.prototype.onParseMessage = function (msg) {
        this.timestamp = msg.getInt();
        var goldStr = msg.getString();
        var secOutPut = msg.getString();
        var num = new InfiniteNumber(goldStr);
        if (num.num < DataManager.instance.playerM.player.gold.num && this.isSync) {
            DataManager.instance.playerM.player.gold = num;
        }
        Tool.log("金币总量：" + goldStr + " <-> 本地金币:" + DataManager.instance.playerM.player.gold.num);
        Tool.log("秒产：" + secOutPut);
        this.startTime = egret.getTimer();
    };
    SyncManager.prototype.onStartLottery = function () {
        this.isSync = false;
    };
    SyncManager.prototype.onOpenSync = function () {
        this.isSync = true;
    };
    SyncManager.prototype.onTime = function () {
        this.time++;
        // Tool.log(this.time);
        // this.onIntegrateQue();
        if (this.time == 5) {
            this.time = 0;
            this.onSendQue();
        }
        var curr = egret.getTimer();
        var pass = Math.floor((curr - this.currTime) / 1000);
        if (pass >= 120) {
            MessageErrorManager.instance.errorMsgHandler(MESSAGE_ID.TIMEOUT_MESSAGE);
        }
        this.currTime = curr;
    };
    //整合采集操作
    SyncManager.prototype.onIntegrateQue = function () {
        var msg;
        for (var i = 0; i < this.integrateQue.length; i++) {
        }
        this.sendQue.push(msg);
        this.integrateQue = [];
    };
    SyncManager.prototype.onSendQue = function () {
        var len = this.sendQue.length;
        var msg = new Message(MESSAGE_ID.GAME_SYNC_MESSAGE);
        msg.setByte(len);
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                msg.setByte(this.sendQue[i].type);
                msg.setInt(this.sendQue[i].timestamp);
                this.sendQue[i].onInject(msg);
            }
            this.sendQue = [];
        }
        // _GF.instance.net.onAddMessage(msg);
    };
    SyncManager.prototype.onAddMessage = function (base) {
        this.sendQue.push(base);
        // if (base.type != SYNC_TYPE.OUTPUTSEC) {
        // 	GameDispatcher.instance.dispatcherEventWith(GameEvent.GAME_REDPOINT_TRIGGER, false, new RedPointTrigger(null));
        // }
    };
    SyncManager.prototype.getTimestamp = function () {
        return this.timestamp + Math.floor((egret.getTimer() - this.startTime) / 1000);
    };
    return SyncManager;
}());
__reflect(SyncManager.prototype, "SyncManager");
var SYNC_TYPE;
(function (SYNC_TYPE) {
    SYNC_TYPE[SYNC_TYPE["EXCHANGE"] = 1] = "EXCHANGE";
    SYNC_TYPE[SYNC_TYPE["COLLECT"] = 2] = "COLLECT";
    SYNC_TYPE[SYNC_TYPE["MOVE"] = 3] = "MOVE";
    SYNC_TYPE[SYNC_TYPE["SELL"] = 4] = "SELL";
    SYNC_TYPE[SYNC_TYPE["UPGRADE"] = 6] = "UPGRADE";
    SYNC_TYPE[SYNC_TYPE["FIELDGUIDE_BUY"] = 7] = "FIELDGUIDE_BUY";
    SYNC_TYPE[SYNC_TYPE["FIELDGUIDE_UNLOCK"] = 8] = "FIELDGUIDE_UNLOCK";
    SYNC_TYPE[SYNC_TYPE["PEACH"] = 10] = "PEACH";
    SYNC_TYPE[SYNC_TYPE["SMILINGFACE"] = 11] = "SMILINGFACE";
    SYNC_TYPE[SYNC_TYPE["OUTPUTSEC"] = 13] = "OUTPUTSEC";
    SYNC_TYPE[SYNC_TYPE["FISHTANK_ADVANCE"] = 14] = "FISHTANK_ADVANCE";
    SYNC_TYPE[SYNC_TYPE["FISH_ADVANCE"] = 15] = "FISH_ADVANCE";
})(SYNC_TYPE || (SYNC_TYPE = {}));
var SyneBase = (function () {
    function SyneBase() {
        this.timestamp = DataManager.instance.syncM.getTimestamp();
    }
    SyneBase.prototype.onInjectExchange = function (msg) {
        msg.setInt(this.itemId);
        msg.setInt(this.num);
    };
    SyneBase.prototype.onInjectCollect = function (msg) {
        msg.setInt(this.uid);
        msg.setByte(this.collectType);
    };
    SyneBase.prototype.onInjectMove = function (msg) {
        msg.setInt(this.uid);
        msg.setByte(this.pool);
    };
    SyneBase.prototype.onInjectSell = function (msg) {
        msg.setInt(this.uid);
    };
    SyneBase.prototype.onInjectUpgrade = function (msg) {
        msg.setInt(this.uid);
    };
    SyneBase.prototype.onInjectFieldGuideBuy = function (msg) {
        msg.setInt(this.fishID);
        msg.setInt(this.num);
    };
    SyneBase.prototype.onInjectUnlockFieldGuide = function (msg) {
        msg.setByte(this.fgID);
    };
    SyneBase.prototype.onInjectTouchPeachEvent = function (msg) {
        msg.setInt(this.uid);
        msg.setShort(this.num);
    };
    SyneBase.prototype.onInjectTouchSmilingFaceEvent = function (msg) {
        msg.setInt(this.uid);
    };
    SyneBase.prototype.onInjectOutPutSec = function (msg) {
    };
    SyneBase.prototype.onInjectFishTankAdvance = function (msg) {
        msg.setByte(this.fgID);
    };
    SyneBase.prototype.onInjectFishAdvance = function (msg) {
        msg.setInt(this.uid);
    };
    SyneBase.prototype.onInject = function (msg) {
        switch (this.type) {
            case SYNC_TYPE.EXCHANGE:
                this.onInjectExchange(msg);
                break;
            case SYNC_TYPE.COLLECT:
                this.onInjectCollect(msg);
                break;
            case SYNC_TYPE.MOVE:
                this.onInjectMove(msg);
                break;
            case SYNC_TYPE.SELL:
                this.onInjectSell(msg);
                break;
            case SYNC_TYPE.UPGRADE:
                this.onInjectUpgrade(msg);
                break;
            case SYNC_TYPE.FIELDGUIDE_BUY:
                this.onInjectFieldGuideBuy(msg);
                break;
            case SYNC_TYPE.FIELDGUIDE_UNLOCK:
                this.onInjectUnlockFieldGuide(msg);
                break;
            case SYNC_TYPE.PEACH:
                this.onInjectTouchPeachEvent(msg);
                break;
            case SYNC_TYPE.SMILINGFACE:
                this.onInjectTouchSmilingFaceEvent(msg);
                break;
            case SYNC_TYPE.OUTPUTSEC:
                this.onInjectOutPutSec(msg);
                break;
            case SYNC_TYPE.FISHTANK_ADVANCE:
                this.onInjectFishTankAdvance(msg);
                break;
            case SYNC_TYPE.FISH_ADVANCE:
                this.onInjectFishAdvance(msg);
                break;
        }
    };
    return SyneBase;
}());
__reflect(SyneBase.prototype, "SyneBase");
//# sourceMappingURL=SyncManager.js.map