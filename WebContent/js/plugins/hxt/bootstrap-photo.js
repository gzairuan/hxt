/**
 * @author zyz version:1.0
 * 
 */
(function($) {
	'use strict';
	
	// BOOTSTRAP PHOTO CLASS DEFINITION
    // ======================

	var BootstrapPhoto = function(el, options) {
		this.options = options;
		this.$el = $(el);
		this.$el_ = this.$el.clone();// 记录触发元素的初始值，destroy销毁重置的时候使用

		this.init();
	};

	BootstrapPhoto.DEFAULTS = {
		classes : 'row',// 触发元素photo加入的样式;  
		data : [],
		onRefreshOptions: function (options) {
            return false;
        },
        onRefresh: function (params) {
          return false;
        },
	};
	
	BootstrapPhoto.EVENTS = {
		'refresh-options.bs.photo': 'onRefreshOptions',
        'refresh.bs.photo': 'onRefresh'
	};

	BootstrapPhoto.prototype.init = function() {
		this.initContainer();
		// 创建包裹元素this.container及其子元素this.$toolbar、this.$pagination等，为表格添加样式;
		this.initPhoto();
		// 获取页面配置更新options.columns、options.data，this.columns记录表体对应标题栏的数据;
		this.initData();
		// 页面初始化、后台传值、插入数据，更新this.data、options.data，前台分页则排序;  
		this.initBody();
		// 渲染图片内容区，绑定相关事件;  
	};

	BootstrapPhoto.prototype.initContainer = function() {
		this.$container = $([
				'<div class="bootstrap-photo">',
				'<div class="fixed-photo-container">',
				'<div class="fixed-photo-body">',
				'</div>',
				'</div>',
				'</div>' ].join(''));
		
		this.$container.insertAfter(this.$el);
		this.$photoContainer = this.$container.find('.fixed-photo-container');
        this.$photoBody = this.$container.find('.fixed-photo-body');
        
        this.$photoBody.append(this.$el);
        this.$container.after('<div class="clearfix"></div>');
        
        this.$el.addClass(this.options.classes);
	};

	BootstrapPhoto.prototype.initPhoto = function() {
		var that = this, 
			data = [];
	};
	
	BootstrapPhoto.prototype.initData = function(data, type) {
		if (type === 'append') {
            this.data = this.data.concat(data);
        } else if (type === 'prepend') {
            this.data = [].concat(data).concat(this.data);
        } else {
            this.data = data || this.options.data;
        }
		
        if (type === 'append') {
            this.options.data = this.options.data.concat(data);
        } else if (type === 'prepend') {
            this.options.data = [].concat(data).concat(this.options.data);
        } else {
            this.options.data = this.data;
        }
	};
	
	BootstrapPhoto.prototype.initPhotoDiv = function(item, i) {
		var html = [
			'<li class="col-lg-3 col-md-4 col-sm-4 col-xs-6">',
			'<div class="thumbnail">',
			'<img src="" alt="相册">',
			'<div class="caption">',
			'<span>试试看的插件圣诞节快乐设计费类库是</span>',
			'</div>',
			'</div>',
			'</li>'].join('');
		
		return html;

	};
	
	BootstrapPhoto.prototype.initBody = function() {
		var that = this, 
			html = [],
			data = this.getData();// 获取数据
		
		
//		if (!this.options.pagination || this.options.sidePagination === 'server') {
            this.pageFrom = 1;
            this.pageTo = data.length;
//        }
            
        var photoFragments = $(document.createDocumentFragment());
        
        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
			var item = data[i];
			var photo = this.initPhotoDiv(item, i);
            if (photo&&photo!==true) {
            	photoFragments.append(photo);
            }
		}
        
        this.$el.html(photoFragments);
	};
	
	BootstrapPhoto.prototype.getData = function () {
        return this.options.data;
    };
	
	// BOOTSTRAP PHOTO ALBUM PLUGIN DEFINITION
    // =======================
	
	var allowedMethods = [  
        'refresh',
        'destroy'
    ];  

	$.fn.bootstrapPhoto = function(option) {
		var value, args = Array.prototype.slice.call(arguments, 1);
		this.each(function() {
			var $this = $(this), 
				data = $this.data('bootstrap.photo'), 
				// 配置项在触发元素的data数据中，或在js的option传参中 
				options = $.extend({}, BootstrapPhoto.DEFAULTS, $this.data(),
							typeof option === 'object' && option);
			//判断是否为字符串（用于函数的调用）
			if (typeof option === 'string'){
				//判断是否存在方法
				if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }
				
				if(!data){
					return;
				}
				
				value = data[option].apply(data,atgs);
				
				//注销
				if(option === 'destroy'){
					$this.removeData('bootstrap.photo');
				}
			}
			
			if(!data){
				$this.data('bootstrap.photo',(data=new BootstrapPhoto(this,options)));
			}
		});
		
		return typeof value === 'undefined' ? this : value;
	};
	
	$.fn.bootstrapPhoto.Constructor = BootstrapPhoto;
    $.fn.bootstrapPhoto.defaults = BootstrapPhoto.DEFAULTS;
    //$.fn.bootstrapPhoto.columnDefaults = BootstrapPhoto.COLUMN_DEFAULTS;
    //$.fn.bootstrapPhoto.locales = BootstrapPhoto.LOCALES;
    $.fn.bootstrapPhoto.methods = allowedMethods;
    /*$.fn.bootstrapPhoto.utils = {
        sprintf: sprintf,
        getFieldIndex: getFieldIndex,
        compareObjects: compareObjects,
        calculateObjectValue: calculateObjectValue,
        getItemField: getItemField,
        objectKeys: objectKeys,
        isIEBrowser: isIEBrowser
    };*/
})(jQuery);