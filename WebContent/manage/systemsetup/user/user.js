;
var rootPath = util.getRootPath();
var table = $('#tableUser');
var userTypeData;
var schoolData;
var classData;
//初始化查询条件
$(function(){
	//初始化查询下拉条件数据
	addUserTypeSelectItem($('#uTypeId')); //用户类型下拉选择
	addSchoolIdSelectItem($('#uSchoolId')); //学校下拉选择
	addClassIdSelectItem($('#uClassId'));
	//初始化table
	tableInit();
});

//用户类型下拉选择
function addUserTypeSelectItem(e) {
	if(e){
		//清空所有的option
		e.empty();
		e.append('<option value="0" selected>全部</option>');
		$.ajax({
			url: rootPath+'/userTypeDataServlet',
			dataType:'json',
			success: function(data){
				userTypeData = data;
		        $.each(data, function (i, item) {  //循环json，添加下拉标签
		            e.append('<option value="'+item.USERTYPEID+'">'+item.USERTYPENAME+'</option>'); 
		        });  
			}
		});
	}
}

//学校下拉选择数据
function addSchoolIdSelectItem(e){
	if(e && e.length>0){
		//清空所有的option
		e.empty();
		e.append('<option value="0">全部</option>');
		$.ajax({
			url: rootPath+'/schoolDataServlet',
			dataType:'json',
			success: function(data){
				schoolData = data;
		        $.each(data, function (i, item) {  //循环json，添加下拉标签
		            e.append('<option value="'+item.SID+'">'+item.SNAME+'</option>'); 
		        });  
			}
		});
	}
}

//班级下拉选择数据
function addClassIdSelectItem(e){
	if(e && e.length>0){
		//清空所有的option
		e.empty();
		e.append('<option value="0">全部</option>');
		$.ajax({
			url: rootPath+'/classDataServlet',
			dataType:'json',
			success: function(data){
				if(data){
					classData = data;
					$.each(data, function (i, item) {  //循环json，添加下拉标签
						e.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'); 
					});  
				}
			}
		});
	}
}

