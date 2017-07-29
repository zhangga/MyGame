var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SyncFactory = (function () {
    function SyncFactory() {
    }
    SyncFactory.onPackExchange = function (itemId, num) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.EXCHANGE;
        base.itemId = itemId;
        base.num = num;
        return base;
    };
    SyncFactory.onPackCollect = function (uid, type) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.COLLECT;
        base.uid = uid;
        base.collectType = type;
        return base;
    };
    SyncFactory.onPackMove = function (uid, pool) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.MOVE;
        base.uid = uid;
        base.pool = pool;
        return base;
    };
    SyncFactory.onPackSell = function (uid) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.SELL;
        base.uid = uid;
        return base;
    };
    SyncFactory.onPackUpgrade = function (uid) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.UPGRADE;
        base.uid = uid;
        return base;
    };
    SyncFactory.onPackFieldGuideBuy = function (fishID, num) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.FIELDGUIDE_BUY;
        base.fishID = fishID;
        base.num = num;
        return base;
    };
    SyncFactory.onPackUnlockFieldGuide = function (fgID) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.FIELDGUIDE_UNLOCK;
        base.fgID = fgID;
        return base;
    };
    SyncFactory.onPackTouchPeachEvent = function (uid, num) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.PEACH;
        base.uid = uid;
        base.num = num;
        return base;
    };
    SyncFactory.onPackTouchSmilingFaceEvent = function (uid) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.SMILINGFACE;
        base.uid = uid;
        return base;
    };
    SyncFactory.onPackOutPutSec = function () {
        var base = new SyneBase();
        base.type = SYNC_TYPE.OUTPUTSEC;
        return base;
    };
    SyncFactory.onPackFishTankAdvance = function (fgID) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.FISHTANK_ADVANCE;
        base.fgID = fgID;
        return base;
    };
    SyncFactory.onPackFishAdvance = function (uid) {
        var base = new SyneBase();
        base.type = SYNC_TYPE.FISH_ADVANCE;
        base.uid = uid;
        return base;
    };
    return SyncFactory;
}());
__reflect(SyncFactory.prototype, "SyncFactory");
//# sourceMappingURL=SyncFactory.js.map