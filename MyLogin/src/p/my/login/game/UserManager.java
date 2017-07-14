package p.my.login.game;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import p.my.common.db.JedisManager;

public class UserManager {
	
	public static final String ONLINE_ROLE = "online_role";
	
	private static final UserManager _instance = new UserManager();
	private UserManager() {}
	public static UserManager gi() {
		return _instance;
	}
	
	private Map<Integer, Integer> onlines = new HashMap<>();
	
	/**
	 * 添加在线玩家
	 * @param key
	 */
	public void addOnline(int userId, int serverId) {
		//设置超时时间
//		jc.expireAt(key, System.currentTimeMillis()+EXPIRED_TIME);
		JedisManager.gi().hset(ONLINE_ROLE, String.valueOf(userId), String.valueOf(serverId));
	}
	
	public void remOnline(String... userIds) {
		JedisManager.gi().hdel(ONLINE_ROLE, userIds);
	}
	
	
	
	
	
	
	/**
	 * 判断玩家是否在线
	 * @param userId
	 * @return
	 */
	public boolean isOnline(int userId) {
//		return jc.hexists(RedisKey.ONLINE_ROLE, String.valueOf(userId));
		return true;
	}
	
	/**
	 * 获取玩家在线的服务器ID
	 * @param userId
	 * @return
	 */
	public short getOnlineServerId(int userId) {
//		String id = jc.hget(RedisKey.ONLINE_ROLE, String.valueOf(userId));
//		if (id == null)
//			return -1;
//		return Short.valueOf(id);
		return 1;
	}
	
	/**
	 * 获取所有在线的玩家编号
	 * @return
	 */
	public Set<String> getOnline() {
//		return jc.hkeys(RedisKey.ONLINE_ROLE);
		return null;
	}

}
