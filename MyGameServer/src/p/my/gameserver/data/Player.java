package p.my.gameserver.data;

import p.my.gameserver.constant.GameConstant;

/**
 * 玩家存储数据
 *
 * @author U-Demon Created on 2017年8月2日
 * @version 1.0.0
 */
public class Player extends SimplePlayer {
	
	//邀请人
	private int inviter;
	
	//上次登录时间
	private long loginTime;
	
	//上次登出时间
	private long logoutTime;
	
	//角色状态
	private byte state = GameConstant.PLAYER_STATE_NORMAL;

	
	
	
	//-=-=-=-=-=-=-=-=-=get/set-=-=-=-=-=-=-=-=-=//
	public byte getState() {
		return state;
	}

	public void setState(byte state) {
		this.state = state;
	}

	public int getInviter() {
		return inviter;
	}

	public void setInviter(int inviter) {
		this.inviter = inviter;
	}

	public long getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(long loginTime) {
		this.loginTime = loginTime;
	}

	public long getLogoutTime() {
		return logoutTime;
	}

	public void setLogoutTime(long logoutTime) {
		this.logoutTime = logoutTime;
	}

}
