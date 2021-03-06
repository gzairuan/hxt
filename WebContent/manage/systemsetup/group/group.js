/*!
 * group v1.0
 * Copyright 2017 hinear
 */;
var rootPath = util.getRootPath();
var tableObj = {
	table : '#table',
	toolbar : "#toolbar",
	url : rootPath + '/groupServlet?optFlag=query',// 远程请求地址
	uniqueId : 'GROUP_ID',
	columns : [
			{
				field : 'state',// 当前选择框的状态，多选时必须添加
				checkbox : true
			},
			// field对应返回数据中的字段
			{
				field : 'GROUP_NAME',
				title : '组名',
				width : '15%'
			},
			{
				field : 'USERNAME',
				title : '创建人',
				width : '15%'
			},
			{
				field : 'CREATE_TIME',
				title : '创建时间',
				width : '20%',
				formatter : function(value, row, index) {
					if (util.text.isEmpty(value)) {
						return '';
					}
					return value.replace('T', ' ');
				}
			},
			{
				field : 'UPDATE_TIME',
				title : '修改时间',
				width : '20%',
				formatter : function(value, row, index) {
					if (util.text.isEmpty(value)) {
						return '';
					}
					return value.replace('T', ' ');
				}
			},
			{
				field : '_operate',
				title : '操作',
				align : 'center',
				valign : 'center',
				width : '20%',
				formatter : function(value, row, index) {
					// 删除html拼接标签 根据 data-xx来传递数据 xx为自己命名的参数
					var edit = '<a type="button" title="编辑" class="btn btn-info shiny btn-xs purple"'
							+ 'data-toggle="modal" data-id="'
							+ row.GROUP_ID
							+ '" data-title="编辑组" data-flag="edit" data-target="#editModal">'
							+ '<i class="fa fa-edit"></i> 编辑</a>';
					// 删除html拼接标签
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple"'
							+ 'data-toggle="modal" data-id="'
							+ row.GROUP_ID
							+ '" data-target="#deleteModal">'
							+ '<i class="fa fa-trash-o"></i> 删除</a>';
					// 添加拼接标签以join中的字符串分隔开来
					return [ edit, del ].join(' ');
				},
			} ]
};

$(function() {
	// 初始化表格
	tableUtil.initTable(tableObj);
});

$('#editModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	flag = btn.data('flag'), title = btn.data('title'), // modal标题
	btnSave = $('#editBtnSave'), gName = $('#editGroupName');

	$(this).find('.modal-title').text(title);// 设置medal标题

	btnSave.removeAttr('onclick');
	if (flag === 'add') {
		gName.val('');
		btnSave.attr('onclick', 'addSaveData()');
	} else if (flag === 'edit') {
		var id = btn.data('id');
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		gName.val(row.GROUP_NAME);
		btnSave.attr('onclick', 'editSaveData("' + id + '")');
	}
});

function addSaveData(gName) {
	var gName = $('#editGroupName').val();
	if (gName == null || gName == '') {
		toastr.warning('请填写组名！','提示');
		return;
	}
	$.post(rootPath + '/groupServlet?optFlag=add', {
		'groupName' : gName
	}, function(data) {
		if (data.result == 'ok') {
			toastr.error('新增成功','提示');
			// 请求成功（这里是添加数据成功）提示且刷新数据
			$('#table').bootstrapTable('refresh');// 刷新表格
		} else {
			// 失败
			toastr.error('新增失败！请稍后再试','提示');
		}
		$('#editModal').modal('hide');
	}, 'json');
};

function editSaveData(id) {
	var gName = $('#editGroupName').val();
	if (gName == null || gName == '') {
		toastr.warning('请填写组名！','提示');
		return;
	}
	var row = tableUtil.getRowData('#table',id);
	row.GROUP_NAME = gName;
	$.post(rootPath + '/groupServlet?optFlag=edit', {
		'groupJson' : JSON.stringify(row)
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('修改成功','提示');
			// 请求成功（这里是添加数据成功）提示且刷新数据
			$('#table').bootstrapTable('refresh');// 刷新表格
		} else {
			// 失败
			toastr.error('修改失败！请稍后再试','提示');
		}
		$('#editModal').modal('hide');
	}, 'json');
};

// 删除对话框打开监听（也就是打开的时候会被掉用）
$('#deleteModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'), $this = $(this), btnDel = $('#btnDel');
	btnDel.removeAttr('onclick');
	if (id > 0) {
		$this.find('p').html('&nbsp;确认删除该记录？');
		btnDel.show();
		btnDel.attr('onclick', 'deleteData("' + id + '")');
		return;
	}
	// 获取table选中的数据id集合 ->如果没有数据(返回空数组)提示显示数据，有数据的话显示删除确定按钮
	var selections = table.bootstrapTable('getSelections');
	if (selections.length == 0) {
		// 空数组 没有选中行
		$this.find('p').html('&nbsp;请选择记录？');
		btnDel.hide();// 隐藏
	} else {
		$this.find('p').html('&nbsp;确认删除选中记录？');
		var ids = '', len = selections.length;
		$.each(selections, function(index, row) {
			ids += index === len - 1 ? row.GROUP_ID : row.GROUP_ID + ',';
		});
		btnDel.show();
		btnDel.attr('onclick', 'deleteData("' + ids + '")');
	}
});
// 删除数据事件
function deleteData(ids) {
	// post请求删除 第二种传参的例子
	$.get(rootPath + '/groupServlet?optFlag=delete', {
		'ids' : ids
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('删除成功','提示');
			// 请求成功（这里是删除数据成功）提示且刷新数据
			$('#table').bootstrapTable('refresh');// 刷新表格
		} else {
			// 失败
			toastr.error('删除失败！请稍后再试','提示');
		}
	}, 'json');
	$('#deleteModal').modal('hide');
}