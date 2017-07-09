package p.my.common.util;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import p.my.common.support.GsonIgnoreStrategy;

/**
 * 字符串工具类
 *
 * @author U-Demon Created on 2017年7月8日
 * @version 1.0.0
 */
public class StringUtil {
	
	public static final String ENCODING_UTF8 = "UTF8";
	
	/**
     * 判断字符串是否为空
     *
     * @param str
     * @return true,字符串是空的;false,字符串不是空的
     */
    public static boolean isEmpty(String string) {
    	return string == null || string.trim().length() == 0;
    }
    
    /**
	 * 将Obj转成Json
	 * @param obj
	 * @return
	 */
	public static String obj2Json(Object obj) {
		try {
			GsonIgnoreStrategy gis = new GsonIgnoreStrategy();
			Gson gson = new GsonBuilder().setExclusionStrategies(gis).create();
			return gson.toJson(obj);
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 将Json转成Object
	 * @param json
	 * @param classOfT
	 * @return
	 */
	public static <T> T json2Obj(String json, Class<T> classOfT) {
		try {
			return new Gson().fromJson(json, classOfT);
		} catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
    
    /**
     * 将字符串首字母大写
     *
     * @param s
     * @return
     */
    public static String upperCaseFirstCharOnly(String s) {
        if (s == null || s.length() < 1) {
            return s;
        }
        return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
    }
    
    public static String toFirstUpper(String str){
    	if (str == null || str.length() == 0){
    		return str;
    	}
    	String first = str.substring(0, 1);
    	return str.replaceFirst(first, first.toUpperCase());
    }
    
    /**
     * 将字符串按小括号()拆分成数组
     *
     * @param src
     * @return
     */
    public static String[] bracketToArray(String src) {
    	if (StringUtil.isEmpty(src)) {
    		throw new IllegalArgumentException("source string is null or empty");
    	}
    	List<String> strList = new ArrayList<>();
    	Pattern pattern = Pattern.compile("(\\()(.*?)(\\))");
    	Matcher matcher = pattern.matcher(src);
    	while (matcher.find()) {
    		strList.add(matcher.group().replaceAll("\\(|\\)", ""));
    	}
    	if (strList.size() == 0) {
    		throw new IllegalArgumentException("source string's format is not suitable");
    	}
    	return strList.toArray(new String[strList.size()]);
    }
    
    public static boolean isAllNumeric(String str) {
    	if (str == null) {
    		return false;
    	}
    	String format = "^-?\\d+$";
    	Pattern p = Pattern.compile(format, Pattern.CASE_INSENSITIVE);
    	Matcher m = p.matcher(str);
    	return m.matches();
    }
    
    public static final String replaceParams(String str, String... params) {
        if(params == null)
            return str;
        String content = str;
        for(int i = 0; i < params.length; i++)
        {
            String s = "{"+i+"}";
            if(content.indexOf(s) == -1)
                continue;
            content = content.replace(s, params[i]);
        }
        return content;
    }
	
	/**
     * 判断字符串是否是数字
     *
     * @param text
     * @return
     */
    public static boolean isDigit(String text) {
        String reg = "[-]*[\\d]+[\\.\\d+]*";
        Pattern pat = Pattern.compile(reg);
        Matcher mat = pat.matcher(text);
        return mat.matches();
    }

    /**
     * 判断一句话是否是汉语
     *
     * @param text
     * @return
     */
    public static boolean isChiness(String text) {
        String reg = "[\\w]*[\\u4e00-\\u9fa5]+[\\w]*";
        Pattern pat = Pattern.compile(reg);
        Matcher mat = pat.matcher(text);
        boolean result = mat.matches();
        return result;
    }

    /**
     * 判断单个字符是否是汉语
     *
     * @param cha
     * @return
     */
    public static boolean isChineseChar(char cha) {
        String reg = "[\\u4e00-\\u9fa5]";
        Pattern pat = Pattern.compile(reg);
        String text = Character.toString(cha);
        Matcher mat = pat.matcher(text);
        boolean result = mat.matches();
        return result;
    }

    /**
     * 判断字符是否是字母(包括大小写)或者数字
     *
     * @param cha
     * @return
     */
    public static boolean isLetterAndDigit(String cha) {
        String reg = "[\\w]+";
        Pattern pat = Pattern.compile(reg);
        Matcher mat = pat.matcher(cha);
        boolean result = mat.matches();
        return result;
    }

    /**
     * 返回字符串中汉字的数量
     *
     * @param test
     * @return
     */
    public static int getChineseCount(String test) {
        int count = 0;
        boolean tempResult = false;
        for (int i = 0; i < test.length(); i++) {
            char cha = test.charAt(i);
            tempResult = isChineseChar(cha);
            if (tempResult) {
                count++;
            }
        }
        return count;
    }

    /**
     * 返回字符串中字母和数字的个数，其中字母包括大小写
     *
     * @param text
     * @return
     */
    public static int getLetterAndDigitCount(String text) {
        int count = 0;
        boolean tempResult = false;
        for (int i = 0; i < text.length(); i++) {
            tempResult = isLetterAndDigit(text);
            if (tempResult) {
                count++;
            }
        }
        return count;
    }
    
    /**
     * 16位加密
     * @param s
     * @return
     */
    public static String getEncode16(String s) {
        return getEncode16(s, ENCODING_UTF8);
    }
    /**
     * 16位加密
     * @param s
     * @return
     */
    public static String getEncode16(String s, String encoding) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update((encoding != null) ? s.getBytes(encoding) : s.getBytes());
            StringBuilder builder = new StringBuilder();
            for (byte b : md5.digest()) {
                builder.append(Integer.toHexString((b >> 4) & 0xf));
                builder.append(Integer.toHexString(b & 0xf));
            }
            // 16位加密，从第9位到25位
            //return builder.substring(8, 24).toString().toUpperCase();
            return builder.substring(8, 24).toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 32位加密
     * @param s
     * @return
     */
    public static String getEncode32(String s) {
        return getEncode32(s, ENCODING_UTF8);
    }

    /**
     * 32位加密
     * @param s
     * @return
     */
    public static String getEncode32(String s, String encoding) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update((encoding != null) ? s.getBytes(encoding) : s.getBytes());
            StringBuilder builder = new StringBuilder();
            for (byte b : md5.digest()) {
                builder.append(Integer.toHexString((b >> 4) & 0xf));
                builder.append(Integer.toHexString(b & 0xf));
            }
            return builder.toString().toUpperCase();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
