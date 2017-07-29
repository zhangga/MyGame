class CrownData extends FishData {
	//皇冠个数
	public crown: number = 0;
	//是否已领取神器点
	private _hasArtifact: boolean = false;

	private _isUnlock: boolean = false;
	public constructor(modelID: number, lv: number = 1) {
		super();
	}
	public onParseMessage(msg: Message) {
		this.crown = msg.getByte();
		this._hasArtifact = msg.getBoolean();
		this.isUnlock = true;
	}

	//是否解锁
	public get isUnlock() {
		// var player = DataManager.instance.playerM.player;
		// var cData: CrownData;
		// if (this._isUnlock) return true;
		// var model: ModelFish = this.model;
		// var bl: boolean = true;
		// var award: ModelAward;
		// for (var i: number = 0; i < model.tiaojian.length; i++) {
		// 	award = model.tiaojian[i];
		// 	switch (award.type) {
		// 		case FIELDGUIDE_UNLOCK_TYPE.NEED_FISH_CROWN:
		// 			cData = player.getCrownInfoByID(award.id);
		// 			if (cData.crown < cData.model.starMax) {
		// 				bl = false;
		// 			}
		// 			break;
		// 		case FIELDGUIDE_UNLOCK_TYPE.NEED_FISH_ID:
		// 			if (!cData.isUnlock) {
		// 				bl = false;
		// 			}
		// 			break;
		// 		case FIELDGUIDE_UNLOCK_TYPE.NEED_SEND_LINK:
		// 			bl = false;
		// 			break;
		// 		case FIELDGUIDE_UNLOCK_TYPE.NEED_INVITE_FRIEND:
		// 			bl = false;
		// 			break;
		// 	}
		// }
		// if (bl) {
		// 	return this._isUnlock = true;
		// }
		return false;
	}
	public set isUnlock(bl: boolean) {
		this._isUnlock = bl;
	}
	/**是否已领取奖励**/
	public set hasArtifact(bl: boolean) {
		this._hasArtifact = bl;
	}
	public get hasArtifact(): boolean {
		return this._hasArtifact;
	}
	public onCheckCanReceive(): boolean {
		// if (!this.hasArtifact && this.crown == this.model.starMax) return true;
		return false;
	}
}