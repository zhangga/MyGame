/**
 * 
 * @author	lzn	
 * 正弦曲线
 * 
 */
class SineBase {
	private kfire: number = 0;//y轴偏移量
    private yfire: number;
    private Afire: number = 15;//峰值
    private wfire: number = 1;
    private time: number = 100;
    private n: number = 0;
    private speed: number = 0;
    private xfire: number = 0;
    private nfire: number = 0;//x轴偏移量
	public constructor(cycleCall: number = 100, crest: number = 15, xoff: number = 0, yoff: number = 0) {
		this.onInitParam(cycleCall, crest, xoff, yoff);
	}
	/**
	 * 
	 * @author	lzn	
	 * 正弦曲线初始化参数函数
	 * 
	 */
	public onInitParam(cycleCall: number = 100, crest: number = 15, xoff: number = 0, yoff: number = 0) {
		this.nfire = xoff;
		this.kfire = yoff;
		this.Afire = crest;
		this.time = cycleCall;
		this.speed = Math.PI * 2 / this.time;
	}
	public flotage(): number {
		this.yfire = this.Afire * Math.sin(this.wfire * this.xfire + this.nfire) + this.kfire;
        this.xfire += this.speed;
        this.n += 1;
        if (this.n >= this.time) {
            this.n = 0;
            this.xfire = 0;
        }
		return this.yfire;
    }
}