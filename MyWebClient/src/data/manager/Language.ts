class Language {
	private static language: Language;
	//当前选择的语言版本
	private _type: number;
	private json;
	public constructor() {
	}
	public static get instance(): Language {
		if (!this.language) {
			this.language = new Language();
		}
		return this.language;
	}
	//切换语言版本
	public set type(param) {
		this._type = param;
		//TODO 
	}
	public getDescByKey(key: string, ...args) {
		var model: ModelText = ModelManager.instance.modelText[key];
		if (model) {
			return this.onParseString(model.local, ...args);
		} else {
			return this.onParseString(key, ...args);
		}
	}
	private onParseString(str: string, ...args): string {
		if (args.length > 0) {
			var reg: RegExp = new RegExp(/\{[0-9]{1,2}\}/g);
			var arr = str.match(reg);
			if (arr) {
				for (var i: number = 0; i < arr.length; i++) {
					str = str.replace(arr[i], args[i]);
				}
			}
		}
		return str;
	}
	/**当前语言版本 */
	public get type(): number {
		return this._type;
	}
}
enum LANGUAGE_TYPE {
	CN = 0,
	EN = 1
}