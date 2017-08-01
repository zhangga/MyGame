package p.my.common.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;

public class MonitorUtil {
	
	private static final Logger logger = Logger.getLogger(MonitorUtil.class);
	
	private static Map<Integer, Long> monitors = new ConcurrentHashMap<>();
	
	public static void tick(int key) {
		long curr = System.currentTimeMillis();
		if (!monitors.containsKey(key)) {
			monitors.put(key, curr);
			logger.info("MonitorUtil------>tick first time: "+curr);
			return;
		}
		long last = monitors.get(key);
		monitors.put(key, curr);
		logger.info("MonitorUtil------>tick passed time: "+(curr-last));
	}
	
	public static void tick() {
		tick(0);
	}
	
	public static void clearAll() {
		monitors.clear();
	}
	
	public static void clear() {
		monitors.remove(0);
	}
	
	public static void clear(int key) {
		monitors.remove(key);
	}

}
