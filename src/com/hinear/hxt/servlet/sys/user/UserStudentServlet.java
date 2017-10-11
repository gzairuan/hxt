package com.hinear.hxt.servlet.sys.user;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class SubjectServlet
 */
@WebServlet("/userStudentServlet")
public class UserStudentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		UserInfo info = (UserInfo) request.getSession().getAttribute("userInfo");
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

			String parentId = request.getParameter("parentId");
			String cid = request.getParameter("cid");
			String name = request.getParameter("name");
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			params.put("ParentID", parentId);
			params.put("SID", ""+info.getSID());
			if(!EmptyUtils.stringIsEmpty(name)){
				params.put("NAME", name);
			}
			if(!EmptyUtils.stringIsEmpty(cid)){
				params.put("CID", cid);
			}
			String result = HttpUtils.getInstance().get("C4", params);
			pWriter.write(result);
		}
			break;
		case "bind": {
			String parentId = request.getParameter("parentId");
			String data = request.getParameter("data");
//			JSONUtil.parseJSONList(data, new TypeToken<List<>>(){}.)
			params.put("ParentID", parentId);
			params.put("STUDENTS", data);
			String result = HttpUtils.getInstance().post("C4A", params);
			pWriter.write(result);
		}
			break;
		default:
			break;
		}
	}

}
