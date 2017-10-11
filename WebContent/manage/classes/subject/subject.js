/**
 * version 1.0
 */
;
var rootPath = util.getRootPath();

$('#addForm').bootstrapValidator({
	fields : {
		subjectName : {
			validators : {
				notEmpty : {
					message : '请选择科目名'
				}
			}
		}
	},
	excluded: [':disabled']
});

var tableObj = {
	table : '#table',// 必要
	toolbar : '#toolbar',// 必要
	url : rootPath + '/subjectServlet?optFlag=query',
	uniqueId : 'SUBJECTID',// 必要 id表示一个唯一的标识，用于识别行
	columns : [
			{
				checkbox : true
			},
			{
				field : 'SUBJECTNAME',
				title : '科目',
				width : '60%'
			},
			{
				field : 'operate',
				title : '操作',
				align : 'center',
				valign : 'center',
				formatter : function(value, row, index) {
					// 编辑html拼接标签
					var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-data"'
							+ 'data-toggle="modal" data-id="'
							+ row.SUBJECTID
							+ '" data-target="#addModal">'
							+ '<i class="fa fa-edit"></i> 编辑</a>';
					// 删除html拼接标签 根据 data-xx来传递数据 xx为自己命名的参数
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-data"'
							+ 'data-toggle="modal" data-id="'
							+ row.SUBJECTID
							+ '" data-target="#delModal">'
							+ '<i class="fa fa-trash-o"></i> 删除</a>';
					// 添加拼接标签以join中的字符串分隔开来
					return [ edit, del ].join(' ');
				}
			} ]
};

$(function() {
	// 初始化table
	tableUtil.initTable(tableObj);
});

$('#addModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
		id = btn.data('id'),
		btnSave = $('#addBtnSave'),
		gName = $('#addSubjectName');
		btnSave.removeAttr('onclick');
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增科目':'编辑科目');// 设置medal标题
	if(isAdd){
		gName.val('');
	}else{
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		gName.val(row.SUBJECTNAME);
	}
	btnSave.attr('onclick', 'saveData("' + id + '")');
});

$('#addModal').on("hidden.bs.modal", function() {
	$('#addForm').bootstrapValidator('resetForm', true);  //重置验证
});

function saveData(id) {
	var valid = $('#addForm').data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		var name = $('#addSubjectName').val();
		var isAdd = util.text.isEmpty(id);
		var params;
		if(isAdd){
			params = {'subjectName' : name};
		}else{
			params = tableUtil.getRowData('#table',id);
			params.SUBJECTNAME = name;
		}
		$.post(rootPath + '/subjectServlet?optFlag='+ (isAdd ? 'add':'edit'), params, function(data) {
			if(isAdd){
				if (data.result == 'ok') {
					toastr.success('新增成功','提示');
					// 请求成功（这里是添加数据成功）提示且刷新数据
					tableUtil.refreshData2Add('#table');// 刷新表格
				} else {
					// 失败
					toastr.error('新增失败！请稍后再试','提示');
				}
			}else{
				if (data.result == 'ok') {
					toastr.success('修改成功','提示');
					// 请求成功（这里是添加数据成功）提示且刷新数据
					tableUtil.refreshData2Update('#table');// 刷新表格
				} else {
					// 失败
					toastr.error('修改失败！请稍后再试','提示');
				}
			}
		}, 'json');
		$('#addModal').modal('hide');
	}
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
	// 获取table选中的数据id集合 ->如果没有数据(返回空数组)提示显示数据，有数据的话显示删除确定按钮
	var selections = $('#table').bootstrapTable('getSelections');
	if (selections.length == 0) {
		// 空数组 没有选中行
		$this.find('p').html('&nbsp;请选择记录？');
		btnDel.hide();// 隐藏
	} else {
		$this.find('p').html('&nbsp;确认删除选中记录？');
		var ids = '', len = selections.length;
		$.each(selections, function(index, row) {
			ids += index === len - 1 ? row.SUBJECTID : row.SUBJECTID + ',';
		});
		btnDel.show();
		btnDel.attr('onclick', 'delData("' + ids + '")');
	}
});
// 删除数据事件
function delData(ids) {
	// post请求删除 第二种传参的例子
	$.post(rootPath + '/subjectServlet?optFlag=delete', {
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
}
