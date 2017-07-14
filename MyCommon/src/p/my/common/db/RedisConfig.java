package p.my.common.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

public class RedisConfig {
	
	private static final Logger logger = Logger.getLogger(RedisConfig.class);
	
	public static final String COLON = ":";
	
	public static final String CONFIG_NAME = "./resource/config/redis.properties";
	
	public static List<String> hosts = new ArrayList<>();
	
	public static List<Integer> ports = new ArrayList<>();
	
	public static String auth;
	
	public static int conn_timeout;
	
	public static int so_timeout;
	
	public static int max_attempts;
	
	public static void loadData() {
		Properties prop = new Properties();
		final File file = new File(CONFIG_NAME);
		InputStream is = null;
		try {
			is = new FileInputStream(file);
			prop.load(is);
			//端口
			String port = prop.getProperty("port");
			for (String p : port.split(",")) {
				ports.add(Integer.valueOf(p));
			}
			//IP
			String[] hostArr = prop.getProperty("host").split(",");
			if (hostArr.length == 1) {
				for (int i = 0; i < ports.size(); i++) {
					hosts.add(hostArr[0]);
				}
			}
			else if (hostArr.length == ports.size()) {
				for (String h : hostArr) {
					hosts.add(h);
				}
			}
			else {
				throw new IllegalArgumentException(CONFIG_NAME+"中配置的端口和IP不匹配");
			}
			auth = prop.getProperty("auth");
			conn_timeout = Integer.valueOf(prop.getProperty("conn_timeout"));
			so_timeout = Integer.valueOf(prop.getProperty("so_timeout"));
			max_attempts = Integer.valueOf(prop.getProperty("max_attempts"));
			is.close();
		} catch (FileNotFoundException e) {
			logger.error("cannot find file: "+CONFIG_NAME, e);
		} catch (IOException e) {
			logger.error("io exception: "+CONFIG_NAME, e);
		}
	}

}
