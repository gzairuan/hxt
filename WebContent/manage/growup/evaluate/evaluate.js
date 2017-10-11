var rootPath = util.getRootPath();
var classData;
$.ajax({
	url: rootPath+'/classDataServlet',
	dataType:'json',
	success: function(data){
		classData = data;
		var classID = $('#queClassID');
		//清空所有的option
		classID.empty();
		classID.append('<option value="0" selected>全部</option>');
        $.each(data, function (i, item) {  //循环json，添加下拉标签
        	classID.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'); 
        });  
	}
});

$(function(){
	//初始化查询日期，从当前日期开始
	initQueDate();
	// 初始化table
	tableUtil.initTable({
		table : '#table',
		url : rootPath + '/evaluateServlte?optFlag=query',// 远程请求地址
		toolbar : "#toolbar", // 一个jQuery 选择器，指明自定义的toolbar
								// 例如:#toolbar, .toolbar.
		uniqueId : 'NEWID', // 每一行的标识（要具有唯一性）
		queryParams : queryParams, // 定义请求参数
		columns : [
				// field对应返回数据中的字段
				{
					checkbox : true
				},
				{
					field : 'SENDNAME',
					title : '评价人',
					width : '10%'
				},
				{
					field : 'STUDENTNAME',
					title : '学生姓名',
					width : '10%'
				},
				{
					field : 'CLASSESNAME',
					title : '班级 '
				},
				{
					field : 'CONTENT',
					title : '内容',
				},
				{
					field : 'CRETIME',
					title : '发布时间',
					width : '14%',
					formatter : function(value, row, index) {
						var time = value.replace('T', ' ');
						return time;
					}
				},
				{
					title : '操作',
					align : 'center',
					width : '17%',
					formatter : function(value, row, index) {
						// 获取当前row内容
						var newId = row.NEWID;
						var edit = '<a type="button" title="修改" class="btn btn-primary shiny btn-xs purple edit-role" data-id="'
								+ newId
								+ '" data-flag="edit" data-toggle="modal" data-target="#addOrEditModal"><i class="fa fa-edit">修改</i></a>&nbsp;';
						var detail = '<a type="button" class="btn btn-info shiny btn-xs purple" data-id="'
								+ newId
								+ '" data-clasname="'
								+ row.CLASSESNAME
								+ '" data-stuname="'
								+ row.STUDENTNAME
								+ '" data-sendname="'
								+ row.SENDNAME
								+ '" data-cretime="'
								+ row.CRETIME
								+ '" data-content="'
								+ row.CONTENT
								+ '" data-flag="detail" data-toggle="modal" data-target="#detailModal" >'
								+ '<i class="fa fa-eye"></i>&nbsp;查看</a>&nbsp';
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role" onclick="confirmDeleteModal('
								+ newId
								+ ')" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i>删除</a>';
						return [ edit, detail, del ].join('');
					}
				} ],
		onLoadSuccess : function(data) {
			roleUtil.roleHandler();
		}
	});
});
 
var searchParams = {};
 
// init Table 传递参数
function queryParams(params) {
	params.optFlag = searchParams.optFlag;
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.cid = searchParams.cid;
	params.keyword = searchParams.keyword;
	return params;
}

// 查询条件
function searchData() {
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.cid = $('#queClassID').val();
	searchParams.keyword = $('#queKeyword').val();
	tableUtil.refreshData2Query('#table');
}
 
$('#addForm').bootstrapValidator({
	fields : {
		addClassID : {
			validators : {
				notEmpty : {
					message : '请选择班级'
				}
			}
		},addStudentID : {
			validators : {
				notEmpty : {
					message : '请选择学生'
				}
			}
		},addContent : {
			validators : {
				notEmpty : {
					message : '请填写内容'
				}
			}
		}
	},
	excluded: [':disabled']
});
// 打开时执行：新增/修改操作
$('#addOrEditModal').on('show.bs.modal', function(e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
		id = btn.data('id'),
		btnSave = $('#addBtnSave');
		btnSave.removeAttr('onclick');
	$('#addForm')[0].reset();
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增学生评价':'修改学生评价');// 设置medal标题
	var cid = $('#addClassID'),stuid = $('#addStudentID');
	cid.empty();
	stuid.empty();
	if(isAdd){
		if(classData){
			$.each(classData,function(index,item){
				var option = '<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'
				cid.append(option);
			});
			changeClass();
		}
		cid.removeAttr('disabled');
		stuid.removeAttr('disabled');
	}else{
		cid.attr('disabled','disabled');
		stuid.attr('disabled','disabled');
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		cid.append('<option value="'+row.CLASSESID+'">'+row.CLASSESNAME +'</option>');
		stuid.append('<option value="'+row.STUDENTID+'">'+row.STUDENTNAME +'</option>');
		$('#addContent').val(row.CONTENT);
	}
	btnSave.attr('onclick', 'saveData("' + id + '")');
});

$('#addOrEditModal').on("hidden.bs.modal", function() {
	$('#addForm').bootstrapValidator('resetForm', true);  //重置验证
});

function saveData(id) {
	var valid = $('#addForm').data('bootstrapValidator');
	valid.validate();
	if (valid.isValid()) {
		var isAdd = util.text.isEmpty(id);
		$.ajax({
			url : rootPath + '/evaluateServlte?optFlag=' + (isAdd ? 'add' : 'edit'),
			data : $('#addForm').serialize() + "&id=" + (isAdd ? "" : id),
			dataType : 'json',
			type : 'post',
			success : function(data) {
				if (data.result == 'ok') {
					// 请求成功 提示且刷新数据
					if (isAdd) {
						toastr.success('新增成功', '提示');
						// 请求成功（这里是添加数据成功）提示且刷新数据
						tableUtil.refreshData2Add('#table');
					} else {
						toastr.success('修改成功', '提示');
						// 请求成功（这里是添加数据成功）提示且刷新数据
						tableUtil.refreshData2Update('#table');// 刷新表格
					}
				} else {
					// 失败
					if (isAdd) {
						toastr.error('新增失败！请稍后再试', '提示');
					} else {
						toastr.error('修改失败！请稍后再试', '提示');
					}
				}
			}
		});
		$('#addOrEditModal').modal('hide');//隐藏modal 
	}
}
 
//下拉选择班级级联更新学生信息
function changeClass(){
	var cid = $('#addClassID').val();
	var e = $('#addStudentID');
	if(cid != 0){
		//清空所有的option
		e.empty();
		$.ajax({
			url: rootPath+'/studentDataServlet',
			data: { cid: cid },
			dataType:'json',
			success: function(data){
				if($.isArray(data)){
					$.each(data, function (i, item) {  //循环json，添加下拉标签
						e.append('<option value="'+item.STUDENTID+'">'+item.STUDENTNAME+'</option>'); 
					});  
				}
			}
		});
	}else{ //清空
		e.empty();
		e.append('<option value="" selected>请选择学生</option>');
	}
}

//查看详情
$('#detailModal').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget);
	var clsname = button.data("clasname"),
		stuname = button.data("stuname"),
		sendname = button.data("sendname"),
		cretime = button.data("cretime");
		content = button.data("content");
		
	$('#detailStudent').val(stuname);
	$('#detailClass').val(clsname);
	$('#detailEvaUser').val(sendname);
	if(util.text.isEmpty(cretime)){
		cretime='';
	}
	$('#detailEvaDate').val(cretime.replace('T', ' '));
	$('#detailContent').val(content);
});

