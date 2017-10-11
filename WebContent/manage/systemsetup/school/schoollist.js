/**
 * 描述： 学校管理
 * date: 2017--26
 * by: szs
 * 
 */
 ;
var rootPath = util.getRootPath();
  
var table = $('#tableSchoolList');
var areaData;
//初始化table
$(function() {
	tableInit();
	
	$.ajax({
 		url: rootPath + '/areaInitServlet?optFlag=init',
		success: function(data){
			areaData = data;
		}
 	});
});
	
//初始化table

function tableInit() {
	table.bootstrapTable({
		url : rootPath + '/schoolListInitServlet',//远程请求地址
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
		/* queryParams:function(params){ //使用queryParams传递请求参数必须要写上limit和offset参数，否则翻页无效。
			return {
				optFlag : 'init', //操作标记
				limit : params.limit, 
				offset : params.offset
			}; 
		},*/
		columns : [
				//field对应返回数据中的字段
				{
					field : 'SID',
					title : '学校ID'
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
					field : 'CTIME',
					title : '创建时间',
					formatter : function(value, row, index) {
						var time = value.replace('T', ' ');
						return time;
					}
				},
				{
					field : 'REMARK',
					title : '备注'
				},
				{
					title : '操作',
					align : 'center',
					width : '7%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var sId = row.SID;
						var domainId = row.DOMAINID;
						var edit = '<a type="button" title="修改" class="btn btn-primary shiny btn-xs purple" data-flag="edit" data-id="'+sId+'" data-domainid="'+ domainId +'" data-toggle="modal" data-target="#addModal"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;';
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple" onclick="confirmDeleteModal('
								+ sId
								+ ')" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i></a>';
						return [ edit, del ].join('');
					}
				} ],
		onClickRow : function(row, ele, fileid) {//table选中行设置背景色
			$(".info").removeClass("info");
			$(ele).addClass("info");
		}
	});
};

$(function() { //隐藏‘备注列’
	$('#tableSchoolList').bootstrapTable('hideColumn', 'REMARK');
});

//
var searchData = {
	optFlag : "init"
}; //操作标记

function queryParams(params) {
	params.optFlag = searchData.optFlag;
	params.searchSchool = searchData.searchSchool;
	params.searchDomain = searchData.searchDomain;
	return params;
};

//查询条件
function queryData() {
	searchData.searchSchool = $('#searchSchool').val();
	searchData.searchDomain = $('#searchDomain').val();
	table.bootstrapTable('destroy');
	tableInit();
}

// modal窗口打开的时候执行:新增/修改
$('#addModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); // 触发事件的按钮 
	var flag = button.data('flag'); // 获取按钮点击事件传给modal的 data参数标识
	var add = "add";
	var btnSave = $('#btnSave');

	if (flag == add) { //新增
		$('#addForm')[0].reset(); //清空form 表单
		//添加保存按钮事件
		btnSave.removeAttr("onclick");
		btnSave.attr('onclick', 'addSchool()');
	} else { //修改
		var sId = button.data('id'), //学校ID
			domainId = button.data("domainid");
		var modal = $(this); //获取当前的modal\
		//获取UniqueId标识的行数据
		var row = table.bootstrapTable('getRowByUniqueId', sId);
		
		modal.find('.modal-title').text('学校编辑'); //改变modal的title
		$('#domainId').val(row.DOMAINID);
		$('#domainName').val(row.DOMAINNAME);
		$('#schoolName').val(row.SNAME);
		$('#schoolAddress').val(row.SADDRESS);
		$('#linkName').val(row.LINKNAME);
		$('#mobile').val(row.MOBILE);
		$('#remark').val(row.REMARK);

		//添加保存按钮事件
		btnSave.removeAttr("onclick");
		btnSave.attr('onclick', 'eidtSchool()');
	}
});

$('#addModal').on('hide.bs.modal', function(event) {
	var popover = $('div.popover');
	if(popover){
		popover.hide();
	}
});

//
// 区域input 点击事件
 $('#domainName').click(function(){
    $("#domainName").popover().show();
    $('.popover').css({"top": "128px", "width": "20%", "left": "598.656px", "display": "block",  "height":"60%"});
 });
 
 $('#domainName').on('shown.bs.popover', function () {
    var options = {  
        color: "#428bca",
      	expandIcon: 'glyphicon glyphicon-chevron-right',
      	collapseIcon: 'glyphicon glyphicon-chevron-down',
      	data: areaData,  //树节点data结构
      	levels: 2,
        onNodeSelected : function(event, data) {  
            $("#domainName").val(data.text);  
            $('#domainId').attr('value', data.id);
        }  
    };
    var t = '<div id="treeview" class="pre-scrollable"></div>';
    $('.popover-content').append(t);
    $('#treeview').treeview(options); 
});

//表单验证
$('#addForm').bootstrapValidator({
	fields : {
		domainName : {
			validators : {
				notEmpty : {
					message : '请选择学校所属区域'
				}
			}
		},
		schoolName : {
			validators : {
				notEmpty : {
					message : '请输入学校名称'
				}
			}
		},
		schoolAddress : {
			validators : {
				notEmpty : {
					message : '请输入学校地址'
				}
			}
		},
		linkName : {
			validators : {
				notEmpty : {
					message : '请输入联系人姓名'
				}
			}
		},
		mobile : {
			validators : {
				notEmpty : {
					message : '请输入联系人手机号码'
				}
			}
		}
	},
	excluded: [':disabled']
})

/* 新增保存操作 */
function addSchool() {
	var $form = $('#addForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();
	if(valid.isValid()){
		$.ajax({
			url : rootPath + '/schoolListInitServlet',
			data : $form.serialize() + "&optFlag=add",
			success : function(data) {
				var json = JSON.parse(data);
				if (json.result == "ok") {
					alert("操作成功！");
				} else {
					alert("操作失败！");
				}
				table.bootstrapTable('refresh');
			}
		});
		$('#addModal').modal('hide');
	}
}

/* 修改保存学校信息 */
function eidtSchool() {
	var $form = $('#addForm');
	$.ajax({
		url : rootPath + '/schoolListInitServlet',
		data : $form.serialize() + "&optFlag=edit",
		success : function(data) {
			var json = JSON.parse(data);
			if (json.result == "ok") {
				alert("操作成功！");
			} else {
				alert("操作失败！");
			}
			table.bootstrapTable('refresh');
		}
	});
	$('#addModal').modal('hide');
}

/*table 删除按钮*/
function confirmDeleteModal(sId) {
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + sId + ')');
};

/*modal 确认删除按钮*/
function deleteData(id) {
	$.ajax({
		url : rootPath + "/schoolListInitServlet",
		data : {
			"sId" : id, //学校ID
			"optFlag" : "delete"
		},
		success : function(data) {
			var json = JSON.parse(data); // 转为json格式
			var result = json.result;
			if (result == "fail") { //如果返回结果为 fail 则删除失败
				alert("删除失败！");
			} else {
				alert("删除成功！");
			}
			table.bootstrapTable('refresh'); //刷新表格
		}
	});
};