/**!
 * 微信网页
 * author by mikejay 
 * since 2014.08.23
*/
(function(){

	var scripts = ['script/Zepto.min.js' , 'script/WeixinApi.js' , 'script/ZeptoScroll.min.js'] ;

	//异步加载js
	head.js(scripts , function(){
		// $('.')

		//司机页面
		(function(){
			
			$('.driver .tab li').live('tap' , function(){
				if (!$(this).hasClass('action')) {
					var index = $(this).index();

					console.log($('.driver .tablist').eq(index))


					$('.driver .tab .action').removeClass('action');
					$(this).addClass('action') ;

					$('.driver .tablist').removeClass('show');
					$('.driver .tablist').eq(index).removeClass('hide').addClass('show')


				};


			});

		})();











	});

})();