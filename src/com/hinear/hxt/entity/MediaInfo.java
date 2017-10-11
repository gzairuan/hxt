package com.hinear.hxt.entity;

import java.io.Serializable;

public class MediaInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * "ATTACHMENTID":标识
	 *  "ATTACHMENTURL":
	 * "OTHERID":其他标识
	 * "OTHERTYPEID":其他类型标识
	 *  "ATTACHMENTTYPE":"IMAGE"//类型
	 * "UPLOADTIME":
	 *	"ATTACHMENTTITLE":null,
	 * "ATTACHMENTIMGURL":null, 
	 * "THUMIMAGEURL":null
	 */
	
	private int ATTACHMENTID;
	private String ATTACHMENTURL;
	private int OTHERID;
	private int OTHERTYPEID;
	private String ATTACHMENTTYPE;
	private String UPLOADTIME;
	private String ATTACHMENTTITLE;
	private String ATTACHMENTIMGURL;
	private String THUMIMAGEURL;
	public int getATTACHMENTID() {
		return ATTACHMENTID;
	}
	public void setATTACHMENTID(int aTTACHMENTID) {
		ATTACHMENTID = aTTACHMENTID;
	}
	public String getATTACHMENTURL() {
		return ATTACHMENTURL;
	}
	public void setATTACHMENTURL(String aTTACHMENTURL) {
		ATTACHMENTURL = aTTACHMENTURL;
	}
	public int getOTHERID() {
		return OTHERID;
	}
	public void setOTHERID(int oTHERID) {
		OTHERID = oTHERID;
	}
	public int getOTHERTYPEID() {
		return OTHERTYPEID;
	}
	public void setOTHERTYPEID(int oTHERTYPEID) {
		OTHERTYPEID = oTHERTYPEID;
	}
	public String getATTACHMENTTYPE() {
		return ATTACHMENTTYPE;
	}
	public void setATTACHMENTTYPE(String aTTACHMENTTYPE) {
		ATTACHMENTTYPE = aTTACHMENTTYPE;
	}
	public String getUPLOADTIME() {
		return UPLOADTIME;
	}
	public void setUPLOADTIME(String uPLOADTIME) {
		UPLOADTIME = uPLOADTIME;
	}
	public String getATTACHMENTTITLE() {
		return ATTACHMENTTITLE;
	}
	public void setATTACHMENTTITLE(String aTTACHMENTTITLE) {
		ATTACHMENTTITLE = aTTACHMENTTITLE;
	}
	public String getATTACHMENTIMGURL() {
		return ATTACHMENTIMGURL;
	}
	public void setATTACHMENTIMGURL(String aTTACHMENTIMGURL) {
		ATTACHMENTIMGURL = aTTACHMENTIMGURL;
	}
	public String getTHUMIMAGEURL() {
		return THUMIMAGEURL;
	}
	public void setTHUMIMAGEURL(String tHUMIMAGEURL) {
		THUMIMAGEURL = tHUMIMAGEURL;
	}
	
	
}
