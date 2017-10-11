package com.hinear.hxt.servlet.school.cookbook;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hinear.hxt.entity.FoodsDef;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class CookbookOptionsServlet
 */
@WebServlet("/cookbookOptionsServlet")
public class CookbookOptionsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 得到session
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("userInfo") != null) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
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
				params.put("SID", "" + userInfo.getSID());
				params.put("PageIndex", "" + pageIndex);
				params.put("PageSize", "" + pageSize);
				String result = HttpUtils.getInstance().get("B37", params);
				response.getWriter().write(result);
			}
				break;
			case "add": {
				String type = request.getParameter("defType");
				String name = request.getParameter("defName");
				String seq = request.getParameter("defSEQ");
				FoodsDef food = new FoodsDef();
				food.setSID(userInfo.getSID());
				food.setDEFTYPE(type);
				food.setDEFNAME(name);
				food.setSEQ(seq);
				params.put("JOB_DEFTYPE", JSONUtil.toJSON(food));
				String result = HttpUtils.getInstance().get("B39", params);
				response.getWriter().write(result);
			}
				break;
			case "edit": {
				String id = request.getParameter("id");
				String type = request.getParameter("defType");
				String name = request.getParameter("defName");
				String seq = request.getParameter("defSEQ");
				if(EmptyUtils.stringIsEmpty(id)){
					response.getWriter().write(HttpUtils.RESULT_FAIL_JSON);
					return;
				}
				FoodsDef food = new FoodsDef();
				food.setID(TransformUtils.transformInt(id));
				food.setSID(userInfo.getSID());
				food.setDEFTYPE(type);
				food.setDEFNAME(name);
				food.setSEQ(seq);
				params.put("JOB_DEFTYPE", JSONUtil.toJSON(food));
				String result = HttpUtils.getInstance().get("B40", params);
				response.getWriter().write(result);
			}
				break;
			case "delete": {
				String id = request.getParameter("id");
				params.put("ID", id);
				String result = HttpUtils.getInstance().get("B38", params);
				response.getWriter().write(result);
			}
				break;
			default:
				break;
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
