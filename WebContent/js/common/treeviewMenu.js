;
(function($, window, document, undefined) {
	/* global jQuery, console */

	'use strict';

	var pluginName = 'treeviewMenu';

	var _default = {};// 默认属性

	_default.settings = {// 默认设置

	}

	var Tree = function(element, options) {
		this.$element = $(element);// 快速获取HTML中的元素
		this.elementId = element.id;// 元素ID
		/*
		 * logInfo("进入tree方法") logInfo(options)
		 */
		this.init(options);
		return {

			// Options (public access)
			option : this.options,

			// Initialize / destroy methods
			init : $.proxy(this.init, this),
			remove : $.proxy(this.remove, this)

		};
	}

	Tree.prototype.init = function(options) {

		this.tree = [];
		this.nodes = [];

		if (options.data) {
			if (typeof options.data === 'string') {
				options.data = $.parseJSON(options.data);
			}
			this.tree = $.extend(true, [], options.data);
			delete options.data;
		}
		// 无参数传过来时 使用默认设置数据
		this.options = $.extend({}, _default.settings, options);

		/*
		 * logInfo("进入init方法") logInfo(options)
		 */
		// 销毁
		this.destroy();
		// 订阅事件
		// this.subscribeEvents();
		// 初始化状态
		// this.setInitialStates({ nodes: this.tree });
		// 渲染HTML标签
		this.render();
	};

	// 移除方法
	Tree.prototype.remove = function() {
		this.destroy();
		// 移除该标签添加的数据
		$.removeData(this, pluginName);
	};

	// 销毁方法
	Tree.prototype.destroy = function() {

		// 未初始化
		if (!this.initialized)
			return;

		// this.$wrapper.remove();
		// this.$wrapper = null;

		// Switch off events
		// this.unsubscribeEvents();

		// Reset this.initialized flag
		this.initialized = false;
	};

	Tree.prototype.render = function() {

		if (!this.initialized) {
			// Setup first time only components
			// this.$element.addClass(pluginName);

			// this.injectStyle();

			this.initialized = true;
		}

		// this.$element.empty().append(this.$wrapper.empty());

		// Build tree
		this.buildTree(this.tree);
	};

	// Starting from the root node, and recursing down the
	// structure we build the tree one node at a time
	Tree.prototype.buildTree = function(nodes) {

		if (!nodes)
			return;
		/*
		 * logInfo("进入buildTree方法") logInfo(nodes);
		 */
		var _this = this;

		$.each(nodes, function addNodes(id, node) {
			// 一级目录<li>
			var rootItem = $(_this.template.item);
			// .addClass(pluginName);
			// .attr('id', node.menuid);
			var linkA = $(_this.template.link);
			if (node.icon && node.icon != null
					&& node.icon != '') {
				linkA.append($(_this.template.icon))
						.addClass(node.icon);
			} else {
				linkA.append($(_this.template.icon)).addClass(
						"glyphicon glyphicon-list-alt");
			}
			linkA.append($(_this.template.text).addClass("nav-label").append(
					' ' + node.text));
			// 二级目录不为空
			if (node.nodes) {
				// 添加旋转箭头
				linkA.append($(_this.template.icon).addClass('fa arrow'));
				rootItem.append(linkA);
				// 二级目录
				var listItem = $(_this.template.list).addClass(
						"nav nav-second-level");
				$.each(node.nodes, function addNodes(id1, node1) {
					// 二级目录item
					var item = $(_this.template.item);
					var linkA2 = $(_this.template.link).addClass("J_menuItem");
					linkA2.append(node1.text);
					linkA2.attr('href', node1.href + '?menuid=' + node1.menuid);
					//添加tab导航
//					var href = 'javascript:addtabs();';
//					linkA2.attr('data-addtab', node1.code).attr('data-url', node1.href);
					
					item.append(linkA2);
					listItem.append(item);
				});
				rootItem.append(listItem);
			} else {
				// 添加样式
				linkA.addClass('J_menuItem');
				// 添加链接
				linkA.attr('href', node.href + '?menuid=' + node.menuid);
				rootItem.append(linkA);
			}

			// Add item to the tree
			_this.$element.append(rootItem);
		});
	};

	Tree.prototype.template = {
		list : '<ul></ul>',
		item : '<li></li>',
		// indent: '<span class="indent"></span>',
		icon : '<span class="icon"></span>',
		link : '<a href="#"></a>',
		text : '<span class="nav-label"></span>'
	// badge: '<span class="badge"></span>'
	};

	var logError = function(message) {
		if (window.console) {
			window.console.error(message);
		}
	};

	var logInfo = function(info) {
		if (window.console) {
			window.console.info(info);
		}
	};

	// Prevent against multiple instantiations,
	// handle updates and method calls
	$.fn[pluginName] = function(options, args) {

		var result;
		// window.console.info(options);
		this.each(function() {
			var _this = $.data(this, pluginName);
			if (typeof options === 'string') {
				if (!_this) {
					logError('Not initialized, can not call method : '
							+ options);
				} else if (!$.isFunction(_this[options])
						|| options.charAt(0) === '_') {
					logError('No such method : ' + options);
				} else {
					if (!(args instanceof Array)) {
						args = [ args ];
					}
					result = _this[options].apply(_this, args);
				}
			} else if (typeof options === 'boolean') {
				result = _this;
			} else {
				$.data(this, pluginName, new Tree(this, $.extend(true, {},
						options)));
			}
		});
		return result || this;
	};

})(jQuery, window, document);