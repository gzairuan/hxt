package com.hinear.hxt.entity;

import java.io.Serializable;

public class StudentInfo implements Serializable {

	private static final long serialVersionUID = 1L;

	private int STUDENTID;
	private int CLASSESID;
	private String CLASSESNAME;
	private String BIRTHDAY;
	private String STUDENTNAME;
	private String PHOTO;
	private String SEX;
	private String STUDENTNO;
	private String ENTRYTIME;
	private String LEAVETIME;
	private String ADDRESS;
	private String MOBILE;
	private String state;
	
	public StudentInfo() {
	}
	
	public StudentInfo(int cLASSESID, String bIRTHDAY, String sTUDENTNAME, String sEX, String sTUDENTNO,
			String eNTRYTIME, String aDDRESS) {
		CLASSESID = cLASSESID;
		BIRTHDAY = bIRTHDAY;
		STUDENTNAME = sTUDENTNAME;
		SEX = sEX;
		STUDENTNO = sTUDENTNO;
		ENTRYTIME = eNTRYTIME;
		ADDRESS = aDDRESS;
	}

	public int getSTUDENTID() {
		return STUDENTID;
	}

	public void setSTUDENTID(int sTUDENTID) {
		STUDENTID = sTUDENTID;
	}

	public int getCLASSESID() {
		return CLASSESID;
	}

	public void setCLASSESID(int cLASSESID) {
		CLASSESID = cLASSESID;
	}

	public String getCLASSESNAME() {
		return CLASSESNAME;
	}

	public void setCLASSESNAME(String cLASSESNAME) {
		CLASSESNAME = cLASSESNAME;
	}

	public String getBIRTHDAY() {
		return BIRTHDAY;
	}

	public void setBIRTHDAY(String bIRTHDAY) {
		BIRTHDAY = bIRTHDAY;
	}

	public String getSTUDENTNAME() {
		return STUDENTNAME;
	}

	public void setSTUDENTNAME(String sTUDENTNAME) {
		STUDENTNAME = sTUDENTNAME;
	}

	public String getPHOTO() {
		return PHOTO;
	}

	public void setPHOTO(String pHOTO) {
		PHOTO = pHOTO;
	}

	public String getSEX() {
		return SEX;
	}

	public void setSEX(String sEX) {
		SEX = sEX;
	}

	public String getSTUDENTNO() {
		return STUDENTNO;
	}

	public void setSTUDENTNO(String sTUDENTNO) {
		STUDENTNO = sTUDENTNO;
	}

	public String getENTRYTIME() {
		return ENTRYTIME;
	}

	public void setENTRYTIME(String eNTRYTIME) {
		ENTRYTIME = eNTRYTIME;
	}

	public String getLEAVETIME() {
		return LEAVETIME;
	}

	public void setLEAVETIME(String lEAVETIME) {
		LEAVETIME = lEAVETIME;
	}

	public String getADDRESS() {
		return ADDRESS;
	}

	public void setADDRESS(String aDDRESS) {
		ADDRESS = aDDRESS;
	}

	public String getMOBILE() {
		return MOBILE;
	}

	public void setMOBILE(String mOBILE) {
		MOBILE = mOBILE;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

}
