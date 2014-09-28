/*
* 今日特稿项目
* @author mikejay
* @since 2014.09.27
*/

head.js('script/lib/zepto.min.js' , 'script/lib/idangerous.swiper-2.1.min.js' ,function(){

	var today = (function(){
		/*
		* 页面初始化
		*/
		function init(){
			// console.log('init')
			var winHei = $(window).height() /2 ;
				$('.swiper-slide:first').css('height' , winHei);

			var titleHei = $('.title').height();

			//初始化swipe
			var mySwiper = new Swiper('.swiper-container',{
			     paginationClickable: true,
			     mode: 'vertical' ,
			     loop : false ,
			     useCSS3Transforms : true ,
			     // slidesPerView: 'auto' ,
			     onTouchEnd : function(){
			     	
			     } 
			});



			var htmlStr = $('#htmlStr').html();
			$('#content').html(htmlStr);


		}


		/*
		* 隐藏bottom bar
		*/
		function hidenShowBar(){

		}

		return {
			version : '1.0' , 
			init : init ,
		} ; 
	})();


	$(function(){
		today.init();
		$('.swiper-slide').bind('touchmove' , function(){

		});
	});

});



