package p.my.common.db;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.apache.log4j.Logger;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPubSub;
import redis.clients.jedis.Tuple;

/**
 * Jedis管理器
 *
 * @author U-Demon Created on 2017年6月20日 下午3:34:02
 * @version 1.0.0
 */
public class JedisManager {
	
	private static final Logger logger = Logger.getLogger(JedisManager.class);
	
	private static JedisManager mgr = new JedisManager();
	
	public static JedisManager gi() {
		return mgr;
	}
	
	private JedisCluster jc = null;
	
	private JedisManager() {
	}

	public void init(){
		RedisConfig.loadData();
		logger.info("Redis配置文件读取完毕: "+RedisConfig.CONFIG_NAME);
		Set<HostAndPort> nodes = new HashSet<>();
		for (int i = 0; i < RedisConfig.hosts.size(); i++) {
			HostAndPort node = new HostAndPort(RedisConfig.hosts.get(i), RedisConfig.ports.get(i));
			nodes.add(node);
		}
		//JedisCluster
		if (RedisConfig.auth == null) {
			jc = new JedisCluster(nodes, RedisConfig.conn_timeout, RedisConfig.so_timeout,
					RedisConfig.max_attempts, new GenericObjectPoolConfig());
		}
		else {
			jc = new JedisCluster(nodes, RedisConfig.conn_timeout, RedisConfig.so_timeout,
					RedisConfig.max_attempts, RedisConfig.auth, new GenericObjectPoolConfig());
		}
	}
	
	/**
	 * String存储
	 * @param key
	 * @param value
	 * @return
	 */
	public String setKey(String key, String value) {
		return jc.set(key, value);
	}
	
	/**
	 * String读取
	 * @param key
	 * @return
	 */
	public String getKey(String key) {
		return jc.get(key);
	}
	
	/**
	 * 批量获取key  不支持通配符
	 * @param keys
	 * @return
	 */
	public List<String> mgetKeys(String... keys) {
		return jc.mget(keys);
	}
	
	public String hget(String key, String field) {
		return jc.hget(key, field);
	}
	
	public long hset(String key, String field, String value) {
		return jc.hset(key, field, value);
	}
	
	public long hdel(String key, String... field) {
		return jc.hdel(key, field);
	}
	
	public long hincrBy(String key, String field, long value) {
		return jc.hincrBy(key, field, value);
	}

	public long push(String key, String field) {
		return jc.lpush(key, field);
	}

	public String pop(String key) {
		return jc.rpop(key);
	}

	public long incr(String key) {
		return jc.incr(key);
	}

	public String setEx(String key, String value, int expire) {
		return jc.setex(key, expire, value);
	}
	
	public void setEx(String key, int seconds) {
		jc.expire(key, seconds);
	}

	public Long del(String key) {
		return jc.del(key);
	}

	public Map<String, String> hgetAll(String key) {
		return jc.hgetAll(key);
	}
	
	public long zadd(String key, double score, String member) {
		return jc.zadd(key, score, member);
	}
	
	public long zadd(String key, Map<String, Double> scoreMembers) {
		return jc.zadd(key, scoreMembers);
	}
	
	public Long sadd(String key, String... member) {
		return jc.sadd(key, member);
	}
	
	public Set<String> smembers(String key) {
		return jc.smembers(key);
	}
	
	public Long srem(String key,String member){
		return jc.srem(key, member);
	}
	
	/**
	 * 返回有序集 key 中，指定区间内的成员。按score从小到大
	 * @param key
	 * @param start
	 * @param end
	 * @return
	 */
	public Set<String> zrange(String key, long start, long end) {
		return jc.zrange(key, start, end);
	}
	//按score从大到小
	public Set<String> zrevrange(String key, long start, long end) {
		return jc.zrevrange(key, start, end);
	}
	public Set<Tuple> zrangeWithScores(String key, long start, long end) {
		return jc.zrangeWithScores(key, start, end);
	}
	public Set<Tuple> zrevrangeWithScores(String key, long start, long end) {
		return jc.zrevrangeWithScores(key, start, end);
	}
	
	/**
	 * 判断key是否存在
	 * @param key
	 * @return
	 */
	public boolean inRedis(String key) {
		return jc.exists(key);
	}
	
	/**
	 * 发布
	 * @param channel
	 * @param message
	 */
	public void publish(String channel, String message) {
		jc.publish(channel, message);
	}
	
	/**
	 * 订阅
	 * @param channel
	 */
	public void subscribe(String channel, JedisPubSub sub) {
//		jc.psubscribe(sub, channel);//带通配符
		jc.subscribe(sub, channel);
	}
	
	/**
	 * 获取所有的键
	 * @return
	 */
	public Set<String> getAllKeys() {
		Set<String> endSet = new HashSet<>();
		Map<String, JedisPool> map = jc.getClusterNodes();
		
		//循环所有的集群节点，获取所有的key
		for(Entry<String, JedisPool> p : map.entrySet())
		{
			Jedis j = p.getValue().getResource();
			Set<String> keys = j.keys("*");
			endSet.addAll(keys);			
		}
		return endSet;
	}

}
