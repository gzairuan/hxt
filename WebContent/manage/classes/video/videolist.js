/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

var selectClassID = $('#addSelectClassID');
var classData;
//多选框初始化
selectClassID.multiselect({
	nonSelectedText : "请点击选择班级",//默认文本，没有选中时的
	nSelectedText : '个被选中',//有n个值的时候显示n个被选中  
	allSelectedText : '全选',//所有被选中的时候 全选（n）  
	buttonClass : 'btn btn-default form-control',//显示按钮style
	includeSelectAllOption : true,//全选  
	selectAllText : '全选',//全选的checkbox名称 
	numberDisplayed : 4,//当超过4个标签的时候显示n个被选中  
	maxHeight : 280,//最大高度
});
$.post(rootPath+'/classDataServlet',function (data){
	if(data){
		classData = data;
		$.each(data,function (index,obj){
			var option='<option value="'+obj.CLASSESID+'">'+obj.CLASSESNAME+'</option>';
			selectClassID.append(option);
		});
	}
},'json');

$('#addForm').bootstrapValidator({
	message : 'This value is not valid',
	fields : {
		classID : {
			message : '选择班级验证失败',
			validators : {
				notEmpty : {
					message : '班级必选'
				}
			}
		},devID : {
			message : '设备ID验证失败',
			validators : {
				notEmpty : {
					message : '设备ID必填'
				}
			}
		},devName : {
			message : '设备名称验证失败',
			validators : {
				notEmpty : {
					message : '设备名称必填'
				}
			}
		},username : {
			message : '用户名验证失败',
			validators : {
				notEmpty : {
					message : '用户名必填'
				}
			}
		}
	},
	excluded: [':disabled']
});

var tableObj = {
	table : '#table',// 必要
	toolbar : '#toolbar',// 必要
	url : rootPath + '/videoServlet?optFlag=query',
	uniqueId : 'id',// 必要 id表示一个唯一的标识，用于识别行
	columns : [
			{
				checkbox : true
			},
			{
				field : 'uid',
				title : '设备ID'
			},
			{
				field : 'name',
				title : '设备名称'
			},{
				field : 'key',
				title : '用户名'
			},{
				field : 'classname',
				title : '班级名称'
			},{
				field : 'remark',
				title : '备注'
			},{
				field : 'operate-role',
				title : '操作',
				align : 'center',
				valign : 'center',
				formatter : function(value, row, index) {
					// 编辑html拼接标签
					var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple role-data"'
							+ 'data-toggle="modal" data-id="'
							+ row.id
							+ '" data-target="#addModal">'
							+ '<i class="fa fa-edit"></i> 编辑</a>';
					// 删除html拼接标签 根据 data-xx来传递数据 xx为自己命名的参数
					var role = '<a type="button" title="权限" class="btn btn-info shiny btn-xs purple edit-role"'
							+ 'data-toggle="modal" data-id="'
							+ row.id
							+ '" data-target="#roleModal">'
							+ '<i class="fa fa-plus"></i> 权限</a>';
					// 删除html拼接标签 根据 data-xx来传递数据 xx为自己命名的参数
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role"'
							+ 'data-toggle="modal" data-id="'
							+ row.id
							+ '" data-target="#delModal">'
							+ '<i class="fa fa-trash-o"></i> 删除</a>';
					// 添加拼接标签以join中的字符串分隔开来
					return [ edit,role, del ].join(' ');
				}
			} ],
	queryParams : queryParams
};

var searchParams = {};

function queryParams(params) {
	params.devID = searchParams.devID; 
	params.devName = searchParams.devName; 
	return params;
};

function searchData() {
	searchParams.devID = $('#queDevID').val();
	searchParams.devName = $('#queDevName').val();
	tableUtil.refreshData2Query('#table');
}

$(function() {
	// 初始化table
	tableUtil.initTable(tableObj);
});

$('#addModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
		id = btn.data('id'),
		btnSave = $('#addBtnSave');
		btnSave.removeAttr('onclick');
	$('#addForm')[0].reset();
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增摄像头':'编辑摄像头');// 设置medal标题
	//多选框重新创建
	selectClassID.multiselect('rebuild');
	if(isAdd){
	}else{
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		selectClassID.multiselect('select',row.classid.split(","));
		$('#addDevID').val(row.uid);
		$('#addDevName').val(row.name);
		$('#addUsername').val(row.key);
		$('#addPassword').val(row.pwd);
		$('#addRemark').val(row.remark);
	}
	btnSave.attr('onclick', 'saveData("' + id + '")');
});

$('#addModal').on("hidden.bs.modal", function() {
	$('#addForm').bootstrapValidator('resetForm', true); // 重置验证
});

