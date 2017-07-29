class PlayerHeadBar extends eui.Component {
	private head_icon_img: eui.Image;

	public constructor() {
		super();
	}
	public set headIcon(param: PlayerHeadParam) {
		if (this.head_icon_img) {
			param.registCallBack(this.onLoadComplete, this);
			LoadManager.getInstance().onAddHeadUrl(param);
		}
	}
	private onLoadComplete(data): void {
		if (data) {
			this.head_icon_img.source = data;
		} else {
			this.head_icon_img.source = "invite_vacancy_icon_png";
		}
	}
	//The end
}
class PlayerHeadParam {
	public userId: number;
	public headUrl: string;
	private callbackFunc;
	private thisObject;
	public constructor(userId, headUrl: string) {
		this.headUrl = headUrl;
		this.userId = userId;
	}
	public registCallBack(callbackFunc = null, thisObject = null): void {
		this.callbackFunc = callbackFunc;
		this.thisObject = thisObject;
	}
	public callback(param) {
		Tool.callback(this.callbackFunc, this.thisObject, param);
	}
}