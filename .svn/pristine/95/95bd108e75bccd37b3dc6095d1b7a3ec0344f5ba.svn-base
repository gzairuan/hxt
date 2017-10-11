package com.hinear.hxt.servlet.classes.video;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hinear.hxt.util.HttpUtils;

/**
 * Servlet implementation class SubjectServlet
 */
@WebServlet("/videoClassDataServlet")
public class VideoClassDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String devid = request.getParameter("devId");
		Map<String, String> params = new HashMap<String, String>();
		params.put("DEVID", devid);
		String result = HttpUtils.getInstance().get("C2", params);
		response.getWriter().write(result);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
