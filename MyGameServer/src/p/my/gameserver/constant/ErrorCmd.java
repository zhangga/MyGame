package p.my.gameserver.constant;

/**
 * 错误信息提示编号
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public enum ErrorCmd {
	
	OPERATION_FAILED(1, "操作失败"),
	TOKEN_EXPIRE(2, "登陆失效"),
	LOGIN_EXPIRE(3, "登陆超时"),
	;
	
	private short id;
	
	private String desc;
	
	ErrorCmd(int id, String desc) {
		this.id = (short) id;
		this.desc = desc;
	}

	public short getId() {
		return id;
	}

	public String getDesc() {
		return desc;
	}

}
