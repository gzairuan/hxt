package com.hinear.hxt.servlet.school;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.google.gson.JsonObject;

/**
 * 重新summernote 创建的onImageUpload 方法实现把图片上传到服务器 Servlet implementation class
 * UploadFileEdit
 */
@WebServlet("/uploadFileEdit")
public class UploadFileEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("进入uploadFileEdit方法");
		request.setCharacterEncoding("utf-8");

		// 得到上传文件的保存目录，将上传的文件存放于WEB-INF目录下，不允许外界直接访问，保证上传文件的安全
		String savePath = this.getServletContext().getRealPath("/upload" + File.separator + "schoolInfo");
		String fileName = "";
		System.out.println("savePath=" + savePath);

		File file = new File(savePath);
		// 判断上传文件目录是否存在
		if (!file.exists() && !file.isDirectory()) {
			file.mkdir();
		}
		// File file = new File(savePath);
		String message = "";

		DiskFileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);

		// 判断提交表单的类型是否为multipart/form-data
		if (!ServletFileUpload.isMultipartContent(request)) {
			System.out.println("isMultipartContent -->return");
			return;
		}
		try {
			List<FileItem> list = upload.parseRequest(request);
			Iterator<FileItem> it = list.iterator();

			while (it.hasNext()) {
				FileItem item = (FileItem) it.next();// 每一个item就代表一个表单输出项
				String fieldName = item.getFieldName();
				System.out.println("fieldName=" + fieldName);
				// 判断input是否为普通表单输入项
				if (item.isFormField()) {
					String name = item.getFieldName();// input的名称
					String value = item.getString();// input的值
					System.out.println("name=" + name + "-->value=" + value);
				} else {
					// 得到上传文件的名称,并截取
					fileName = item.getName();
					System.out.println("else-->fileName=" + fileName);
					if (fileName == null || fileName.trim().equals("")) {
						continue;
					}

					// 处理获取到的上传文件的文件名的路径部分，只保留文件名部分
					fileName = fileName.substring(fileName.lastIndexOf(File.separator) + 1);
					System.out.println("fileName +1=:" + fileName);
					File foldFile = new File(savePath + File.separator + fileName);

					// 获取item中上传文件的输入流
					InputStream is = item.getInputStream();
					// 创建一个文件输出流
					FileOutputStream fos = new FileOutputStream(foldFile);
					byte buffer[] = new byte[1024];
					int len = 0;
					while ((len = is.read(buffer)) > 0) {
						fos.write(buffer, 0, len);
					}
					is.close();
					fos.close();
					item.delete();
					message = "文件上传成功！";
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			message = "文件上传失败！";
		}

		StringBuffer url = request.getRequestURL();
		System.out.println("url111=" + url);

		String newurl = url.substring(0, url.lastIndexOf("/"));
		System.out.println("URL=====" + newurl);
		// 返回图片上传到服务器的URL地址
		String imgeUrl = newurl + "/upload" + "/schoolInfo/" + fileName;
		System.out.println("imgeUrl=" + imgeUrl);
		// 返回json 对象
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("url", imgeUrl);
		response.getWriter().print(jsonObject);
	}

}
