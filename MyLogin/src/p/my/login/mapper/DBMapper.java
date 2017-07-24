package p.my.login.mapper;

import org.apache.ibatis.session.SqlSession;

public class DBMapper<T> {
	
	private SqlSession session = null;
	
	public T t;
	
	public DBMapper(SqlSession session) {
		this.session = session;
	}
	
	public void close() {
		this.session.close();
	}

}
