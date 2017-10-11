package com.hinear.hxt.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * Servlet Filter implementation class EncodingFilter
 */
public class EncodingFilter implements Filter {

	private FilterConfig filterConfig;
	private String encoding;

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		this.encoding = null;
		this.filterConfig = null;
	}

	/**
	 * 过滤器的接口方法，用于执行过滤业务 无返回值;
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		if (encoding != null) {
			request.setCharacterEncoding(encoding); // 设置请求的编码
			// 设置应答对象的内容类型（包括编码格式）
			response.setContentType("text/html;charset=" + encoding);
			response.setCharacterEncoding(encoding);
		}
		chain.doFilter(request, response); // 传递给下一个过滤器
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		this.filterConfig = fConfig; // 初始化过滤器对象
		// 获取配置文件中指定的编码格式
		this.encoding = filterConfig.getInitParameter("encoding");
	}

}
