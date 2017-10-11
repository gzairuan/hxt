package com.hinear.hxt.servlet.school;

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
 * 
 * @author szs
 * @time 2017年7月11日 上午11:01:18
 * @version 1.0
 * 描述：学校通知table信息初始化，查询条件实现
 */
@WebServlet(description = "学校通知", urlPatterns = { "/schoolNoticeServlet" })
public class SchoolNoticeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		String jsonData = null;
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo"); //获取session中保存用户的bean
		if(userInfo != null){
			//获取每页条数
			int limit = TransformUtils.transformInt(request.getParameter("limit"));
			//获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));
			String typeId = request.getParameter("typeId"); //通知类型：1为学校通知;3为班级通知
			
			System.out.println("limit="+limit+" 学校ID："+ userInfo.getSID() + " 通知类型："+ typeId);
			
			if(limit == 0)
				limit = 10;
			//算出当前页码
			int pageIndex = offset / limit;
			
			//查询条件
			String startDate = request.getParameter("startDate");// 开始时间
			String endDate = request.getParameter("endDate");// 结束时间
			String keyword = request.getParameter("keyword");// 关键字
			System.out.println("开始时间："+startDate + " endDate:"+endDate + " keyword:"+keyword);
			
			Map<String, String> map = new HashMap<String, String>();
			map.put("PageIndex", pageIndex + ""); 
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

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
