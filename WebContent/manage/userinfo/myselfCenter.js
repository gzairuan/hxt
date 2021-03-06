/*
 * 个人资料
 * 
*/
var rootPath = util.getRootPath();
var userJson;

/* 个人资料页面信息初始化  */	
 $(function() {
	//初始化页面显示
	initMethod();
	
	$.ajax({
		url: rootPath +'/myselfInitServlet?optFlag=init',
		success:function(data){
			var json = $.parseJSON(data);
			if(json != null){ //初始化值
				userJson = json[0];
				$("#uName").val(userJson.REALNAME);
				$("#uPhone").val(userJson.MOBILE);
				$("#uEmail").val(userJson.EMAIL);
				$("#uSignature").val(userJson.SIGNATURE);
				//需要初始化头像值todo...
				var photourl =userJson.USERPHOTO;
				if(photourl == null){
					$("#imgId").attr('src', '/hxt/img/none.jpg');
				}else{
					$("#imgId").attr('src', userJson.USERPHOTO);
				}
			}
		}
	});
	
});

$('#changeImgId').fileinput({
	language: 'zh', //设置语言
 	uploadUrl: rootPath + '/imgUploadHandler?optFlag=userinfo', // 自动上传url, //上传的地址
	//设置预览图片大小
 	showPreview : false, //是否显示预览
 	showBrowse: true,
 	showUpload: false, //是否显示上传按钮
	showRemove : false, //显示移除按钮
    showCaption: false,//是否显示标题
    showCancel: false,  //
    resizeImage: false,
    resizePreference: 'width',
 
	uploadLabel: "上传", ////设置上传按钮的汉字
    browseClass: "btn btn-primary", //按钮样式     
    browseIcon: '<i class="fa fa-camera"></i>&nbsp;', //上传按钮图片样式
    browseLabel: '上传/更换头像', //文件上传按钮描述
    maxFileCount: 1,/*允许最大上传数，可以多个，当前设置9个*/
    msgFilesTooMany: "最多只能上传1张图片", 
    dropZoneTitle: "请通过拖拽图片文件放到这里",
    dropZoneClickTitle: "或者点击此区域添加图片",
    browseOnZoneClick: false, //是否点击区域进行选择文件
    fileActionSettings:{//上传图片动作
   		showUpload: false, //是否显示单个文件上传按钮
   		showZoom: true, //是否显示预览按钮
   		showDrag: false //是否允许拖拽
    },
    layoutTemplates:{
   		progress: ""
    },
//                 elErrorContainer: "",
//                 msgErrorClass: "",//上传错误信息显示
	allowedFileExtensions : ['jpg', 'png','jpeg'],//上传文件格式
 	overwriteInitial: false,
 	maxFileSize: 10240, //上传文件大小
 	maxFilesNum: 1, //上传文件最大个数
 	msgFilesTooMany: "最大只能上传1张图片", //上传文件超过最大值提示
 	initialCaption: "选择上传图片", //文本框初始话value
 	removeFromPreviewOnError: false,
 	slugCallback : function(filename) {//处理空格
        return filename.replace('(', '_').replace(']', '_');
    }
}).on('filebatchselected', function (event, data,File, files, id, index) {
	//选择图片时回显在头像框
	var r= new FileReader();
	f=document.getElementById('changeImgId').files[0];
	r.readAsDataURL(f);
	r.onload=function  (e) {
		document.getElementById('imgId').src=this.result;
	};
 });


//上传前
$('#changeImgId').on('fileloaded', function(event,  file, previewId, index, reader) {
    console.log("fileloaded");
//    debugger;
});


//个人信息编辑
 function editEventt(){
	$("#editId").hide();
	$("#changeDivId").show();
	$("#submitId").show();
	$("#cancelId").show();
	$('input').removeAttr("readonly"); //设置input为可编辑
	
};

$("#changeImgId").on("fileuploaded", function(event, data, previewId, index) {
	if(data.response){
		var imgUrl = data.response[0].filePath;
		var userInfo = {
				USERID: userJson.USERID,
				REALNAME: $('#uName').val().trim(),
				MOBILE: $('#uPhone').val().trim(),
				EMAIL: $('#uEmail').val().trim(),
				SIGNATURE: $('#uSignature').val().trim(),
				USERPHOTO: imgUrl
		};
		$.ajax({
			url: rootPath + '/myselfInitServlet',  //异步请求，和操作标识
			type:'post',
			data: {
				optFlag: "saveEvent",
				userInfo: JSON.stringify(userInfo)
			},
			dataType:'json',
			success:function(data){
				if(data.result == "ok"){
					toastr.success('更新成功', '提示');
				}else{
					toastr.error('更新失败!请稍后再试 ', '提示');
				}
			}
		});
		/*$.ajax({
			url: rootPath + '/myselfInitServlet',  //异步请求，和操作标识
			data: {
				optFlag: "updataUrl",
				userphoto: JSON.stringify(userphoto)
			}
		});*/
	}
});  //end fileuploaded

