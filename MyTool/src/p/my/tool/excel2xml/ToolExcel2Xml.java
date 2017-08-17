package p.my.tool.excel2xml;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ToolExcel2Xml {
	
	private static final Logger logger = Logger.getLogger(ToolExcel2Xml.class);
	
	//输出文件夹名称
	public static final String OUTPUT_FLODER_NAME = "output";
	
	//源文件夹名称
	public static final String INPUT_FLODER_NAME = "input";
	
	private static final String SLASH = "/";
	
	private static final String TABS = "models";
	private static final String TAB = "model";
	
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
		logger.info("开始excel转xml文件...");
		
		//获取源文件夹下的所有文件
		Collection<File> files = FileUtils.listFiles(inputFloder, null, true);
		
		for (File file : files) {
			logger.info("开始转换文件：" + file.getPath());
			String path = file.getAbsolutePath();
			int index = path.indexOf(INPUT_FLODER_NAME);
			String prePath = path.substring(0, index);
			String tailPath = path.substring(index + INPUT_FLODER_NAME.length());
			tailPath = tailPath.replaceAll("xlsx", "xml");
			tailPath = tailPath.replaceAll("xls", "xml");
			//输出文件路径
			String outputPath = prePath + OUTPUT_FLODER_NAME + tailPath;
			logger.info("输出文件路径：" + outputPath);
			File outputFile = new File(outputPath);
			//转换文件
			transformFile(file, outputFile);
			logger.info("===================转换成功！===================");
		}
	}
	
	private static void transformFile(File inputFile, File outputFile) {
		Workbook book = null;
		try {
			InputStream is = new FileInputStream(inputFile);
//			if (inputFile.getName().endsWith("xlsx")) {
//				book = new HSSFWorkbook(is);
//			}
//			else if (inputFile.getName().endsWith("xls")) {
				book = new XSSFWorkbook(is);
//			} else {
//				logger.error("当前文件不是excel文件");
//	        }
//			if (book == null)
//				return;
			//输出
			createFile(outputFile);
			Sheet sheet = book.getSheetAt(0);
			int rowNum = sheet.getLastRowNum() + 1;
			List<String> titles = new ArrayList<>();
			boolean quit = false;
			for (int row = 0; row < rowNum; row++) {
				if (quit)
					break;
				Row rowData = sheet.getRow(row);
				int colNum = rowData.getLastCellNum() + 1;
				for (int col = 0; col < colNum; col++) {
					Cell cell = rowData.getCell(col);
					if (cell == null) {
						if (col == 0) {
							quit = true;
						}
						break;
					}
					String content = cell.toString();
					if (content == null || content.length() == 0) {
						if (col == 0) {
							quit = true;
						}
						break;
					}
					//表头
					if (row == 0) {
						titles.add(content);
					}
					//数据
				}
			}
			FileUtils.writeLines(outputFile, "UTF-8", FileUtils.readLines(inputFile, "UTF-8"));
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

}
