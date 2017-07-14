package p.my.login.bean;

import java.util.Date;

/**
 * 用户信息
 *
 * @author U-Demon Created on 2017年7月14日
 * @version 1.0.0
 */
public class User {
	
	private int id;
	
	private int channel;
	
	private byte sub_channel;
	
	private byte platform;
	
	private String account;
	
	private int idx;
	
	private byte state;
	
	private Date create_time;
	
	private Date login_time;

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

	public byte getSub_channel() {
		return sub_channel;
	}

	public void setSub_channel(byte sub_channel) {
		this.sub_channel = sub_channel;
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

	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public byte getState() {
		return state;
	}

	public void setState(byte state) {
		this.state = state;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getLogin_time() {
		return login_time;
	}

	public void setLogin_time(Date login_time) {
		this.login_time = login_time;
	}

}
