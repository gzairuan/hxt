package com.hinear.hxt.entity;

import java.io.Serializable;

public class FoodsDef implements Serializable{

	private static final long serialVersionUID = 1L;
	private int ID;
	private int SID;
	private String DEFTYPE;
	private String DEFNAME;
	private String DEFDESC;
	private String SEQ;
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
	public void setDEFDESC(String dEFDESC) {
		DEFDESC = dEFDESC;
	}
	public String getDEFDESC() {
		return DEFDESC;
	}
	public String getDEFTYPE() {
		return DEFTYPE;
	}
	public void setDEFTYPE(String dEFTYPE) {
		DEFTYPE = dEFTYPE;
	}
	public String getDEFNAME() {
		return DEFNAME;
	}
	public void setDEFNAME(String dEFNAME) {
		DEFNAME = dEFNAME;
	}
	public String getSEQ() {
		return SEQ;
	}
	public void setSEQ(String sEQ) {
		SEQ = sEQ;
	}
}
