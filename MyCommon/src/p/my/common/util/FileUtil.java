package p.my.common.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;

/**
 * 文件操作的工具类
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class FileUtil {
	
	public static final String ROOTPATH;
    public static final String RESOURCE_PATH;
    public static String src_path;

    static
    {
        ROOTPATH = new File("").getAbsolutePath();
        RESOURCE_PATH = ROOTPATH + File.separatorChar + "resource" + File.separatorChar;
    }
    
    public static String readFile(String path) {
        return readFile(path, StringUtil.ENCODING_UTF8);
    }
    
    public static String readFile(String path, String encoding) {
        BufferedReader reader = null;
        StringBuilder builder = new StringBuilder();
        try{
            FileInputStream fileInputStream = new FileInputStream(path);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, encoding);
            reader = new BufferedReader(inputStreamReader);
            String tempString;
            while((tempString = reader.readLine()) != null){
                builder.append(tempString);
            }
            reader.close();
        }catch(IOException e){
            e.printStackTrace();
        }finally{
            if(reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return builder.toString();
    }
    
    /**
     * 获取包下所有类
     * @param packageName
     * @return
     */
    public static List<String> getClasses(String packageName)
    {
        if (System.getProperty("os.name").indexOf("Windows") != -1)
            src_path = ROOTPATH + File.separatorChar + "bin" + File.separatorChar + packageName;
        else
            src_path = ROOTPATH + File.separatorChar;
        File file = new File(src_path.replace('.', File.separatorChar));
        List<String> classNames = new ArrayList<>();
        getClassName(file, packageName, classNames);
        return classNames;
    }
    
    private static void getClassName(File file, String packageName, List<String> className)
    {
        //文件夹
        if (file.isDirectory())
        {
            for (File childFile : file.listFiles())
            {
                getClassName(childFile, packageName, className);
            }
        }
        //class文件
        else if (file.getName().endsWith(".class"))
        {
            String filePath = file.getPath().replace(File.separatorChar, '.');
            filePath = filePath.substring(filePath.indexOf(packageName), filePath.length() - 6);
            className.add(filePath);
        }
        //jar文件
        else if (file.getName().endsWith(".jar"))
        {
            try {
                FileInputStream fis = new FileInputStream(file);
                JarInputStream jis = new JarInputStream(fis, false);
                JarEntry je = null;
                while ((je = jis.getNextJarEntry()) != null)
                {
                    String jeName = je.getName().replace(File.separatorChar, '.');
                    if (jeName.startsWith(packageName) && !jeName.endsWith("."))
                    {
                        className.add(jeName.substring(0, jeName.length() - 6));
                    }
                    jis.closeEntry();
                }
                jis.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void removeFile(String filePath){
        FileWriter fileWriter = null;
        try {
            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null) {
                    fileWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void appendToFile(String filePath, String createSql) {
        FileWriter fileWriter = null;
        BufferedWriter bufferWriter = null;
        try {
            File file = new File(filePath);
            fileWriter = new FileWriter(file, true);
            bufferWriter = new BufferedWriter(fileWriter);
            if (!file.exists()) {
                file.createNewFile();
            }
            bufferWriter.write(createSql);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bufferWriter != null) {
                    bufferWriter.close();
                }
                if (fileWriter != null) {
                    fileWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void appendToFile(String filePath, String string, String encoding) {
        FileOutputStream fout = null;
        OutputStreamWriter writer = null;
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                file.createNewFile();
            }
            fout = new FileOutputStream(filePath);
            writer = new OutputStreamWriter(fout, encoding);
            writer.write(string);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (writer != null) {
                    writer.close();
                }
                if (fout != null) {
                    fout.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
