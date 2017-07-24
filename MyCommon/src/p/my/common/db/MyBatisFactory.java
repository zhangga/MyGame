package p.my.common.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

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
		InputStream is = null;
        try {
        	File file = new File(CONFIG_NAME);
        	is = new FileInputStream(file);
        } catch (IOException e) {
        	logger.error("读取文件异常: "+CONFIG_NAME, e);
        }
        factory = new SqlSessionFactoryBuilder().build(is);
        try {
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
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
	public static <T> T getMapper(Class<?> T) {
		SqlSession session = null;
		try {
			session = factory.openSession();
			T mapper = (T) session.getMapper(T);
			IMapper m = null;
			return mapper;
		} catch (Exception e) {
			logger.error("获取Mapper时发生异常", e);
		} finally {
//			if (session != null) {
//				session.close();
//			}
		}
		return null;
	}

}
