package com.hinear.hxt.util;

public final class EmptyUtils {

	public static final boolean stringIsEmpty(String string) {
		return string == null || string.trim() == "";
	}
}
