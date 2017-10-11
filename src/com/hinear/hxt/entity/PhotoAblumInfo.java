package com.hinear.hxt.entity;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @author szs
 * @time 2017年8月23日 下午3:45:24
 * @version 1.0
 * 描述：相册实体类 ，
 * 
 */
public class PhotoAblumInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	/*
	ALBUMID:自增长ID,主键
	CLASSESID:班级ID
	CLASSESName:班级名称
	SID:学校ID
	SName:学校名称
	ALBUMDESC： 相册描述
	CRETIME：创建时间
	CREUSER：创建人
	PRAISECOUNT：点赞次数
	data:list<job_photo>相册的	*/
	
	private int ALBUMID;
	private int CLASSESID;
	private String CLASSESName;
	private int SID;
	private String SName;
	private String ALBUMDESC;
	private String CRETIME;
	private String CREUSER;
	private int PRAISECOUNT;
	private List<PhotoInfo> data;
	public int getALBUMID() {
		return ALBUMID;
	}
	public void setALBUMID(int aLBUMID) {
		ALBUMID = aLBUMID;
	}
	public int getCLASSESID() {
		return CLASSESID;
	}
	public void setCLASSESID(int cLASSESID) {
		CLASSESID = cLASSESID;
	}
	public String getCLASSESName() {
		return CLASSESName;
	}
	public void setCLASSESName(String cLASSESName) {
		CLASSESName = cLASSESName;
	}
	public int getSID() {
		return SID;
	}
	public void setSID(int sID) {
		SID = sID;
	}
	public String getSName() {
		return SName;
	}
	public void setSName(String sName) {
		SName = sName;
	}
	public String getALBUMDESC() {
		return ALBUMDESC;
	}
	public void setALBUMDESC(String aLBUMDESC) {
		ALBUMDESC = aLBUMDESC;
	}
	public String getCRETIME() {
		return CRETIME;
	}
	public void setCRETIME(String cRETIME) {
		CRETIME = cRETIME;
	}
	public String getCREUSER() {
		return CREUSER;
	}
	public void setCREUSER(String cREUSER) {
		CREUSER = cREUSER;
	}
	public int getPRAISECOUNT() {
		return PRAISECOUNT;
	}
	public void setPRAISECOUNT(int pRAISECOUNT) {
		PRAISECOUNT = pRAISECOUNT;
	}
	public List<PhotoInfo> getData() {
		return data;
	}
	public void setData(List<PhotoInfo> data) {
		this.data = data;
	}
	
}

