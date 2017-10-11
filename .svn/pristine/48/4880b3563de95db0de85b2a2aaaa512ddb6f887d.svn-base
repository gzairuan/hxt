/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

var tableObj = {
	table : '#table',// 必要
	url : rootPath + '/attendanceServlet',// 必要 可以直接在后面加参数 如 :/xxx?key=value
	uniqueId : 'STUDENTNO',// 必要 id表示一个唯一的标识，用于识别行
	columns : [ {
		field : 'CNAME',
		title : '班级',
		width : '15%'
	},{
		field : 'STUDENTNAME',
		title : '姓名',
		width : '15%'
	},{
		field : 'STUDENTNO',
		title : '学号',
		width : '15%'
	},{
		field : 'SDATE',
		title : '日期',
		width : '15%',// 可用百分比
		formatter : function(value, row, index) {
			// 格式化当前列,返回的结果显示在列当中
			return value.substring(0,value.indexOf('T'));
		}
	},{
		field : 'ENTRYTIME',
		title : '入校时间',
		width : '13%'
	},{
		field : 'LEAVETIME',
		title : '离校时间',
		width : '13%'
	},{
		field : 'STATEDESC',
		title : '考勤状态',
		width : '14%'
	} ],// 必要
	queryParams : queryParams// 可选，params为表格默认传的参数，可添加自定义参数，如：params.key = value;
};

var searchParams = {};

function queryParams(params) {
	params.sdate = searchParams.sdate;
	params.edate = searchParams.edate;
	params.cid = searchParams.cid;
	params.stuID = searchParams.stuID;
	return params;
}

function searchData() {
	searchParams.sdate = $('#queStartDate').val();
	searchParams.edate = $('#queEndDate').val();
	searchParams.cid = $('#queClassID').val();
	searchParams.stuID = $('#queStudentID').val();
	tableUtil.refreshData2Query('#table');
}

function changeClass() {
	resetStudentData($('#queClassID').val());
}

$(function() {
	//初始化查询日期，从当前日期开始
	initQueDate();
	//初始化班级
	initClassData();
	//初始化学生
	initStudentData();
	// 初始化table
	tableUtil.initTable(tableObj);
});
function initClassData() {
	var classID = $('#queClassID');
	classID.empty();
	classID.append('<option value="0">全部</option>');
	$.get(rootPath+'/classDataServlet', function(data) {
		if (data) {
			$.each(data,function(index,item){
				var option = '<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>';
				//添加到选择标签中
				classID.append(option);
			});
		}
	}, 'json');
}
function initStudentData() {
	resetStudentData(0);
}

function resetStudentData(cid){
	var studentID = $('#queStudentID');
	studentID.empty();
	studentID.append('<option value="0" selected>全部</option>');
	$.get(rootPath+'/studentDataServlet',{cid:cid}, function(data) {
		if (data) {
			$.each(data,function(index,item){
				var option = '<option value="'+item.STUDENTID+'">'+item.STUDENTNAME+'</option>';
				//添加到选择标签中
				studentID.append(option);
			});
		}
	}, 'json');
}

function initQueDate() {
	//设置默认选中日期
	$('#queStartDate').val(util.dateFormat(new Date(),'yyyy-MM-dd'));
	$('#queEndDate').val(util.dateFormat(new Date(),'yyyy-MM-dd'));
	//查询日期设置
	$('#queStartDateGroup').datetimepicker({
	    format: 'yyyy-mm-dd', //日期格式
	    language: 'zh-CN', // 国际化 为中文
	    minView: 2, // 精确到2--天
	    todayBtn: true, //显示当天日期
	    autoclose: true, //选择日期后自动关闭 
	    initialDate: new Date(),//初始化当前日期
	    startDate: "2013-01-01",//开始日期
	    endDate:$('#queEndDate').val(),
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
	    startDate: $('#queStartDate').val(),//开始日期
	    endDate:new Date(),//结束日期
	    pickerPosition: "bottom-left"//定位
	}).on("changeDate",function(ev){//点击监听事件
		//开始时间不能大于结束时间
		$('#queStartDateGroup').datetimepicker("setEndDate",ev.date)
	});
	searchParams.sdate = $('#queStartDate').val();
	searchParams.edate = $('#queEndDate').val();
};
