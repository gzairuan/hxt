var rootPath = util.getRootPath();
//请求参数字段
var searchParams = {};
$.post(rootPath+'/classDataServlet',function (data){
	if(data){
		var e = $('#queClassID');
		//清空所有的option
		e.empty();
		$.each(data,function (index,obj){
			e.append('<option value="'+obj.CLASSESID+'">'+obj.CLASSESNAME+'</option>');
		});
		searchParams.cid = e.val();
		if(!util.text.isEmpty(searchParams.tid)){
			tableInit();
		}
	}
},'json');
$.post(rootPath+'/termDataServlet',function (data){
	if(data){
		var e = $('#queTermID');
		//清空所有的option
		e.empty();
		$.each(data,function (index,obj){
			e.append('<option value="'+obj.TID+'">'+obj.TNAME+'</option>');
		});
		searchParams.tid = e.val();
		if(!util.text.isEmpty(searchParams.cid)){
			tableInit();
		}
	}
},'json');

$('#addForm').bootstrapValidator({
	fields : {
		classId : {
			validators : {
				notEmpty : {
					message : '请选择班级'
				}
			}
		},title : {
			validators : {
				notEmpty : {
					message : '请填写作业标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写作业内容'
				}
			}
		}
	},
	excluded: [':disabled']
});
$('#editForm').bootstrapValidator({
	fields : {
		title : {
			validators : {
				notEmpty : {
					message : '请填写作业标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写作业内容'
				}
			}
		}
	},
	excluded: [':disabled']
});

function tableInit() {
	tableUtil.initTable({
		table:'#table',
		url : rootPath+'/courseServlet?optFlag=query',//远程请求地址
		toolbar : "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
		pagination : false,
		queryParams : queryParams,//请求参数
		columns : [
			//field对应返回数据中的字段
			{
				field : 'dayTimeName',
				title : '时间段',
				align : 'center'
			},
			{
				field : 'sectionName',
				title : '节数',
				align : 'center'
			},
			{
				field : 'mon',
				title : '星期一',
				align : 'center',
				editable : editable
			},
			{
				field : 'tues',
				title : '星期二',
				align : 'center',
				editable : editable
			},
			{
				field : 'wed',
				title : '星期三',
				align : 'center',
				editable : editable
			},
			{
				field : 'thur',
				title : '星期四',
				align : 'center',
				editable : editable
			},
			{
				field : 'fri',
				title : '星期五',
				align : 'center',
				editable : editable
			},
			{
				field : 'sat',
				title : '星期六',
				align : 'center',
				editable : editable
			},
			{
				field : 'sun',
				title : '星期日',
				align : 'center',
				editable : editable
			}
		],
		onLoadSuccess:function(data){
			var sortMap={};
			$.each(data.rows,function(index,item){
				var key = item.dayTime;
				if(sortMap.hasOwnProperty(key)){
					sortMap[key] = sortMap[key]*1+1;
				}else{
					sortMap[key] = 1;
				}
			});
			var index = 0;
		    for(var prop in sortMap){
		        var count = sortMap[prop] * 1;
		        $('#table').bootstrapTable('mergeCells', {index: index, field: 'dayTimeName', colspan: 1, rowspan: count});
				index += count;
		    };
		},
		onClickRow : function(row, ele, field) {},
		onEditableSave:function(field,row,oldValue,$el){
			console.info(field);
			console.info(row);
			console.info(oldValue);
			console.info(row[field]);
			$.ajax({
				url : rootPath+'/courseServlet?optFlag=edit',
				data: {weekday:field,cid:row.classesId,tid:row.tid,section:row.section,dayTime:row.dayTime,courseName:row[field]},
				type:'post',
				dataType:'json',
				success:function(data){
					if (data.result == 'ok') {
						toastr.success('保存成功','提示');
					} else {
						// 失败
						toastr.error('保存失败！请稍后再试','提示');
					}
				}
			});
		}
	});
};
var editable = {
	type:'text',
	title:'安排课程',
	emptytext:'未安排',
	validate:function(v){
		if (!v) return '课程不能为空';
	}
};

//table数据请求参数设置
function queryParams(params) {//请求参数
	params.cid = searchParams.cid;
	params.tid = searchParams.tid;
	return params;
};
//搜索数据
function searchData() {
	//搜索参数设置
	searchParams.cid = $('#queClassID').val();
	searchParams.tid = $('#queTermID').val();
	$('#table').bootstrapTable('refresh');
};

