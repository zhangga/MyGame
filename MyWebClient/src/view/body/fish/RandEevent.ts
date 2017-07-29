class RandEevent {
	public startTime: number;
	public remainTime: number;
	public needCheck: boolean = false;
	public isTrigger: boolean = false;
	public constructor() {
	}
	public reset(remainTime: number): void {
		this.startTime = egret.getTimer();
		this.remainTime = remainTime;
		this.needCheck = this.remainTime != -1;
		this.isTrigger = false;
	}
	public check(): boolean {
		if (this.needCheck) {
			var pass: number = Math.max(Math.floor((egret.getTimer() - this.startTime) / 1000), 1);
			if (pass >= this.remainTime) {
				this.isTrigger = true;
			}
			return this.isTrigger;
		} else {
			return this.needCheck;
		}


	}

}