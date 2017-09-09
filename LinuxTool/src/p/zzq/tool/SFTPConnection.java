package p.zzq.tool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.Vector;

import org.apache.log4j.Logger;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

/**
 * SFTP
 *
 * @author U-Demon Created on 2017年9月9日 下午1:32:10
 * @version 1.0.0
 */
public class SFTPConnection {

	private static final Logger logger = Logger.getLogger(SFTPConnection.class);
	
	private String host;
	private Integer port = null;
	private String user;
	private String pwd;
	
	private Session session;
	private ChannelSftp sftp = null;
	
	public SFTPConnection(String host, Integer port, String user, String pwd) {
		this.host = host;
		this.port = port;
		this.user = user;
		this.pwd = pwd;
	}
	
	public SFTPConnection(String host, String user, String pwd) {
		this.host = host;
		this.user = user;
		this.pwd = pwd;
	}
	
	public boolean connect() {
		JSch jsch = new JSch();
		try {
			if (port != null) {
				session = jsch.getSession(user, host, port.intValue());
			} else {
				session = jsch.getSession(user, host);
			}
			session.setPassword(pwd);
			//设置第一次登陆的时候提示，可选值:(ask | yes | no)
			session.setConfig("StrictHostKeyChecking", "no");
			//30秒连接超时
			session.connect(30000);
		} catch (JSchException e) {
			logger.error("SFTP 连接出现异常", e);
			return false;
		}
		return true;
	}
	
	private void openChannel() {
		if (sftp == null || !sftp.isConnected()) {
			try {
				Channel channel = session.openChannel("sftp");
				channel.connect();
				sftp = (ChannelSftp) channel;
			} catch (Exception e) {
				sftp = null;
				logger.error(LinuxConfig.ERR_MSG+"打开sftp连接发生异常: ", e);
				return;
			}
		}
	}
	
	public void closeChannel() {
		if (sftp != null) {
			sftp.disconnect();
			sftp = null;
		}
	}
	
	/**
	 * sftp上传文件(夹)
	 * @param directory
	 * @param uploadFile
	 */
	public void upload(String directory, String uploadFile) {
		logger.info("sftp upload file [directory] : " + directory);
		logger.info("sftp upload file [uploadFile] : " + uploadFile);
		File file = new File(uploadFile);
		if (!file.exists()) {
			logger.error(LinuxConfig.ERR_MSG+"上传文件不存在: " + uploadFile);
			return;
		}
		openChannel();
		//这里有点投机取巧，因为ChannelSftp无法去判读远程linux主机的文件路径,无奈之举
		try {
			@SuppressWarnings("rawtypes")
			Vector content = sftp.ls(directory);
			if (content == null) {
				sftp.mkdir(directory);
			}
		} catch (SftpException e) {
			try {
				sftp.mkdir(directory);
			} catch (SftpException e1) {
				logger.error(LinuxConfig.ERR_MSG+"linux创建文件夹失败: " + directory, e1);
				return;
			}
		}
		//进入目标路径
		try {
			sftp.cd(directory);
			if (file.isFile()) {
				InputStream ins = new FileInputStream(file);
				//中文名称的
				sftp.put(ins, new String(file.getName().getBytes(), "UTF-8"));
				//sftp.setFilenameEncoding("UTF-8");
			} else {
				File[] files = file.listFiles();
				for (File file2 : files) {
					String dir = file2.getAbsolutePath();
					if(file2.isDirectory()){
						String str = dir.substring(dir.lastIndexOf(File.separator));
						directory = normalizePath(directory, str);
					}
					upload(directory, dir);
				}
			}
		} catch (SftpException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * sftp下载文件（夹）
	 * @param directory
	 * @param srcFile
	 * @param saveFile
	 */
	@SuppressWarnings("rawtypes")
	//FIXME 下载多个文件夹时 有点小问题  normalizePath方法转换../这样的文件路径
	public void download(String directory, String srcFile, String saveFile) {
		openChannel();
		Vector content = null;
		try{
			content = sftp.ls(srcFile);
		} catch (SftpException e) {
			logger.error(LinuxConfig.ERR_MSG+"sftp罗列文件发生错误: "+srcFile, e);
			return;
		}
		File file = new File(saveFile);
		if(!file.exists()) file.mkdir();
		try {
			//文件
			if(srcFile.indexOf(".") > -1){
				sftp.get(srcFile, saveFile);
			}else{
				//文件夹(路径)
				for (Iterator iterator = content.iterator(); iterator.hasNext();) {
					LsEntry obj =  (LsEntry) iterator.next();
					String filename = new String(obj.getFilename().getBytes(),"UTF-8");
					if(!(filename.indexOf(".") > -1)){
						directory = normalizePath(directory, System.getProperty("file.separator") + filename);
						srcFile = directory;
						saveFile = normalizePath(saveFile, System.getProperty("file.separator") + filename);
					}else{
						//扫描到文件名为".."这样的直接跳过
						String[] arrs = filename.split("\\.");
						if((arrs.length > 0) && (arrs[0].length() > 0)){
							srcFile = normalizePath(directory, System.getProperty("file.separator") + filename);
						}else{
							continue;
						}
					}
					download(directory, srcFile, saveFile);
				}
			}
		} catch (SftpException e) {
			logger.error(LinuxConfig.ERR_MSG+"sftp下载文件发生错误", e);
			return;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	private String normalizePath(String directory, String str) {
		return directory + str.replace("\\", "/");
	}
	
	public void disconnect() {
		this.session.disconnect();
	}
	
}