//初始化Table
function tableInit(){		
		table.bootstrapTable({
		url : rootPath+'/userInitServlet',//远程请求地址
		method : 'post',//请求方式
		dataType : 'json',//接收数据类型
		contentType: "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, //是否显示行间隔色
		toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, //是否启用排序
		pagination : true, //是否显示分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 10, //每页的记录行数（*）
		pageList : [ 10, 25, 50 ], //可供选择的每页的行数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, //是否启用点击选中行
		uniqueId : 'USERID', //每一行的标识（要具有唯一性）
		queryParams: queryParams, //请求参数
		columns : [
				//field对应返回数据中的字段
				{
					checkbox:true
				},
				{
					field : 'USERNAME',
					title : '用户名 '
				},
				{
					field : 'USERTYPENAME',
					title : '类型'
				},
				{
					field : 'REALNAME',
					title : '姓名 '
				},
				{
					field : 'SNAME',
					title : '学校',
					visible : userTypeId==4?true:false
				},
				{
					field : 'MOBILE',
					title : '联系电话 ',
					formatter : function(value, row, index) {
						if(value == null) {
							return "";
						}else{
							return value;
						}
					}
				},
				{
					field : 'CTIME',
					title : '创建时间',
					formatter : function(value, row,
							index) {
						var time = value.replace('T',' ');
						return time;
					}
				},
				{
					field : 'EMAIL',
					title : '邮箱',
					formatter : function(value, row, index) {
						if(value == null) {
							return "";
						}else{
							return value;
						}
					}
				},
				{
					field : 'statename',
					title : '状态'
				},
				{
					field : 'operate-role',
					title : '操作',
					align : 'center',
					visible : false,
					formatter : function(value, row, index) {
						//获取当前row内容
						var userId = row.USERID;
						var edit = '<a type="button" title="修改" class="btn btn-primary shiny btn-xs purple" data-id="'+ userId +'" data-flag="edit" data-toggle="modal" data-target="#addOrEditModal"><i class="fa fa-edit">修改</i></a>';
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple" data-id="'+userId+'" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i>删除</a>';
						if(row.USERTYPEID===2){
							var role = '<a type="button" title="关联学生" class="btn btn-info shiny btn-xs purple edit-role"'
								+ 'data-toggle="modal" data-id="'
								+ userId
								+ '" data-target="#roleModal">'
								+ '<i class="fa fa-plus"></i>关联学生</a>';
							return [edit,del,role].join(' ');
						}
						return [edit,del].join(' ');
					}
				}
				], 
		onClickRow : function(row, ele, fileid) {//table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		},
        onLoadSuccess:function(data){
        	roleUtil.roleHandler();
        }
	});
};

//定义初始化传递参数
var searchParams = {optFlag: "init"}; 

// 传递参数赋值
function queryParams(params) {
	params.optFlag = searchParams.optFlag;
	params.utype = searchParams.utype;
	params.ustate = searchParams.ustate;
	params.uschool = searchParams.uschool;
	params.uname = searchParams.uname;
	params.urname = searchParams.urname;
	params.cid = searchParams.cid;
	return params;
};

//查询条件参数设置
function searchData(){
	searchParams.optFlag = searchParams.optFlag;
	searchParams.utype = $('#uTypeId').val();
	searchParams.ustate = $('#uStateId').val();
	searchParams.uschool = $('#uSchoolId').val();
	searchParams.uname = $('#uName').val();
	searchParams.urname = $('#uRName').val();
	searchParams.cid = $('#uClassId').val();
	//刷新数据 跳转第一页
	table.bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
	//重新初使化表格。
	tableInit();
}

// 打开时执行：新增/修改操作
$('#addOrEditModal').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget); //获取触发目标事件按钮
	var optFlag = button.data('flag'); //获取按钮点击事件传给modal的 data参数标识
	var btnSave = $('#btnSave');
	var modal = $(this); //获取当前的modal
	var opt = "add";
	//初始化 下拉选项值:用户类型、学校
	var m_uTypeId = $('#modalUTypeId');
	var m_uSchool = $('#modalUSchoolId');
	$('#divStudentId').hide();
	if(userTypeData){
		m_uTypeId.empty();
		$.each(userTypeData, function (i, item) {  //循环json，添加下拉标签
			m_uTypeId.append('<option value="'+item.USERTYPEID+'">'+item.USERTYPENAME+'</option>'); 
		});  
	}
	if(schoolData){
		m_uSchool.empty();
		$.each(schoolData, function (i, item) {  //循环json，添加下拉标签
			m_uSchool.append('<option value="'+item.SID+'">'+item.SNAME+'</option>'); 
		});  
	}
//	addUserTypeSelectItem(m_uTypeId); 
//	addSchoolIdSelectItem(m_uSchool);
	
	if(optFlag == opt){ //新增操作
		modal.find('.modal-title').text('用户新增'); //设置modaltitle
		m_uTypeId.removeAttr('disabled');
		$('#uname').removeAttr('readonly');
		
		$('#user-form')[0].reset();  //清空form 表单
		btnSave.removeAttr("onclick"); 
		btnSave.attr("onclick", "addUser('"+optFlag+"')"); //添加保存事件
	}else{//修改操作
		var userId = button.data('id');
		modal.find('.modal-title').text('用户编辑'); //改变modal的title
		m_uTypeId.attr('disabled', 'disabled');
		$('#uname').attr('readonly', 'readonly');
		$('#divStudentId').show();
		var row = table.bootstrapTable('getRowByUniqueId', userId);
		
		m_uTypeId.val(row.USERTYPEID);
		m_uSchool.val(row.SID);
		$('#uname').val(row.USERNAME);
		$('#upassword').val(row.PASSWORD);
		$('#uphone').val(row.MOBILE);
		$('#usignature').val(row.SIGNATURE);
		$('#uStateId').val(row.STATE);
		$('#studentId').val(row.STUDENTNAME);
		$('#urealName').val(row.REALNAME);
		$('#uaffirmPass').val(row.PASSWORD);
		$('#uemail').val(row.EMAIL);
		
		//添加保存按钮事件
		btnSave.removeAttr("onclick");
		btnSave.attr("onclick", 'eidtUser('+userId+')');
		changeUTypeId();
	}
});

