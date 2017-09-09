package p.zzq.tool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.apache.log4j.Logger;

public class LinuxConfig {
	
	private static final Logger logger = Logger.getLogger(LinuxConfig.class);
	
	private static final String CONFIG_PATH = "./resource/config.properties";
	
	//编码
	public static final String DEFAULT_CHARSET = "UTF-8";
	
	public static final String ERR_MSG = "错误信息---------------------》\t";
	
	public static List<String> hosts;
	public static String user;
	public static String pwd;
	
	/**
	 * 初始化配置文件
	 */
	public static void init() {
		Properties prop = new Properties();
		final File file = new File(CONFIG_PATH);
		try (InputStream is = new FileInputStream(file)) {
			prop.load(is);
			//host
			hosts = Arrays.asList(prop.getProperty("hosts").split(","));
			//user
			user = prop.getProperty("user");
			pwd = prop.getProperty("pwd");
		} catch (FileNotFoundException e) {
			logger.error("cannot find file: "+CONFIG_PATH, e);
		} catch (IOException e) {
			logger.error("io exception: "+CONFIG_PATH, e);
		}
	}
	
}
