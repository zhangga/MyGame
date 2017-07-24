package p.my.login.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;

import p.my.common.db.BaseSqlDao;
import p.my.login.bean.User;

/**
 * 用户DAO
 *
 * @author U-Demon Created on 2017年7月14日
 * @version 1.0.0
 */
public class UserDao extends BaseSqlDao {
	
	public UserDao(SqlSessionFactory factory) {
		super(factory);
	}
	
	public User createUser(User user) {
		int id = this.insert("createUser", user);
		if (id > 0) {
			user.setId(id);
			return user;
		}
		return null;
	}
	
	public User getUser(User puser) {
		User user = this.selectOne("selectUser", puser);
		return user;
	}
	
	public int getUserCount(int channel, int idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("table", "user_"+channel+"_"+idx);
		return this.selectOne("selectCount", map);
	}
	
	public int getUserMax(int channel, int idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("table", "user_"+channel+"_"+idx);
		Integer max = this.selectOne("selectMax", map);
		if (max == null)
			return 0;
		return max;
	}
	
	public void createTable(int channel, int idx) {
		Map<String, Object> map = new HashMap<>();
		map.put("table", "user_"+channel+"_"+idx);
		this.update("createTable", map);
	}

}