$('#addOrEditModal').on("hidden.bs.modal", function() {
	$('#user-form').bootstrapValidator('resetForm', true);  //重置验证
});

//新增时 modal用户类型监听事件
function changeUTypeId(){
	var m_uTypeId = $('#modalUTypeId');
	var utValue = m_uTypeId.val();
	var divStudentSelect = $('#divStudentId');
	var divSchoolId = $('#divSchoolId');
	
	if(utValue == 2){ //当为家长2 时显示 学生选择框
		divStudentSelect.show();
		divSchoolId.show();
	}else if(utValue == 4){//管理员4
		divStudentSelect.hide();
		divSchoolId.hide();
	}else{ //老师3、校长1、学生6
		divStudentSelect.hide(); 
		divSchoolId.show();
	}
}

$('#user-form').bootstrapValidator({
	fields : {
		uSchoolId : {
			validators : {
				notEmpty : {
					message : '请选择学校'
				}
			}
		},
		uname : {
			validators : {
				notEmpty : {
					message : '请填写用户名'
				}
			}
		},upassword : {
			validators : {
				notEmpty : {
					message : '请填写用户密码'
				}
			}
		},uaffirmPass : {
			validators : {
				notEmpty : {
					message : '请填写确认密码'
				},
				identical: {//相同
                    field: 'upassword',
                    message: '两次密码不一致'
                }
			}
		},uphone : {
			validators : {
				notEmpty : {
					message : '请填写联系电话'
				}
			}
		},urealName : {
			validators : {
				notEmpty : {
					message : '请填写真实姓名'
				}
			}
		}
	},
	excluded: [':disabled']
});

//新增保存方法
function addUser(optFlag){
	var $form = $('#user-form');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		$.ajax({
			url: rootPath+'/userInitServlet',
			data: $form.serialize() + "&optFlag="+optFlag,
			dataType:'json',
			success: function(data){
				if(data.result == "ok"){
					toastr.success('新增成功', '提示');
					table.bootstrapTable('refresh');
				}else{
					toastr.error('新增失败!请稍后再试 ', '提示');
				}
			}
		});
		$('#addOrEditModal').modal('hide');
	}
};

//修改
function eidtUser(userId){
	var $form = $('#user-form');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		var row = table.bootstrapTable('getRowByUniqueId', userId);
		if($('#modalUSchoolId').length>0){
			row.SID = $('#modalUSchoolId').val();
		}
	// 	row.PASSWORD = $('#upassword').val();
		row.MOBILE = $('#uphone').val();
		row.SIGNATURE = $('#usignature').val();
		row.STATE = $('#uStateId').val();
	// 	row.STUDENTNAME = $('#ustudent').val();
		row.REALNAME = $('#urealName').val();
		if($('#uaffirmPass').val() != row.PASSWORD){
			row.PASSWORD = $('#uaffirmPass').val();
		}
		row.EMAIL = $('#uemail').val();
		
		$.ajax({
			url: rootPath+'/userInitServlet',
			data: {
				"userJson": JSON.stringify(row),
				"optFlag": "edit"
			},
			dataType:'json',
			success: function(data){
				if(data.result == "ok"){
					toastr.success('修改成功', '提示');
					table.bootstrapTable('refresh');
				}else{
					toastr.error('修改失败!请稍后再试 ', '提示');
				}
			}
		});
		$('#addOrEditModal').modal('hide');
	}
};

