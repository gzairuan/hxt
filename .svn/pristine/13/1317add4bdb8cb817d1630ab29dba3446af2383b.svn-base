package com.hinear.hxt.servlet.school.phonebook;

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
 * Servlet implementation class PhoneBookServlet
 */
@WebServlet("/phonebookServlet")
public class PhoneBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session!=null&&session.getAttribute("userInfo")!=null){
			UserInfo user = (UserInfo) session.getAttribute("userInfo");
			String cid = request.getParameter("cid");
			if(EmptyUtils.stringIsEmpty(cid)){
				response.getWriter().write(HttpUtils.RESULT_NO_DATA_JSON);
				return;
			}
			// 获取每页条数
			int pageSize = TransformUtils.transformInt(request.getParameter("limit"));// 每页显示的条数
			if (pageSize == 0) {
				pageSize = 10;
			}
			// 获取当前页第一条数据的下标
			int offset = TransformUtils.transformInt(request.getParameter("offset"));// 当前页第一条数据的下标（从0开始）
			// 算出当前页码
			int pageIndex = offset / pageSize;
			String name = request.getParameter("name");
			String phone = request.getParameter("phone");
			Map<String, String> params = new HashMap<>();
			params.put("SID", ""+user.getSID());
			params.put("UserID", ""+user.getUSERID());
			params.put("USERTYPEID", ""+user.getUSERTYPEID());
			params.put("CID", cid);
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			if(!EmptyUtils.stringIsEmpty(name))
				params.put("NAME", name);
			if(!EmptyUtils.stringIsEmpty(phone))
				params.put("PHONE", phone);
			String result = HttpUtils.getInstance().get("43A", params);
			response.getWriter().write(result);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
