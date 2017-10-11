;$(document).ready(function() {
	
	//登录表单
	var $loginForm = $('#loginForm');
	// 开启登录表单验证
	$loginForm.bootstrapValidator({
		message : 'This value is not valid',
		fields : {
			username : {
				message : '用户名验证失败',
				validators : {
					notEmpty : {
						message : '用户名不能为空'
					}
				}
			},
			password : {
				validators : {
					notEmpty : {
						message : '密码不能为空'
					}
				}
			},
			codes : {
				validators : {
					notEmpty : {
						message : '验证码不能为空'
					}
				}
			}
		}
	}).on("success.form.bv", function(e) {// 自定义表单提交
		// 表单被阻止使用默认提交
		e.preventDefault();
		//请求登陆
		postLogin(0);
	});

	/**
	 * 
	 * @param bv
	 *            验证框实例
	 * @param schoolData
	 *            学校json数据
	 */
	function buildOrShowCheckSchoolModel(schoolData) {
		/*
		 * <div class="radio"> <label> <input type="radio" name="schoolRadios"
		 * value="选项 1">选项 1 </label> </div> <div class="radio"> <label> <input
		 * type="radio" name="schoolRadios" value="选项 2">选项 2 </label> </div>
		 */
		var $element = $('#checkSchoolModalBody');
		$.each(schoolData, function(index, school) {
			var radio = $('<div class="radio"></div>');
			var label = $('<label></label>');
			var input = $('<input type="radio" name="schoolOptions">');
			input.attr('value', school.SID);
			if (index == 0) {
				input.attr('checked',true);
			}
			label.append(input).append(school.SNAME);
			radio.append(label);
			$element.append(radio);
		});
		$('#checkSchoolModal').modal('show');
	}

	/**
	 * modal隐藏监听
	 */
	$('#checkSchoolModal').on('hidden.bs.modal', function(e) {
		// 重置表单
		$loginForm.data('bootstrapValidator').resetForm();
		// 移除modal中的选项
		$('#checkSchoolModalBody').empty();
	})
	$('#btCheckedSchool').click(checkedSchool);
	
	function checkedSchool() {
		//选中学校 请求登录
		//选中登录学校
		var sid = $('input:radio[name="schoolOptions"]:checked').val();
		//隐藏
		$('#checkSchoolModal').modal('hide');
		//post请求
		postLogin(sid);
	}
	
	function postLogin(sid) {
		var err = $('#errorMessage');
		err.text('');
		var btnL = $('#btnLogin');
		btnL.button('loading');
		// 使用ajax提交数据
		$.ajax({
			type : 'POST',// 提交方式
			url : $loginForm.attr('action'),// 地址
			data :  $loginForm.serialize()+'&sid='+sid,// 参数
			success : function(data) {// 请求成功
				if($.type(data) === 'array'){
					// 创建单选组->打开学校选择对话框
					buildOrShowCheckSchoolModel(data);
				}else{
					switch (data.result) {
						case 'ok': {
							document.location.href = "manage/index.jsp";
						}
							break;
						default:{
							err.text(data.message);
							reloadcode();
						}
							break;
					}
				}
				btnL.button('reset');
			},
			dataType : 'json'// 返回数据类型
		});
	}
});
function reloadcode() {  
    $('#codeVerify').attr('src', 'codeVerify.jsp?it=' + Math.random());/*Math.random()点击验证码图片随机生成  */  
};