class SDKShareContainer implements ISDKShareContainer{

	public constructor() {
	}

	/**
     * 分享信息提示
     */ 
	public showShareInfo(info:ISDKShareInfo):void{

	}

    /**
     * 分享信息更新
     */ 
	public updateShareInfo(info:ISDKShareInfo):void{

	};

    /**
     * 分享完成
     */ 
    public shareComplete():void{
		var msg: Message = new Message(MESSAGE_ID.SHARE_REWARD_MESSAGE);
		_GF.instance.net.onAddMessage(msg);
	}
}