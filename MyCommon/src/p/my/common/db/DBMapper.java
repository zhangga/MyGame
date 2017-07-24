package p.my.common.db;

import org.apache.ibatis.session.SqlSession;

/**
 * 封装数据库操作接口Mapper和Session
 *
 * @author U-Demon Created On 2017年7月24日
 */
public class DBMapper<T> {
	
	private SqlSession session = null;
	
	public T mapper;
	
	public DBMapper(SqlSession session) {
		this.session = session;
	}
	
	public void close() {
		if (this.session == null)
			return;
		this.session.commit();
		this.session.close();
	}

}
