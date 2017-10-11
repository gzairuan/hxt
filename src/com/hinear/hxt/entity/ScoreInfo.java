package com.hinear.hxt.entity;

import java.io.Serializable;
/**
 * 
 * @author szs
 * @time 2017年8月3日 下午3:23:48
 * @version 1.0
 * 描述：学生成绩
 */
public class ScoreInfo implements Serializable {
	private static final long serialVersionUID = -5109998796069348917L;
	/*"SCOREID":95,
	"SUBJECTID":1,
	"SUBJECTNAME":"数学",
	"STUDENTID":1500,
	"STUDENTNAME":"张弛",
	"TID":2,
	"TNAME":"2015年上学期",
	"TBEGIN":"2014-08-16T00:00:00",
	"TEND":"2015-02-14T00:00:00",
	"RANK":60,
	"SCORE":"58"*/
	private int SCOREID;
	private int SUBJECTID;
	private String SUBJECTNAME;
	private int STUDENTID;
	private String STUDENTNAME;
	private int TID;
	private String TNAME;
	private String TBEGIN;
	private String TEND;
	private int RANK;
	private int SCORE;
	public int getSCOREID() {
		return SCOREID;
	}
	public void setSCOREID(int sCOREID) {
		SCOREID = sCOREID;
	}
	public int getSUBJECTID() {
		return SUBJECTID;
	}
	public void setSUBJECTID(int sUBJECTID) {
		SUBJECTID = sUBJECTID;
	}
	public String getSUBJECTNAME() {
		return SUBJECTNAME;
	}
	public void setSUBJECTNAME(String sUBJECTNAME) {
		SUBJECTNAME = sUBJECTNAME;
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
	public int getTID() {
		return TID;
	}
	public void setTID(int tID) {
		TID = tID;
	}
	public String getTNAME() {
		return TNAME;
	}
	public void setTNAME(String tNAME) {
		TNAME = tNAME;
	}
	public String getTBEGIN() {
		return TBEGIN;
	}
	public void setTBEGIN(String tBEGIN) {
		TBEGIN = tBEGIN;
	}
	public String getTEND() {
		return TEND;
	}
	public void setTEND(String tEND) {
		TEND = tEND;
	}
	public int getRANK() {
		return RANK;
	}
	public void setRANK(int rANK) {
		RANK = rANK;
	}
	public int getSCORE() {
		return SCORE;
	}
	public void setSCORE(int sCORE) {
		SCORE = sCORE;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}

