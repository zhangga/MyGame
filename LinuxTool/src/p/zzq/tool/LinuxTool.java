package p.zzq.tool;

import org.apache.log4j.Logger;

public class LinuxTool {
	
	private static final Logger logger = Logger.getLogger(LinuxTool.class);
	
	public static void main(String[] args) {
		//初始化配置文件
		LinuxConfig.init();
		
		for (String host : LinuxConfig.hosts) {
			RemoteConnection conn = new RemoteConnection(host, LinuxConfig.user, LinuxConfig.pwd);
			//登录
			if (!conn.login()) {
				logger.error(LinuxConfig.ERR_MSG+"主机："+host+"由于登录失败，未进行任何操作！");
				continue;
			}
			
			System.out.println(conn.execute("ps -ef |grep peach"));
			
			//创建临时文件夹
			String tmpjar = LinuxConfig.dir+"tmpjar/";
			String tmpxml = LinuxConfig.dir+"tmpxml/";
			logger.info(conn.execute("mkdir "+tmpjar));
			logger.info(conn.execute("mkdir "+tmpxml));
			
			//上传文件
			SFTPConnection sftp = new SFTPConnection(host, 22, LinuxConfig.user, LinuxConfig.pwd);
			sftp.connect();
			sftp.upload(tmpjar, "./resource/jar/");
			sftp.upload(tmpxml, "./resource/xml/");
//			sftp.download("/home/game/server/cc_5001/", "/home/game/server/cc_5001/", "F:\\zzq");
			sftp.disconnect();
			logger.info("上传jar包和xml完毕...");
			
			//获取所有的服务器目录
			String listRes = conn.execute("ls "+LinuxConfig.dir);
			if (listRes == null || listRes.length() == 0) {
				logger.info("主机："+host+"下没有游戏服");
				continue;
			}
			String[] dirs = listRes.split("\n");
			for (String dirName : dirs) {
				if (dirName.startsWith("["))
					dirName = dirName.substring(1);
				else if (dirName.endsWith("]"))
					dirName = dirName.substring(0, dirName.length() - 1);
				if (!dirName.startsWith(LinuxConfig.projHead))
					continue;
				int port = getServerPort(dirName);
				int serverId = port % 10000;
				//只进行关服操作
				if (serverId >= LinuxConfig.closeMin && serverId <= LinuxConfig.closeMax) {
//					String pInfo = conn.execute("ps -ef|grep "+LinuxConfig.projHead+port+"|grep -v grep|awk '{print $2}'");
//					conn.execute("kill -9 "+pInfo);
					logger.info("关服操作：：：：：：：：：：：：：：：：："+dirName);
					continue;
				}
				//正常维护服务器
				logger.info("============开始处理服务器："+dirName+"============");
				logger.info(conn.execute("cp -rf "+tmpjar+"*" + " "+LinuxConfig.dir+dirName+"/"+dirName+".jar"));
				logger.info(conn.execute("cp -rf "+tmpxml+"*" + " "+LinuxConfig.dir+dirName+"/resource/gamedata/"));
				logger.info("重启服务器："+dirName);
				conn.execute("sh "+LinuxConfig.dir+dirName+"/startup.sh");
				try {
					Thread.sleep(5000L);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
			//删除临时文件夹
			logger.info(conn.execute("rm -rf "+tmpjar));
			logger.info(conn.execute("rm -rf "+tmpxml));
			logger.error("成功日志-->主机："+host+"，操作成功！");
		}
	}
	
	private static int getServerPort(String dirName) {
		if (!dirName.startsWith(LinuxConfig.projHead))
			return 0;
		String p = dirName.substring(LinuxConfig.projHead.length());
		return Integer.valueOf(p);
	}

}
