define('controllers/safe/statistics.index', function(require, exports, module) {
    "use strict";
    var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
    
    /* ************************************************************ */
    exports.run = function() {
		
		$(document).on('click','.m-enter-list-panel a',function(){
			
			mui.openWindow('b_safe_inspection_detls.html');
			
			
		});
		
		
    };
});