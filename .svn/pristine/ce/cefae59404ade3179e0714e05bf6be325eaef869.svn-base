var rootPath = util.getRootPath();

var table = $('#studentScoreTable');
$(function(){
	initTable();//初始化Table
	/* 初始化查询条件下拉框  */
	initTname($('#tname'));
	initCname($('#cname'));
});

//初始化Table
function initTable(){
    table.bootstrapTable({
         url:rootPath+'/studentScoreServlet',//远程请求地址
         method:'post',//请求方式
         type: 'json', //数据类型 
         contentType: "application/x-www-form-urlencoded",//请求数据类型('post'必须设置)
         striped: true,      //是否显示行间隔色
         toolbar: "#toolbar",  //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
         cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
         sortable: false,      //是否启用排序
         pagination: true,     //是否显示分页（*）
         pageNumber:1,      //初始化加载第一页，默认第一页
         pageSize: 10,      //每页的记录行数（*）
         pageList: [10, 25, 50],  //可供选择的每页的行数（*）
         sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
         clickToSelect: true,    //是否启用点击选中行
         uniqueId:'SCOREID',	//每一行的标识（要具有唯一性）
         queryParams: queryParams, //定义请求参数
         columns : [
				//field对应返回数据中的字段
				{
					checkbox:true
				},
				{
					field : 'STUDENTNAME',
					title : '学生',
					width: '10%'
				},
				{
					field : 'SCORE',
					title : '分数'
				},
				{
					field : 'TNAME',
					title : '学期 '
				},
				{
					field : 'SUBJECTNAME',
					title : '科目'
				},
				{
					field : 'RANK',
					title : '排名'
				},
				{
					field : 'TBEGIN',
					title : '学期开始时间',
					formatter : function(value, row, index) {
						if(util.text.isEmpty(value)){
							return '';
						}
						var time = value.substring(0,value.indexOf('T'));
						return time;
					}
				},
				{
					field : 'TEND',
					title : '学期结束时间',
					formatter : function(value, row, index) {
						if(util.text.isEmpty(value)){
							return '';
						}
						var time = value.substring(0,value.indexOf('T'));
						return time;
					}
				},
				{
					title : '操作',
					align : 'center', width:'12%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var scoreId = row.SCOREID;
// 							var edit = '<a type="button" title="修改" class="btn btn-primary shiny btn-xs purple" data-id="'+ newId +'" data-flag="edit" data-toggle="modal" data-target="#addOrEditModal"><i class="fa fa-edit">修改</i></a>&nbsp;';
						var detail = '<a type="button" class="btn btn-info shiny btn-xs purple" data-stuname="'+row.STUDENTNAME+'" data-subname="'+ row.SUBJECTNAME +'" data-score="'+row.SCORE+'" data-tname="'+row.TNAME+'" data-tbegin="'+row.TBEGIN+'" data-tend="'+row.TEND+'" data-toggle="modal" data-target="#detailModal" >'+
										'<i class="fa fa-eye"></i>&nbsp;查看</a>&nbsp';
						var del = '<a type="button" title="删除" style="display: none;" class="btn btn-danger shiny btn-xs purple delete-role" onclick="confirmDeleteModal('+ scoreId + ')" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i>删除</a>';
						return [detail, del].join('');
					}
				}
				], 
         onClickRow:function(row,ele,fileid){//table选中行设置背景色
         	$(".info").removeClass("info");
         	$(ele).addClass("info");
         },
         onLoadSuccess:function(data){
        	 roleUtil.roleHandler();
         }
     });
 };
 
 var searchParams = {optFlag: "init"};
 
 /* 初始化传递参数  */
 function queryParams(params){
	 params.optFlag = searchParams.optFlag;
	 params.tname = searchParams.tname;
	 params.cname = searchParams.cname;
	 params.subname = searchParams.subname;
	 params.stuname = searchParams.stuname;
	 return params;
 }
 
 /* 查询条件  */
 function searchData(){
	 searchParams.tname = $('#tname').val();
	 searchParams.cname = $('#cname').val();
	 searchParams.subname = $('#subname').val();
	 searchParams.stuname = $('#stuname').val();
	 
	 table.bootstrapTable('destroy');//先要将table销毁，否则会保留上次加载的内容
	 //重新初使化表格。
	 initTable();
 }
 /* 学年学期 下拉框  46 */
 function initTname(e){
	 if(e && e[0].length==1){
		//清空所有的option
		e.empty();
		e.append('<option value="0" selected>全部</option>');
		$.ajax({
			url: rootPath+'/xnxqServlet',
			success: function(data){
				if(data != null){
					var jsonObj=eval("("+data+")");  
					console.info(jsonObj);
  			        $.each(jsonObj, function (i, item) {  //循环json，添加下拉标签
  			            e.append('<option value="'+item.TID+'">'+item.TNAME+'</option>'); 
  			        });  
				}
			}
		});
	}
	
 }
 
 /* 班级下拉框 */
 function initCname(e){
	 if(e && e[0].length==1){
		//清空所有的option
		e.empty();
		e.append('<option value="0" selected>全部</option>');
		$.ajax({
			url: rootPath+'/classDataServlet',
			dataType:'json',
			success: function(data){
				if(data != null){
//					var jsonObj=eval("("+data+")");  
  			        $.each(data, function (i, item) {  //循环json，添加下拉标签
  			            e.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'); 
  			        });
				}
			}
		});
	}
 }
 
