;
var rootPath = util.getRootPath();
// 传给tableUtil的对象
var tableObj = {
	table : '#table',
	toolbar : '#toolbar',
	url : rootPath + "/cookbookServlet?optFlag=query",
	uniqueId : "FOODID",
	columns : [
			{
				field : 'FOODDATE',
				title : '日期',
				formatter : function(value, row, index) {
					if (util.text.isEmpty(value))
						return '';
					return value.substring(0, value.indexOf('T'));
				}
			},
			{
				field : 'WEEKDAY',
				title : '星期'
			},
			{
				field : 'FOODDETAIL',
				title : '早餐'
			},
			{
				field : 'FOODDETAIL2',
				title : '午餐'
			},
			{
				field : 'operate',
				title : '操作',
				align:'center',
				valign:'center',
				formatter : function(value, row, index) {
					// 删除html拼接标签 根据 data-xx来传递数据 xx为自己命名的参数
					var detail = '<a type="button" title="详情" class="btn btn-info shiny btn-xs purple"'
							+ 'data-toggle="modal" data-id="'
							+ row.FOODID
							+ '" data-target="#detailModal">'
							+ '<i class="fa fa-eye"></i> 详情</a>';
					// 编辑html拼接标签
					var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-role"'
							+ ' style="display: none;" data-toggle="modal" data-id="'
							+ row.FOODID
							+ '" data-target="#addModal">'
							+ '<i class="fa fa-edit"></i> 编辑</a>';
					// 删除html拼接标签
					var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role"'
							+ ' style="display: none;" data-toggle="modal" data-id="'
							+ row.FOODID
							+ '" data-target="#delModal">'
							+ '<i class="fa fa-trash-o"></i> 删除</a>';
					if(row.ISEDIT === 1){
						return [ detail, edit, del ].join(' ');
					}
					// 添加拼接标签以join中的字符串分隔开来
					return [ detail, del ].join(' ');
				}
			} ],
	queryParams : queryParams,
	onLoadSuccess:function(data){
    	roleUtil.roleHandler();
    }
};
$(function() {
	//初始化查询日期，从当前日期开始
	initQueDate();
	// 初始化table
	tableUtil.initTable(tableObj);
});
var searchParams = {};
function queryParams(params) {
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	return params;
};

function searchData() {
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $("#queEndDate").val();
	tableUtil.refreshData2Query('#table');
};

//详情modal打开监听
$('#detailModal').on('show.bs.modal',function (e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'),
	// 根据id获取该行的数据-->获取UniqueId标识的行数据
	row = tableUtil.getRowData('#table',id);
	$('#detailDate').val(row.FOODDATE.substring(0, row.FOODDATE.indexOf('T')));
	$('#detailWeekday').val(row.WEEKDAY);
	$('#detailBreakfast').val(row.FOODDETAIL);
	$('#detailLunch').val(row.FOODDETAIL2);
});

//新增/修改modal打开监听
$('#addModal').on('show.bs.modal',function (e){
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'),
	btnSave = $('#addBtnSave');
	btnSave.removeAttr('onclick');
	$('#addForm')[0].reset();
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增食谱':'编辑食谱');// 设置medal标题
	if(isAdd){
		//设置默认选中日期
		$('#addDate').val(util.dateFormat(new Date(),'yyyy-MM-dd'));
		//初始化MODAL日期选择
		initModalDate();
	}else{
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		var date = row.FOODDATE.substring(0, row.FOODDATE.indexOf('T'));
		$('#addDateGroup').datetimepicker('remove');
		$('#addDate').val(date);
		$('#addBreakfast').val(row.FOODDETAIL);
		$('#addLunch').val(row.FOODDETAIL2);
	}
	btnSave.attr('onclick', 'saveData("' + id + '")');
});

function saveData(id) {
	$('#addModal').modal('hide');
	var isAdd = util.text.isEmpty(id);
	$.post(rootPath + '/cookbookServlet?optFlag='+ (isAdd ? 'add':'edit'), $('#addForm').serialize()+"&id="+(isAdd ? "":id), function(data) {
		if (data.result == 'ok') {
			// 请求成功 提示且刷新数据
			if(isAdd){
				toastr.error('新增成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				tableUtil.refreshData2Add('#table');;// 刷新表格
			}else{
				toastr.success('修改成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				$('#table').bootstrapTable('refresh');// 刷新表格
			}
		} else {
			// 失败
			if(isAdd){
				toastr.error('新增失败！请稍后再试','提示');
			}else{
				toastr.error('修改失败！请稍后再试','提示');
			}
		}
	}, 'json');
};

//删除对话框打开监听（也就是打开的时候会被掉用）
$('#delModal').on('show.bs.modal', function(e) {
	var btn = $(e.relatedTarget), // 触发该对话框的按钮
	id = btn.data('id'), $this = $(this), btnDel = $('#delBtnOk');
	btnDel.removeAttr('onclick');
	if (id > 0) {
		$this.find('p').html('&nbsp;确认删除该记录？');
		btnDel.show();
		btnDel.attr('onclick', 'delData("' + id + '")');
	}
});
// 删除数据事件
function delData(id) {
	// post请求删除 第二种传参的例子
	$.post(rootPath + '/cookbookServlet?optFlag=delete', {
		'id' : id
	}, function(data) {
		if (data.result == 'ok') {
			toastr.success('删除成功','提示');
			// 请求成功（这里是删除数据成功）提示且刷新数据
			tableUtil.refreshData2Delete('#table');
		} else {
			// 失败
			toastr.error('删除失败！请稍后再试','提示');
		}
	}, 'json');
};

function initQueDate() {
	//查询日期设置
	$('#queStartDateGroup').datetimepicker({
	    format: 'yyyy-mm-dd', //日期格式
	    language: 'zh-CN', // 国际化 为中文
	    minView: 2, // 精确到2--天
	    todayBtn: true, //显示当天日期
	    autoclose: true, //选择日期后自动关闭 
	    initialDate: new Date(),//初始化当前日期
	    startDate: "2013-01-01",//开始日期
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
	    startDate: "2013-01-01",//开始日期
	    pickerPosition: "bottom-left"//定位
	}).on("changeDate",function(ev){//点击监听事件
		//开始时间不能大于结束时间
		$('#queStartDateGroup').datetimepicker("setEndDate",ev.date)
	});
};

function initModalDate() {
	//查询条件：开始日期
	$('#addDateGroup').datetimepicker({
	    format: 'yyyy-mm-dd', //日期格式
	    language: 'zh-CN', // 国际化 为中文
	    minView: 2, // 精确到2天
	    todayBtn: true, //显示当天日期
	    autoclose: true, //选择日期后自动关闭 
	    initialDate: new Date(),//初始化当前日期
	    startDate: new Date(),//开始日期
	    pickerPosition: "bottom-left"//定位
	}).on('show', function(event) {//添加显示隐藏监听是为了防止调用modal中的显示隐藏监听
		event.preventDefault();
		event.stopPropagation();
	}).on('hide', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
};