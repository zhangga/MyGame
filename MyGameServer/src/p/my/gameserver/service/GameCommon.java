package p.my.gameserver.service;

public class GameCommon {
	
	//预留字符
	private static final char[] RESERVED_WORDS = {',','$','^','\'','|',' ',';','#',':','=','\\','\"'};
	
	//替换字符
	private static final String REPLACE_WORD = "*";
	
	/**
	 * 检查字符串是否包含预留字符
	 * @return
	 */
	public static boolean containReservedWord(String str) {
		for (Character word : RESERVED_WORDS) {
			if (str.contains(word.toString()))
				return true;
		}
		return false;
	}
	
	/**
	 * 替换字符串中的保留字符
	 * @param str
	 */
	public static String replaceReservedWord(String str) {
		return replaceReservedWord(str, -1);
	}
	
	public static String replaceReservedWord(String str, int reservedLength) {
		if (str == null)
			return null;
		if (reservedLength == -1 || reservedLength > str.length())
			reservedLength = str.length();
		//字符串是否被修改
		boolean replaced = false;
		if (reservedLength < str.length())
			replaced = true;
		StringBuilder sb = new StringBuilder(reservedLength);
		for (int i = 0; i < reservedLength; i++) {
			char cha = str.charAt(i);
			if (inReservedWords(cha)) {
				replaced = true;
				sb.append(REPLACE_WORD);
			}
			else {
				sb.append(cha);
			}
		}
		if (!replaced)
			return str;
		return sb.toString();
	}
	
	private static boolean inReservedWords(char cha) {
		for (char word : RESERVED_WORDS) {
			if (word == cha)
				return true;
		}
		return false;
	}

}
