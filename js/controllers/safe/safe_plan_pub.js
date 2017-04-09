define('controllers/safe/safe_plan_pub', function(require, exports, module) {
    "use strict";
    
    var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
    require('jsPxtorem');
    require('kalendae_standalone');
    /* ************************************************************ */
   var calendar=function(){
   		new Kalendae.Input('input1', {
			months:1,
			mode:'multiple',
			selected:[Kalendae.moment().subtract({M:1}), Kalendae.moment().add({M:1})]
		});
   	
   }
    exports.run = function() {
	calendar();
		
		
		
    };
});