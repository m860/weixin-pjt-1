/**
 * Created by jean.h.ma on 12/6/16.
 */
(function(){
	if(!window["app"]){
		window["app"]={};
	}
	//listen tab bar click
	$(".tab-bar .bar").click(function(event){
		var me=$(this);
		me.parent().find(".bar").removeClass("selected");
		me.addClass('selected');
		var rel=parseInt(me.find("a").prop("rel"));
		var contents=me.parent().parent().find('.tab-content');
		contents.hide();
		contents.eq(rel).show();
	});
	//listen mask close button click
	$(".mask-close-button").click(function(){
		$(this).parent().hide();
	});

	//loading helper
	app.showLoading=function(){
		$(".loading").show();
	}
	app.hideLoading=function(){
		$(".loading").hide();
	}
	app.updateLoadingProgress=function(percent){
		$(".loading p").text(percent);
	}
})();