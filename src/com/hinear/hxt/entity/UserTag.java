package com.hinear.hxt.entity;

import java.io.Serializable;

public class UserTag implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
     * USERID : 用户ID
     * UserTag : 用户标签（用于推送识别标识）
     */

    private int USERID;
    private String UserTag;
	public int getUSERID() {
		return USERID;
	}
	public void setUSERID(int uSERID) {
		USERID = uSERID;
	}
	public String getUserTag() {
		return UserTag;
	}
	public void setUserTag(String userTag) {
		UserTag = userTag;
	}
    
}
