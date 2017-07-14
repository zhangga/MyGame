package p.my.login.constant;

public class LoginConstant {
	
	/** 资源文件根目录*/
    public static final String RES_PATH = "./resource/";
    
    public static final String WEB_ACTION_PACKAGE = "p.my.login.action.web";
    
    /**
	 * 用户表达到多少条后分表
	 */
	public static final int MAX_ROW = 200000;
	
	public static final int CHANNEL_OTHER = 0;
    
    /** 消息头魔数*/
  	public static final short MAGIC_HEADER = 0x2425;
    
    /** 服务器状态:关闭 */
    public static final byte SERVER_STATE_CLOSE = 0;
    /** 服务器状态:正常 */
    public static final byte SERVER_STATE_NORMAL = 1;
    /** 服务器状态:维护 */
    public static final byte SERVER_STATE_MAINTAIN = 2;

}
