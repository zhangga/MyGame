class SimplePlayer {
	//必须
	public id: number;
	public name: string;//玩家名称
	public sex: number;//玩家性别
	public avatarUrl: string = "";//头像的URL
	public money: InfiniteNumber;//玩家资产
	//非必须
	private _rankNum: number = 0;//排行名次
	public reviceGift: number = 0;//收到鱼食的数量
	/**普通玩家数据解析**/
	public parsePlayer(msg: Message): void {
		this.id = msg.getInt();
		if (this.id >= 0) {
			this.name = msg.getString();
			this.sex = msg.getByte();
			this.money = new InfiniteNumber(msg.getString());
			this.avatarUrl = msg.getString();
		}
	}
	public set rankNum(value: number) {
		this._rankNum = Math.max(value, 0);
	}

	public get rankNum(): number {
		return this._rankNum;
	}
}