/*
* 招聘
*/
var jobs = (function(){

	/*
	* 设置页面size
	*/
	function screenResize(){
		var winHeight = $(window).height();
			$('.swiper-container , .swiper-slide').css('height' , winHeight);
	}

	/*
	* 初始化slider
	*/
	function initSlider(){
		var mySwiper = new Swiper('.swiper-container',{
		     mode: 'vertical' ,
			 onSlideChangeStart: function(){
			 	$('.text , .whoWeAre').hide();

			 	var slider = $(".swiper-container .swiper-slide:eq(" + mySwiper.activeIndex + ")");	

			 	// if (mySwiper.activeIndex != 1) {
			 	// 	// var oddObj = $('.whoWeAre p.odd'),
					// 	// evenObj = $('.whoWeAre p.even') ;

					// 	// if (oddObj.hasClass('animFirst')) {
					// 	// 	oddObj.removeClass('animFirst');
					// 	// };

					// 	// if (evenObj.hasClass('animSecond')) {
					// 	// 	evenObj.removeClass('animSecond')
					// 	// };
			 	// }else{
			 	// 	textAminate();
			 	// }

			 	if (mySwiper.activeIndex == 10) {
			 		$('.arrow').hide();
			 	}else{
			 		if ($('.arrow').css('display') != 'block') {
			 			$('.arrow').show();
			 		};

			 	}

					setTimeout(function(){
			 			slider.find('.text').fadeIn('slow');

			 			if (mySwiper.activeIndex == 1) {
			 				slider.find('.whoWeAre').fadeIn();
			 			}

			 		} , 500)
			}
		});
	}

	/*
	* 切换字体
	*/
	function switchText(){
		if (this.hasClass('action')) {
			return 
		}else{
			$('.third .icons li.action').removeClass('action');
			this.addClass('action');
			
			var index = this.index();

			$('.about .come').hide();
			$('.about .come').eq(index).fadeIn();
		}
	}

	/*
	* 文字动画
	*/
	function textAminate(){
		var oddObj = $('.whoWeAre p.odd'),
			evenObj = $('.whoWeAre p.even') ;

		oddObj.addClass('animFirst');
		evenObj.addClass('animSecond');
	}

	return {
		version : '1.0' , 
		init : initSlider ,
		switchText : switchText ,
		screenResize : screenResize ,
		textAminate : textAminate
	} ;

})();

$(function(){
	//jobs.textAminate();

	// var _

	jobs.init();
	jobs.screenResize();

	$(window).resize(function(){
		jobs.screenResize();
	});

	$('.third .icons li').bind('tap', function(){
		 var obj = $(this);
		 	jobs.switchText.call(obj);
	});

	//head.js('script/wechat.js' , function(){
		
	//});
});