function saveData(id) {
//	$('#addForm').bootstrapValidator('validate');
	var valid = $('#addForm').data('bootstrapValidator');
	valid.validate();  
	/*//是否通过校验
	 if(!$('#saveadmin_form').data('bootstrapValidator').isValid()){  
	    //没有通过校验 
	} else {
	   //通过校验，可进行提交等操作
	}*/
	if(valid.isValid()){
		//通过校验
		var isAdd = util.text.isEmpty(id);
		$.post(rootPath + '/videoServlet?optFlag='+ (isAdd ? 'add':'edit'), $('#addForm').serialize()+"&id="+(isAdd ? "":id), function(data) {
			if (data.result == 'ok') {
				// 请求成功 提示且刷新数据
				if(isAdd){
					toastr.success('新增成功','提示');
					tableUtil.refreshData2Add('#table');;// 刷新表格
				}else{
					toastr.success('修改成功','提示');
					tableUtil.refreshData2Update('#table');;// 刷新表格
				}
			} else {
				// 失败
				if(isAdd){
					toastr.error('新增失败！请稍后再试','提示');
				}else{
					toastr.error('修改失败！请稍后再试','提示');
				}
			}
			$('#addModal').modal('hide');
		}, 'json');
	};
};

// 删除对话框打开监听（也就是打开的时候会被掉用）
$('#delModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'), $this = $(this), btnDel = $('#delBtnOk');
	btnDel.removeAttr('onclick');
	if (id > 0) {
		$this.find('p').html('&nbsp;确认删除该记录？');
		btnDel.show();
		btnDel.attr('onclick', 'delData("' + id + '")');
		return;
	}
	// 获取table选中的数据集合 ->如果没有数据(返回空数组)提示显示数据，有数据的话显示删除确定按钮
	var selections = tableUtil.getSelections('#table');
	if (selections.length == 0) {
		// 空数组 没有选中行
		$this.find('p').html('&nbsp;请选择记录？');
		btnDel.hide();// 隐藏
	} else {
		$this.find('p').html('&nbsp;确认删除选中记录？');
		var ids = '', len = selections.length;
		$.each(selections, function(index, row) {
			ids += index === len - 1 ? row.id : row.id + ',';
		});
		btnDel.show();
		btnDel.attr('onclick', 'delData("' + ids + '")');
	}
});
// 删除数据事件
function delData(ids) {
	// post请求删除 第二种传参的例子
	$.post(rootPath + '/videoServlet?optFlag=delete', {
		'ids' : ids
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('删除成功','提示');
			// 请求成功（这里是删除数据成功）提示且刷新数据
			tableUtil.refreshData2Delete('#table');// 刷新表格
		} else {
			// 失败
			toastr.error('删除失败！请稍后再试','提示');
		}
	}, 'json');
};
var userTableObj = {
	table : '#userTable',// 必要
	url : rootPath + '/videoUserServlet?optFlag=query',
	uniqueId : 'userid',// 必要 id表示一个唯一的标识，用于识别行
	columns : [
			{
				checkbox : true,
				formatter :function(value,row,index){
					if(row.binddevid !== 0 ){
						return {disabled:false,checked:true};
					}
					return value;
				}
			},
			{
				field : 'realname',
				title : '姓名'
			},
			{
				field : 'usertypename',
				title : '角色名称'
			},{
				field : 'classesname',
				title : '班级名称'
			}],
	queryParams : queryUserParams,
	onCheck:function(row){
		row.binddevid=userParams.devId;
	},
	onUncheck:function(row){
		row.binddevid=0;
	},
	onCheckAll:function(rows){
		$.each(rows,function(index,row){
			row.binddevid=userParams.devId;
		});
	},
	onUncheckAll:function(rows){
		$.each(rows,function(index,row){
			row.binddevid=0;
		});
	}
};
var userParams = {};
function queryUserParams(params){
	params.name = userParams.name;
	params.cid = userParams.cid;
	params.devId = userParams.devId;
	return params;
};
function searchUserData() {
	userParams.name = $('#queName').val();
	userParams.cid = $('#queClassID').val();
	tableUtil.refreshData2Query('#userTable');
}
$('#roleModal').on('show.bs.modal',function(e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
		id = btn.data('id'),
		btnSave = $('#roleBtnSave');
		btnSave.removeAttr('onclick');
	userParams.devId = id;
	btnSave.attr('disabled','disalbed');
	btnSave.attr('onclick','saveVideoBindUser()');
	$.ajax({
		url:rootPath+'/videoClassDataServlet',
		data:{devId:id},
		dataType:'json',
		success:function(data){
			if(data){
				var classID = $('#queClassID');
				classID.empty();
				classID.append('<option value="0" selected>全部</option>');
				$.each(data,function(index,item){
					classID.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>');
				});
				userParams.cid = classID.val();
				tableUtil.initTable(userTableObj);
				btnSave.removeAttr('disabled');
			}
		}
	});
});
$('#roleModal').on('hidden.bs.modal',function(){
	tableUtil.destroy('#userTable');
});
function saveVideoBindUser() {
	var data = tableUtil.getData('#userTable');
	$.ajax({
		url:rootPath+"/videoUserServlet?optFlag=bind",
		type: "POST", 
		data:{'devId':userParams.devId,'data':JSON.stringify(data)},
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