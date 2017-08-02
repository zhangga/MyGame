package p.my.gameserver.data;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;

import p.my.common.db.JedisManager;
import p.my.common.message.Message;
import p.my.common.message.MessageArray;
import p.my.common.util.MonitorUtil;
import p.my.common.util.StringUtil;
import p.my.gameserver.game.GameWorld;
import p.my.gameserver.manager.FunctionManager;
import p.my.gameserver.manager.MsgManager;

/**
 * 玩家数据
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public class GameRole {
	
	private static final Logger logger = Logger.getLogger(GameRole.class);
	
	//角色数据
	private Player player;
	
	//令牌,在线玩家数据
	private AtomicInteger token = new AtomicInteger(0);
	
	//登陆时携带的UID
	private int loginId;
	
	//-=-=-=-=-=-=-=-=-=Manager-=-=-=-=-=-=-=-=-=//
	private MsgManager msgMgr;
	
	private FunctionManager funcMgr;
	
	
	
	public GameRole(Player player) {
		this.player = player;
	}
	
	public void init() {
		msgMgr = new MsgManager(this);
		funcMgr = new FunctionManager(this);
	}

	/**
	 * 进入游戏
	 */
	public void enterGame(Message msg) {
		//token加1
		token.incrementAndGet();
		//登录时间
		long curr = System.currentTimeMillis();
		player.setLoginTime(curr);
		
		//成功登录
		GameWorld.gi().addOnlineRole(this);
		//保存数据
		save();
		//消息
		MessageArray msgs = funcMgr.getLoginMsgs(msg.getCtx());
		GameWorld.gi().sendMsg(msgs);
	}
	
	/**
	 * 保存数据
	 */
	public boolean save() {
		MonitorUtil.tick();
		try {
			String json = StringUtil.obj2Json(player);
			JedisManager.gi().setKey(String.valueOf(player.getId()), json);			
		} catch (Exception e) {
			logger.error("保存玩家数据时发生异常，playerId: "+player.getId(), e);
			return false;
		}
		MonitorUtil.tick();
		return true;
	}
	
	
	
	
	
	//-=-=-=-=-=-=-=-=-=get/set-=-=-=-=-=-=-=-=-=//
	public int getId() {
		return player.getId();
	}
	
	public int getToken() {
		return token.get();
	}

	public Player getPlayer() {
		return player;
	}

	public MsgManager getMsgMgr() {
		return msgMgr;
	}

	public int getLoginId() {
		return loginId;
	}

	public void setLoginId(int loginId) {
		this.loginId = loginId;
	}

}
