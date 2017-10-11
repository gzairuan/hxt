/*角色权限管理*/

;
 var rootPath = util.getRootPath(),
 	 table = $('#usertypeTable'),
 	 aoeModal = $('#AOEModal'),
 	 $roleform = $('#role_Mform'),
 	 saveBtn = $('#saveBtn');
 	 
$(function(){
	initUserTypeTable();
});
 
 function initUserTypeTable() {
	table.bootstrapTable({
		url : rootPath + '/userTypeServlet',//远程请求地址
		method : 'post',//请求方式
		dataType : 'json',//接收数据类型
		contentType : "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, //是否显示行间隔色
		toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		checkbox: false,
		singleSelect: false,
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, //是否启用排序
		pagination : true, //是否显示分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 5, //每页的记录行数（*）
		pageList : [ 5, 10], //可供选择的每页的行数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, //是否启用点击选中行
		uniqueId : 'SID', //每一行的标识（要具有唯一性）
		queryParams:function(params){ //使用queryParams传递请求参数必须要写上limit和offset参数，否则翻页无效。
			return {
				optFlag : 'initUT', //操作标记
				limit : params.limit, 
				offset : params.offset
			}; 
		},
		columns : [
				/*{
					//实现多选框
					checkbox : true,
					width: '2%'
				},*/
				{
					field : 'USERTYPEID',
					title : '角色代码',
					width: '5%'
				},
				{
					field : 'USERTYPENAME',
					title : '角色名称',
					width: '12%'
				},
				{
					field : 'REMARK',
					title : '备注',
					width: '20%',
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
						var check = '<a type="button" title="操作权限分配" class="btn btn-primary shiny btn-xs purple" data-toggle="modal" data-target="#roleModal" data-usertypeid="'+ row.USERTYPEID +'" data-typename="'+row.USERTYPENAME+'"> 角色权限分配</a>&nbsp;&nbsp';
						return [check].join('');
					}
				} ],
	onClickRow : function(row, ele, fileid) {//table选中行设置背景色
		$(".info").removeClass("info");
		$(ele).addClass("info");
			}
		});
		
};

var opt;
//弹出modal框
aoeModal.on('show.bs.modal', function(event){
	var btn = $(event.relatedTarget);
		opt = btn.data("opt");
	switch (opt) {
		case "add":
			aoeModal.find('.modal-title').text('角色新增');
			$roleform[0].reset();
			saveBtn.removeAttr("onclick");
			saveBtn.attr('onclick', 'addRoleType()');
		break;
		default:
			aoeModal.find('.modal-title').text('角色编辑');
			saveBtn.removeAttr("onclick");
			saveBtn.attr('onclick', 'editRoleType()');
		break;
	}
});
//验证表单
$roleform.bootstrapValidator({
	fields: {
		rolecodeId:{
			notEmpty:{
				message: '请输入角色代码!'
			}
		},
		rolenameId:{
			notEmpty:{
				message: '请输入角色名称!'
			}
		}
	}
});

//
function addRoleType(){
	var valid = $roleform.data('bootstrapValidator');
	valid.validate();
	if(valid.isValid()){
		$.ajax({
			url: rootPath + '/userTypeServlet?optFlag=add',
			dataType: 'json',
			data: $roleform.serialize(),
			success: function (data) {
				if(data.result == 'ok'){
					aoeModal.modal('hide');
					table.bootstrapTable('refresh');
					toastr.success('操作成功', '提示');
				}else{
					toastr.error('操作失败!请联系管理员!', '提示');
				}
			}
		});
	}
}

