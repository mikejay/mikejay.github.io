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
			 	var slider = $(".swiper-container .swiper-slide:eq(" + mySwiper.activeIndex + ")");	
			     	slider.find('.text').fadeIn('slow');
			     	// console.log(slider)
			     }
		});
	}

	function switchText(){
		// console.log(this)

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

	return {
		version : '1.0' , 
		init : initSlider ,
		switchText : switchText ,
		screenResize : screenResize 
	} ;

})();

$(function(){
	jobs.init();
	jobs.screenResize();

	$(window).resize(function(){
		jobs.screenResize();
	});

	$('.third .icons li').bind('tap', function(){
		 var obj = $(this);
		 	jobs.switchText.call(obj);
	});

});
