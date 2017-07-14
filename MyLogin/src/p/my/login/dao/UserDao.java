package p.my.login.dao;

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

}
