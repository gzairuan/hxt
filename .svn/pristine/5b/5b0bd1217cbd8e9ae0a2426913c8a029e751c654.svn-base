package com.hinear.hxt.util;

import com.google.gson.Gson;

import java.lang.reflect.Type;

public class JSONUtil {

    private Gson gson;

    private static final class LazyHolder {
        static final JSONUtil JSON_UTILS = new JSONUtil();
    }

    private JSONUtil() {
        gson = new Gson();
    }

    /**
     * @return 返回当前类实例对象
     */
    private static JSONUtil getInstance() {
        return LazyHolder.JSON_UTILS;
    }

    private <T> String _toJSON(T t) {
        return gson.toJson(t);
    }

    private <T> T _parseJSON(String jsonStr, Class<T> t) {
        return gson.fromJson(jsonStr, t);
    }

    private <T> T _parseJSONList(String json, Type type) {
        return gson.fromJson(json, type);
    }

    public static <T> String toJSON(T t) {
        return getInstance()._toJSON(t);
    }

    public static <T> T parseJSON(String jsonStr, Class<T> t) {
        return getInstance()._parseJSON(jsonStr, t);
    }

    /**
     * @param json json字符串
     * @param type 例如 Type type = new TypeToken<ArrayList<class>>() {}.getType();
     * @return 数组
     */
    public static <T> T parseJSONList(String json, Type type) {
        return getInstance()._parseJSONList(json, type);
    }

}
