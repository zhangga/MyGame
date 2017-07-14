package p.my.login.constant;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.google.common.collect.ImmutableList;

import p.my.common.resource.ResourceListener;
import p.my.common.resource.ResourceManager;
import p.my.common.util.XmlUtil;

/**
 * 登录服配置
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class LoginConfig {
	
	private static final Logger logger = Logger.getLogger(LoginConfig.class);
	
    /** 登陆服端口 */
    public static int LOGIN_PORT;
    /** 是否是发布版本 */
    private static boolean PUBLISH;
    /** 缓存用户数量 */
    public static int CACHE_UER_NUM;
    /** session超时时间 */
    public static long SESSION_TIMEOUT;

    /** 白名单是否开启 */
    private static boolean WHITE_LIST_OPEN;
    /** 白名单列表 */
    private static List<String> WHITE_LIST_LIST;
	
	public static void loadData(String res_path) {
		final File file = new File(res_path, "config/login_config.xml");
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
                    LOGIN_PORT = Integer.parseInt(XmlUtil.getChildText(root, "LoginPort"));
                    PUBLISH = Boolean.parseBoolean(XmlUtil.getChildText(root, "IsPublish"));
                    CACHE_UER_NUM = Integer.parseInt(XmlUtil.getChildText(root, "CacheUserNum"));
                    SESSION_TIMEOUT = Integer.parseInt(XmlUtil.getChildText(root, "SessionTimeOut"));

                    WHITE_LIST_OPEN = Boolean.parseBoolean(XmlUtil.getChildText(root, "WhiteListOpen"));
                    List<String> tmpList = new ArrayList<>();
                    for (String ip : XmlUtil.getChildText(root, "WhiteList").split(","))
                    {
                        tmpList.add(ip);
                    }
                    WHITE_LIST_LIST = ImmutableList.copyOf(tmpList);
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

	public static boolean isPUBLISH() {
		return PUBLISH;
	}

	public static boolean isWHITE_LIST_OPEN() {
		return WHITE_LIST_OPEN;
	}

	public static List<String> getWHITE_LIST_LIST() {
		return WHITE_LIST_LIST;
	}

}
