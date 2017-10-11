package com.hinear.hxt.servlet.sys.clock;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.SchoolTime;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class StudentDataServlet
 */
@WebServlet("/clockTimeServlet")
public class ClockTimeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			String flag = request.getParameter("optFlag");
			switch (flag) {
			case "query": {
				Map<String, String> params = new HashMap<String, String>();
				params.put("SID", "" + userInfo.getSID());
				String resutl = HttpUtils.getInstance().get("B23T", params);
				response.getWriter().write(resutl);
			}
				break;
			case "update": {
				int isOpen = TransformUtils.transformInt(request.getParameter("isopen"));
				SchoolTime schoolTime;
				if(isOpen==0){
					String upTime = request.getParameter("upTime");
					String downTime = request.getParameter("downTime");
					schoolTime = new  SchoolTime(userInfo.getSID(),upTime,downTime,isOpen);
				}else{
					String amUpTime = request.getParameter("amUpTime");
					String amDownTime = request.getParameter("amDownTime");
					String pmUpTime = request.getParameter("pmUpTime");
					String pmDownTime = request.getParameter("pmDownTime");
					schoolTime = new  SchoolTime(userInfo.getSID(),amUpTime,amDownTime,pmUpTime,pmDownTime,isOpen);
				}
				Map<String, String> params = new HashMap<String, String>();
				params.put("SCHOOLTIME", JSONUtil.toJSON(schoolTime));
				String resutl = HttpUtils.getInstance().post("B23N", params);
				response.getWriter().write(resutl);
			}
				break;
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
