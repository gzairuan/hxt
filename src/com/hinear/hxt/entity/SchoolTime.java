package com.hinear.hxt.entity;

import java.io.Serializable;

public class SchoolTime implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int ID;
	private int SID;
	private String UPTIME;
	private String DOWNTIME;
	private String AMUPTIME;
	private String AMDOWNTIME;
	private String PMUPTIME;
	private String PMDOWNTIME;
	private int ISOPEN;
	public SchoolTime(int sid, String upTime, String downTime, int isOpen) {
		this.SID = sid;
		this.UPTIME = upTime;
		this.DOWNTIME = downTime;
		this.ISOPEN = isOpen;
	}
	
	public SchoolTime(int sID, String aMUPTIME, String aMDOWMTIME, String pMUPTIME, String pMDOWMTIME, int iSOPEM) {
		SID = sID;
		AMUPTIME = aMUPTIME;
		AMDOWNTIME = aMDOWMTIME;
		PMUPTIME = pMUPTIME;
		PMDOWNTIME = pMDOWMTIME;
		ISOPEN = iSOPEM;
	}

	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public int getSID() {
		return SID;
	}
	public void setSID(int sID) {
		SID = sID;
	}
	public String getUPTIME() {
		return UPTIME;
	}
	public void setUPTIME(String uPTIME) {
		UPTIME = uPTIME;
	}
	public String getDOWMTIME() {
		return DOWNTIME;
	}
	public void setDOWMTIME(String dOWMTIME) {
		DOWNTIME = dOWMTIME;
	}
	public String getAMUPTIME() {
		return AMUPTIME;
	}
	public void setAMUPTIME(String aMUPTIME) {
		AMUPTIME = aMUPTIME;
	}
	public String getAMDOWMTIME() {
		return AMDOWNTIME;
	}
	public void setAMDOWMTIME(String aMDOWMTIME) {
		AMDOWNTIME = aMDOWMTIME;
	}
	public String getPMUPTIME() {
		return PMUPTIME;
	}
	public void setPMUPTIME(String pMUPTIME) {
		PMUPTIME = pMUPTIME;
	}
	public String getPMDOWMTIME() {
		return PMDOWNTIME;
	}
	public void setPMDOWMTIME(String pMDOWMTIME) {
		PMDOWNTIME = pMDOWMTIME;
	}
	public int getISOPEM() {
		return ISOPEN;
	}
	public void setISOPEM(int iSOPEM) {
		ISOPEN = iSOPEM;
	}
	
}
