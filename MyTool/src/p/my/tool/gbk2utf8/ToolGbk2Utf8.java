package p.my.tool.gbk2utf8;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;

public class ToolGbk2Utf8 {
	
	private static final Logger logger = Logger.getLogger(ToolGbk2Utf8.class);
	
	//输出文件编码
	public static final String OUTPUT_FILE_CODING = "UTF-8";

	//输出文件夹名称
	public static final String OUTPUT_FLODER_NAME = "output";
	
	//源文件夹名称
	public static final String INPUT_FLODER_NAME = "input";
	
	private static final String SLASH = "/";
	
	public static void main(String[] args) {
		String basePath = new File("").getAbsolutePath();
		//日志文件夹
		File logFloder = new File(basePath+SLASH+"logs");
		if (!logFloder.exists() || !logFloder.isDirectory()) {
			logFloder.mkdirs();
			return;
		}
		//输出文件夹
		File outputFloder = new File(basePath+SLASH+OUTPUT_FLODER_NAME);
		if (!outputFloder.exists() || !outputFloder.isDirectory()) {
			logger.error("转码失败！请在同目录下创建"+OUTPUT_FLODER_NAME+"文件夹");
			return;
		}
		//源文件夹
		File inputFloder = new File(basePath+SLASH+INPUT_FLODER_NAME);
		if (!inputFloder.exists() || !inputFloder.isDirectory()) {
			logger.error("转码失败！请在同目录下创建"+INPUT_FLODER_NAME+"文件夹");
			return;
		}
		logger.info("开始转码文件...");
		//获取源文件夹下的所有文件
		Collection<File> files = FileUtils.listFiles(inputFloder, null, true);
		
		for (File file : files) {
			logger.info("开始转码文件：" + file.getPath());
			String path = file.getAbsolutePath();
			int index = path.indexOf(INPUT_FLODER_NAME);
			String prePath = path.substring(0, index);
			String tailPath = path.substring(index + INPUT_FLODER_NAME.length());
			//输出文件路径
			String outputPath = prePath + OUTPUT_FLODER_NAME + tailPath;
			logger.info("输出文件路径：" + outputPath);
			File outputFile = new File(outputPath);
			//转码文件
			encodingFile(file, outputFile);
			logger.info("===================转码成功！===================");
		}
	}
	
	private static void encodingFile(File inputFile, File outputFile) {
		String encoding = encodingName(inputFile);
		logger.info("源文件编码：" + encoding);
		try {
			//输出
			createFile(outputFile);
			if (!encoding.equals("UTF-8"))
				encoding = "GBK";
			FileUtils.writeLines(outputFile, "UTF-8", FileUtils.readLines(inputFile, encoding));
		} catch (FileNotFoundException e) {
			logger.error("转码失败！文件："+inputFile.getAbsolutePath(), e);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static void createFile(File file) {
		String[] floders = file.getPath().split("\\\\");
		for (int i = 1; i < floders.length-1; i++) {
			StringBuilder sb = new StringBuilder();
			for (int index = 0; index <= i; index++) {
				sb.append(floders[index]).append("\\\\");
			}
			File floder = new File(sb.toString());
			if (!floder.exists())
				floder.mkdirs();
		}
		try {
			file.createNewFile();
		} catch (IOException e) {
			logger.error("创建文件失败："+file, e);
		}
	}
	
	private static void getAllFile(File floder, List<File> files) {
		for (File file : floder.listFiles()) {
			if (!file.isDirectory()) {
				files.add(file);
			}
			else {
				getAllFile(file, files);
			}
		}
	}
	
	private static EncodingDetect detect = new EncodingDetect();
	
	private static String encodingName(File file) {
		int encodingNumber = detect.detectEncoding(file);
		return EncodingDetect.javaname[encodingNumber];
	}

}
