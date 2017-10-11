var rootPath = util.getRootPath();
		//页面类型<每日作业>
var typeId = 1;
$('#queStartDate').datetimepicker({
	language:  'zh-CN',//语言（需依赖语言包）
    format: 'yyyy-mm-dd',//格式
    startDate:'2013-01-01',
    minView:2,//最小精确到天
    todayBtn:true,//显示选择当天的按钮
    autoclose:true//自动关闭-当选择一个日期之后立即关闭
});
$('#queEndDate').datetimepicker({
	language:  'zh-CN',//语言（需依赖语言包）
    format: 'yyyy-mm-dd',//格式
    startDate:'2013-01-01',
    minView:2,//最小精确到天
    todayBtn:true,//显示选择当天的按钮
    autoclose:true//自动关闭-当选择一个日期之后立即关闭
});

$('#addForm').bootstrapValidator({
	fields : {
		classId : {
			validators : {
				notEmpty : {
					message : '请选择班级'
				}
			}
		},title : {
			validators : {
				notEmpty : {
					message : '请填写作业标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写作业内容'
				}
			}
		}
	},
	excluded: [':disabled']
});
$('#editForm').bootstrapValidator({
	fields : {
		title : {
			validators : {
				notEmpty : {
					message : '请填写作业标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写作业内容'
				}
			}
		}
	},
	excluded: [':disabled']
});
$(function() {
	//获取选择班级数据 添加到选择标签中
	addClassSelectItem($('#queClassSelect'),'全部');
	
	//表格初始化
	tableInit();
});
/**
* e （select标签元素）
*/
function addClassSelectItem(e,hint) {
	if(e){
		//清空所有的option
		e.empty();
		e.append('<option value="" selected>'+hint+'</option>');
		$.post(rootPath+'/classDataServlet',function (data){
			if(data){
				$.each(data,function (index,obj){
					e.append('<option value="'+obj.CLASSESID+'">'+obj.CLASSESNAME+'</option>');
				});
			}
		},'json');
	}
}
function tableInit() {
	tableUtil.initTable({
		table:'#table',
		url : rootPath+'/queryNewsServlet',//远程请求地址
		toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		uniqueId : 'NEWID', //每一行的标识（要具有唯一性）
		queryParams : queryParams,//请求参数
		columns : [
			//field对应返回数据中的字段
			{
				field : 'SENDNAME',
				title : '教师',
				width : '8%'
			},
			{
				field : 'CLASSESNAME',
				title : '班级',
				width : '12%'
			},
			{
				field : 'TITLE',
				title : '标题',
				width : '16%'
			},
			{
				field : 'CONTENT',
				title : '作业内容',
				width : '30%'
			},
			{
				field : 'CRETIME',
				title : '日期',
				width : '15%',
				formatter : function(value, row, index) {
					var time = value.replace('T',' ');
					return time;
				}
			},
			{
				title : '操作',
				align:'center',
				valign:'center',
				formatter : function(value, row, index) {
					var newsId = row.NEWID;
					//删除html拼接标签 根据 data-xx来传递数据  xx为自己命名的参数
					var detail = '<a type="button" title="详情" class="btn btn-info shiny btn-xs purple"'
						+'data-toggle="modal" data-id="'+newsId+'" data-target="#detailModal">'
						+'<i class="fa fa-eye"></i> 详情</a>';
					//编辑html拼接标签
					var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-role"'
						+' style="display: none;" data-toggle="modal" data-id="'+newsId+'" data-target="#editModal">'
						+'<i class="fa fa-edit"></i> 编辑</a>';
					//删除html拼接标签
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role"'
						+' style="display: none;" data-toggle="modal" data-id="'+newsId+'" data-target="#deleteModal">'
						+'<i class="fa fa-trash-o"></i> 删除</a>';
					//添加拼接标签以join中的字符串分隔开来
					return [detail,edit,del].join(' ');
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
//请求参数字段
var searchParams = {classId:$('#classSelect').val()};
//table数据请求参数设置
function queryParams(params) {//请求参数
	params.typeId = typeId;
	params.classId = searchParams.classId;
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.keyword = searchParams.keyword;
	return params;
};
//搜索数据
function searchData() {
	//搜索参数设置
	searchParams.classId = $('#queClassSelect').val();
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.keyword = $('#queKeyword').val();
	tableUtil.refreshData2Query('#table');
};
//新增对话框监听
$('#addModal').on('show.bs.modal',function (e){
	//打开初始化班级选择
	var ele = $('#modalClassSelect');
	//添加班级选择条目
	addClassSelectItem(ele,'请选择班级');
	//重置表单
	$('#addForm')[0].reset();
});
$('#addModal').on("hidden.bs.modal", function() {
	$('#addForm').bootstrapValidator('resetForm', true); // 重置验证
});
//新增保存数据事件
function addSaveData() {
	//使用post的简单用法 
	//4个参数的 方法 
	//第一个 接口地址
	//第二个 请求参数字符串 （两种类型）<参数名=参数值&参数名=参数值> 或者< {'参数名':参数值,'参数名':参数值} >
	//第三个 接口连接成功回调 data-->成功返回的结果{result:ok}或者{result:failure}判断实际结果
	//第四个 返回数据的类型  json（json类型）也就是请求接口必须返回的是json格式的字符串
	var $form = $('#addForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		//第一种传参的例子
		$.post(rootPath+'/addNewsServlet',$form.serialize() + "&typeId=" + typeId,function(data){
			if (data.result == 'ok') {
				toastr.success('新增成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				tableUtil.refreshData2Add('#table');// 刷新表格
			} else {
				// 失败
				toastr.error('新增失败！请稍后再试','提示');
			}
		},'json');
		$('#addModal').modal('hide');
	}
}
//编辑对话框打开监听
$('#editModal').on('show.bs.modal',function (e){
	var button = $(e.relatedTarget); // 触发该对话框的按钮
	var id = button.data('id');//获取传递的id
	//根据id获取该行的数据-->获取UniqueId标识的行数据
	var row = tableUtil.getRowData('#table', id);
	//根据类 填充详细对话框中input 内容 
	$(".news-title").val(row.TITLE);//作业标题
	$(".issuer").val(row.SENDNAME);//发布人
	$(".release-time").val(row.CRETIME);//发布时间
	$(".receive-class").val(row.CLASSESNAME);//接收班级
	$(".news-content").val(row.CONTENT);//作业内容
	//编辑确定按钮
	var btnEditOk = $('#btnEditOk');
	//先移除点击事件
	btnEditOk.removeAttr("onclick");
	//添加点击事件
	btnEditOk.attr('onclick', 'editSubmit("' + id + '")');
});
$('#editModal').on("hidden.bs.modal", function() {
	$('#editForm').bootstrapValidator('resetForm', true); // 重置验证
});
//编辑确定点击事件
function editSubmit(id) {
	var valid = $('#editForm').data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		//根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table', id);
		
		//获取UniqueId标识的行数据
		var title = $('#editTitle').val();
		var content = $('#editContent').val();
	
		//修改标题和内容的值
		row.TITLE = title;
		row.CONTENT = content;
		//post请求修改
		$.post(rootPath+'/updateNewsServlet',{"news" : JSON.stringify(row),"typeId" : typeId},function(data){
			if (data.result == 'ok') {
				toastr.success('修改成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				tableUtil.refreshData2Update('#table');// 刷新表格
			} else {
				// 失败
				toastr.error('修改失败！请稍后再试','提示');
			}
		},'json');
		$('#editModal').modal('hide');
	}
}
//详情对话框打开监听
$('#detailModal').on('show.bs.modal',function (e){
	var button = $(e.relatedTarget); // 触发该对话框的按钮
	var id = button.data('id');//获取传递的id
	
	//根据id获取该行的数据-->获取UniqueId标识的行数据
	var row = tableUtil.getRowData('#table', id);
	//根据类 填充详细对话框中input 内容 
	$(".news-title").val(row.TITLE);//作业标题
	$(".issuer").val(row.SENDNAME);//发布人
	$(".release-time").val(row.CRETIME);//发布时间
	$(".receive-class").val(row.CLASSESNAME);//接收班级
	$(".news-content").val(row.CONTENT);//作业内容
});
//删除对话框打开监听
$('#deleteModal').on('show.bs.modal',function (e){
	var button = $(e.relatedTarget); // 触发该对话框的按钮
	var id = button.data('id');//获取传递的id
	//为删除按钮设置点击事件
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");//先移除，再添加
	btnDel.attr('onclick', 'deleteData("' + id + '")');
});
//删除数据事件
function deleteData(id) {
	//post请求删除 第二种传参的例子
	$.post(rootPath+'/deleteNewsServlet',{'newsId':id,'typeId':typeId},function(data){
		if (data.result == 'ok') {
			toastr.success('删除成功','提示');
			// 请求成功（这里是删除数据成功）提示且刷新数据
			tableUtil.refreshData2Delete('#table');// 刷新表格
		} else {
			// 失败
			toastr.error('删除失败！请稍后再试','提示');
		}
	},'json');
	$('#deleteModal').modal('hide');
};