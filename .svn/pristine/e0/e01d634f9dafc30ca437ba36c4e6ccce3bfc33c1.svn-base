/**
 * 
 * @author szs
 * @time 2017年9月15日 
 * @version 1.0
 * 描述： 菜单管理
 */
 
 ;
 var rootPath = util.getRootPath(),
 	 opt = 0,
 	 $form = $('#menuFormId');
 
 
 $(function() {
 	//初始化菜单
 	initMenuTree();
 	//初始化用户类型
 	initUserTypeTable();
 });
 
function initMenuTree(){
	$.ajax({
		url: rootPath + '/roleMenuServlet?optFlag=init',
		dataType: 'json',
		cache: false,
		success: function(data) {
			$('#treeview').treeview({
			    data: data,  //树节点data结构
			 	color: "#428bca",
			    expandIcon: 'glyphicon glyphicon-chevron-right',
			    expanded: false,
			    levels: 1,
			    collapseIcon: 'glyphicon glyphicon-chevron-down',
			    onNodeSelected: function (event, node){ //选中节点
			    	if(node.PARENTID ==0){
			    		$('#rootmenuId').val("系统根菜单");
			    	}else{
				    	var parentNode = $('#treeview').treeview('getParent', node.nodeId);
				    	$('#rootmenuId').val(parentNode.MENU_NAME);
			    	}
			    	$('#modulecodeId').val(node.MODULE_CODE);
			    	$('#menunameId').val(node.MENU_NAME);
			    	$('#munuurlId').val(node.MENU_URL);
			    	$('#remarkId').val(node.REMARK);
			    	hideInput();
			    }
			});
		}
	});
}

//新增
function addMenuNode() {
	var code = $('#modulecodeId').val();
	if(code == null){
		opt = 0;
	}
	//新增子节点
	var selectedArr = $('#treeview').data("treeview").getSelected();
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedArr.length > 0) {
		$form[0].reset();
		showInput();
		if(selectedNode.PARENTID == 0){//选中的为根节点
			$('#rootmenuId').val("系统根菜单").attr('disabled', 'disabled');
			opt = 0;
		}else{
			var parentNode = $('#treeview').treeview('getParent', selectedNode.nodeId); //获取父节点
			$('#rootmenuId').val(parentNode.MENU_NAME).attr('disabled', 'disabled');
			opt = 1;
		}
	}
}

//新增子菜单
function addChildMenuNode(){
	var selectedArr = $('#treeview').data("treeview").getSelected();
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedArr.length > 0) {
		$form[0].reset();
		showInput();
		$('#rootmenuId').val(selectedNode.MENU_NAME).attr('disabled', 'disabled');
		opt = 2;
		
	}else {
		toastr.info('请选择左边的 菜单进行操作!', '提示');
	}
}

//编辑
function editMenuNode(){
	resetValidator();
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedNode == null){ //判断节点是否为空
		toastr.info('请选择修改的菜单按钮！', '提示');
	}else{
		showInput();
		$('#rootmenuId').attr('disabled', 'disabled');
		opt = 3;
	}
}

//隐藏input
function hideInput(){
	$('#rootmenuId').attr('disabled', 'disabled');
	$('#modulecodeId').attr('disabled', 'disabled');
	$('#menunameId').attr('disabled', 'disabled');
	$('#munuurlId').attr('disabled', 'disabled');
	$('#remarkId').attr('disabled', 'disabled');
}

//显示input
function showInput(){
	$('#rootmenuId').removeAttr('disabled');
	$('#modulecodeId').removeAttr('disabled');
	$('#menunameId').removeAttr('disabled');
	$('#munuurlId').removeAttr('disabled');
	$('#remarkId').removeAttr('disabled');
}

//删除节点
function deleteMenuNode(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	var code = $('#modulecodeId').val();
	if(selectedNode == null || code == ""){ //判断节点是否为空
		toastr.info('请选择左边要删除的菜单！', '提示');
	}else{//显示delete modal
		$('#deleteModal').modal('show'); 
	}
}

//确认删除
function affirmDeleteNode(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	var menuId = selectedNode.MENU_ID;
	$.ajax({
		url: rootPath + '/roleMenuServlet?optFlag=delete',
		data: {
			menuId: menuId
		},
		success: function(data){
			var json = JSON.parse(data);
			if(json.result == "ok"){
				toastr.success('操作成功', '成功');
				$form[0].reset();
				showInput();
		      	initMenuTree();
			}else{
				toastr.error('操作失败!请稍后再试 ', '错误');
			}
		}
	});
}

//表单验证
$('#menuFormId').bootstrapValidator({
	fields : {
		modulecodeId : {
			validators : {
				notEmpty : {
					message : '请输入菜单代码'
				}
			}
		},
		menunameId : {
			validators : {
				notEmpty : {
					message : '请输入菜单名称'
				}
			}
		}
	},
	excluded: [':disabled']
})

