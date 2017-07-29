class RedPoint extends egret.HashObject {
	public type: number;
	public func;
	public param: any[];
	public x: number = 0;
	public y: number = 0;
	public point: eui.Image;
	public target;
    /** 
     * 红点信息构造方法
     * systemID  绑定的红点系统ID
     * type    触发类型
     * id      系统ID
     * ...param     参数
    */
	public constructor() {
		super();
	}
	public register(addPointTg, pos: egret.Point, target, func: string = null, ...param) {
		if (addPointTg) {
			this.addRedPointImg(addPointTg, pos);
		}
		if (target) {
			this.addTriggerFuc(target, func, ...param);
		}
	}

	public addTriggerFuc(target, fuc: string, ...param) {
		this.target = target;
		this.func = fuc;
		this.param = param;
	}
	public addRedPointImg(target, pos: egret.Point) {
		if (!target.getChildByName("redPoint")) {
			this.point = new eui.Image();
			this.point.x = pos.x;
			this.point.y = pos.y;
			this.point.source = "public_redPoint_png";
			this.point.name = "redPoint";
			this.point.touchEnabled = false;
			this.point.visible = false;
			target.addChild(this.point);
		} else {
			if (this.point != target.getChildByName("redPoint")) {
				this.point = target.getChildByName("redPoint");
			}
			this.point.x = pos.x;
			this.point.y = pos.y;
			this.point.visible = false;
		}
	}
    /**红点触发函数
     * @param dynamic   是否动态传参
     * @param   param   参数
     * **/
	public checkPoint(dynamic: boolean = false, ...param) {
		if (!this.target) return false;
		var bl: boolean = false;
		if (dynamic) {
			if (this.target[this.func]) {
				bl = this.target[this.func](...param);
			}
		} else {
			if (this.target[this.func]) {
				bl = this.target[this.func](...this.param);
			}
		}
		if (this.point) {
			this.point.visible = bl;
		}
	}
	public delRedPoint() {
		if (this.point.parent) {
			this.point.parent.removeChild(this.point);
			this.point = null;
		}
	}
}