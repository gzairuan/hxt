//当前页面属于教师通知
var typeId = 2;

var rootPath = util.getRootPath();

$('#queStartDate').datetimepicker({
	language : 'zh-CN',// 语言（需依赖语言包）
	format : 'yyyy-mm-dd',// 格式
	startDate : '2013-01-01',
	minView : 2,// 最小精确到天
	todayBtn : true,// 显示选择当天的按钮
	autoclose : true
// 自动关闭-当选择一个日期之后立即关闭
});
$('#queEndDate').datetimepicker({
	language : 'zh-CN',// 语言（需依赖语言包）
	format : 'yyyy-mm-dd',// 格式
	startDate : '2013-01-01',
	minView : 2,// 最小精确到天
	todayBtn : true,// 显示选择当天的按钮
	autoclose : true
// 自动关闭-当选择一个日期之后立即关闭
});

$('#addForm').bootstrapValidator({
	message : 'This value is not valid',
	fields : {
		teacherGroupIds : {
			validators : {
				notEmpty : {
					message : '请选择教师分组'
				}
			}
		},title : {
			validators : {
				notEmpty : {
					message : '请填写标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写内容'
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
					message : '请填写标题'
				}
			}
		},content : {
			validators : {
				notEmpty : {
					message : '请填写内容'
				}
			}
		}
	},
	excluded: [':disabled']
});

