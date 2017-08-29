//玩家基础数据
class SimplePlayerVo implements IPlayer {

    protected _id: number = 0;//玩家唯一标识
	protected _name: string = "Me";
	protected _head: number = 1;//我的头像
	protected _rank: number = 0;
	protected _loginTime: number = 0;

	public constructor() {
	}

    public onParseMsg(msg: Message): void {
		this._id = msg.getInt();
		this._name = msg.getString();
        this._head = msg.getByte();
		this._rank = msg.getInt();
		this._loginTime = msg.getInt();
	}

    public get id(): number {
		return this._id;
	}
	public get name(): string {
		return this._name;
	}
	public get loginTime(): number {
		return this._loginTime;
	}
	public get rank(): number {
		return this._rank;
	}
	public set rank(value: number) {
		this._rank = value;
	}
	public set name(value: string) {
		this._name = value;
	}
	public set loginTime(value: number) {
		this._loginTime = value;
	}

}