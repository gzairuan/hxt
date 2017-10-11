/*
 * 学校简介
 * by: szs
 */

var rootPath = util.getRootPath();

//初始页面隐藏‘保存’、‘取消’按钮，只显示‘编辑’按钮
var init = $(document).ready(function() {
	$("#btn-post").hide();
	$("#btn-cancel").hide();
	//初始学校简介
	$.ajax({
		url: rootPath + "/schoolinfoInitServlet",
		dataType:'json',
		success: function(data){
			//转出json格式
			if(data.result=='fail'){
				$("#summernoteId").html("暂无学校信息"); 
			}else{
				//获取内容
				var contents = data[0].NEWSCONTENT;
			 	$("#summernoteId").append(contents); 
			}
		}
	});
});
	
//学校编辑
function schoolInfoEdit(){
	$("#contentId").addClass("no-padding");
	$("#btn-edit").hide();
	$("#btn-post").show();
	$("#btn-cancel").show();
	
	/* 初始化summernote编辑器  */
	$("#summernoteId").summernote({
		lang : 'zh-CN',
		height: 400, /* 设置固定图片高度 */
		minHeight:  null,
		maxHeight: null,
		focus : true,
		dialogsFade: true, //Dialogs淡出效果
		toolbar:[ //自定义toolbar 显示工具
			['style', ['bold','italic','underline','clear', 'fontname']],
			['font',['strikethrough','superscript','subscript']], // strikethrough:切换删除线
			['style', ['style']], //字体样式
			['fontsize', ['fontsize']], //设置字体大小
			['color', ['color']], //设置前景色和背景色
			['para', ['ul', 'ol', 'paragraph']], //段落对齐下拉
			['height', ['height']], //设置行高
// 				['insert', ['link','picture', 'video', 'hr', 'table']], //insert 插入分别有：打开链接对话框、打开图片对话框、打开视频对话框、插入水平线、插入一个表
			['insert', ['link','picture', 'hr', 'table']], // 暂时不实现视频
			['Misc', ['fullscreen', 'codeview', 'undo', 'redo', 'help']] //Misc分别有： 切换全屏编辑模式、所见即所得和html编辑模式切换、撤销、重做、打开帮助对话框
		],
		/* 重写图片上传功能  */
		 onImageUpload: function(files, editor, $editable) {
			sendFile(files[0],editor,$editable);
		}
	});
};

//编辑提交
var save = function() {
	$("#contentId").removeClass("no-padding");
	var nwesContent = $("#summernoteId").code(); //save HTML If you need(aHTML: array).
	
	//保存编辑内容
	$.ajax({
		url : rootPath + "/schoolInfoSaveServlet",
		type : "POST",
		cache : false,
		data : {
			"newsContent" : nwesContent
		},
		dataType : 'json',
		success : function(data) {
			if(data.result=='ok'){
				toastr.success('保存成功','提示');
				$("#summernoteId").destroy();
				$("#btn-edit").show();
				$("#btn-post").hide();
				$("#btn-cancel").hide();
			}else{
				toastr.error('保存失败!请稍后再试','提示');
			}
		}
	});
};

//取消提交
function cancel() {
	$("#contentId").removeClass("no-padding");
	$("#summernoteId").destroy();
	$("#btn-edit").show();
	$("#btn-post").hide();
	$("#btn-cancel").hide();
};

//发送文件
function sendFile(file, editor, $editable){
	
	$(".note-toolbar.btn-toolbar").append('正在上传图片');
	var filename = false;
	try{
		filename = file['name'];
	}catch(e){
		filename = false;
	}
	if(!filename){
		$('.note-alarm').remove();
	}
	//以防止图片在编辑器内拖拽引发第二次上传导致的错误
	var ext = filename.substr(filename.lastIndexOf("."));
	ext = ext.toUpperCase();
	var timestamp = new Date().getTime();
// 		var name = timestamp+"_"+$("#summernote").attr('aid')+ext;
	var name = timestamp+"_"+filename;
	
	//name是文件名，自己随意定义，aid是我自己增加的属性用于区分文件用户
	var data = new FormData();
	data.append("uploadfile", file);
	data.append("filename",name);
	data.append("token",$("#summernote").attr('token'));
	//执行图片上传处理
	$.ajax({
		data: data,
		type: "POST",
		url: rootPath + "/imgUploadHandler?optFlag=schoolinfo", //图片上传处理的url,返回的是图片上传后的路径,如：hxt/manage/upload/pic1.jpg
		contentType: false,
		cache: false,
		processData: false,
		dataType : "json",  
		success: function(data) {
			//data是返回的hash,key之类的值，key是定义的文件名
			//把图片放到编辑框中。editor.insertImage 是参数，写死。后面的http是网上的图片资源路径。
			//网上很多就是这一步出错。 只有这个才能显示图片==>> editor.insertImage($editable, data['url']);
// 				$('#editor').summernote('insertImage', data.url); 
// 				$('#summernote').summernote('editor.insertImage', data.url);
			editor.insertImage($editable, rootPath+data[0].filePath);

			$(".note-alarm").html("上传成功,请等待加载");
			setTimeout(function(){$(".note-alarm").remove();},3000);
			},
		error: function(){
			$(".note-alarm").html("上传失败");
			setTimeout(function(){$(".note-alarm").remove;}, 3000);
		}
	});
};