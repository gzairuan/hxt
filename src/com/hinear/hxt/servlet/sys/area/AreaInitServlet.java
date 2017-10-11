package com.hinear.hxt.servlet.sys.area;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.hinear.hxt.entity.UserInfo;
import com.hinear.hxt.entity.area.RootTreeNode;
import com.hinear.hxt.util.HttpUtils;
import com.hinear.hxt.util.JSONUtil;

/**
 * 
 * @author szs
 * @time 2017年9月7日 下午3:52:26
 * @version 1.0
 * 描述： 区域管理servlet
 */
@WebServlet("/areaInitServlet")
public class AreaInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String optFlag = request.getParameter("optFlag"); //操作标识
		String result = "";
		Map<String, String> map = new HashMap<String, String>();
//		optFlag = "init";
		String code = null;
		String areaName = null;
		RootTreeNode rootnode;
		String nation ;
		String parent;
		String id;
		switch(optFlag){
			case "init": //初始化区域data
//				map.put("PARENT", "2125");
				String areaData = HttpUtils.getInstance().get("B19", map);
				List<RootTreeNode> nodes = JSONUtil.parseJSONList(areaData, new TypeToken<List<RootTreeNode>>(){}.getType());
				
				List<RootTreeNode> rnodes = queryDomainList(nodes,0); //0为根节点
				
				Gson gson = new Gson();
				result = gson.toJson(rnodes);
				
				System.out.println("rnodes="+ result);
//				getTreeViewData(result); //转成treeview 数据结构
			break;
			case "addRootNode":
				code = request.getParameter("areacode");
				areaName = request.getParameter("areaname");
				System.out.println(code+ "---"+areaName);
				rootnode = new RootTreeNode();
				rootnode.setCode(code);
				rootnode.setProvince(areaName);
				rootnode.setArea(areaName);
				rootnode.setParent(0);
				nation = JSONUtil.toJSON(rootnode);
				map.put("NATION", nation);
				result = HttpUtils.getInstance().post("B19A", map);
				System.out.println("新增结果："+result);
				break;
			case "addChildNode":
				code = request.getParameter("areacode");
				areaName = request.getParameter("areaname");
				parent = request.getParameter("parentId");
				System.out.println(code+ "---"+areaName+"--"+parent);
				rootnode = new RootTreeNode();
				rootnode.setCode(code);
				rootnode.setProvince(areaName);
				rootnode.setArea(areaName);
				rootnode.setParent(Integer.valueOf(parent));
				nation = JSONUtil.toJSON(rootnode);
				map.put("NATION", nation);
				result = HttpUtils.getInstance().post("B19A", map);
				break;
				
			case "editNode":
				code = request.getParameter("areacode");
				areaName = request.getParameter("areaname");
				parent = request.getParameter("parentId");
				id = request.getParameter("id");
				System.out.println(code+ "---"+areaName+"--"+parent);
				rootnode = new RootTreeNode();
				rootnode.setId(Integer.valueOf(id));
				rootnode.setCode(code);
				rootnode.setArea(areaName);
				rootnode.setParent(Integer.valueOf(parent));
				nation = JSONUtil.toJSON(rootnode);
				map.put("NATION", nation);
				result = HttpUtils.getInstance().post("B19B", map);
				break;
				
			case "deleteNode":
				id = request.getParameter("id");
				map.put("ID", id);
				result = HttpUtils.getInstance().post("B19C", map);
				break;
		}
		response.getWriter().print(result);
	}
	
	// 遍历省城区节点
	private List<RootTreeNode> queryDomainList(List<RootTreeNode> nodes,int parent) {
		List<RootTreeNode> rnodes = new ArrayList<>();
		if(nodes != null && nodes.size() > 0){
			for (RootTreeNode rootTreeNode : nodes) {
				if(rootTreeNode.getParent() == parent){
					/*String text ="";
					if(rootTreeNode.getProvince() != null) { //不为空
						text = rootTreeNode.getProvince();
					}
					if(rootTreeNode.getCity() != null){
						text = rootTreeNode.getCity();
					}
					if(rootTreeNode.getDistrict() != null){
						text = rootTreeNode.getDistrict();
					}*/
					rootTreeNode.setText(rootTreeNode.getArea());
					rnodes.add(rootTreeNode);
				}
			}
			if (!rnodes.isEmpty()){//递归
				for (RootTreeNode rootTreeNode : rnodes) {
//					System.out.println("节点ID:"+rootTreeNode.getParent());
					List<RootTreeNode> list = queryDomainList(nodes, rootTreeNode.getId());
					if(!list.isEmpty()){
						rootTreeNode.setNodes(list);
					}
				}
			}
		}
		return rnodes;
	}

	private void getTreeViewData(String result) {
		if(result != null){
//			JsonArray ja = new JsonArray();
			Gson gson = new Gson();
			//创建一个JsonParser
			JsonParser parser = new JsonParser();
			JsonElement el = parser.parse(result);
			//把JsonElement对象转换成JsonObject
			JsonObject jsonObj = null;
			if(el.isJsonObject()){
				jsonObj = el.getAsJsonObject();  
			}
			//把JsonElement对象转换成JsonArray
			JsonArray jsonArray = null;
			if(el.isJsonArray()){
				jsonArray = el.getAsJsonArray();
			}
			//遍历JsonArray对象
			RootTreeNode rtn = null;
			Iterator it = jsonArray.iterator();
			while(it.hasNext()){
				JsonElement e = (JsonElement)it.next();
				//JsonElement转换为JavaBean对象
				rtn = gson.fromJson(e, RootTreeNode.class);
//				System.out.println("rtn="+rtn.getId()+ "===" +rtn.getCode()+"-->"+rtn.getProvince()+"-->"+rtn.getParent());
			}
//			for()
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
