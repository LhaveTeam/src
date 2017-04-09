define('access', function(require, exports, module) {
    
    var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
	window.mui = require('mui') || {};
    window.$ = window.jQuery = require('jquery');
    window.Lo = require('lodash').noConflict();
    require('lhave');
    var $window = $(window), $document = $(document);
	
	var __layer = window.layer = require('layer.dialog');
	var __layerCss = 'library/plugins/layer_mobile/need/layer.css';
	window.layer = __layer;
	if (fnGlobalUrl) {
		__layerCss = fnGlobalUrl(__layerCss);
		__layerCss = '<link href="'+ __layerCss +'" rel="stylesheet" type="text/css" id="layermcss">';
		if ($('base')[0]) {
			$('base').before(__layerCss);
		} else {
			$('head').append(__layerCss);
		}
	}
    
    /* ************************************************************ */
    /* 配置模块接口，并导入指定的控制模块 */
   
   
//var text = jQuery('#test').html();
//var m = Lo.template(text, { 'imports': { 'jq': jQuery } });
//
//
//console.log(m({ 'users': ['fred', 'barney','wgd'] }));

   
   
// 
// var compiled = Lo.template('hello <%= user %>!');
//			console.log(compiled({ 'user': 'fred' }));
    exports.baseToString = function(value) {
    	
    	
        return value == null ? '' : (value + '');
        
    };
    exports.load = function(named) {
        named = exports.baseToString(named);
        if (!Lo.isString(named)) {
            return;
        } else {
            if (Lo.isEmpty(named)) {
                return;
            }
        }
        
        require.async('controllers/'+ named +'.js?' + window.$app.version, function(controller) {
            if (Lo.isObject(controller) && Lo.has(controller, "run")) {
                controller.run();
            }
        });
    };
    exports.loadScript = function(scripts) {
        $.each(scripts, function(n, value) {
            if (!Lo.isEmpty(value)) {
                exports.load(value);
            }
        });
    };
    window.$app.load = exports.load;
	
    /* ************************************************************ */
    /* 加载指定的公用模块 */
    if (Lo.isArray($app.common_module)) {
        exports.loadScript($app.common_module);
    } else {
        $app.common_module = Lo.trim(exports.baseToString($app.common_module));
        exports.load($app.common_module);
    }
    
    /* 加载控制器 */
    if (Lo.isArray($app.controller)) {
        exports.loadScript($app.controller);
    } else {
		$app.controller = Lo.trim(exports.baseToString($app.controller));
		if (!Lo.isEmpty($app.controller)) {
			exports.load($app.controller);
		}
    }
    
});