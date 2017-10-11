package com.hinear.hxt.servlet.classes;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * ClassesNoticeInitServlet 班级通知servlet
 * @time 2017-6-16
 * @author szs
 */
@WebServlet("/classesNoticeInitServlet")
public class ClassesNoticeInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String jsonData = null;
		
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		if(userInfo != null){
			//获取每页数量limit, 当前页第一条数据下标offset 
			int limit = TransformUtils.transformInt(request.getParameter("limt"));
			int offset = TransformUtils.transformInt(request.getParameter("offset"));
			String typeId = request.getParameter("typeId") == null ? "3" : request.getParameter("typeId"); //班级通知 为 3
			if(limit == 0)
				limit = 10;
			//算出当前页码
			int PageIndex = offset/limit;
			//查询条件
			String startDate = request.getParameter("startDate");// 开始时间
			String endDate = request.getParameter("endDate");// 结束时间
			String keyword = request.getParameter("keyword");// 关键字
			System.out.println("开始时间："+startDate + " endDate:"+endDate + " keyword:"+keyword);
			
			Map<String, String> map = new HashMap<String, String>();
			map.put("PageIndex", PageIndex + ""); 
			map.put("PageSize", limit + "");
			map.put("SID", userInfo.getSID() + ""); //学校ID
			map.put("TYPEID", typeId);
			if(!EmptyUtils.stringIsEmpty(startDate)){
				map.put("SDATE", startDate);
			}
			if(!EmptyUtils.stringIsEmpty(endDate)){
				map.put("TDATE", endDate);
			}
			if(!EmptyUtils.stringIsEmpty(keyword)){
				map.put("KEYWORD", keyword);
			}
			
			jsonData = HttpUtils.getInstance().get("06", map); 
			response.getWriter().print(jsonData);
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
