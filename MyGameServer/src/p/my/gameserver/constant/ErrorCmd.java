package p.my.gameserver.constant;

/**
 * 错误信息提示编号
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public enum ErrorCmd {
	
	OPERATION_FAILED(101, "操作失败"),
	PLAYER_FREEZE(102, "角色冻结"),
	PLAYER_EXIST(103, "角色已存在"),
	TOKEN_EXPIRE(104, "登陆失效"),
	LOGIN_EXPIRE(105, "登陆超时"),
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
