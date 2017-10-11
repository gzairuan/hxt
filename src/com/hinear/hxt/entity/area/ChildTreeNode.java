package com.hinear.hxt.entity.area;

import java.io.Serializable;

/**
 * @author szs
 * @time 2017年9月7日 下午5:33:14
 * @version 1.0
 * 描述：区域孩子节点
 */
public class ChildTreeNode implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String text; //节点名称
	private String href; // 节点链接
	private String tags; //额外参数
	private int id; //区域ID
	private String code; //区域代码
	private String provice; //省份
	private String city; //城市（节点名称）
	private String district; //街道
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getProvice() {
		return provice;
	}
	public void setProvice(String provice) {
		this.provice = provice;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
}

