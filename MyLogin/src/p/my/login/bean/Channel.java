package p.my.login.bean;

import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

import p.my.login.constant.LoginConstant;

/**
 * 渠道
 *
 * @author U-Demon Created on 2017年7月14日
 * @version 1.0.0
 */
public class Channel {
	
	private int id;
	
	private String name;
	
	private int idx;
	
	private Date create_time;
	
	private AtomicInteger userCounter = new AtomicInteger();

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public int getUserCount() {
		return userCounter.get();
	}

	public void setUserCount(int count) {
		this.userCounter.set(count);
	}
	
	public boolean isNewTable() {
		return getUserCount() / LoginConstant.MAX_ROW > idx;
	}
	
	public void addIdx() {
		++this.idx;
	}

}
