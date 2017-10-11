package com.hinear.hxt.util;

/**
 * 转换工具类（字符串转int型等等）
 * 
 * @author Admin
 *
 */
public class TransformUtils {

	public static final int transformInt(String string) {
		int i = 0;
		if (string != null) {
			try {
				i = Integer.parseInt(string);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		return i;
	}
}
