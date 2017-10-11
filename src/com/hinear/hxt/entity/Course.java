package com.hinear.hxt.entity;

import java.io.Serializable;

public class Course implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int classesId;
	private int tid;
	private int section;
	private String courseName;
	private int dayTime;
	private int weekday;
	public Course(int classesId, int tid, int section, String coursename, int daytime, int weekday) {
		this.classesId = classesId;
		this.tid = tid;
		this.section = section;
		this.courseName = coursename;
		this.dayTime = daytime;
		this.weekday = weekday;
	}
	public int getClassesId() {
		return classesId;
	}
	public void setClassesId(int classesId) {
		this.classesId = classesId;
	}
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public int getSection() {
		return section;
	}
	public void setSection(int section) {
		this.section = section;
	}
	public String getCoursename() {
		return courseName;
	}
	public void setCoursename(String coursename) {
		this.courseName = coursename;
	}
	public int getDaytime() {
		return dayTime;
	}
	public void setDaytime(int daytime) {
		this.dayTime = daytime;
	}
	public int getWeekday() {
		return weekday;
	}
	public void setWeekday(int weekday) {
		this.weekday = weekday;
	}
	
}
