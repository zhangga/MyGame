package p.my.gameserver.game;

import java.util.HashMap;
import java.util.Map;

import com.google.common.base.Preconditions;

import p.my.common.db.JedisManager;
import p.my.common.message.Message;
import p.my.common.message.MessageArray;
import p.my.common.util.HttpUtil;
import p.my.common.util.StringUtil;
import p.my.gameserver.data.GameRole;
import p.my.gameserver.data.Player;

public class GameWorld {
	
	private static final GameWorld instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return instance;
	}
	
	//在线玩家列表
	private Map<Integer, GameRole> onlines = new HashMap<>();
	
	public void init() {
		
	}
	
	/**
	 * 获取用户数据。只能自己持有该引用
	 * @param id
	 * @return
	 */
	public GameRole getGameRole(int id) {
		//从缓存中获取
		GameRole role = onlines.get(id);
		if (role != null)
			return role;
		//从reids中获取
		String value = JedisManager.gi().getKey(String.valueOf(id));
		if (value == null)
			return null;
		Player player = StringUtil.json2Obj(value, Player.class);
		Preconditions.checkNotNull(player, "获取玩家数据出错");
		role = new GameRole(player);
		role.init();
		return role;
	}
	
	public void addOnlineRole(GameRole role) {
		this.onlines.put(role.getId(), role);
	}
	
	/**
	 * 在线玩家数量
	 * @return
	 */
	public int getOnlineNum() {
		return this.onlines.size();
	}
	
	/**
	 * 发送消息
	 * @param msg
	 */
	public void sendMsg(Message resp) {
		MessageArray msgs = new MessageArray(resp);
		sendMsg(msgs);
	}
	
	public void sendMsg(MessageArray msgs) {
		msgs.pack();
		HttpUtil.sendResponse(msgs.getCtx(), msgs.getBuf());
	}

}
