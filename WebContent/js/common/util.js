;
util = {
	// 获取根路径
	getRootPath : function() {
		var pathname = window.location.pathname.substr(1);
		var webname = pathname.substr(0, pathname.indexOf('/'));
		return window.location.protocol + "//" + window.location.host + "/"
				+ webname;
	},
	getQueryParam : function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		 if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	text : {
		/**
		 * 字符串判断是否为空
		 * 
		 * @param str
		 *            字符串
		 * @return boolean 返回值：true字符串为空，false字符串不为空
		 */
		isEmpty : function(str) {
			return !str || str==undefined || str=='undefined' || str == null
					|| str == '' || typeof str == 'string' && str.replace(/(^\s*)|(\s*$)/g, '').length == 0;
		}
	},
	dateFormat: function (date, format) {
        var o = {
            "M+": date.getMonth() + 1, // 月份
	        "d+": date.getDate(), // 日
	        "h+": date.getHours(), // 小时
	        "m+": date.getMinutes(), // 分
	        "s+": date.getSeconds(), // 秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
	        "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
};
/** 
 * 设置全局的AJAX请求默认选项 
 * 主要设置了AJAX请求遇到Session过期的情况 
 */  
$.ajaxSetup({  
    complete: function(xhr,status) {  
        var sessionStatus = xhr.getResponseHeader('sessionstatus');  
        if(sessionStatus == 'timeout') {
            window.location = util.getRootPath() + "/login.jsp";
        }  
    }  
}); 
/**
 * 设置全局的toastr弹窗默认选项
 */
if(typeof toastr !== 'undefined'){
	toastr.options = {
			"closeButton": true,// 关闭按钮
			"debug": false,// debug
			"progressBar": true,// 进度条
			"positionClass": "toast-bottom-right",// 显示位置，右下
			"onclick": null,// 单击
			"showDuration": "400",// 显示持续时间
			"hideDuration": "1000",// 隐藏持续时间
			"timeOut": "5000",// 超时隐藏
			"extendedTimeOut": "1000",// 延长时间
			"showEasing": "swing",// 显示动画
			"hideEasing": "linear",// 隐藏动画
			"showMethod": "fadeIn",// 显示方法
			"hideMethod": "fadeOut"// 隐藏方法
	};
};
