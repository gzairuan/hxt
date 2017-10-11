var typeId = 3;

var rootPath = util.getRootPath();

var classData;
$.ajax({
	url: rootPath+'/classDataServlet',
	dataType:'json',
	success: function(data){
		classData = data;
		var classID = $('#queClassID');
		//清空所有的option
		classID.empty();
		classID.append('<option value="0" selected>全部</option>');
        $.each(data, function (i, item) {  //循环json，添加下拉标签
        	classID.append('<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'); 
        });  
	}
});

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
						var edit = '<a type="button" title="编辑" class="btn btn-primary shiny btn-xs purple edit-role" data-id="'
								+ id
								+ '" style="display: none;" data-toggle="modal" data-target="#addModal"><i class="fa fa-edit"></i> 编辑</a>';
						var del = '<a type="button" title="删除" class="btn btn-danger shiny btn-xs purple delete-role" onclick="confirmDeleteModal('
								+ id
								+ ')" style="display: none;" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash-o"></i> 删除</a>';
						return [ edit, detail, del ].join(' ');
					}
				} ],
		onLoadSuccess:function(data){
        	roleUtil.roleHandler();
        }
	});
});

//请求参数字段
var searchParams = {};
// table数据请求参数设置
function queryParams(params) {
	params.typeId = typeId;
	params.cid = searchParams.cid;
	params.startDate = searchParams.startDate;
	params.endDate = searchParams.endDate;
	params.keyword = searchParams.keyword;
	return params;
};

//搜索数据
function searchData() {
	// 搜索参数设置
	searchParams.cid = $('#queClassID').val();
	searchParams.startDate = $('#queStartDate').val();
	searchParams.endDate = $('#queEndDate').val();
	searchParams.keyword = $('#queKeyword').val();
	tableUtil.refreshData2Query('#table');
};

/* 表单验证 */
$('#addForm').bootstrapValidator({
	fields : {
		cid : {
			validators : {
				notEmpty : {
					message : '请选择班级'
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

//弹出modal时根据flag标记判断是否做新增或是修改操作
$('#addModal').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget); //获取触发事件目标按钮
	var btnSave = $('#addBtnSave'),id = button.data('id');
	btnSave.removeAttr('onclick');
	$('#addForm')[0].reset();
	var isAdd = util.text.isEmpty(id);
	$(this).find('.modal-title').text(isAdd ? '新增班级通知':'修改班级通知');// 设置medal标题
	var cid = $('#addClassID');
	cid.empty();
	if(isAdd){//新增操作
		if(classData){
			$.each(classData,function(index,item){
				var option = '<option value="'+item.CLASSESID+'">'+item.CLASSESNAME+'</option>'
				cid.append(option);
			});
		}
		cid.removeAttr('disabled');
		$('#uploadImgDiv').show();
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
	}else{//修改操作
		$('#uploadImgDiv').hide();
		cid.attr('disabled','disabled');
		// 根据id获取该行的数据-->获取UniqueId标识的行数据
		var row = tableUtil.getRowData('#table',id);
		cid.append('<option value="'+row.RECEIVECLASSES+'">'+row.CLASSESNAME +'</option>');
		$('#addTitle').val(row.NEWSTITLE);
		$('#addContent').val(row.CONTENT);
	}
	//添加编辑事件
	btnSave.attr('onclick','addNotice('+id+')');
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

//新增教师通知
function addNotice(id) {
	var $form = $('#addForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		var isAdd = util.text.isEmpty(id);
		if(isAdd){			
			var imgCount = $('#addImgs').fileinput('getFilesCount');
			if(imgCount===0){
				sendNotice('');
			}else if (imgCount>0) {
				$('#addImgs').fileinput('upload');
			}
		}else{
			editNotice(id);
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
				tableUtil.refreshData2Add('#table');
			} else {
				// 失败
				toastr.error('新增失败！请稍后再试','提示');
			}
		}
	});
	$('#addModal').modal('hide');
};

function editNotice(id){
	$.ajax({
		url : rootPath + '/noticeServlet?optFlag=edit',
		data : $('#addForm').serialize() + "&typeId=" + typeId + "&id="+id,
		dataType:'json',
		type:'post',
		success : function(data) {
			if (data.result == 'ok') {
				toastr.success('修改成功','提示');
				// 请求成功（这里是添加数据成功）提示且刷新数据
				tableUtil.refreshData2Update('#table');// 刷新表格
			} else {
				// 失败
				toastr.error('修改失败！请稍后再试','提示');
			}
		}
	});
	$('#addModal').modal('hide');
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

//学校通知详情
$('#detailModal').on('show.bs.modal', function(event) {
	var button = $(event.relatedTarget); // Button that triggered the modal
	var id = button.data('id'); // Extract info from data-* attributes
	//获取UniqueId标识的行数据
	var row = tableUtil.getRowData('#table',id);

	//填充input 内容 
	$(".notice-title").val(row.NEWSTITLE);
	$(".receive-class").val(row.CLASSESNAME);
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
		});
	}
});

$('#detailModal').on("hidden.bs.modal", function() {
	$('#detailImgDiv').hide();
});

/*table 删除按钮*/
function confirmDeleteModal(id){
	var btnDel = $('#btnDel');
	btnDel.removeAttr("onclick");
	btnDel.attr('onclick', 'deleteData(' + id + ')');
};     
        
/*modal 确认删除按钮*/
function deleteData(id) {
	$.ajax({
		url : rootPath+"/noticeServlet?optFlag=delete",
		data : {
			"noticeId" : id,
			"typeId" : typeId
		},
		dataType:'json',
		success : function(data) {
			if(data.result == "ok"){
				toastr.success('删除成功', '提示');
				tableUtil.refreshData2Delete('#table');// 刷新表格
			}else{
				toastr.error('删除失败!请稍后再试 ', '提示');
			}
		}
	});
};