//保存菜单操作
function saveBtn(){
	var $form = $('#menuFormId'),
		valid = $form.data('bootstrapValidator');
	valid.validate();  
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	/*var prentnode =''; 
	if(selectedArr.length > 0){
		prentnode = $('#treeview').treeview('getParent', selectedArr[0].nodeId); //获取父节点
	}
	*/
	if(valid.isValid()){
		var code = $('#modulecodeId').val();
		if(code == null){
			opt = 0;
		}
		switch (opt){
			case 0:
				$.ajax({
					url: rootPath + '/roleMenuServlet?optFlag=add',
					dataType: 'json',
					data: $form.serialize() + '&parentId=0',
					success: function (data){
						if(data.result == "ok"){
							toastr.success('操作成功', '成功');
						}else{
							toastr.error('操作失败!请稍后再试 ', '错误');
						}
					}
				})
				hideInput();
				initMenuTree();
				resetValidator();
				break;
			case 1:
				$.ajax({
					url: rootPath + '/roleMenuServlet?optFlag=add',
					dataType: 'json',
					data: $form.serialize() + '&parentId=' + selectedArr[0].PARENTID,
					success: function (data){
						if(data.result == "ok"){
							toastr.success('操作成功', '成功');
						}else{
							toastr.error('操作失败!请稍后再试 ', '错误');
						}
					}
				})
				hideInput();
				initMenuTree();
				resetValidator();
				break;
			case 2: //新增子菜单
				$.ajax({
					url: rootPath + '/roleMenuServlet?optFlag=addChild',
					dataType: 'json',
					data: $form.serialize() + '&parentId=' + selectedArr[0].MENU_ID,
					success: function (data){
						if(data.result == "ok"){
							toastr.success('操作成功', '成功');
							hideInput();
							initMenuTree();
						}else{
							toastr.error('操作失败!请稍后再试 ', '错误');
						}
					}
				})
				resetValidator();
				break;
			case 3: // 修改
				$.ajax({
					url: rootPath + '/roleMenuServlet?optFlag=edit',
					dataType: 'json',
					data: $form.serialize() + '&menuId=' + selectedArr[0].MENU_ID + '&parentId=' + selectedArr[0].PARENTID,
					success: function (data){
						if(data.result == "ok"){
							toastr.success('操作成功', '成功');
						}else{
							toastr.error('操作失败!请稍后再试 ', '错误');
						}
					}
				});
				hideInput();
				resetValidator();
				var singleNode = {
	                text: $('#menunameId').val(),
	                id:selectedArr[0].MENU_ID,
	                code:$('#modulecodeId').val()
              	};
				$('#treeview').treeview('updateNode', [ selectedArr, singleNode,{ silent: true } ]);
				initMenuTree();
				/*$('#tree').treeview('toggleNodeSelected', [ selectedArr[0].MENU_ID, { silent: false } ]);*/
				$('#treeview').treeview('toggleNodeChecked', [ selectedArr[0].nodeId, { silent: true } ]);
				break;
		}
		
	}
}

//取消
function cancelBtn(){
	var selectedArr = $('#treeview').data("treeview").getSelected(); //获取选中节点信息
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedNode != null){
		resetValidator();
		hideInput();
		switch (opt) {
			case 0:
				cancelSelectedNode(selectedNode);
				break;
			case 1:
				cancelSelectedNode(selectedNode);
				break;
			case 2: //新增子菜单
				cancelSelectedNode(selectedNode);
				break;
			case 3: //编辑
				cancelSelectedNode(selectedNode);
				break;
		}
	}
}

//返回选中节点数据
function cancelSelectedNode(selectedNode){
	$('#modulecodeId').val(selectedNode.MODULE_CODE);
	$('#menunameId').val(selectedNode.MENU_NAME);
	$('#munuurlId').val(selectedNode.MENU_URL);
	$('#remarkId').val(selectedNode.REMARK);
}
//重置表单验证
function resetValidator(){
//	if($('#menuFormId').data('bootstrapValidator'))
 	$('#menuFormId').data('bootstrapValidator').resetForm();
}

var table = $('#usertypeTable');

function initUserTypeTable() {
	table.bootstrapTable({
		url : rootPath + '/roleMenuServlet',//远程请求地址
		method : 'post',//请求方式
		dataType : 'json',//接收数据类型
		contentType : "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, //是否显示行间隔色
		toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, //是否启用排序
		pagination : true, //是否显示分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 5, //每页的记录行数（*）
		pageList : [ 5, 10], //可供选择的每页的行数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, //是否启用点击选中行
		uniqueId : 'SID', //每一行的标识（要具有唯一性）
//		queryParams : queryParams,
		queryParams:function(params){ //使用queryParams传递请求参数必须要写上limit和offset参数，否则翻页无效。
			return {
				optFlag : 'initUT', //操作标记
				limit : params.limit, 
				offset : params.offset
			}; 
		},
		columns : [
				//field对应返回数据中的字段
				{
					field : 'USERTYPEID',
					title : '类型代码'
				},
				{
					field : 'USERTYPENAME',
					title : '类型名称'
				},
				{
					field : 'REMARK',
					title : '备注',
					formatter : function(value, row, index) {
						if(value == null || value == undefined){
							value = '';
						}
							return value;
					}
				},
				{
					title : '操作',
					align : 'center',
					width : '7%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var sId = row.SID;
						var check = '<label>'+
									'<input class="checkbox-slider slider-icon color-blue" type="checkbox">'+
									'<span class="text"></span>'+
								'</label>';
						return [check].join('');
					}
				} ],
	onClickRow : function(row, ele, fileid) {//table选中行设置背景色
		$(".info").removeClass("info");
		$(ele).addClass("info");
			}
		});
		
};


