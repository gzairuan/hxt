package com.hinear.hxt.entity;

import java.io.Serializable;

public class BodyCheck implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int ID;
	private int SID;
	private int CLASSESID;
	private String CLASSESNAME;
	private int STUDENTID;
	private String STUDENTNAME;
	private String DATE;
	private String NUMBER;
	private String HEIGHT;
	private String WEIGHT;
	private String HEADSIZE;
	private String BUSTSIZE;
	private String BODYSTATE;
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
	public int getSTUDENTID() {
		return STUDENTID;
	}
	public void setSTUDENTID(int sTUDENTID) {
		STUDENTID = sTUDENTID;
	}
	public String getSTUDENTNAME() {
		return STUDENTNAME;
	}
	public void setSTUDENTNAME(String sTUDENTNAME) {
		STUDENTNAME = sTUDENTNAME;
	}
	public String getDATE() {
		return DATE;
	}
	public void setDATE(String dATE) {
		DATE = dATE;
	}
	public String getNUMBER() {
		return NUMBER;
	}
	public void setNUMBER(String nUMBER) {
		NUMBER = nUMBER;
	}
	public String getHEIGHT() {
		return HEIGHT;
	}
	public void setHEIGHT(String hEIGHT) {
		HEIGHT = hEIGHT;
	}
	public String getWEIGHT() {
		return WEIGHT;
	}
	public void setWEIGHT(String wEIGHT) {
		WEIGHT = wEIGHT;
	}
	public String getHEADSIZE() {
		return HEADSIZE;
	}
	public void setHEADSIZE(String hEADSIZE) {
		HEADSIZE = hEADSIZE;
	}
	public String getBUSTSIZE() {
		return BUSTSIZE;
	}
	public void setBUSTSIZE(String bUSTSIZE) {
		BUSTSIZE = bUSTSIZE;
	}
	public String getBODYSTATE() {
		return BODYSTATE;
	}
	public void setBODYSTATE(String bODYSTATE) {
		BODYSTATE = bODYSTATE;
	}

}
