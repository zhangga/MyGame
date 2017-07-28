package p.my.gameserver;

import p.my.rpc.client.ServerStateClient;

public class MyGameServer {
	
	public static void main(String[] args) {
		ServerStateClient client = new ServerStateClient("192.168.0.17", 29999);
		client.sendState(1, "zzq", "192.168.0.17", 3001, 10);
	}
	
}