$(function() {
	// 表格初始化
	tableUtil.initTable({
		table : '#table',
		toolbar : "#toolbar",
		url : rootPath + '/noticeServlet?optFlag=query',// 远程请求地址
		uniqueId : 'NOTICEID',
		queryParams : queryParams,// 请求参数
		columns : [
				// field对应返回数据中的字段
				{
					field : 'NEWSTITLE',
					title : '消息标题'
				},
				{
					field : 'CONTENT',
					title : '消息内容',
					width : '35%'
				},
				{
					field : 'USERNAME',
					title : '发布人'
				},
				{
					field : 'CRETIME',
					title : '发布时间',
					formatter : function(value, row, index) {
						var time = value.replace('T', ' ');
						return time;
					}
				},
				{
					title : '操作',
					align : 'center',
					width : '18%',
					formatter : function(value, row, index) {
						// 获取当前row内容
						var id = row.NOTICEID;

						var detail = '<a type="button" title="详情" class="btn btn-info shiny btn-xs purple" data-id="'
								+ id
								+ '" data-toggle="modal" data-target="#detailModal"><i class="fa fa-eye"></i> 详情</a>';
						if ($('#sendFlag').val() == '0') {
							return detail;
						} else {
							var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-role" data-id="'
									+ id
									+ '" style="display: none;" data-toggle="modal" data-target="#editModal"><i class="fa fa-edit"></i> 编辑</a>';
							var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role" onclick="confirmDeleteModal('
									+ id
									+ ')" style="display: none;" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i> 删除</a>';
							return [ edit, detail, del ].join(' ');
						}
					}
				} ],
		onLoadSuccess:function(data){
        	roleUtil.roleHandler();
        }
	});
});
// 请求参数字段
var searchParams = {
	sendFlag : $('#queSendFlag').val()
};
// table数据请求参数设置
function queryParams(params) {
	params.typeId = typeId;
	params.sendFlag = searchParams.sendFlag;
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.keyword = searchParams.keyword;
	return params;
};
// 多选框初始化
$('#teacherGroup').multiselect({
	nonSelectedText : "请点击选择教师分组",// 默认文本，没有选中时的
	nSelectedText : '个被选中',// 有n个值的时候显示n个被选中
	allSelectedText : '全选',// 所有被选中的时候 全选（n）
	buttonClass : 'btn btn-default form-control',// 显示按钮style
	includeSelectAllOption : true,// 全选
	selectAllText : '全选',// 全选的checkbox名称
	numberDisplayed : 6,// 当超过6个标签的时候显示n个被选中
	maxHeight : 280,
});
$('#addModal').on('show.bs.modal',function(e) {
	var teacherGroup = $('#teacherGroup');
	if (teacherGroup && teacherGroup[0].length == 0) {
		teacherGroup.empty();
		$.post(rootPath + '/teacherGroupServlet', function(data) {
			if (data) {
				$.each(data, function(index, obj) {
					teacherGroup.append('<option value="'+ obj.SUBJECTID + '">' + obj.SUBJECTNAME
							+ '</option>');
				});
				// 多选框重新创建
				teacherGroup.multiselect('rebuild');
			}
		}, 'json');
	} else {
		// 取消选中状态
		teacherGroup.multiselect('deselectAll', false);
		// 更新button文本
		teacherGroup.multiselect('updateButtonText');
	}
	//文件上传初始化
	$('#addImgs').fileinput('destroy').fileinput({
		language : 'zh', // 设置语言
		uploadUrl : rootPath+'/imgUploadHandler?optFlag=notice&type='+typeId, // 上传的地址
		uploadAsync:false,//是否异步上传（异步为一张一张上传）
		showPreview : true, // 是否显示预览
		showBrowse : false,//显示浏览图片按钮
		showUpload : false, // 是否显示上传按钮
		showRemove : false, // 显示移除按钮
		showCaption : false,// 是否显示标题
		showCancel : true,
		maxFileCount : 9,/* 允许最大上传数，可以多个，当前设置9个 */
		msgFilesTooMany : "最多只能上传9张图片",
		dropZoneTitle : "可拖拽图片文件添加",
		dropZoneClickTitle : "（或点击添加图片）",
		browseOnZoneClick : true,
		fileActionSettings : {// 上传图片动作
			showUpload : false, // 上传
			showZoom : false, // 预览
			showDrag : false // 拖拽
		},
		allowedFileExtensions : [ 'jpg', 'png', 'jpeg' ],// 上传文件格式
		overwriteInitial : false,
		maxFileSize : 10240, // 上传文件大小
		maxFilesNum : 9, // 上传文件最大个数
		msgFilesTooMany : "最大只能上传9张图片", // 上传文件超过最大值提示
		removeFromPreviewOnError : false,
		slugCallback : function(filename) {// 处理空格
			return filename.replace('(', '_').replace(']', '_');
		}
	});
	// 重置表单
	$('#addForm')[0].reset();
});
$('#addModal').on("hidden.bs.modal", function() {
	$('#uploadImgId').val("上传图片");
	$('#selectImgDiv').hide();
	$('#addForm').bootstrapValidator('resetForm', true); // 重置验证
});

$('#addImgs').on('filebatchuploadsuccess',function(event, data, previewId, index){
	if(data.response){
		var imgUrl = '';
		$.each(data.response,function (index,image){
			imgUrl += '&imgUrl='+image.filePath;
			console.info(image.filePath);
		});
		sendNotice(imgUrl);
	}
});

// 新增教师通知
function addNotice() {
	var $form = $('#addForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		var imgCount = $('#addImgs').fileinput('getFilesCount');
		if(imgCount===0){
			sendNotice('');
		}else if (imgCount>0) {
			$('#addImgs').fileinput('upload');
		}
	}
};

function sendNotice(imgUrl){
	$.ajax({
		url : rootPath + '/noticeServlet?optFlag=add',
		data : $('#addForm').serialize() + "&typeId=" + typeId + imgUrl,
		dataType:'json',
		type:'post',
		success : function(data) {
			if (data.result == 'ok') {
				toastr.success('新增成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				$('#table').bootstrapTable('refresh');// 刷新表格
			} else {
				// 失败
				toastr.error('新增失败！请稍后再试','提示');
			}
		}
	});
	$('#addModal').modal('hide');
}

/* table 删除按钮 */
function confirmDeleteModal(id) {
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + id + ')');
};
/* modal 确认删除按钮 */
function deleteData(id) {
	// $("#successMessage").html("Record With id "+id+" Deleted
	// successfully!");
	$.ajax({
		url : rootPath+"/noticeServlet?optFlag=delete",
		data : {
			"noticeId" : id,
			"typeId" : typeId
		},
		success : function(data) {
			if (data.result == 'ok') {
				toastr.success('删除成功','提示');
				// 请求成功（这里是删除数据成功）提示且刷新数据
				$('#table').bootstrapTable('refresh');// 刷新表格
			} else {
				// 失败
				toastr.error('删除失败！请稍后再试','提示');
			}
		},
		dataType : 'json'
	});
};

// modal 打开的时候
$('#detailModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); 
	var id = button.data('id');
	// 获取UniqueId标识的行数据
	var row = tableUtil.getRowData('#table',id);

	$(".notice-title").val(row.NEWSTITLE);
	$(".receive-group").val(row.SUBJECTNAME);
	$(".issuer").val(row.USERNAME);
	$(".release-time").val(row.CRETIME.replace('T', ' '));
	$(".notice-content").val(row.CONTENT);
	
	if(row.data!=undefined && row.data != null && row.data.length !== 0){
		var imgData = [];
		$.each(row.data,function(index,img){
			imgData.push(img.ATTACHMENTURL);
		});
		$('#detailImgDiv').show();
		$('#detailImgs').fileinput('destroy').fileinput({
			language : 'zh', // 设置语言
			showPreview : true, // 是否显示预览
			showBrowse : false,//显示浏览图片按钮
			showUpload : false, // 是否显示上传按钮
			showRemove : false, // 显示移除按钮
			showCaption : false,// 是否显示标题
			showCancel : false,
			showClose:false,
			browseOnZoneClick : false,
			fileActionSettings : {// 上传图片动作
				showUpload : false, // 上传
				showZoom : true, // 预览
				showDrag : false // 拖拽
			},
			initialPreview: imgData,
	        initialPreviewAsData: true, // identify if you are sending preview data only and not the raw markup
	        initialPreviewFileType: 'image', // image is the default and can be overridden in config below
			overwriteInitial : false,
			removeFromPreviewOnError : false,
			slugCallback : function(filename) {// 处理空格
				return filename.replace('(', '_').replace(']', '_');
			},
			resizeImage: true,
		    maxImageWidth: 100,
		    maxImageHeight: 100,
		    resizePreference: 'width'
			/*previewTemplates:{
				image: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}" data-template="{template}" style="width:100px;height:100px;">' +
		        '   <div class="kv-file-content">' +
		        '    <a href="{data}" title="点击看大图" target="_black">   <img src="{data}" onerror="this.src=\''+rootPath+'/img/no_photo_s.png\'" " class="kv-preview-data file-preview-image" title="{caption}" alt="{caption}" style="width:100px;height:100px;"></a>' +
		        '   </div>' +
		        '</div>'
			}*/
		});
	}
});

