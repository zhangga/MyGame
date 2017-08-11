class SyncFactory {
	public constructor() {
	}
	public static onPackExchange(itemId, num): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.EXCHANGE;
		base.itemId = itemId;
		base.num = num;
		return base;
	}
	public static onPackCollect(uid, type): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.COLLECT;
		base.uid = uid;
		base.collectType = type;
		return base;
	}

	public static onPackMove(uid, pool): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.MOVE;
		base.uid = uid;
		base.pool = pool;
		return base;
	}
	public static onPackSell(uid): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.SELL;
		base.uid = uid;
		return base;
	}
	public static onPackUpgrade(uid): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.UPGRADE;
		base.uid = uid;
		return base;
	}
	public static onPackFieldGuideBuy(fishID, num): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.FIELDGUIDE_BUY;
		base.fishID = fishID;
		base.num = num;
		return base;
	}
	public static onPackUnlockFieldGuide(fgID): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.FIELDGUIDE_UNLOCK;
		base.fgID = fgID;
		return base;
	}

	public static onPackTouchPeachEvent(uid, num): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.PEACH;
		base.uid = uid;
		base.num = num;
		return base;
	}

	public static onPackTouchSmilingFaceEvent(uid): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.SMILINGFACE;
		base.uid = uid;
		return base;
	}

	public static onPackOutPutSec(): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.OUTPUTSEC;
		return base;
	}

	public static onPackFishTankAdvance(fgID): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.FISHTANK_ADVANCE;
		base.fgID = fgID;
		return base;
	}

	public static onPackFishAdvance(uid): SyneBase {
		var base = new SyneBase();
		base.type = SYNC_TYPE.FISH_ADVANCE;
		base.uid = uid;
		return base;
	}
}