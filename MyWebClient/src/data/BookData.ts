class BookData {
	public id: number;
	public level: number = 0;
	public book;
	public constructor(id?: number) {
		this.id = id;
	}
	public onParseMessage(msg: Message): void {
		this.id = msg.getByte();
		this.level = msg.getByte();
	}
	public get key(): string {
		return `${this.id}_${this.level}`
	}
	public get nextKey(): string {
		return `${this.id}_${this.level + 1}`
	}
	public get model(): ModelFieldGuide {
		return ModelManager.instance.modelFieldGuide[this.key];
	}
	public get nextModel(): ModelFieldGuide {
		return ModelManager.instance.modelFieldGuide[this.nextKey];
	}
}