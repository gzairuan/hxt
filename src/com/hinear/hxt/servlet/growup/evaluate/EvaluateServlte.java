package com.hinear.hxt.servlet.growup.evaluate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.News;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年8月1日 上午11:12:25
 * @version 1.0 描述：每周评价servlet
 */
@WebServlet("/evaluateServlte")
public class EvaluateServlte extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String flag = request.getParameter("optFlag"); // 操作标记
		String result = "";
		UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
		if (userInfo == null) {
			return;
		}
		Map<String, String> params = new HashMap<>();
		switch (flag) {
		case "query": {
			// 获取每页条数
			int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
			if (pageSize == 0) {
				pageSize = 10;
			}
			// 获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
			// 算出当前页码
			int pageIndex = offset / pageSize;
			String sdate = request.getParameter("startDate");
			String edate = request.getParameter("endDate");
			String cid = request.getParameter("cid");
			String keyword = request.getParameter("keyword");
			params.put("SID", "" + userInfo.getSID());
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			if (!EmptyUtils.stringIsEmpty(sdate)) {
				params.put("STARTDATE", sdate);
			}
			if (!EmptyUtils.stringIsEmpty(edate)) {
				params.put("ENDDATE", edate);
			}
			if (!EmptyUtils.stringIsEmpty(cid)) {
				params.put("CID", cid);
			}
			if (!EmptyUtils.stringIsEmpty(keyword)) {
				params.put("KEYWORD", keyword);
			}
			result = HttpUtils.getInstance().get("32", params);
		}
			break;
		case "add": {
			int cid = TransformUtils.transformInt(request.getParameter("classID"));
			int stuid = TransformUtils.transformInt(request.getParameter("studentID"));
			String content = request.getParameter("content");
			News news = new News();
			news.setNEWSTYPEID(2);
			news.setSENDID(userInfo.getUSERID());
			news.setSTUDENTID(stuid);
			news.setCLASSESID(cid);
			news.setCONTENT(content);
			String json = JSONUtil.toJSON(news);
			params.put("JOBNEWS", json);
			result = HttpUtils.getInstance().get("32A", params);
		}
			break;
		case "edit": {
			int id = TransformUtils.transformInt(request.getParameter("id"));
			String content = request.getParameter("content");
			News news = new News();
			news.setNEWID(id);
			news.setCONTENT(content);
			String json = JSONUtil.toJSON(news);
			params.put("JOBNEWS", json);
			result = HttpUtils.getInstance().get("32C", params);
		}
			break;
		case "delete": {
			String id = request.getParameter("id");
			params.put("ID", id);
			result = HttpUtils.getInstance().get("32B", params);
		}
			break;

		default:
			break;
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
