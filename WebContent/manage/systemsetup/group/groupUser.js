;
var rootPath = util.getRootPath();
var tableNot = $('#tableNot');// 没有选择分组的用户
var tableYet = $('#tableYet');// 已经选择分组的用户
$(function() {
	$.post(rootPath + '/groupServlet?optFlag=query', function(data) {
		var rows = data.rows;
		var select = $('#selectGroupId');
		select.empty();
		$.each(rows, function(index, row) {
			var option = '<option value="' + row.GROUP_ID + '">'
					+ row.GROUP_NAME + '</option>';
			select.append(option);
		});
		changeGroupList();
	}, 'json');
	initYetTable();
	initNotTable();
});
function initYetTable() {
	tableYet.bootstrapTable({
		url : rootPath + '/groupServlet?optFlag=yetUser',// 远程请求地址
		method : 'get',// 请求方式
		dataType : 'json',// 接收数据类型
		// contentType :
		// "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, // 是否显示行间隔色
		// toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar,
		// .toolbar.
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, // 是否启用排序
		pagination : true, // 是否显示分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25, 50 ], // 可供选择的每页的行数（*）
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, // 是否启用点击选中行
		uniqueId : 'USERID', // 每一行的标识（要具有唯一性）
		queryParams : queryParams,// 请求参数
		// responseHandler:responseHandler,//在渲染页面数据之前执行的方法，有多选时此配置必须配置
		columns : [ {
			checkbox : true
		},
		// field对应返回数据中的字段
		{
			field : 'USERNAME',
			title : '用户名'
		}, {
			field : 'REALNAME',
			title : '姓名'
		} ],
		onClickRow : function(row, ele, fileid) {// table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		}
	});
}
function initNotTable() {
	tableNot.bootstrapTable({
		url : rootPath + '/groupServlet?optFlag=notUser',// 远程请求地址
		method : 'get',// 请求方式
		dataType : 'json',// 接收数据类型
		// contentType :
		// "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
		striped : true, // 是否显示行间隔色
		// toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar,
		// .toolbar.
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		sortable : false, // 是否启用排序
		pagination : true, // 是否显示分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页
		pageSize : 10, // 每页的记录行数（*）
		pageList : [ 10, 25, 50 ], // 可供选择的每页的行数（*）
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		clickToSelect : true, // 是否启用点击选中行
		uniqueId : 'USERID', // 每一行的标识（要具有唯一性）
		queryParams : queryParams,// 请求参数
		// responseHandler:responseHandler,//在渲染页面数据之前执行的方法，有多选时此配置必须配置
		columns : [ {
			checkbox : true
		},
		// field对应返回数据中的字段
		{
			field : 'USERNAME',
			title : '用户名'
		}, {
			field : 'REALNAME',
			title : '姓名'
		}, {
			field : 'USERTYPENAME',
			title : '用户类型'
		} ],
		onClickRow : function(row, ele, fileid) {// table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		}
	});
}
function queryParams(params) {
	params.groupId = $('#selectGroupId').val();
	return params;
}
function changeGroupList() {
	// 销毁表格 已达到真正的清除当前表格所加载的数据
	tableYet.bootstrapTable('destroy');
	tableNot.bootstrapTable('destroy');
	// 重新创建表格 用于重新加载数据
	initYetTable();
	initNotTable();
}
// 将用户移出组
function shiftOutGroup() {
	var selections = tableYet.bootstrapTable('getSelections');
	if (!selections || selections.length === 0) {
		// 弹出提示
		toastr.warning('请选择要解绑的用户！', '提示');
		return;
	}
	var ids = $.map(selections, function(row) {
		return row.USERID;
	}).join(',');
	$.post(rootPath + '/groupServlet?optFlag=shiftOut', {
		'groupId' : $('#selectGroupId').val(),
		'userIds' : ids
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('移除成功', '提示');
			changeGroupList();
		}else{
			toastr.error('移除失败！请稍后再试', '提示');
		}
	}, 'json');
}
// 将用户移入组
function shiftInGroup() {
	var selections = tableNot.bootstrapTable('getSelections');
	if (!selections || selections.length === 0) {
		// 弹出提示
		toastr.warning('请选择要绑定该组的用户！', '提示');
		return;
	}
	var ids = $.map(selections, function(row) {
		return row.USERID;
	}).join(',');
	$.post(rootPath + '/groupServlet?optFlag=shiftIn', {
		'groupId' : $('#selectGroupId').val(),
		'userIds' : ids
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('添加成功', '提示');
			changeGroupList();
		}else{
			toastr.error('添加失败！请稍后再试', '提示');
		}
	}, 'json');
}
