package com.hinear.hxt.servlet.news;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.News;
import com.hinear.hxt.entity.NoticeInfo;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * 新增通知数据
 */
@WebServlet("/addNewsServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * 参数 title标题 content内容 typeid类型id {@link NoticeInfo#TYPE_CLASS}
	 * 教师通知需teacherGroupIds教师组id集合 班级通知需cid班级id
	 * 
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		UserInfo userInfo =  (UserInfo) session.getAttribute("userInfo");
		if (userInfo != null) {
			int typeid = TransformUtils.transformInt(request.getParameter("typeId"));
			if(typeid!=0){
				String serverType;
				switch (typeid) {
				case News.TYPE_HOMEWORK:
					serverType = "21A";
					break;
				default:
					serverType = "";
					break;
				}
				int classId = TransformUtils.transformInt(request.getParameter("classId"));
				String title = request.getParameter("title");
				String content = request.getParameter("content");
				News news = new News();
				news.setNEWSTYPEID(typeid);
				news.setSENDID(userInfo.getUSERID());
				news.setCLASSESID(classId);
				news.setTITLE(title);
				news.setCONTENT(content);
				String jsonNews = JSONUtil.toJSON(news);
				System.out.println(jsonNews);
				Map<String, String> params = new HashMap<>();
				params.put("JOBNEWS", jsonNews);
				String result = HttpUtils.getInstance().get(serverType, params);
				PrintWriter pw = response.getWriter();
				pw.write(result);
			}

		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
