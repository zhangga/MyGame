package p.my.gameserver.data;

import p.my.gameserver.manager.MsgManager;

/**
 * 玩家数据
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public class GameRole {
	
	//角色数据
	private Player player;
	
	private int token;
	
	//-=-=-=-=-=-=-=-=-=Manager-=-=-=-=-=-=-=-=-=//
	private MsgManager msgMgr;
	
	
	
	public GameRole(Player player) {
		this.player = player;
	}
	
	public void init() {
		msgMgr = new MsgManager(this);
	}

	
	
	
	
	
	//-=-=-=-=-=-=-=-=-=get/set-=-=-=-=-=-=-=-=-=//
	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public Player getPlayer() {
		return player;
	}

	public MsgManager getMsgMgr() {
		return msgMgr;
	}

}
