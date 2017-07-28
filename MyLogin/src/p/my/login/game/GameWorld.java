package p.my.login.game;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;

import p.my.common.db.DBMapper;
import p.my.common.db.JedisManager;
import p.my.common.db.MyBatisFactory;
import p.my.login.bean.Channel;
import p.my.login.bean.Server;
import p.my.login.bean.User;
import p.my.login.constant.LoginConfig;
import p.my.login.constant.LoginConstant;
import p.my.login.constant.RedisKey;
import p.my.login.dao.UserDao;
import p.my.login.mapper.ChannelMapper;
import p.my.rpc.service.ServiceResult;
import p.my.rpc.service.ServiceResultKey;

public class GameWorld {
	
	private static final Logger logger = Logger.getLogger(GameWorld.class);
	
	private static final GameWorld _instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return _instance;
	}
	
	//当前最大的用户ID
	private AtomicInteger maxId = new AtomicInteger(LoginConstant.USER_ID_INITVALUE);
	
	//服务器列表
	private Map<Integer, Server> servers = new HashMap<>();
	
	//当前选择的服务器ID
	private volatile int currSid = 0;
	
	//渠道列表
	private Map<Integer, Channel> channels = new HashMap<>();
	
	//用户列表
	private Map<String, User> users = null;
	
	public void init() {
		//渠道列表
		DBMapper<ChannelMapper> mapper = MyBatisFactory.getMapper(ChannelMapper.class);
		List<Channel> list = mapper.mapper.getAllChannel();
		mapper.close();
		for (Channel ch : list) {
			logger.info("渠道id:"+ch.getId()+"->"+ch.getName());
			channels.put(ch.getId(), ch);
			UserDao dao = new UserDao(MyBatisFactory.getFactory());
			dao.createTable(ch.getId(), ch.getIdx());
			int count = dao.getUserCount(ch.getId(), ch.getIdx());
			ch.setUserCount(ch.getIdx()*LoginConstant.MAX_ROW+count);
			for (int i = ch.getIdx(); i >= 0; i--) {
				int max = dao.getUserMax(ch.getId(), i);
				if (max > maxId.get())
					maxId.set(max);
			}
		}
		//用户容器
		int capacity = (int) (LoginConfig.CACHE_UER_NUM / 0.75f);
		users = new ConcurrentHashMap<>(capacity);
	}
	
	/**
	 * 获取User数据，如果不存在创建
	 * @param puser
	 * @return
	 */
	public User getAndCreateUser(User puser) {
		User ruser = getUser(puser.getKey());
		if (ruser != null)
			return ruser;
		ruser = getUserDB(puser);
		if (ruser != null) {
			users.put(ruser.getKey(), ruser);
			return ruser;
		}
		ruser = createUser(puser);
		users.put(ruser.getKey(), ruser);
		return ruser;
	}
	
	/**
	 * 从DB中获取User数据
	 * @param puser
	 * @return
	 */
	public User getUserDB(User puser) {
		Channel channel = channels.get(puser.getChannel());
		if (channel == null) {
			channel = channels.get(LoginConstant.CHANNEL_OTHER);
			puser.setChannel(LoginConstant.CHANNEL_OTHER);
		}
		int idx = channel.getIdx();
		do {
			UserDao dao = new UserDao(MyBatisFactory.getFactory());
			puser.setIdx(idx);
			User user = dao.getUser(puser);
			if (user != null) {				
				return user;
			}
			idx--;
		} while (idx >= 0);
		return null;
	}
	
	/**
	 * 创建User数据
	 * @param puser
	 * @return
	 */
	public User createUser(User puser) {
		Channel channel = channels.get(puser.getChannel());
		if (channel == null) {
			channel = channels.get(LoginConstant.CHANNEL_OTHER);
			puser.setChannel(LoginConstant.CHANNEL_OTHER);
		}
		//建新表
		if (channel.isNewTable()) {
			//加锁、再次获取
			synchronized (channel) {
				if (channel.isNewTable()) {
					channel.addIdx();
					UserDao dao = new UserDao(MyBatisFactory.getFactory());
					dao.createTable(channel.getId(), channel.getIdx());
					DBMapper<ChannelMapper> mapper = MyBatisFactory.getMapper(ChannelMapper.class);
					mapper.mapper.updateChannel(channel);
					mapper.close();
				}
			}
		}
		//新建用户
		UserDao dao = new UserDao(MyBatisFactory.getFactory());
		channel.addUserCount();
		//赋值
		createUserValue(puser, channel);
		//插入数据库
		dao.createUser(puser);
		return puser;
	}
	
	private void createUserValue(User puser, Channel channel) {
		int uid = maxId.incrementAndGet();
		puser.setId(uid);
		puser.setSub_channel(LoginConstant.SUB_CHANNEL);
		puser.setIdx(channel.getIdx());
		puser.setState(LoginConstant.TRUE);
		Date curr = Calendar.getInstance().getTime();
		puser.setCreate_time(curr);
		puser.setLogin_time(curr);
	}
	
	/**
	 * 获取玩家当前所在的服务器ID
	 * @param uid
	 * @return
	 */
	public int getOnlineServerId(int uid) {
		String id = JedisManager.gi().hget(RedisKey.KEY_ONLINE_ROLE, String.valueOf(uid));
		if (id == null)
			return -1;
		return Integer.valueOf(id);
	}
	
	/**
	 * 给玩家分配服务器
	 * @param selectId
	 * @param onlineId
	 * @return
	 */
	public Server getTargetServer(int selectId, int onlineId) {
		//指定的服务器
		if (selectId > 0) {
			return servers.get(selectId);
		}
		Server server = null;
		//上次在线的服务器
		if (onlineId != -1) {
			server = servers.get(onlineId);
		}
		//分配的服务器
		if (server == null || server.state != LoginConstant.SERVER_STATE_NORMAL) {
			server = servers.get(this.currSid);
		}
		return server;
	}
	
	public void addOnlineUser(User user, int serverId) {
		users.put(user.getKey(), user);
		JedisManager.gi().hset(RedisKey.KEY_ONLINE_ROLE, user.getId()+"", String.valueOf(serverId));
		JedisManager.gi().publish(RedisKey.PUB_LOGIN, user.getId()+RedisKey.COLON+serverId);
	}
	
	public void onUpdate() {
		long curr = System.currentTimeMillis();
		//清理登陆时间超时的用户
		if (users.size() > LoginConfig.CACHE_UER_NUM) {
			for (Entry<String, User> entry : users.entrySet()) {
				if (curr - entry.getValue().getLogin_time().getTime() < LoginConfig.SESSION_TIMEOUT)
					continue;
				//清理
				users.remove(entry.getKey());
			}
		}
	}
	
	/**
	 * 更新服务器状态
	 */
	public void updateServerState() {
		try {
			long curr = System.currentTimeMillis();
			//服务器列表
			List<String> result = ServiceResult.getAll(ServiceResultKey.SERVER_STATE);
			if (result != null) {
				for (String value : result) {
					String[] vs = value.split(ServiceResult.COMMA);
					if (vs.length < 5)
						continue;
					int id = Integer.valueOf(vs[0]);
					if (servers.containsKey(id)) {
						Server server = servers.get(id);
						server.online = Integer.valueOf(vs[4]);
						server.lastTime = curr;
					}
					else {
						Server server = new Server();
						server.id = id;
						server.name = vs[1];
						server.host = vs[2];
						server.port = Integer.valueOf(vs[3]);
						server.online = Integer.valueOf(vs[4]);
						server.state = LoginConstant.SERVER_STATE_NORMAL;
						server.lastTime = curr;
						servers.put(id, server);
					}
				}
			}
			int sid = 0, min = Integer.MAX_VALUE;
			//超时判断
			for (Server server : this.servers.values()) {
				if (curr - server.lastTime > LoginConstant.SERVER_LIMIT_TIME) {
					server.state = LoginConstant.SERVER_STATE_MAINTAIN;
					continue;
				}
				if (server.online < min) {
					sid = server.id;
					min = server.online;
				}
			}
			if (sid > 0 && sid != currSid) {
				currSid = sid;
				logger.info("切换服务器。id = "+sid+", onlineNum = "+this.servers.get(sid).online);
			}
		} catch (Exception e) {
			logger.error("更新服务器状态发生异常", e);
		}
	}
	
	public Channel getChannel(int id) {
		return channels.get(id);
	}
	
	public Map<Integer, Server> getServers() {
		return servers;
	}
	
	public User getUser(String userKey) {
		return users.get(userKey);
	}

}
