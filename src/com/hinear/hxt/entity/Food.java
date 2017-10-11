package com.hinear.hxt.entity;

import java.io.Serializable;
import java.util.List;

public class Food implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int FOODID;
	private int SID;
	private String FOODDATE;
	private String WEEKDAY;
	private String FOODDETAIL;
	private String FOODDETAIL2;
	private List<FoodsDef> DATADEF;
	public int getFOODID() {
		return FOODID;
	}
	public void setFOODID(int fOODID) {
		FOODID = fOODID;
	}
	public int getSID() {
		return SID;
	}
	public void setSID(int sID) {
		SID = sID;
	}
	public String getFOODDATE() {
		return FOODDATE;
	}
	public void setFOODDATE(String fOODDATE) {
		FOODDATE = fOODDATE;
	}
	public String getWEEKDAY() {
		return WEEKDAY;
	}
	public void setWEEKDAY(String wEEKDAY) {
		WEEKDAY = wEEKDAY;
	}
	public String getFOODDETAIL() {
		return FOODDETAIL;
	}
	public void setFOODDETAIL(String fOODDETAIL) {
		FOODDETAIL = fOODDETAIL;
	}
	public String getFOODDETAIL2() {
		return FOODDETAIL2;
	}
	public void setFOODDETAIL2(String fOODDETAIL2) {
		FOODDETAIL2 = fOODDETAIL2;
	}
	public List<FoodsDef> getDATADEF() {
		return DATADEF;
	}
	public void setDATADEF(List<FoodsDef> dATADEF) {
		DATADEF = dATADEF;
	}
	
}
