class EnjoyFish extends FishBase {
	private output: Bubble;
	private isEvolution: boolean = false;
	public constructor(id: number) {
		super(id);
	}
	protected onInit() {
		super.onInit();
		this.output = new Bubble();
		this.addChild(this.output);
		this.output.visible = false;
		this.direction = this.anim.scaleX;
		this.chageState();
	}
	public chageState(): void {
		this.onReSetRes();
	}
	private onReSetRes(): void {

	}
}