$('#detailModal').on("hidden.bs.modal", function() {
	$('#detailImgDiv').hide();
});

// 编辑modal 打开的时候
$('#editModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); // Button that triggered the
	// modal
	var id = button.data('id'); // Extract info from data-* attributes
	// 获取UniqueId标识的行数据
	var row = tableUtil.getRowData('#table',id);

	$('#editTitle').val(row.NEWSTITLE);
	$('#editContent').val(row.CONTENT);
	// 编辑按钮
	var btnEdit = $('#btnEdit');
	btnEdit.removeAttr("onclick");
	// 添加编辑事件
	btnEdit.attr('onclick', 'editSubmit(' + id + ')');
});
$('#editModal').on("hidden.bs.modal", function() {
	$('#editForm').bootstrapValidator('resetForm', true); // 重置验证
});
function editSubmit(id) {
	var valid = $('#editForm').data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		// 获取UniqueId标识的行数据
		var title = $('#editTitle').val();
		var content = $('#editContent').val();
	
//		var row = tableUtil.getRowData('#table',id);
//		row.NEWSTITLE = title;
//		row.CONTENT = content;
//	
		$.ajax({
			url : rootPath + '/noticeServlet?optFlag=edit',
			data : {
				title : title,
				content : content,
				typeId : typeId,
				id : id
			},
			dataType:'json',
			success : function(data) {
				if (data.result == 'ok') {
					toastr.success('修改成功','提示');
					// 请求成功（这里是添加数据成功）提示且刷新数据
					$('#table').bootstrapTable('refresh');// 刷新表格
				} else {
					// 失败
					toastr.error('修改失败！请稍后再试','提示');
				}
			}
		});
		$('#editModal').modal('hide');
	}
};
// 搜索数据
function searchData() {
	// 搜索参数设置
	searchParams.sendFlag = $('#queSendFlag').val();
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.keyword = $('#queKeyword').val();
	tableUtil.refreshData2Query('#table');
};


/* 点击图片上传 显示或隐藏 fileinput 组件 */
function add_img(){
	var uploadImgId = $('#uploadImgId');
	var selectImgDiv = $('#selectImgDiv');
	$('#addImgs').fileinput('clear');
	if(selectImgDiv.is(":hidden")){
		uploadImgId.val("隐藏图片");
		selectImgDiv.show();
	}else{
		uploadImgId.val("上传图片");
		selectImgDiv.hide();
	}
};
