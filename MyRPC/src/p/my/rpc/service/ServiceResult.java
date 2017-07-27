package p.my.rpc.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.log4j.Logger;

/**
 * 存放RPC服务收到的结果
 *
 * @author U-Demon Created on 2017年7月27日
 * @version 1.0.0
 */
public class ServiceResult {
	
	private static final Logger logger = Logger.getLogger(ServiceResult.class);
	
	private static Map<ServiceResultKey, LinkedBlockingQueue<String>> result = new HashMap<>();
	
	public static void offer(ServiceResultKey key, String value) {
		if (!result.containsKey(key))
			result.put(key, new LinkedBlockingQueue<>(key.getCapacity()));
		Queue<String> queue = result.get(key);
		queue.offer(value);
	}
	
	public static String take(ServiceResultKey key) {
		if (!result.containsKey(key))
			return null;
		LinkedBlockingQueue<String> queue = result.get(key);
		try {
			return queue.take();
		} catch (InterruptedException e) {
			logger.error("InterruptedException：", e);
		}
		return null;
	}

}
