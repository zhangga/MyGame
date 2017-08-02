package p.my.common.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.log4j.Logger;

/**
 * MyBatis会话工厂对象
 *
 * @author U-Demon Created on 2017年7月12日
 * @version 1.0.0
 */
public class MyBatisFactory {
	
	private static final Logger logger = Logger.getLogger(MyBatisFactory.class);
	
	public static final String CONFIG_NAME = "./resource/config/mybatis_config.xml";
	
	private static SqlSessionFactory factory = null;
	
	public static void init() {
		final File file = Paths.get(CONFIG_NAME).toFile();
		try (InputStream is = new FileInputStream(file)) {
			factory = new SqlSessionFactoryBuilder().build(is);
		} catch (IOException e) {
        	logger.error("读取文件异常: "+CONFIG_NAME, e);
        }
	}

	public static SqlSessionFactory getFactory() {
		return factory;
	}
	
	/**
	 * 调用close方法
	 * @param T
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> DBMapper<T> getMapper(Class<?> T) {
		SqlSession session = null;
		DBMapper<T> dbm = null;
		try {
			session = factory.openSession();
			dbm = new DBMapper<>(session);
			T mapper = (T) session.getMapper(T);
			dbm.mapper = mapper;
			return dbm;
		} catch (Exception e) {
			logger.error("获取Mapper时发生异常", e);
		} finally {
//			if (session != null) {
//				session.close();
//			}
		}
		return dbm;
	}

}
