/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();
//列表
var table = $('#tableHealthlist');

var classOptionData;

$(function() {
	//获取选择班级数据 添加到选择标签中
	classOptionDataInit();

	//表格初始化
	tableInit();
	
});
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
})
//班级选项数据初始化
function classOptionDataInit() {
	//请求班级数据（通过接口获取数据）
	$.post(rootPath+'/classDataServlet', function(data) {
		if (data) {
			classOptionData = data;
			//添加到选择标签中
			addClassSelectItem($('#queClassID'), '全部');
		}
	}, 'json');
}
function addClassSelectItem(e, optionHint) {
	if (e && classOptionData) {
		if (classOptionData != null) {
			//清空所有的option
			e.empty();
			e.append('<option value="0">' + optionHint + '</option>');
			$.each(classOptionData, function(index, obj) {
				e.append('<option value="'+obj.CLASSESID+'">' + obj.CLASSESNAME + '</option>');
			});
		}
	}
}
function tableInit() {
	table.bootstrapTable({
				url : rootPath+'/healthServlet?optFlag=query',//远程请求地址
				method : 'post',//请求方式
				dataType : 'json',//接收数据类型
				contentType : "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
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
				uniqueId : 'ID', //每一行的标识（要具有唯一性）
				queryParams : queryParams,//请求参数
				columns : [
						//field对应返回数据中的字段
						{
							field :'time',
							title :'日期',
							formatter : function(value, row, index) {
								if(util.text.isEmpty(value)){
									return '';
								}
								//截取字符串
								var time = value.substring(0, value.indexOf('T'));
								return time;
							}
						},
						{
							field :'studentNo',
							title :'学号'
						},
						{
							field :'studentName',
							title :'姓名'
						},
						{
							field :'temperature',
							title :'体温'
						},
						{
							field :'watchdesc',
							title :'观察'
						},
						{									
							field :'wzykdesc',
							title :'吃药'
						},
						{
							field :'hygienedesc',
							title :'卫生检查'
						}],
				onClickRow : function(row, ele, fileid) {//table选中行设置背景色
					$(".info").removeClass("info");
					$(ele).addClass("info");
				}
			});
};
//请求参数字段
var searchParams = {};
//table数据请求参数设置
function queryParams(params) {//请求参数
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.classId = searchParams.classId;
	params.stuNo = searchParams.stuNo;
	params.stuName = searchParams.stuName;
	return params;
};
//搜索数据
function searchData() {
	//搜索参数设置
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.classId = $('#queClassID').val();
	searchParams.stuNo = $('#queStuNo').val();
	searchParams.stuName = $('#queStuName').val();
	//销毁表格 以达到真正的清除当前表格所加载的数据
	table.bootstrapTable('destroy');
	//重新创建表格 用于重新加载数据
	tableInit();
};