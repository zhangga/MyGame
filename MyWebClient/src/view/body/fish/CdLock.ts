class CdLock {
	public id: number;
	public cd: number;
	public isCanDo: boolean = true;
	public back: Function;
	public constructor(id: number, cd: number) {
		this.reset(id, cd);
	}
	public reset(id: number, cd: number): void {
		this.id = id;
		this.cd = cd;
		this.getCanDo();
	}
	public setCanDo(bl: boolean): void {
		this.isCanDo = bl;
	}
	protected onRun(param): void {
		this.isCanDo = true;
		if (this.back) {
		}
	}
	public getCanDo(param = null): boolean {
		var ret: boolean = this.isCanDo;
		if (this.isCanDo) {
			this.isCanDo = false;
			setTimeout(this.onRun.bind(this), this.cd, param);
		}
		return ret;
	}
	public initGame(cb: Function, thisObj: any) {
		cb.bind(thisObj)();
	}
}