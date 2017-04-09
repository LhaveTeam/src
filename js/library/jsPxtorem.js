// JavaScript Document
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['mui'], function($) {
            return factory($, global, global.document);
        });
    } else if (typeof define === 'function' && define.cmd) {
        define(['mui'], function(require, exports, moudles) {
            factory("undefined" == typeof window.mui ? require('mui') : window.mui, global, global.document);
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('mui'), global, global.document);
    } else {
        factory(mui, global, global.document);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document) {
; + (function () {
	var Transform = {
		createNew: function () {
			var $internal = new Class();
			$internal.transform = null;
			$internal.init = function (designSize, rootSize) {
				var matchsd = (/^[0-9]{1,4}/).exec(designSize);
				var matchsr = (/^[0-9]{1,4}/).exec(rootSize);
				if (matchsd && matchsr)
					this.transform = new $Transform(matchsd, matchsr);
			};
			var $Transform = new Class({
				initialize: function (designSize, rootSize) {
					this._init(designSize, rootSize);
				}
			});
			$Transform.extend({
				_init: function (designSize, rootSize) {
					this.designSize = designSize;
					this.desinRootSize = rootSize;
					this.windowW = document.body.clientWidth; //获取当前屏幕宽度，不带单位；
					this.screenWidth = [
						[0, 383, 37.5],
						[384, 399, 38.4],
						[400, 413, 40],
						[414, 423, 41.4],
						[424, 479, 42.4],
						[480, 99999, 48],
					]; //设置不同屏幕宽度范围及根字体大小，每组数据开头两个为屏幕宽度范围，最后一个为根字体大小

				},
				/**
				 * @description  可以将px单位转换为rem；转换根子体基于new Transform 时传入的根子体 rootSize
				 * @param {num} px 需要转换的数字，原设计稿量得多多少就是多少
				 * @example  transObj.pxToRem(75); 将会返回 .1; 不带单位
				 * @return  返回最后转换的rem值
				 */
				pxToRem: function (px) {
					var matchs = (/^[0-9]{1,4}/).exec(px);
					if (matchs)
						return (matchs / this.desinRootSize);
				},
				/**
				 * @description  可以将rem单位转换为px；根子体大小基于原设计稿根字体
				 * @param {num} rem 需要转换的数字，原设计稿量得多多少就是多少
				 * @example  transObj.remToPx(10); 将会返回 750; 不带单位
				 * @return  返回最后转换的px值
				 */
				remToPx: function (rem) {
					var matchs = (/^[0-9]{1,4}/).exec(rem);
					if (matchs)
						return (matchs * this.desinRootSize);
				},
				/**
				 * @description  可以将对应设计稿的px转换为不同屏幕自适应的px值；
				 * @param {num} designPx 需要转换的设计稿的px值，原设计稿量得多多少就是多少
				 * @example  transObj.pxToFitPx(75); 在375px的屏幕宽下返回 37.5px，在320px 的屏幕下返回 32; 自带单位px
				 * @return  返回最后转换的自适应的px值
				 */
				pxToFitPx: function (designPx) {
					var matchs = (/^[0-9]{1,4}/).exec(designPx);
					if (matchs)
						return (matchs / this.desinRootSize) * this.getCurrentRootSize();
				},
				/**
				 * @description  计算当前屏幕宽度对应的根子体大小
				 * @param 
				 * @example  transObj.getCurrentRootSize(); 在375px的屏幕宽下返回 37.5，在320px 的屏幕下返回 32;不带单位
				 * @return  返回根子体大小 不带单位
				 */
				getCurrentRootSize: function () {
					var curScreenWidth = this.windowW;
					for (var i = 0, j = this.screenWidth.length; i < j; i++) {
						if (this.screenWidth[i][0] <= curScreenWidth && this.screenWidth[i][1] >= curScreenWidth) {
							return this.screenWidth[i][2];
						}
					}
				},
			});
			return $internal;
		}
	}
	//创建对象并使用f对应的方法
	//例子：jsPxtorem(75);输出为在个屏幕下的1rem对应的像素，不带单位，保留八位小数
	var transformObj = Transform.createNew();
	transformObj.init(750, 75); //传入设计稿宽度和设计稿根字体大小
	window.jsPxtorem=function(transPx){
		return (transformObj.transform.pxToFitPx(transPx)).toFixed(8);
	}
})();
});