//编辑
function editBtn(){
	var index = table.find("tr.info").data("index");
	var list = table.bootstrapTable('getData')[index];
	if(list == null){
		toastr.info("请选择一行!", "提示");
	}else{
		aoeModal.modal('show');
		aoeModal.attr("data-id", list.USERTYPEID);
		$('#rolenameId').val(list.USERTYPENAME);
		$('#remarkId').val(list.REMARK);
	}
}
//
function editRoleType(){
	var valid = $roleform.data('bootstrapValidator');
	valid.validate();
	if(valid.isValid()){
		var usertypeId = aoeModal.attr('data-id');
		$.ajax({
			url: rootPath + '/userTypeServlet?optFlag=edit',
			dataType: 'json',
			data: $roleform.serialize() + "&usertypeId=" + usertypeId,
			success: function (data) {
				if(data.result == "ok"){
					aoeModal.modal('hide');
					table.bootstrapTable('refresh');
					toastr.success('操作成功', '提示');
				}else{
					toastr.error('操作失败!请联系管理员!', '提示');
				}
			}
		});
		
	}
}

//
function deleteBtn() {
	var index = table.find("tr.info").data("index");
	var list = table.bootstrapTable('getData')[index];
	if(list == null){
		toastr.info("请选择一行删除!", "提示");
	}else{
		$('#deleteModal').modal('show');
		$('#deleteModal').attr("data-id", list.USERTYPEID);
		
	}
}

//确认删除
function affirmDeleteNode(){
	var usertypeId = $('#deleteModal').attr('data-id');
	$.ajax({
		url: rootPath + '/userTypeServlet?optFlag=delete',
		data: {
			usertypeId: usertypeId
		},
		success: function(data){
			var json = JSON.parse(data);
			if(json.result == 'ok'){
				table.bootstrapTable('refresh');
				toastr.success('操作成功', '提示');
			}else{
				toastr.error('操作失败!请稍后再试 ', '提示');
			}
		}
	});
}

var typeId;
$('#roleModal').on('show.bs.modal', function(event){
	var btn = $(event.relatedTarget),
	    typename = btn.data("typename");
	typeId = btn.data("usertypeid");
	$('#typenameId').html(typename);
	initMenuTree(typeId);
});

//用户角色分配菜单权限
function initMenuTree(usertypeid){
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
			    	debugger;
			    	removeCheckBox();//清除复选框
			    	$('#checkFormId')[0].reset();
			    	var menuid = node.MENU_ID,
			    		menuname = node.MENU_NAME;
			    	$('#menuTitleSpan').html(menuname + " - 操作权限");
			    	$.ajax({//获取角色菜单权限，并设置勾选框
			    		url: rootPath + '/userTypeServlet?optFlag=rolemenu',
			    		dataType: 'json',
			    		cache: false,
			    		data: {
			    			usertypeid: usertypeid,
			    			menuid: menuid
			    		},
			    		success: function(data) {
			    			if(data != null && data.length > 0) {
			    				$.each(data, function(i, item){
			    					$('#'+item.ROLE).attr('checked', true);
			    				})
			    			}
			    		}
			    	})
			    }
			});
		}
	});
}

function removeCheckBox(){
	$('#VISIT').removeAttr('checked');
	$('#INSERT').removeAttr('checked');
	$('#UPDATE').removeAttr('checked');
	$('#DELETE').removeAttr('checked');
	$('#IMPORT').removeAttr('checked');
	$('#EXPORT').removeAttr('checked');
}

//保存角色菜单
function saveRoleMenu() {
	var selectedArr = $('#treeview').data("treeview").getSelected();
	var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
	if(selectedNode == null){ //判断节点是否为空
		toastr.info('请选择左边的菜单按钮！', '提示');
	}else{
		var check = $('.role:checked');
		var checks = "";
		var menuid = selectedNode.MENU_ID; //菜单按钮ID
		
		$.each(check, function(i, item){
			checks = checks.concat(item.id + ",");
		});
		checks = checks.substring(0, checks.length-1);
		$.ajax({
			url: rootPath + '/userTypeServlet?optFlag=saveRoleMenu',
			dataType: 'json',
			cache: false,
			data:{
				usertypeid: typeId,
		    	menuid: menuid,
		    	operatetypes: checks
			},
			success: function(data){
				if(data.result == 'ok'){
					toastr.success('操作成功', '提示');
				}else{
					toastr.error('操作失败!请稍后再试 ', '提示');
				}
			}
		});
	}
}

//重置复选框
function resetCheckBox(){
	removeCheckBox();
}
