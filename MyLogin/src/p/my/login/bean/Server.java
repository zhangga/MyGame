package p.my.login.bean;

public class Server {
	
	public int id;
	
	public String name;
	
	public String host;
	
	public int port;
	
	public int online;
	
	/**
	 * 服务器状态
	 * {@code LoginConstant#SERVER_STATE_NORMAL}
	 */
	public byte state;
	
	//上次状态时间
	public long lastTime;

}
