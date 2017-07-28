package p.my.rpc.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;

import org.apache.log4j.Logger;

/**
 * 存放RPC服务收到的结果
 *
 * @author U-Demon Created on 2017年7月27日
 * @version 1.0.0
 */
public class ServiceResult {
	
	private static final Logger logger = Logger.getLogger(ServiceResult.class);
	
	public static final String COMMA = ",";
	
	/**
	 * 根据key存放rpc收到的结果
	 */
	private static Map<ServiceResultKey, ArrayBlockingQueue<String>> result = new HashMap<>();
	
	/**
	 * 非阻塞的方法，超过容量直接丢弃
	 * @param key
	 * @param value
	 */
	public static void offer(ServiceResultKey key, String value) {
		if (!result.containsKey(key))
			result.put(key, new ArrayBlockingQueue<>(key.getCapacity()));
		Queue<String> queue = result.get(key);
		//非阻塞的
		queue.offer(value);
	}
	
	/**
	 * 阻塞的方法，直到有空间可以插入
	 * @param key
	 * @param value
	 */
	public static void put(ServiceResultKey key, String value) {
		if (!result.containsKey(key))
			result.put(key, new ArrayBlockingQueue<>(key.getCapacity()));
		ArrayBlockingQueue<String> queue = result.get(key);
		//阻塞的
		try {
			queue.put(value);
		} catch (InterruptedException e) {
			logger.error("InterruptedException：", e);
		}
	}
	
	public static String take(ServiceResultKey key) {
		if (!result.containsKey(key))
			return null;
		ArrayBlockingQueue<String> queue = result.get(key);
		try {
			return queue.take();
		} catch (InterruptedException e) {
			logger.error("InterruptedException：", e);
		}
		return null;
	}
	
	public static List<String> getAll(ServiceResultKey key) {
		if (!result.containsKey(key))
			return null;
		List<String> list = new ArrayList<>();
		ArrayBlockingQueue<String> queue = result.get(key);
		while (true) {
			String value = queue.poll();
			if (value == null)
				break;
			list.add(value);
		}
		return list;
	}

}
