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

import com.hinear.hxt.util.EmptyUtils;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.TransformUtils;

/**
 * Servlet implementation class SubjectServlet
 */
@WebServlet("/videoUserServlet")
public class VideoUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter pWriter = response.getWriter();
		String flag = request.getParameter("optFlag");
		Map<String, String> params = new HashMap<>();
		switch (flag) {
		case "query": {
			String cid = request.getParameter("cid");
			if(EmptyUtils.stringIsEmpty(cid)){
				pWriter.write(HttpUtils.RESULT_NO_DATA_JSON);
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

			String devID = request.getParameter("devId");
			String name = request.getParameter("name");
			params.put("PageIndex", "" + pageIndex);
			params.put("PageSize", "" + pageSize);
			params.put("DEVID", devID);
			params.put("CID", cid);
			if(!EmptyUtils.stringIsEmpty(name)){
				params.put("NAME", name);
			}
			String result = HttpUtils.getInstance().get("C2A", params);
			pWriter.write(result);
		}
			break;
		case "bind": {
			String divId = request.getParameter("devId");
			String data = request.getParameter("data");
//			JSONUtil.parseJSONList(data, new TypeToken<List<>>(){}.)
			params.put("DEVID", divId);
			params.put("VIDEOUSERS", data);
			String result = HttpUtils.getInstance().post("C2B", params);
			pWriter.write(result);
		}
			break;
		default:
			break;
		}
	}

}
