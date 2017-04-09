define('controllers/safe/safe.index.main', function(require, exports, module) {
    "use strict";
    var fnGlobalUrl = require[require.toUrl ? 'toUrl' : 'resolve'];
    require('{LIB}/mui.webview.group');
    require('jsPxtorem');
    /* ************************************************************ */
    exports.run = function() {
    		var top1=jsPxtorem(207)+'px';
			var top2=jsPxtorem(90)+'px';
			mui.init();
			mui.plusReady(function() {
				
				var leader=mui.preload({
					url:'leader_list.html',
					id:'leader_list',
					styles:{
						top:top1,
						bottom:0
					
				}
				});
				var tongji=mui.preload({
					url:'b_safe_statistics_index.html',
					id:'b_safe_statistics_index',
					styles:{
						top:top2,
						bottom:0
					}
				});
				
				var check=mui.preload({
					url:'b_safe_inspection_list.html',
					id:'b_safe_inspection_list',
					styles:{
						top:top1,
						bottom:0
					
				}
				});
				var xunjianjihua=mui.preload({
					url:'b_safe_plan_pub.html',
					id:'b_safe_plan_pub',
					styles:{
						top:0,
						bottom:0
						
					}
				});
				var yanshougenzong=mui.preload({
					url:'b_safe_plan_tempplan_modified_design.html',
					id:'b_safe_plan_tempplan_modified_design',
					styles:{
						top:0,
						bottom:0
						
					}
				});
				leader.addEventListener('loaded',function(){
					leader.show();
				});
				
				
				mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
					var __thisid=$(this).attr('data-id');
					switch(__thisid){
						case 'leader_list': leader.show();break;
						case 'b_safe_inspection_list': check.show();break;
						case 'b_safe_statistics_index': tongji.show();break;
						case 'b_safe_plan_pub': xunjianjihua.show();break;
						case 'b_safe_plan_tempplan_modified_design': yanshougenzong.show();break;
						
					}
				});

			});
			mui.back = function() {
				var _self = plus.webview.currentWebview();
				_self.close("auto");
			}
	
    };
});