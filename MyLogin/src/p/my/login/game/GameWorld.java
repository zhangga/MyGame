package p.my.login.game;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import p.my.common.db.MyBatisFactory;
import p.my.login.bean.Channel;
import p.my.login.mapper.ChannelMapper;

public class GameWorld {
	
	private static final Logger logger = Logger.getLogger(GameWorld.class);
	
	private static final GameWorld _instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return _instance;
	}
	
	//渠道列表
	private Map<Integer, Channel> channels = new HashMap<>();
	
	public void init() {
		ChannelMapper mapper = MyBatisFactory.getMapper(ChannelMapper.class);
		List<Channel> list = mapper.getAllChannel();
		for (Channel ch : list) {
			logger.info("渠道id:"+ch.getId()+"->"+ch.getName());
			channels.put(ch.getId(), ch);
		}
	}
	
	public Channel getChannel(int id) {
		return channels.get(id);
	}

}