/*table 删除按钮*/
/*function confirmDeleteModal(userId) {
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + userId + ')');
};*/
//删除对话框打开监听（也就是打开的时候会被掉用）
$('#deleteModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'), $this = $(this), btnDel = $('#btnDel');
	btnDel.removeAttr('onclick');
	if (id > 0) {
		$this.find('p').html('&nbsp;确认删除该用户？');
		btnDel.show();
		btnDel.attr('onclick', 'deleteData("' + id + '")');
		return;
	}
	// 获取table选中的数据id集合 ->如果没有数据(返回空数组)提示显示数据，有数据的话显示删除确定按钮
	var selections = table.bootstrapTable('getSelections');
	if (selections.length == 0) {
		// 空数组 没有选中行
		$this.find('p').html('&nbsp;请选择用户？');
		btnDel.hide();// 隐藏
	} else {
		$this.find('p').html('&nbsp;确认删除选中用户？');
		var ids = '', len = selections.length;
		$.each(selections, function(index, row) {
			ids += index === len - 1 ? row.USERID : row.USERID + ',';
		});
		btnDel.show();
		btnDel.attr('onclick', 'deleteData("' + ids + '")');
	}
});
/*modal 确认删除按钮*/
function deleteData(userId) {
	$.ajax({
		url : rootPath+"/userInitServlet",
		data : {
			"userId" : userId,  //学校ID
			"optFlag": "delete"
		},
		dataType:'json',
		success : function(data) {
			if(data.result == "ok"){
				toastr.success('删除成功', '提示');
				table.bootstrapTable('refresh'); //刷新表格
			}else{
				toastr.error('删除失败!请稍后再试 ', '提示');
			}
		}
	});
};

var studentTableObj = {
	table : '#studentTable',// 必要
	url : rootPath + '/userStudentServlet?optFlag=query',
	uniqueId : 'STUDENTID',// 必要 id表示一个唯一的标识，用于识别行
	columns : [
			{
				checkbox : true,
				formatter :function(value,row,index){
					if(row.parentId !== 0 ){
						return {disabled:false,checked:true};
					}
					return value;
				}
			},
			{
				field : 'STUDENTNAME',
				title : '学生姓名'
			},
			{
				field : 'CLASSESNAME',
				title : '班级'
			},{
				field : 'STUDENTNO',
				title : '学号'
			},{
				field : 'ENTRYTIME',
				title : '入校时间',
				formatter :function(value,row,index){
					if(util.text.isEmpty(value)){
						return '';
					}
					return value.substring(0,value.indexOf('T'));
				}
			}],
	queryParams : queryUserParams,
	onCheck:function(row){
		row.parentId=userParams.parentId;
	},
	onUncheck:function(row){
		row.parentId=0;
	},
	onCheckAll:function(rows){
		$.each(rows,function(index,row){
			row.parentId=userParams.parentId;
		});
	},
	onUncheckAll:function(rows){
		$.each(rows,function(index,row){
			row.parentId=0;
		});
	}
};
var userParams = {};
function queryUserParams(params){
	params.name = userParams.name;
	params.cid = userParams.cid;
	params.parentId = userParams.parentId;
	return params;
};
function searchUserData() {
	userParams.name = $('#queName').val();
	userParams.cid = $('#queClassID').val();
	tableUtil.refreshData2Query('#studentTable');
}
$('#roleModal').on('show.bs.modal',function(e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
		id = btn.data('id'),
		btnSave = $('#roleBtnSave');
		btnSave.removeAttr('onclick');
	userParams.parentId = id;
	btnSave.attr('onclick','saveVideoBindUser()');
	if(classData){
		var classID = $('#queClassID');
		classID.empty();
		classID.append('<option value="" selected>全部</option>');
		$.each(classData, function (i, item) {  //循环json，添加下拉标签
			classID.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>');
		});  
		userParams.cid = classID.val();
		
	}
	tableUtil.initTable(studentTableObj);
});
$('#roleModal').on('hidden.bs.modal',function(){
	$('#queName').val('');
	userParams.name = '';
	tableUtil.destroy('#studentTable');
});
function saveVideoBindUser() {
	var data = tableUtil.getData('#studentTable');
	$.ajax({
		url:rootPath+"/userStudentServlet?optFlag=bind",
		type: "POST", 
		data:{'parentId':userParams.parentId,'data':JSON.stringify(data)},
		dataType:'json',
		success:function(data){
			if (data.result == 'ok') {
				toastr.success('保存成功','提示');
			} else {
				// 失败
				toastr.error('保存失败！请稍后再试','提示');
			}
		}
	});
}