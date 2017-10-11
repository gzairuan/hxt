package com.hinear.hxt.servlet.classes.subject;

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

import com.hinear.hxt.entity.Subject;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class SubjectServlet
 */
@WebServlet("/subjectServlet")
public class SubjectServlet extends HttpServlet {
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
				params.put("SID", "" + user.getSID());
				params.put("PageIndex", "" + pageIndex);
				params.put("PageSize", "" + pageSize);
				String result = HttpUtils.getInstance().get("B61", params);
				pWriter.write(result);
			}
				break;
			case "add": {
				String name = request.getParameter("subjectName");
				Subject subject = new Subject();
				subject.setSID(user.getSID());
				subject.setSUBJECTNAME(name);
				params.put("SUBJECT", JSONUtil.toJSON(subject));
				String result = HttpUtils.getInstance().post("B62", params);
				pWriter.write(result);
			}
				break;
			case "edit": {
				int id = TransformUtils.transformInt(request.getParameter("SUBJECTID"));
				String name = request.getParameter("SUBJECTNAME");
				Subject subject = new Subject();
				subject.setSUBJECTID(id);;
				subject.setSUBJECTNAME(name);
				params.put("SUBJECT", JSONUtil.toJSON(subject));
				String result = HttpUtils.getInstance().post("B63", params);
				pWriter.write(result);
			}
				break;
			case "delete": {
				String ids = request.getParameter("ids");
				params.put("IDS", ids);
				String result = HttpUtils.getInstance().get("B64", params);
				pWriter.write(result);
			}
				break;
			default:
				break;
			}
		}
	}

}