//个人信息保存
function saveEvent(){
	var $form = $('#myselfForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		var imgCount = $('#changeImgId').fileinput('getFilesCount');
		if(imgCount===0){
			var userInfo = {
					USERID: userJson.USERID,
					REALNAME: $('#uName').val().trim(),
					MOBILE: $('#uPhone').val().trim(),
					EMAIL: $('#uEmail').val().trim(),
					SIGNATURE: $('#uSignature').val().trim()
				};
			$.ajax({
				url: rootPath + '/myselfInitServlet',  //异步请求，和操作标识
				type:'post',
				data: {
					optFlag: "saveEvent",
					userInfo: JSON.stringify(userInfo)
				},
				dataType:'json',
				success:function(data){
					if(data.result == "ok"){
						toastr.success('更新成功', '提示');
					}else{
						toastr.error('更新失败!请稍后再试 ', '提示');
					}
				}
			});
		}else if (imgCount>0) {
			$('#changeImgId').fileinput('upload');
		};
	};
		//选择图片，在表单提交时执行图片上传按钮，把图片上传到服务器端
//    	$('#changeImgId').fileinput('upload');	
    	
		/*$.ajax({
			url: rootPath + '/myselfInitServlet',  //异步请求，和操作标识
			type:'post',
			data: {
				optFlag: "saveEvent",
				userInfo: JSON.stringify(userInfo)
			},
			dataType:'json',
			success:function(data){
				if(data.result == "ok"){
					toastr.success('新增成功', '提示');
				}else{
					toastr.error('新增失败!请稍后再试 ', '提示');
				}
			}
		});*/
//		$('#changeImgId').fileinput('refresh');//刷新fileinput 
		
		//上传图片成功后执行回调函数 filebatchuploadsuccess fileuploaded
		/*$("#changeImgId").on("fileuploaded", function(event, data, previewId, index) {
			if(data.response){
				var response= data.response, 
					filename = response[0].fileName, //后台返回文件名
					imgUrl = response[0].relPath + filename; //后台返回服务器照片上传路径
				//回调函数更新图片url
				var userphoto = {
					USERID: userJson.USERID,
					REALNAME: $('#uName').val().trim(),
					MOBILE: $('#uPhone').val().trim(),
					EMAIL: $('#uEmail').val().trim(),
					SIGNATURE: $('#uSignature').val().trim(),
					USERPHOTO: imgUrl
				}
				$.ajax({
					url: rootPath + '/myselfInitServlet',  //异步请求，和操作标识
					data: {
						optFlag: "updataUrl",
						userphoto: JSON.stringify(userphoto)
					}
				});
			}
		});  //end fileuploaded
	}*/
	
	initMethod();
};



/* 表单验证 */
$('#myselfForm').bootstrapValidator({
	fields : {
		uName : {
			validators : {
				notEmpty : {
					message : '请输入姓名'
				}
			}
		},
		uPhone : {
			validators : {
				notEmpty : {
					message : '请输入联系电话'
				}
			}
		}
	},
	uEmail : {
			validators : {
				notEmpty : {
					message : '请输入邮箱'
				}
			}
		},
	excluded: [':disabled']
});

//保存数据到数据库
function addMyInfoToService(imgUrl){
	console.info("imgUrl="+imgUrl);
	var $form = $('#myselfForm');
	var valid = $form.data('bootstrapValidator');
	valid.validate();  
	if(valid.isValid()){
		$.ajax({
			url: rootPath + "/myselfInitServlet?optFlag=saveEvent",  //异步请求，和操作标识
			data: $form.serialize(),
//			dataType:'json',
			success:function(data){
				if(data.result == "ok"){
					toastr.success('新增成功', '提示');
					table.bootstrapTable('refresh');
				}else{
					toastr.error('新增失败!请稍后再试 ', '提示');
				}
			}
		});
		$('#changeImgId').fileinput('refresh');//刷新fileinput 
	}
};


//取消操作
var cancelEvent = function(){
	initMethod();
};

//个人信息初始化页面初始化只显示“编辑”按钮 	
function initMethod(){
	$("#editId").show();
	$("#changeDivId").css('display', 'none');
	$("#submitId").hide();
	$("#cancelId").hide();
	$('input').attr("readonly", "readonly"); //设置input为只读
	
};