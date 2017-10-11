;
var rootPath = util.getRootPath();
//表格
var table = $('#tableSuggetion');

//日期控件初始化 (在modal中显示和隐藏的时候会同时调用modal的显示和隐藏事件)
$('#queStartDate').datetimepicker({
	language:  'zh-CN',//语言（需依赖语言包）
    format: 'yyyy-mm-dd',//格式
    minView:2,//最小精确到天
    todayBtn:true,//显示选择当天的按钮
    autoclose:true//自动关闭-当选择一个日期之后立即关闭
});
$('#queEndDate').datetimepicker({
	language:  'zh-CN',//语言（需依赖语言包）
    format: 'yyyy-mm-dd',//格式
    minView:2,//最小精确到天
    todayBtn:true,//显示选择当天的按钮
    autoclose:true//自动关闭-当选择一个日期之后立即关闭
});

$(function() {
	//表格初始化
	tableInit();
});

function tableInit() {
	table.bootstrapTable({
		url : rootPath+'/suggestServlet?optFlag=query',//远程请求地址
		method : 'get',//请求方式
		dataType : 'json',//接收数据类型
		//contentType : "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, //是否显示行间隔色
		//toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, //是否启用排序
		pagination : true, //是否显示分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 10, //每页的记录行数（*）
		pageList : [ 10, 25, 50 ], //可供选择的每页的行数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, //是否启用点击选中行
		uniqueId : 'ID', //每一行的标识（要具有唯一性）
		queryParams : queryParams,//请求参数
		columns : [
				//field对应返回数据中的字段
				{
					field : 'REALNAME',
					title : '反馈者',
					width : '15%'
				},
				{
					field : 'MOBILE',
					title : '联系方式',
					width : '15%'
				},
				{
					field : 'CONTENT',
					title : '反馈内容',
					width : '40%'
				},
				{
					field : 'CRETIME',
					title : '反馈时间',
					width : '15%',
					formatter : function(value, row, index) {
						return getTime(value);
					}
				},
				{									
					field : 'ID',
					title : '操作',
					align : 'center',
					valign : 'center',
					width : '15%',
					formatter : function(value, row, index) {
						//删除html拼接标签 根据 data-xx来传递数据  xx为自己命名的参数
						var detail = '<a type="button" title="详情" class="btn btn-info shiny btn-xs purple"'
							+'data-toggle="modal" data-id="'+value+'" data-target="#detailModal">'
							+'<i class="fa fa-eye"></i> 详情</a>';
						//删除html拼接标签
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple"'
							+'data-toggle="modal" data-id="'+value+'" data-target="#deleteModal">'
							+'<i class="fa fa-trash-o"></i> 删除</a>';
						//添加拼接标签以join中的字符串分隔开来
						return [detail,del].join(' ');
					},
				} ],
		onClickRow : function(row, ele, fileid) {//table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		}
	});
};

function getTime(value) {
	if(value == undefined || value == null || value == ''){
		return value;
	}
	var time = value.replace('T',' ');
	return time;
}

//查询请求参数对象
var searchParams = {};
//table数据查询请求参数设置
function queryParams(params) {//请求参数
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.keyword = searchParams.keyword;
	return params;
};
//搜索数据
function searchData() {
	//搜索参数设置
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.keyword = $('#queKeyword').val();
	//销毁表格 已达到真正的清除当前表格所加载的数据
	table.bootstrapTable('destroy');
	//重新创建表格 用于重新加载数据
	tableInit();
};

//详情窗口显示监听
$('#detailModal').on('show.bs.modal',function(e){
	var button = $(e.relatedTarget); // 触发该对话框的按钮
	var id = button.data('id');//获取传递的id(UniqueId)
	//根据id获取该行的数据-->获取UniqueId标识的行数据
	var row = table.bootstrapTable('getRowByUniqueId', id);
	$('#detailTitle').val(row.TITLE);
	$('#detailName').val(row.REALNAME);
	$('#detailMobile').val(row.MOBILE);
	$('#detailTime').val(getTime(row.CRETIME));
	$('#detailContent').val(row.CONTENT);
});

//删除窗口显示监听
$('#deleteModal').on('show.bs.modal',function(e){
	var button = $(e.relatedTarget); // 触发该对话框的按钮
	var id = button.data('id');//获取传递的id(UniqueId)
	//为删除确定按钮添加点击事件
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");//先移除，再添加
	btnDel.attr('onclick', 'deleteData("' + id + '")');
});

function deleteData(id) {
	//post请求删除 第二种传参的例子
	$.get(rootPath+'/suggestServlet',{'optFlag':'delete','id':id},function(data){
		if(data.result=='ok'){
			toastr.success('删除成功', '提示');
			//请求成功（这里是删除数据成功）提示且刷新数据
			table.bootstrapTable('refresh');//刷新表格
		}else{
			//失败
			toastr.error('删除失败！请稍后再试');
		}
	},'json');
	$('#deleteModal').modal('hide');
}