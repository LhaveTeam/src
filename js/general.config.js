(function(root, _seajs) {
	var $app = root.$app = {};
	root.$app = $app;
	$app.version = '1.1.0'
	$app.basePath = '/';
	$app.scriptDir = $app.basePath + 'js/';
	$app.skinDir = $app.basePath + 'themes/';
	$app.common_module = '';
	$app.controller = '';
	$app.arguments = {};
	$app.dateTime = new Date();
	$app.retUrl = '';
	$app.invokedScriptPath = (function() {
		var __s = $app.scriptDir;
		if(__s.substr(0, $app.basePath.length) == $app.basePath) {
			__s = __s.substr($app.basePath.length);
		}
		return './' + __s;
	})();
	$app.entrance = (function() {
		return $app.invokedScriptPath + 'access.js';
	})();
	//Create XMLHttpRequest Object
	$app.createXHR = function() {
		if(typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != "undefined") {
			if(typeof arguments.callee.activeXString != "string") {
				var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
				for(var i = 0, len = versions.length; i < len; i++) {
					try {
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					} catch(ex) {}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		} else {
			throw new Error("No XHR object available.");
		}
	};

	/* ************************************************************ */
	/* Seajs Configuration */
	if('undefined' != typeof _seajs) {

		_seajs.config({
			base: $app.invokedScriptPath,
			paths: {
				'feapply': '{CONTROLLERS}'
			},
			alias: {
				//标准库
				'json': '{LIB}/json3',
				'jquery': '{LIB}/jquery.min',
				'lodash': '{LIB}/lodash.min',
				'mui': '{LIB}/mui.min',
				'lhave': '{LIB}/lhave',
				'layer.dialog': '{LIB_PLUGINS}/layer_mobile/layer',
				'swiper': '{LIB_JQUERY_PLUGINS}/swiper.jquery.min',
				'jt_app': '{LIB}/jt_app',
				'pullToRefresh': '{LIB}/mui.pullToRefresh',
				'pullToRefresh_material': '{LIB}/mui.pullToRefresh.material',
				'mui_zoom': '{LIB}/mui.zoom',
				'mui_previewimage': '{LIB}/mui.previewimage',
				'jsPxtorem': '{LIB}/jsPxtorem',
				'kalendae_standalone': '{LIB_PLUGINS}/kalendae.standalone',
				'laytpl':'{LIB}/laytpl',
			},
			vars: {
				'LIB': 'library',
				'LIB_JQUERY_PLUGINS': 'library/jquery_plugins',
				'LIB_PLUGINS': 'library/plugins',
				'CONTROLLERS': 'controllers'
			},
			preload: [
				root.JSON ? '' : 'json',
				root.jQuery ? '' : 'jquery',
				root._ ? '' : 'lodash',
				'lhave'
			],
			map: [
				[/^(.*\.(?:css|js))(.*)$/i, '$1?t=' + (+new Date())]
			],
			debug: false,
			charset: function(url) {
				return 'utf-8';
			}
		});
	}

})(window, ('undefined' != typeof seajs ? seajs : undefined));
/* ============================================================ */
(function(window) {
	'use strict';

	var VERSION = '1.0';
	var ORIGINAL = window.Class;
	var Class = window.Class = function(obj) {
		obj = obj || {};
		var constructor = function() {
			return(this.initialize) ? this.initialize.apply(this, arguments) : self;
		};
		if(obj.implement) {
			var self = window === this ? copy(constructor.prototype) : this;
			var imp = obj.implement;
			remove(obj, 'implement');
			obj = extend(obj, implement(imp));
		}
		constructor.prototype = copy(obj);
		constructor.constructor = constructor;
		constructor._parent = copy(obj);
		for(var i = 0, values = ['extend', 'implement', 'getOptions', 'setOptions']; i < values.length; i++) {
			constructor[values[i]] = Class[values[i]];
		}
		return constructor;
	};
	Class.extend = function(obj) {
		var self = this;
		if(obj.implement) {
			this.prototype = extend(this.prototype, implement(obj.implement));
			remove(obj, 'implement');
		}
		for(var key in obj) {
			obj[key] = typeof obj[key] === 'function' && /parent/.test(obj[key].toString()) ? (function(method, name) {
				return function() {
					this.parent = self._parent[name];
					return method.apply(this, arguments);
				};
			})(obj[key], key) : obj[key]
		}
		this._parent = extend(this._parent, obj, true);
		this.prototype = extend(this.prototype, obj);
		return this;
	};
	Class.implement = function(array) {
		return this.prototype = extend(this.prototype, implement(array));
	};
	Class.getOptions = function() {
		return this.prototype.options || {};
	};
	Class.setOptions = function(options) {
		return this.prototype.options = extend(this.prototype.options, options);
	};
	Class.noConflict = function() {
		window.Class = ORIGINAL;
		return Class;
	};
	Class.version = VERSION;

	function copy(obj) {
		var F = function() {};
		F.prototype = obj.prototype || obj;
		return new F();
	}

	function remove(obj, name, safe) {
		if(safe) {
			var safeObj = {};
			for(var key in obj) {
				if(key !== name) safeObj[key] = obj[key];
			}
		} else {
			delete obj[name];
		}
		return safeObj || obj;
	}
	function extend(oldObj, newObj, preserve) {
		if(!oldObj || !newObj) return oldObj || newObj || {};
		oldObj = copy(oldObj);
		newObj = copy(newObj);
		for(var key in newObj) {
			if(Object.prototype.toString.call(newObj[key]) === '[object Object]') {
				extend(oldObj[key], newObj[key]);
			} else {
				oldObj[key] = (preserve && oldObj[key]) ? oldObj[key] : newObj[key];
			}
		}
		return oldObj;
	}

	function implement(array) {
		var collection = {};
		for(var i = 0; i < array.length; i++) {
			if(typeof(array[i]) === 'function') array[i] = array[i].prototype;
			var safe = remove(array[i], 'initialize', true);
			if(safe.implement) {
				collection = implement(safe.implement);
			} else {
				collection = extend(collection, safe);
			}
		}
		return collection;
	}
})(window);