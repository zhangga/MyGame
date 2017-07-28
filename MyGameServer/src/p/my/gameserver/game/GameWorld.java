package p.my.gameserver.game;

public class GameWorld {
	
	private static final GameWorld instance = new GameWorld();
	private GameWorld() {}
	public static GameWorld gi() {
		return instance;
	}
	
	public void init() {
		
	}

}
