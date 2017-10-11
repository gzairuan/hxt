package com.hinear.hxt.entity;

import java.io.Serializable;

/**
 * 
 * @author szs
 * @time 2017年6月29日 下午2:36:18
 * @version 1.0
 * 描述：学校信息 Class
 * 
 */
public class SchoolInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	 /*"CHECKSTATE":0,
     "SID":87,
     "DOMAINID":96,
     "DOMAINNAME":"涉县",
     "SNAME":"乌鲁木齐好校通学校",
     "SADDRESS":"新疆乌鲁木齐自治区",
     "LINKNAME":"段校长",
     "MOBILE":"18099913310",
     "HANDLESTATE":0,
     "REMARK":null,
     "CTIME":"2017-06-12T17:28:38"*/
	private int CHECKSTATE;
	private int SID;
	private int DOMAINID;
	private String DOMAINNAME;
	private String SNAME;
	private String SADDRESS;
	private String LINKNAME;
	private String MOBILE;
	private int HANDLESTATE;
	private String REMARK;
	private String CTIME;
	public int getCHECKSTATE() {
		return CHECKSTATE;
	}
	public void setCHECKSTATE(int cHECKSTATE) {
		CHECKSTATE = cHECKSTATE;
	}
	public int getSID() {
		return SID;
	}
	public void setSID(int sID) {
		SID = sID;
	}
	public int getDOMAINID() {
		return DOMAINID;
	}
	public void setDOMAINID(int dOMAINID) {
		DOMAINID = dOMAINID;
	}
	public String getDOMAINNAME() {
		return DOMAINNAME;
	}
	public void setDOMAINNAME(String dOMAINNAME) {
		DOMAINNAME = dOMAINNAME;
	}
	public String getSNAME() {
		return SNAME;
	}
	public void setSNAME(String sNAME) {
		SNAME = sNAME;
	}
	public String getSADDRESS() {
		return SADDRESS;
	}
	public void setSADDRESS(String sADDRESS) {
		SADDRESS = sADDRESS;
	}
	public String getLINKNAME() {
		return LINKNAME;
	}
	public void setLINKNAME(String lINKNAME) {
		LINKNAME = lINKNAME;
	}
	public String getMOBILE() {
		return MOBILE;
	}
	public void setMOBILE(String mOBILE) {
		MOBILE = mOBILE;
	}
	public int getHANDLESTATE() {
		return HANDLESTATE;
	}
	public void setHANDLESTATE(int hANDLESTATE) {
		HANDLESTATE = hANDLESTATE;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
	}
	public String getCTIME() {
		return CTIME;
	}
	public void setCTIME(String cTIME) {
		CTIME = cTIME;
	}
	
	

}

