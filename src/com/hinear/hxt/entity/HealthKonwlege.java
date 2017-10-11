package com.hinear.hxt.entity;

import java.io.Serializable;

/**
 * 
 * @author szs
 * @time 2017年8月7日 下午2:42:04
 * @version 1.0
 * 描述： 健康知识实体类
 * 
 * 
 */
public class HealthKonwlege implements Serializable {
	private static final long serialVersionUID = 1L;
	
	/*"HKID":336,
    "USERID":2658,
    "TITLE":"早睡早起方能养生",
    "CONTENT":"要早睡早起哦",
    "CRETIME":"2016-08-17T14:45:44",
    "ISREALEASE":0,
    "RECEIVECLASSES":474,
    "READCOUNT":0,
    "TITLEURL":"http://www.hinear.com:81//Upload/Notice/Teacher/07B898222396467200.jpg",
    "IMAGEURL1":"http://www.hinear.com:81//Upload/Notice/Teacher/07B898222396467200.jpg"*/
	private int HKID; //标识ID 唯一
	private int USERID; //用户ID
	private String TITLE; //标题
	private String CONTENT; //内容
	private String CRETIME; //创建时间
	private int ISREALEASE; //是否启用
	private int RECEIVECLASSES; //接收班级id
	private int READCOUNT; //阅读次数
	private String TITLEURL; //上传图片地址
	public int getHKID() {
		return HKID;
	}
	public void setHKID(int hKID) {
		HKID = hKID;
	}
	public int getUSERID() {
		return USERID;
	}
	public void setUSERID(int uSERID) {
		USERID = uSERID;
	}
	public String getTITLE() {
		return TITLE;
	}
	public void setTITLE(String tITLE) {
		TITLE = tITLE;
	}
	public String getCONTENT() {
		return CONTENT;
	}
	public void setCONTENT(String cONTENT) {
		CONTENT = cONTENT;
	}
	public String getCRETIME() {
		return CRETIME;
	}
	public void setCRETIME(String cRETIME) {
		CRETIME = cRETIME;
	}
	public int getISREALEASE() {
		return ISREALEASE;
	}
	public void setISREALEASE(int iSREALEASE) {
		ISREALEASE = iSREALEASE;
	}
	public int getRECEIVECLASSES() {
		return RECEIVECLASSES;
	}
	public void setRECEIVECLASSES(int rECEIVECLASSES) {
		RECEIVECLASSES = rECEIVECLASSES;
	}
	public int getREADCOUNT() {
		return READCOUNT;
	}
	public void setREADCOUNT(int rEADCOUNT) {
		READCOUNT = rEADCOUNT;
	}
	public String getTITLEURL() {
		return TITLEURL;
	}
	public void setTITLEURL(String tITLEURL) {
		TITLEURL = tITLEURL;
	}
	public String getIMAGEURL1() {
		return IMAGEURL1;
	}
	public void setIMAGEURL1(String iMAGEURL1) {
		IMAGEURL1 = iMAGEURL1;
	}
	private String IMAGEURL1;
	
}

