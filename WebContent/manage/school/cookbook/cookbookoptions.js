var rootPath = util.getRootPath();
	
$(function() {
	//表格初始化
	tableUtil.initTable({
		table:'#table',
		toolbar : "#toolbar",
		url : rootPath + '/cookbookOptionsServlet?optFlag=query',
		uniqueId : 'ID', //每一行的标识（要具有唯一性）
		columns : [
			//field对应返回数据中的字段
			{
				field : 'DEFTYPE',
				title : '选项编号',
			},
			{
				field : 'DEFNAME',
				title : '选项名称',
			},
			{
				field : 'SEQ',
				title : '序号',
			},
			{
				title : '操作',
				align:'center',
				valign:'center',
				formatter : function(value, row, index) {
					var foodsId = row.ID;
					//编辑html拼接标签
					var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-role"'
						+'data-toggle="modal" data-id="'+foodsId+'" data-target="#addModal">'
						+'<i class="fa fa-edit"></i> 编辑</a>';
					//删除html拼接标签
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role"'
						+'data-toggle="modal" data-id="'+foodsId+'" data-target="#deleteModal">'
						+'<i class="fa fa-trash-o"></i> 删除</a>';
					//添加拼接标签以join中的字符串分隔开来
					return [edit,del].join(' ');
				}
			}
		]
	});
});

//新增对话框监听
$('#addModal').on('show.bs.modal',function (e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'),
	btnSave = $('#addBtnSave');
	btnSave.removeAttr('onclick');
	//重置表单
	$('#addForm')[0].reset();
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增食谱选项':'编辑食谱选项');// 设置medal标题
	if(!isAdd){
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		$('#defType').val(row.DEFTYPE);
		$('#defName').val(row.DEFNAME);
		$('#defSEQ').val(row.SEQ);
	}
	btnSave.attr('onclick', 'saveData("' + id + '")');
});

$('#addModal').on("hidden.bs.modal", function() {
	$('#addForm').bootstrapValidator('resetForm', true); // 重置验证
});

$('#addForm').bootstrapValidator({
	fields : {
		defType : {
			validators : {
				notEmpty : {
					message : '请填写选项编号'
				},
				regexp: {
                    regexp: /^\d+$/,
                    message: '选项编号只能为数字拼接，如：002'
                }
			}
		},defName : {
			validators : {
				notEmpty : {
					message : '请填写选项名称'
				}
			}
		},defSEQ : {
			validators : {
				notEmpty : {
					message : '请填写选项序号'
				},
				integer: {message: '选项序号只能输入整数'}
			}
		}
	},
	excluded: [':disabled']
});

function saveData(id) {
//	$('#addForm').bootstrapValidator('validate');
	var valid = $('#addForm').data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		//通过校验
		var isAdd = util.text.isEmpty(id);
		$.post(rootPath + '/cookbookOptionsServlet?optFlag='+ (isAdd ? 'add':'edit'), $('#addForm').serialize()+"&id="+(isAdd ? "":id), function(data) {
			if (data.result == 'ok') {
				// 请求成功 提示且刷新数据
				if(isAdd){
					toastr.success('新增成功','提示');
					tableUtil.refreshData2Add('#table');;// 刷新表格
				}else{
					toastr.success('修改成功','提示');
					tableUtil.refreshData2Update('#table');;// 刷新表格
				}
			} else {
				// 失败
				if(isAdd){
					toastr.error('新增失败！请稍后再试','提示');
				}else{
					toastr.error('修改失败！请稍后再试','提示');
				}
			}
			$('#addModal').modal('hide');
		}, 'json');
	};
};
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
	$.post(rootPath + '/cookbookOptionsServlet?optFlag=delete',{'id':id},function(data){
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
}