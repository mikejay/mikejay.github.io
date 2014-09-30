/*
* 今日特稿项目
* @author mikejay
* @since 2014.09.27
*/

var _domain = document.domain ;
head.js('script/lib/zepto.min.js' , 'script/lib/idangerous.swiper-2.1.min.js' , 'script/lib/zeptoScroll.min.js' , 'script/lib/zepto.cookie.js' ,function(){
  	var today = (function(){
  		/*
		* 页面初始化
		*/
		function init(){

	  		var winH = $(window).height() ;
	  		$('.swiper-container-article , .swiper-container-list').css('height' , winH);

	  		var holdPosition = 0 , bar = $('.bottomBar') , isBottom ; 
	  		var mySwiper = new Swiper('.swiper-container-article',{
			    scrollContainer: true,
			    mode : 'vertical',
			    watchActiveIndex: true,
			    onTouchStart: function(s) {
			    	holdPosition = 0 ;	
			    },
			    onResistanceBefore: function(s, pos){
			    	holdPosition = pos ;
			    },
			    onResistanceAfter : function(s , pos){
			    	// if (bar.css('display') == 'none') {
			    	// 	bar.fadeIn();
			    	// };
			    } ,
			    onTouchEnd: function(s){
			    	var t = s.touches ;

			    		if (t.diff > 10) {//向上滚动
			    			if (bar.css('display') == 'none') {
			    				bar.fadeIn();
			    			}
			    		};

			    		if (t.diff < -10) {
			    			if (bar.css('display') != 'none') {
			    				bar.hide();
			    			};
			    		};

				    	if (holdPosition > 100) {
				      		rootSwiper.swipeTo(0, 500, {});
				      	}
			    }

			  });

	  		var rootSwiper = new Swiper('.swiper-container',{
			    // scrollContainer: true,
			    mode : 'vertical',
			    onSlideChangeStart : function(s){
			    	if (s.activeIndex == 1) {
			    		$('.bottomBar').hide();
			    	}else{
			    		$('.bottomBar').fadeIn();
			    	}

			    	//console.log(s.activeIndex)

			    	//slide.isActive()
			    }
			  });

	  		var listSwiper = new Swiper('.swiper-container-list' , {
	  				scrollContainer: true,
			    	mode : 'vertical',
			    	onTouchMove : function(s , pos){
			    		if (bar.css('display') != 'none') {
			    			bar.hide();
			    		};
			    	} , 
			    	onTouchEnd : function(){
			    		if (bar.css('display') == 'none') {
			    			bar.fadeIn();
			    		};
			    	}
	  			}) ;
	  		
	  		//设置封面title位置
	  		initTitlePos();

	  		//判断是否有赞过
			checkZan();
	  	}

	  	/*
	  	* 初始化标题位置
	  	*/
	  	function initTitlePos(){
	  		var title = $('.cover .title') ,
	  			t = $(window).height() - title.height() ;
	  			title.css('top' , t);
	  	}

	  	/*
		* 页面切换
		*/
		function switchPage(){
			var obj = this.obj , 
				index = obj.index() ;

			if (!obj.hasClass('action')) {
				var page = $('.page').eq(index) ;
					$('.page').hide();
					page.fadeIn();

					$('.bottomBar li.action').removeClass('action');
					obj.addClass('action');

					if(index == 0) {
						$('.bottomBar .center').css({'background-image' : 'url(img/center_first.png)'});
					}else{
						$('.bottomBar .center').css({'background-image' : 'url(img/center_second.png)'});
						
					}

			};
		}

		/*
		* 点赞
		*/
		function zan(){
			var obj = $('.bottom .zan') , 
				num = obj.text() ,
				newNum = parseInt(num) + 1 ;

				obj.text(newNum); //修改赞的数
				obj.addClass('has'); //修改赞的背景图
				if ($.cookie) {
					$.cookie.set('infzm_zan' , '1' , _domain , '/' , '1');
				};
		}

		/*
		* 判断是否已经赞过
		*/
		function checkZan(){
			var c = $.cookie.get('infzm_zan') ;

			console.log(c)

			if (typeof c != 'undefined' && c != '' && c == 1) {
				$('.bottom .zan').addClass('has');
			};
		}

		return {
			version : '1.0' , 
			init : init ,
			switchPage : switchPage ,
			zan : zan , 
			checkZan : checkZan ,
			initTitlePos : initTitlePos
		} ; 

  	})();


  	$(function(){
  		today.init();

  		$(window).resize(function(){
  			today.initTitlePos();
  		});

  		$('.bottomBar li').bind('tap' , function(){
			var obj = $(this);
			var o = {
					obj : obj
				};

			if (!obj.hasClass('action')) {
				today.switchPage.call(o);
			};

		});

		$('.article .bottom .zan').bind('tap' , function(){

			if (!$(this).hasClass('has')) {
				today.zan();
			};
		}) ;

  	})


});