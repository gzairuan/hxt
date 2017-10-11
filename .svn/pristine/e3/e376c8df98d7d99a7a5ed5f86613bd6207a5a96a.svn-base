package com.hinear.hxt.servlet.classes.video;

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

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.entity.Video;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class SubjectServlet
 */
@WebServlet("/videoServlet")
public class VideoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo user = (UserInfo) session.getAttribute("userInfo");
			PrintWriter pWriter = response.getWriter();
			String flag = request.getParameter("optFlag");
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

				String devID = request.getParameter("devID");
				String devName = request.getParameter("devName");
				params.put("SID", "" + user.getSID());
				params.put("PageIndex", "" + pageIndex);
				params.put("PageSize", "" + pageSize);
				if (!EmptyUtils.stringIsEmpty(devID))
					params.put("DEVID", devID);
				if (!EmptyUtils.stringIsEmpty(devName))
					params.put("DEVNAME", devName);
				String result = HttpUtils.getInstance().get("B65", params);
				pWriter.write(result);
			}
				break;
			case "add": {
				System.out.println(getVideoJson(request, user));
				params.put("VIDEO", getVideoJson(request, user));
				String result = HttpUtils.getInstance().post("B66", params);
				pWriter.write(result);
			}
				break;
			case "edit": {
				params.put("VIDEO", getVideoJson(request, user));
				String result = HttpUtils.getInstance().post("B67", params);
				pWriter.write(result);
			}
				break;
			case "delete": {
				String ids = request.getParameter("ids");
				params.put("IDS", ids);
				String result = HttpUtils.getInstance().get("B68", params);
				pWriter.write(result);
			}
				break;
			default:
				break;
			}
		}
	}

	private String getVideoJson(HttpServletRequest request, UserInfo user) {
		String[] classIDs = request.getParameterValues("classID");
		String classID = "";
		for (int i = 0, len = classIDs.length; i < len; i++) {
			classID += i == len - 1 ? classIDs[i] : classIDs[i] + ",";
		}
		String id = request.getParameter("id");
		String uid = request.getParameter("devID");
		String name = request.getParameter("devName");
		String key = request.getParameter("username");
		String pwd = request.getParameter("password");
		String remark = request.getParameter("remark");
		Video video = new Video();
		video.setSchoolid(user.getSID());
		video.setClassid(classID);
		video.setUid(uid);
		video.setName(name);
		video.setPwd(pwd);
		video.setKey(key);
		if (!EmptyUtils.stringIsEmpty(id))
			video.setId(TransformUtils.transformInt(id));
		video.setRemark(remark);
		return JSONUtil.toJSON(video);
	}

}
