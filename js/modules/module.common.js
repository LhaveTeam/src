define('modules/module.common', function(require, exports, module) {
	"use strict";

	var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
	var $ = ('undefined' == typeof window.jQuery ? require('jquery') : window.jQuery);
	var $window = $(window),
		$document = $(document);
		require('jt_app');

	/* ============================================================
	 * 前台页面基础类（commonPage）
	 * ============================================================ */
	var m_basePage = window.commonPage = {
		createNew: function() {
			var $internal = {};
			$internal.wW = parseInt($window.width());
			$internal.wH = parseInt($window.height());

			return $internal;
		}
	};
	window.commonPage = m_basePage;
	/* ============================================================
	 * 公共 页面类
	 * ============================================================ */

	var m_Common = {

		createNew: function() {
			var $internal = window.commonPage.createNew();
			$internal.tabar = null;

			$internal.init = function() {
				this.tabar = new $stabar();

			}
			var $stabar = new Class({
				initialize: function() {

					this._init();
				}

			});
			$stabar.extend({
				_init: function() {
					jt.init(); 
					mui('.mui-scroll-wrapper').scroll({
						deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
					});
				},
				_initDom: function() {

				},
				appear: function() {
					
					jt.tabBar(['index.html','g_tab_nav_popover.html','contact.html','setting.html']);
					mui('.mui-bar').on('tap','.works',function(){
						var oPopover=plus.webview.getWebviewById('g_tab_nav_popover');
						oPopover.evalJS('testPopoverFn()');
						alert(jQuery('.jt-bar-popover.mui-active').length);
						
					});
					
					
				}

			});

			return $internal;
		}
	};
	/* ************************************************************ */
	exports.run = function() {
		var mainTabPage = m_Common.createNew();
				mainTabPage.init();

		$document.ready(function() {
			mainTabPage.tabar.appear();

		});
	};

});