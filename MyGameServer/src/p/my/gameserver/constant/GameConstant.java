package p.my.gameserver.constant;

public class GameConstant {
	
	/** 资源文件根目录*/
    public static final String RES_PATH = "./resource/";
    
    public static final String WEB_ACTION_PACKAGE = "p.my.gameserver.action.web";
    
    /** 消息头魔数*/
  	public static final short MAGIC_HEADER = 0x2425;
  	
  	/** 角色状态：正常**/
    public static final byte PLAYER_STATE_NORMAL = 0;
    /** 角色状态：封号**/
    public static final byte PLAYER_STATE_FREEZE = 1;
    /** 角色状态：禁言**/
    public static final byte PLAYER_STATE_SHUTUP = 2;
    
    /** 角色名字最大长度**/
    public static final int PLAYER_NAME_MAX = 6;

}