/* 新增修改modal弹出框 */
$('#addOrEditModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); // 获取目标点击事件
	var opt = button.data("flag");
	var modal = $(this);
	var btnSave = $('#btnSave');

	if (opt == "add") {// 新增操作
		modal.find('.modal-title').text("添加学生成绩");
		$('#modalform')[0].reset();
		/* 初始化下拉框 */
		initTname($('#m_tname')); // 学期
		initCname($('#m_cname')); // /班级
		btnSave.removeAttr('onclick');
		btnSave.attr("onclick", "saveStuScore()"); // 添加保存事件 TODO...
	}
});
 
$('#addOrEditModal').on("hidden.bs.modal", function() {
	$('#modalform').bootstrapValidator('resetForm', true); // 重置验证
});
 
/*
 * 选择班级同步更新班级学生信息
 * cid:班级ID
 */
function studentSelectItem(cid) {
	var e = $('#m_studentId');
	if (cid != 0) {
		// 清空所有的option
		e.empty();
		$.ajax({
			url : rootPath + '/healthInfoServlet',
			data : {
				optFlag : "classesStu",
				cid : cid
			},
			success : function(data) {
				if (data != null) {
					var jsonObj = eval("(" + data + ")");
					var row = jsonObj.rows;
					$.each(row, function(i, item) { // 循环json，添加下拉标签
						e.append('<option value="' + item.STUDENTID + '">'
								+ item.STUDENTNAME + '</option>');
					});
				}
			}
		});
	} else { // 清空
		e.empty();
		e.append('<option value="0" selected>请选择学生</option>');
	}
}
 
// 自动获取学期开始和结束时间
function tNameStartAndEndTime(tid) {
	console.info("tid=" + tid);
	$.ajax({
		url : rootPath + '/xnxqServlet',
		success : function(data) {
			if (data != null) {
				var jsonObj = eval("(" + data + ")");
				console.info(jsonObj);
				var tt = jsonObj[tid - 1].TBEGIN;
				console.info(tt);
				$.each(jsonObj, function(i, item) { // 循环json，添加下拉标签
					if (item.TID == tid) {
						$('#m_tbegin').val(item.TBEGIN);
						$('#m_tend').val(item.TEND);
					}
				});
			}
		}
	});
}

$('#modalform').bootstrapValidator({
	fields : {
		m_tname : {
			validators : {
				notEmpty : {
					message : '请选择学期'
				}
			}
		},m_cname : {
			validators : {
				notEmpty : {
					message : '请选择班级'
				}
			}
		},m_score : {
			validators : {
				notEmpty : {
					message : '请填写分数'
				},
				regexp: {
                    regexp: /^\d+(\.\d{2})?$/,
                    message: '分数只能输入数字可保留2位小数'
                }
			}
		},m_subname : {
			validators : {
				notEmpty : {
					message : '请填写科目'
				}
			}
		},m_studentId : {
			validators : {
				notEmpty : {
					message : '请选择学生'
				}
			}
		},m_rank : {
			validators : {
				notEmpty : {
					message : '请填写排名'
				},
				integer: {message: '排名只能输入整数'}  
			}
		}
	},
	excluded: [':disabled']
});
 
/* 新增保存学生成绩信息 */
function saveStuScore() {
	var $form = $('#modalform');
	var valid = $form.data('bootstrapValidator');
	valid.validate();
	if (valid.isValid()) {
		$.ajax({
			url : rootPath + '/studentScoreServlet?optFlag=add',
			data : $form.serialize(),
			dataType:'json',
			success : function(data) {
				if (data.result == 'ok') {
					toastr.success('新增成功','提示');
					// 请求成功（这里是添加数据成功）提示且刷新数据
					table.bootstrapTable('refresh');
				} else {
					// 失败
					toastr.error('新增失败！请稍后再试','提示');
				}
			}
		});
		$('#addOrEditModal').modal('hide');
	}
}
 
/* 查看详情 */
$('#detailModal').on('show.bs.modal', function(event){
	var btn = $(event.relatedTarget); //获取触发目标事件按钮
// 	 		var optFlag = button.data('flag'); //获取按钮点击事件传给modal的 data参
	var stuname = btn.data('stuname'),
	    subname = btn.data('subname'),
	  	score = btn.data('score'),
	  	tname = btn.data('tname'),
	  	tbegin = btn.data('tbegin'),
	  	tend = btn.data('tend');
	$('#d_tname').val(tname);
	$('#d_subname').val(subname);
	$('#d_score').val(score);
	$('#d_studentId').val(stuname);
	$('#d_tbegin').val(tbegin.substring(0,tbegin.indexOf('T')));
	$('#d_tend').val(tend.substring(0,tend.indexOf('T')));
});
 
/*table 删除按钮*/
function confirmDeleteModal(id){
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + id + ')');
};     
    
/*modal 确认删除按钮*/
function deleteData(id){
	$.ajax({
	    url: rootPath+'/studentScoreServlet',
	    data:{
	        scoreId: id,
	        optFlag: "delete"
	    },
	    dataType:'json',
	    success:function(data){
	    	if (data.result == 'ok') {
				toastr.success('删除成功','提示');
				// 请求成功（这里是删除数据成功）提示且刷新数据
				table.bootstrapTable('refresh'); //刷新表格
			} else {
				// 失败
				toastr.error('删除失败！请稍后再试','提示');
			}
        }
    });
};