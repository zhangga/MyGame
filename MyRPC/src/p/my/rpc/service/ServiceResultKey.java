package p.my.rpc.service;

public enum ServiceResultKey {
	
	SERVER_STATE("SERVER_STATE", 50),
	;
	
	private String key;
	
	private int capacity;
	
	ServiceResultKey(String key, int capacity) {
		this.key = key;
		this.capacity = capacity;
	}

	public String getKey() {
		return key;
	}

	public int getCapacity() {
		return capacity;
	}

}
