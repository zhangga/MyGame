package p.my.gameserver.constant;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.google.common.collect.ImmutableList;

import p.my.common.resource.ResourceListener;
import p.my.common.resource.ResourceManager;
import p.my.common.util.TimeUtil;
import p.my.common.util.XmlUtil;

/**
 * 游戏配置数据
 *
 * @author U-Demon Created on 2017年7月28日
 * @version 1.0.0
 */
public class GameConfig {
	
	private static final Logger logger = Logger.getLogger(GameConfig.class);
	
	/** 服务器ID */
	public static int SERVER_ID;
	
	/** 是否HTTPS协议 */
    public static boolean HTTPS;
    
    /** 是否是发布版本 */
    public static boolean PUBLISH;
    
    public static String GAME_HOST;
    
    public static int GAME_PORT;
    
    public static String LOGIN_HOST;
    
    public static int LOGIN_PORT;
    
    public static List<String> PAY_SAFE_IP;
    
    public static List<String> URL_SAFE_IP;
    
    public static Date CREATE_TIME;
    
	
	public static void loadData(String res_path) {
		final File file = new File(res_path, "config/game_config.xml");
        ResourceListener listener = new ResourceListener() {
            @Override
            public File listenedFile() {
                return file;
            }

            @Override
            public void onResourceChange(File file) {
                try {
                    Document doc = XmlUtil.load(file);
                    Element root = doc.getDocumentElement();
                    SERVER_ID = Integer.parseInt(XmlUtil.getChildText(root, "ServerID"));
                    HTTPS = XmlUtil.getChildText(root, "Protocol").toUpperCase().equals("HTTPS");
                    PUBLISH = Boolean.parseBoolean(XmlUtil.getChildText(root, "IsPublish"));
                    GAME_HOST = XmlUtil.getChildText(root, "GameHost");
                    GAME_PORT = Integer.parseInt(XmlUtil.getChildText(root, "GamePort"));
                    LOGIN_HOST = XmlUtil.getChildText(root, "LoginHost");
                    LOGIN_PORT = Integer.parseInt(XmlUtil.getChildText(root, "LoginPort"));
                    CREATE_TIME = TimeUtil.parseDataTime(XmlUtil.getChildText(root, "CreateTime"));
                    List<String> tmpList = new ArrayList<>();
                    for (String ip : XmlUtil.getChildText(root, "PaySafeIP").split(","))
                    {
                        tmpList.add(ip);
                    }
                    PAY_SAFE_IP = ImmutableList.copyOf(tmpList);
                    List<String> tmp = new ArrayList<>();
                    for (String ip : XmlUtil.getChildText(root, "UrlSafeIP").split(","))
                    {
                    	tmp.add(ip);
                    }
                    URL_SAFE_IP = ImmutableList.copyOf(tmp);
                } catch (Exception e) {
                    logger.error("加载游戏配置数据出错...", e);
                }
            }

            @Override
            public String toString() {
                return "loginConfig";
            }
        };
        listener.onResourceChange(file);
        ResourceManager.getInstance().addResourceListener(listener);
	}

}
