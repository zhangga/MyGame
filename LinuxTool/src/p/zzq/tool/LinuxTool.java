package p.zzq.tool;

import org.apache.log4j.Logger;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.Session;

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
			System.out.println(conn.execute("ls /home/game/server/cc_5001/"));
			
			//上传文件
			SFTPConnection sftp = new SFTPConnection(host, 22, LinuxConfig.user, LinuxConfig.pwd);
			sftp.connect();
//			sftp.upload("/opt/server", "./resource/");
			sftp.download("/home/game/server/cc_5001/", "/home/game/server/cc_5001/", "F:\\zzq");
			sftp.disconnect();
			
			logger.error("成功日志-->主机："+host+"，操作成功！");
		}
	}

}
