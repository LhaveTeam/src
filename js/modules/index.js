define('modules/index', function(require, exports, module) {
    "use strict";
    
    var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
    var $ = ('undefined' == typeof window.jQuery ? require('jquery') : window.jQuery);
    var $window = $(window), $document = $(document);
			require('pullToRefresh');
			require('pullToRefresh_material');
    
    /* ============================================================
     * IndexPage 页面类
     * ============================================================ */
    
    
    /* ************************************************************ */
    exports.run = function() {  
        $document.ready(function() {
		mui.init();
		
		
		
        });
    };
});