package com.hinear.hxt.entity.usertype;

import java.io.Serializable;

/**
 * 
 * @author szs
 * @time 2017年9月21日 下午2:24:49
 * @version 1.0
 * 描述：用户类型
 */
public class UserType implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int USERTYPEID;
	private String USERTYPENAME;
	private String REMARK;
	
	public int getUSERTYPEID() {
		return USERTYPEID;
	}
	public void setUSERTYPEID(int uSERTYPEID) {
		USERTYPEID = uSERTYPEID;
	}
	public String getUSERTYPENAME() {
		return USERTYPENAME;
	}
	public void setUSERTYPENAME(String uSERTYPENAME) {
		USERTYPENAME = uSERTYPENAME;
	}
	public String getREMARK() {
		return REMARK;
	}
	public void setREMARK(String rEMARK) {
		REMARK = rEMARK;
	}
}

