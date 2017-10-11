package com.hinear.hxt.servlet.news;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.News;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * 查询作业等数据
 */
@WebServlet("/queryNewsServlet")
public class QueryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int typeId = TransformUtils.transformInt(request.getParameter("typeId"));// News类型
		if ("0".equals(typeId)) {
			// 传值错误
			response.getWriter().write("error");
		} else {
			HttpSession session = request.getSession();
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			if(userInfo!=null){
				// 获取每页条数
				int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
				if (pageSize == 0) {
					pageSize = 10;
				}
				
				// 获取当前页第一条数据的下标
				int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
				// 算出当前页码
				int pageIndex = offset / pageSize;
				String serverType;// 接口入口标识
				Map<String, String> map = new HashMap<>();// 接口请求参数
				String startDate = request.getParameter("startDate");// 开始日期
				String endDate = request.getParameter("endDate");// 结束日期
				String keyword = request.getParameter("keyword");// 关键字
				String classId = request.getParameter("classId");// 选择的班级
				System.out.println("startDate==" + startDate + ";endDate==" + endDate + ";keyword==" + keyword);
				System.out.println("classId=" + classId);
				switch (typeId) {
				case News.TYPE_HOMEWORK:// 每日作业
					serverType = "21";
					break;
				case News.TYPE_REVIEW:
					serverType = "32";
					break;
					
				default:
					// 其他类型
					serverType = "";
					break;
				}
				map.put("PageSize", pageSize + "");
				map.put("PageIndex", pageIndex + "");
				map.put("SID", ""+userInfo.getSID());
				map.put("CIDS", classId == null ? "0" : classId);
				map.put("USERID", ""+userInfo.getUSERID());
				map.put("USERTYPEID", ""+userInfo.getUSERTYPEID());
				if(!EmptyUtils.stringIsEmpty(startDate)){
					map.put("SDATE", startDate);
				}
				if(!EmptyUtils.stringIsEmpty(endDate)){
					map.put("TDATE", endDate);
				}
				if(!EmptyUtils.stringIsEmpty(keyword)){
					map.put("KEYWORD", keyword);
				}
				// 开始接口请求数据
				String jsonData = HttpUtils.getInstance().get(serverType, map);
				// 返回数据
				response.getWriter().print(jsonData);
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
