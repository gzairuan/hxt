/*
 * 学校审核
 * 
 */
 
var rootPath = util.getRootPath();
var table = $('#tableSchoolAppl');

//初始化table
$(function() {
	//初始化table
	tableInit();
});

function tableInit(){
	table.bootstrapTable({
		
		url : rootPath + '/schoolApplInitServlet',//远程请求地址
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
		uniqueId : 'SID', //每一行的标识（要具有唯一性）
		queryParams : queryParams,
		
		columns : [
				//field对应返回数据中的字段
				{
					field : 'SID',
					title : '学校ID '
				},
				{
					field : 'DOMAINNAME',
					title : '区域 '
				},
				{
					field : 'SNAME',
					title : '学校名称'
				},
				{
					field : 'SADDRESS',
					title : '学校地址'
				},
				{
					field : 'LINKNAME',
					title : '联系人'
				},
				{
					field : 'MOBILE',
					title : '联系电话'
				},
				{
					field : 'HANDLESTATE',
					title : '审核状态',
					formatter: function(value, row, index){
						if(value == 0) return "未审核";
						if(value == 1) return "已审核";
 					} 
				},
				{
					field : 'CTIME',
					title : '创建时间',
					formatter : function(value, row,
							index) {
						var time = value.replace('T',' ');
						return time;
					}
				},
				{
					field : 'REMARK',
					title : '备注',
					formatter : function(value, row,
							index) {
						if(value == null) 
							return "";
					}
				},
				{
					title : '操作',
					align : 'center', width:'13%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var id = row.SID;
						
						var check = '<a type="button" title="审核" class="btn btn-primary shiny btn-xs purple" data-id="'+id+'" data-toggle="modal" data-target="#checkModal"><i class="fa fa-check-circle-o"></i>审核</a>&nbsp;&nbsp';
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple" onclick="confirmDeleteModal('
								+ id
								+ ')" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i>删除</a>';
							return [check,del].join('');
					}
				} 
				], 
		onClickRow : function(row, ele, fileid) {//table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		}
	});
};

$(function(){ //隐藏‘备注列’
	$('#tableSchoolAppl').bootstrapTable('hideColumn', 'SID');
});

var searchData = {optFlag: 'init'};

function queryParams(params){
	params.optFlag = searchData.optFlag;
	params.q_school = searchData.q_school;
	params.q_address = searchData.q_address;
	params.q_checkstate = searchData.q_checkstate;
	return params;
};

function queryData(){
	searchData.q_school = $('#q_school').val();
	searchData.q_address = $('#q_address').val();
	searchData.q_checkstate = $('#q_checkstate').val();
	table.bootstrapTable('destroy');
	//重新创建表格 用于重新加载数据
	tableInit();
};

//modal窗口打开的时候执行:新增/修改
$('#checkModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); // 触发事件的按钮 
	var flag = button.data('flag'); // 获取按钮点击事件传给modal的 data参数标识
	var btnSave = $('#btnSave');
	
	 //修改
		var sId = button.data('id');
	 	console.info(sId);
		var modal = $(this); //获取当前的modal\
		
		//获取UniqueId标识的行数据
		var row = table.bootstrapTable('getRowByUniqueId', sId);
		$('#domainName').val(row.DOMAINNAME);
		$('#schoolName').val(row.SNAME);
		$('#schoolAddress').val(row.SADDRESS);
		$('#linkName').val(row.LINKNAME);
		$('#mobile').val(row.MOBILE);
		$('#remarkId').val(row.REMARK);
		
		//添加保存按钮事件
		btnSave.removeAttr("onclick");
		btnSave.attr('onclick', 'checkSchool('+sId+')');
});

function checkSchool(sId){ //审核是否通过
 	var $form = $('#checkForm');
	$.ajax({
		url: rootPath + '/schoolApplInitServlet',
// 		data: $form.serialize()+"&optFlag=check"+ "&SID="+sId,
		data: "&optFlag=check"+ "&SID="+sId,
		success : function(data) {
			var json = JSON.parse(data); // 转为json格式
			var result = json.result;
			if(result=="ok"){ //如果返回结果为 fail 则删除失败
				alert("操作成功!");
			}else{
				alert("操作失败!");
			}
			table.bootstrapTable('refresh');
		}
	});
	$('#checkModal').modal('hide');
};

/*table 删除按钮*/
function confirmDeleteModal(sId) {
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + sId + ')');
};

/*modal 确认删除按钮*/
function deleteData(id) {
	$.ajax({
		url : rootPath + "/schoolApplInitServlet",
		data : {
			"sId" : id,  //学校ID
			"optFlag": "delete"
		},
		success : function(data) {
			var json = JSON.parse(data); // 转为json格式
			var result = json.result;
			if(result=="fail"){ //如果返回结果为 fail 则删除失败
				alert("操作失败！");
			}else{
				alert("操作成功！");
			}
			table.bootstrapTable('refresh'); //刷新表格
		}
	});
};