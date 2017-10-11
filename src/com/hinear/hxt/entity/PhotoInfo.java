package com.hinear.hxt.entity;

import java.io.Serializable;

/**
 * 
 * @author szs
 * @time 2017年8月23日 下午3:48:56
 * @version 1.0
 * 描述： 照片实体
 */
public class PhotoInfo implements Serializable{
	private static final long serialVersionUID = 1L;
	/*"PHOTOID":11597,
    "ALBUMID":1119,
    "PHOTODESC":"04F868687559512100.png",
    "PHOTOURL":"http://www.hinear.com:81//Upload/Album/School/04F868687559512100.png",
    "UPLOADTIME":"2017-08-17T19:47:47",
    "SEECOUNT":0,
    "PRAISECOUNT":0,
    "ISPRAISED":0
    
    ALBUMID: 相册id
    PHOTOID：照片ID
	PHOTODESC：照片描述
	PHOTOURL：照片地址
	ISREPLY：是否回复过
	UPLOADTIME:上传时间
	SEECOUNT：观看次数
	PRAISECOUNT：点赞次数
    */
	private int ALBUMID;
	private int PHOTOID;
	private String PHOTODESC;
	private String PHOTOURL;
	private String UPLOADTIME;
	private int SEECOUNT;
	private int PRAISECOUNT;
	
	public int getALBUMID() {
		return ALBUMID;
	}
	public void setALBUMID(int aLBUMID) {
		ALBUMID = aLBUMID;
	}
	public int getPHOTOID() {
		return PHOTOID;
	}
	public void setPHOTOID(int pHOTOID) {
		PHOTOID = pHOTOID;
	}
	public String getPHOTODESC() {
		return PHOTODESC;
	}
	public void setPHOTODESC(String pHOTODESC) {
		PHOTODESC = pHOTODESC;
	}
	public String getPHOTOURL() {
		return PHOTOURL;
	}
	public void setPHOTOURL(String pHOTOURL) {
		PHOTOURL = pHOTOURL;
	}
	public String getUPLOADTIME() {
		return UPLOADTIME;
	}
	public void setUPLOADTIME(String uPLOADTIME) {
		UPLOADTIME = uPLOADTIME;
	}
	public int getSEECOUNT() {
		return SEECOUNT;
	}
	public void setSEECOUNT(int sEECOUNT) {
		SEECOUNT = sEECOUNT;
	}
	public int getPRAISECOUNT() {
		return PRAISECOUNT;
	}
	public void setPRAISECOUNT(int pRAISECOUNT) {
		PRAISECOUNT = pRAISECOUNT;
	}
	public int getISREPLY() {
		return ISREPLY;
	}
	public void setISREPLY(int iSREPLY) {
		ISREPLY = iSREPLY;
	}
	private int ISREPLY;
}

