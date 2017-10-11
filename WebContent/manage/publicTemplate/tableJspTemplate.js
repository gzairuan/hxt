/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

var tableObj = {
	table : '#table',// 必要
	toolbar : '#toolbar',// 可选
	url : rootPath + '/xxx',// 必要 可以直接在后面加参数 如 :/xxx?key=value
	uniqueId : 'id',// 必要 id表示一个唯一的标识，用于识别行
	columns : [ {
		field : '列字段名',
		title : '列标题',
		width : '列宽',// 可用百分比
		formatter : function(value, row, index) {
			// 格式化当前列,返回的结果显示在列当中
			return '';
		}
	} ],// 必要
	queryParams : function(params) {
		return params;
	}// 可选，params为表格默认传的参数，可添加自定义参数，如：params.key = value;
};

$(function() {
	// 初始化table
	tableUtil.initTable(tableObj);
});