/*table 删除按钮*/
function confirmDeleteModal(id){
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + id + ')');
};     

/*modal 确认删除按钮*/
function deleteData(id) {
	$.ajax({
		url : rootPath + '/evaluateServlte?optFlag=delete',
		data : { id : id},
		dataType:'json',
		success : function(data) {
			if (data.result == 'ok') {
				toastr.success('删除成功', '提示');
				// 请求成功（这里是删除数据成功）提示且刷新数据
				tableUtil.refreshData2Delete('#table');// 刷新表格
			} else {
				// 失败
				toastr.error('删除失败！请稍后再试', '提示');
			}
		}
	});
};


function initQueDate() {
	//查询日期设置
	$('#queStartDateGroup').datetimepicker({
	    format: 'yyyy-mm-dd', //日期格式
	    language: 'zh-CN', // 国际化 为中文
	    minView: 2, // 精确到2--天
	    todayBtn: true, //显示当天日期
	    autoclose: true, //选择日期后自动关闭 
	    initialDate: new Date(),//初始化当前日期
	    startDate: "2013-01-01",//开始日期
	    pickerPosition: "bottom-left"//定位
	}).on("changeDate",function(ev){//日期改变监听事件
		//结束时间不能小于开始时间
		$('#queEndDateGroup').datetimepicker("setStartDate",ev.date);
	});
	$('#queEndDateGroup').datetimepicker({
	    format: 'yyyy-mm-dd', //日期格式
	    language: 'zh-CN', // 国际化 为中文
	    minView: 2, // 精确到2--天
	    todayBtn: true, //显示当天日期
	    autoclose: true, //选择日期后自动关闭 
	    initialDate: new Date(),//初始化当前日期
	    startDate: "2013-01-01",//开始日期
	    pickerPosition: "bottom-left"//定位
	}).on("changeDate",function(ev){//点击监听事件
		//开始时间不能大于结束时间
		$('#queStartDateGroup').datetimepicker("setEndDate",ev.date)
	});
};