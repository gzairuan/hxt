/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

var tableObj = {
	table : '#table',// 必要
	toolbar : '#toolbar',// 必要
	url : rootPath + '/phonebookServlet',// 必要 可以直接在后面加参数 如 :/xxx?key=value
	//uniqueId : 'id',// 必要 id表示一个唯一的标识，用于识别行
	columns : [ {
		field : 'REALNAME',
		title : '姓名'
	},{
		field : 'USERTYPENAME',
		title : '用户类型'
	},{
		field : 'MOBILE',
		title : '联系电话'
	} ],// 必要
	queryParams : queryParams// 可选，params为表格默认传的参数，可添加自定义参数，如：params.key = value;
};

var searchParams = {};

function queryParams(params) {
	params.name = searchParams.name; 
	params.phone = searchParams.phone; 
	params.cid = searchParams.cid; 
	return params;
};

function searchData() {
	searchParams.name = $('#queName').val();
	searchParams.phone = $('#quePhone').val();
	searchParams.cid = $('#queClassID').val();
	tableUtil.refreshData2Query('#table');
};

$(function() {
	// 初始化table
	tableUtil.initTable(tableObj);
	initClassID();
});

function initClassID() {
	$.post(rootPath+'/classDataServlet',function (data){
		if(data){
			var selectClassID = $('#queClassID');
			$.each(data,function (index,obj){
				var option='<option value="'+obj.CLASSESID+'">'+obj.CLASSESNAME+'</option>';
				selectClassID.append(option);
			});
			searchData();
		}
	},'json');
}