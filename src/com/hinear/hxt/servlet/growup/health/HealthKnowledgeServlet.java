package com.hinear.hxt.servlet.growup.health;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.HealthKonwlege;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 
 * @author szs
 * @time 2017年8月3日 下午6:49:32
 * @version 1.0 描述：健康知识
 */
@WebServlet("/healthKnowledgeServlet")
public class HealthKnowledgeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String flag = request.getParameter("optFlag");
		UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
		if (userInfo == null) {
			return;
		}
		String result = "";
		Map<String, String> map = new HashMap<>();
		switch (flag) {
		case "init": {
			int limit = TransformUtils.transformInt(request.getParameter("limit"));
			int offset = TransformUtils.transformInt(request.getParameter("offset"));
			if (limit == 0) {
				limit = 10;
			}
			int pageIndex = offset / limit;
			String title = request.getParameter("title");// 标题
			String content = request.getParameter("content");// 内容

			map.put("PageIndex", pageIndex + "");
			map.put("PageSize", limit + "");
			map.put("SID", userInfo.getSID() + "");
			map.put("USERID", userInfo.getUSERID() + "");
			if (!EmptyUtils.stringIsEmpty(title)) {
				map.put("TITLE", title);
			}
			if (!EmptyUtils.stringIsEmpty(content)) {
				map.put("CONTENT", content);
			}
			result = HttpUtils.getInstance().get("37", map);
		}
			break;
		case "add": {
			String cid = request.getParameter("cid"); // 班级
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			HealthKonwlege hk = new HealthKonwlege();
			hk.setUSERID(userInfo.getUSERID());
			hk.setRECEIVECLASSES(TransformUtils.transformInt(cid));
			hk.setTITLE(title);
			hk.setCONTENT(content);
			String hkJson = JSONUtil.toJSON(hk);
			map.put("HEALTHKNOWLEDGE", hkJson);
			result = HttpUtils.getInstance().post("37A", map);
		}
			break;
		case "edit": {
			String cid = request.getParameter("cid"); // 班级
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String hkid = request.getParameter("hkid");
			HealthKonwlege hk = new HealthKonwlege();
			hk.setHKID(Integer.valueOf(hkid));
			hk.setUSERID(userInfo.getUSERID());
			hk.setRECEIVECLASSES(TransformUtils.transformInt(cid));
			hk.setTITLE(title);
			hk.setCONTENT(content);
			String hkJson = JSONUtil.toJSON(hk);
			map.put("HEALTHKNOWLEDGE", hkJson);

			result = HttpUtils.getInstance().post("37C", map);
		}
			break;
		case "delete": {
			String hkid = request.getParameter("hkid");
			map.put("IDS", hkid);
			result = HttpUtils.getInstance().get("37B", map);
		}
			break;
		}
		response.getWriter().print(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
