/**
 * version: 1.0
 * 
 */
 
var rootPath = util.getRootPath();
 
$(function() {
    		$('#table').bootstrapTable({
   			 	method: 'get',
                toolbar: '#toolbar',    //工具按钮用哪个容器
                striped: true,      //是否显示行间隔色
                cache: false,      //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,     //是否显示分页（*）
                sortable: false,      //是否启用排序
                sortOrder: "asc",     //排序方式
                pageNumber:1,      //初始化加载第一页，默认第一页
                pageSize: 10,      //每页的记录行数（*）
                pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
                url: rootPath + "/LogServlet",//这个接口需要处理bootstrap table传递的固定参数
                //queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
                sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
                //search: true,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                //showColumns: true,     //是否显示所有的列
                //showRefresh: true,     //是否显示刷新按钮
                minimumCountColumns: 2,    //最少允许的列数
                clickToSelect: true,    //是否启用点击选中行
                searchOnEnterKey: true,
    			columns: [{
    		        checkbox:true
    		    },{
    		        field: 'user_name',
    		        title: '用户名'
    		    }, {
    		        field: 'user_ip',
    		        title: '用户IP'
    		    }, {
    		        field: 'model_type',
    		        title: '模块'
    		    }, {
    		        field: 'oprate_type',
    		        title: '功能'
    		    }, {
    		        field: 'oprate_time',
    		        title: '操作时间'
    		    }, {
    		        field: 'remark',
    		        title: '备注'
    		    }, {
    		        title: '操作',
    		        align : 'center', width:'18%',
					formatter : function(value, row, index) {
						//获取当前row内容
						var logId = row.id;
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple" onclick="confirmDeleteModal('+ logId + ')" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i> 删除</a>';
							return [del].join(' ');
						}
    		    }],
    		    pagination:true,
    		    onClickRow : function(row, ele, fileid) {//table选中行设置背景色
    				$(".info").removeClass("info");
    				$(ele).addClass("info");
    			}
    		});
		});
    	/*table 删除按钮*/
		function confirmDeleteModal(id) {
    		alert(id);
			var btnDel = $("#btnDel");
			btnDel.removeAttr("onclick");
			btnDel.attr('onclick', 'deleteData(' + id + ')');
		};
		/*modal 确认删除按钮*/
		function deleteData(id) {
			//   $("#successMessage").html("Record With id "+id+" Deleted successfully!");
			debugger;
			$.ajax({
				url : rootPath + "/LogDeleteServlet",
				data : {
					"logId" : id
				},
				success : function(data) {
					debugger;
					table.bootstrapTable('refresh'); //刷新表格
					alert("已删除" + id +"记录。");
				},
				dataType:'json'
			});
		};
    	var searchParams = {sendFlag:$('#sendFlag').val()};
		//table数据请求参数设置
		function queryParams(params) {
			params.startDate = searchParams.startDate;
			params.endDate = searchParams.endDate;
			params.keyword = searchParams.keyword;
			return params;
		}