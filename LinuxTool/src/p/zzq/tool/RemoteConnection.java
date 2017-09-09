package p.zzq.tool;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import org.apache.log4j.Logger;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;
import ch.ethz.ssh2.StreamGobbler;

/**
 * 远程linux连接
 *
 * @author U-Demon Created on 2017年9月8日 下午4:23:33
 * @version 1.0.0
 */
public class RemoteConnection {
	
	private static final Logger logger = Logger.getLogger(RemoteConnection.class);
	
	//连接
	private Connection conn;
	private String ip;
	private String user;
	private String pwd;
	
	public RemoteConnection(String ip, String user, String pwd) {
		this.ip = ip;
		this.user = user;
		this.pwd = pwd;
	}
	
	/**
	 * 登录linux主机
	 * @return
	 */
	public boolean login() {
		boolean flag = false;
		try {
			this.conn = new Connection(ip);
			this.conn.connect();
			flag = this.conn.authenticateWithPassword(user, pwd);
		} catch (Exception e) {
			logger.error("无法连接到远程主机："+this.ip+", user = "+user+", pwd = "+pwd, e);
		}
		return flag;
	}
	
	/**
	 * 远程执行shll脚本或者命令
	 * @param cmd
	 * 		即将执行的命令 
	 * @return
	 * 		命令执行完后返回的结果值 
	 */
	public String execute(String cmd) {
		String result = "LinuxToolRet:fail";
		Session session = openSession();
		if (session == null) {
			logger.error(LinuxConfig.ERR_MSG+"主机："+ip+"由于打开回话失败！未完成操作："+cmd);
			return result;
		}
		try {
			session.execCommand(cmd);
			result = processStdout(session.getStdout(), LinuxConfig.DEFAULT_CHARSET);
			//如果为得到标准输出为空，说明脚本执行出错了
            if (result == null || result.length() == 0) {  
                result = processStdout(session.getStderr(), LinuxConfig.DEFAULT_CHARSET);
            }
            session.close();
		} catch (Exception e) {
			logger.error(LinuxConfig.ERR_MSG+"主机："+ip+"操作失败！"+cmd);
		}
		return result;
	}
	
	public String executeSuccess(String cmd) {
		String result = "LinuxToolRet:fail";
		Session session = openSession();
		if (session == null) {
			logger.error(LinuxConfig.ERR_MSG+"主机："+ip+"由于打开回话失败！未完成操作："+cmd);
			return result;
		}
		try {
			session.execCommand(cmd);
			result = processStdout(session.getStdout(), LinuxConfig.DEFAULT_CHARSET);
            session.close();
		} catch (Exception e) {
			logger.error(LinuxConfig.ERR_MSG+"主机："+ip+"操作失败！"+cmd);
		}
		return result;
	}
	
	private String processStdout(InputStream in, String charset) {
		InputStream stdout = new StreamGobbler(in);  
		StringBuilder buffer = new StringBuilder();  
		try (BufferedReader br = new BufferedReader(new InputStreamReader(stdout, charset))) {  
			String line = null;
			while ((line=br.readLine()) != null) {  
				buffer.append(line+"\n");  
			}  
		} catch (UnsupportedEncodingException e) {  
			e.printStackTrace();  
		} catch (IOException e) {  
			e.printStackTrace();  
		}
		return buffer.toString();  
	}
	
	private Session openSession() {
		Session session = null;
		try {
			session = this.conn.openSession();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return session;
	}

}
