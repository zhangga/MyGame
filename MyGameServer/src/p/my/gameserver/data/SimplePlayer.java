package p.my.gameserver.data;

import p.my.common.message.Message;

public class SimplePlayer {
	
	//玩家ID
	protected int id;
	
	//渠道
	protected int channel;
	
	//平台
	protected byte platform;
	
	//账号
	protected String account;
	
	//名字
	protected String name = "";
	
	//玩家头像
	protected String head = "";
	
	/**
     * 玩家基本信息
     * @param msg
     */
    public void getSimpleMsg(Message msg) {
    	msg.setInt(id);
    	msg.setString(name);
    	msg.setString(head);
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getChannel() {
		return channel;
	}

	public void setChannel(int channel) {
		this.channel = channel;
	}

	public byte getPlatform() {
		return platform;
	}

	public void setPlatform(byte platform) {
		this.platform = platform;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

}
