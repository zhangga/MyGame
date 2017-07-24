package p.my.login.game;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;

import p.my.common.db.DBMapper;
import p.my.common.db.MyBatisFactory;
import p.my.login.bean.Channel;
import p.my.login.bean.User;
import p.my.login.constant.LoginConfig;
import p.my.login.constant.LoginConstant;
import p.my.login.dao.UserDao;
import p.my.login.mapper.ChannelMapper;

public class GameWorld {
	
	private static final Logger logger = Logger.getLogger(GameWorld.class);
	
	private static final GameWorld _instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return _instance;
	}
	
	//当前最大的用户ID
	private AtomicInteger maxId = new AtomicInteger(LoginConstant.USER_ID_INITVALUE);
	
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
		Date curr = new Date();
		puser.setCreate_time(curr);
		puser.setLogin_time(curr);
	}
	
	public User getUser(String userKey) {
		return users.get(userKey);
	}
	
	public void addUser(User user) {
		users.put(user.getKey(), user);
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
	
	public Channel getChannel(int id) {
		return channels.get(id);
	}

}
