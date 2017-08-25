class GameMessageEvent extends egret.Event {

	public msg: any;

	public constructor(type: string, response: any) {
		super(type, false, false);
		this.msg = response;
	}
    
}