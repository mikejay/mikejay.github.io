(function($){
	var ins = {
		token : '29561604.0d9e12b.f6b44a37388246918f27c9fa26b9a11c' ,
		userId : '29561604' ,
		nextUrl : '' , 
		callback : function(d){
			var htmlStr = [] ; 
				//设置nexturl
				ins.nextUrl = d.pagination.next_url ;
				if(typeof d.pagination.next_url == 'undefined'){
					$('.life .load_more').hide();
				}

				if(d.data){
					var data = d.data ;
					for(var i = 0 ;i < data.length ; i++){
						var url = data[i].images.standard_resolution.url ,
							html = '<li><a href="javascript:;"><img src="'+ url +'" class="border_outside"/></a></li>' ;

						htmlStr.push(html);
					}
					$(htmlStr.join(' ')).appendTo($('.image_list ul'));
					//$('.image_list ul').html(htmlStr.join(' '));
				}
		} , 
		getRecentData : function(){
			var options = {
				url : 'https://api.instagram.com/v1/users/'+ins.userId+'/media/recent/?access_token=' + this.token ,
				type : 'get' , 
				dataType : 'jsonp' , 
				data : {}  ,
				success : function(d){
					ins.callback(d);
				} , 
				error : function(){
					alert('data loading fail');
				}

			}
			$.ajax( options );
		} , 
		getUser : function(){
			var options = {
				url : 'https://api.instagram.com/v1/users/search?q=mikejay_liu&access_token=' + this.token ,
				type : 'get' , 
				dataType : 'jsonp' , 
				data : {} , 
				success : function(d){
					console.log(d.data);

				} ,
				error : function(){
					console.log('data loading fail');
				}
			}
			$.ajax( options );
		} ,
		getNext : function(){
			var options = {
				url : ins.nextUrl , 
				type : 'get' ,
				dataType : 'jsonp' , 
				data : {} , 
				success : function(d){
					ins.callback(d);
				} , 
			}
			$.ajax( options );
			$('.life .load_more').text('加载更多');
		}
	};	

	var imgOperation = {
		showBigImg : function( ){
			var scrollT = $(document).scrollTop() ,
				left = this.offset().left , 
				top = this.offset().top - scrollT ,
				tmpl = ($(window).width() - 640)/2 , 
				tmpt = ($(window).height() - 640)/2 ,
				l = tmpl > 0 ? tmpl : 0 , 
				t = tmpt > 0 ? tmpt : 0 ,
				newImg = this.parent().clone() ,
				cover = $('.body_cover') ;

				newImg.addClass('big_pic').css({ 'left' : left , 'top' : top });
				$('<span class="close"><img src="'+window.location+'/images/close.png"></span>').appendTo(newImg);
				newImg.appendTo('body');
				cover.show();

				newImg.stop().animate({
					top : t , 
					left : l , 
					width : 650 , 
					height : 650 
				} , 500) ;
		} , 
		hideBigImg : function(cover){
			this.remove();
			cover.hide();
		} ,
		resetPos : function(){
			var	tmpl = ($(window).width() - 640)/2 , 
				tmpt = ($(window).height() - 640)/2 ,
				l = tmpl > 0 ? tmpl : 0 , 
				t = tmpt > 0 ? tmpt : 0 ;

				this.animate({
					top : t ,
					left : l
				} , 0);
		}
	};

	var weather = {
		location : function(){
			//百度api 通过经纬度获取天气出问题，暂时使用这个
			//weather.getWeather();
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition( weather.current );
			}else{
				//console.log('f')
			}	
			
		}  ,
		current : function( pos ){
			var coords = pos.coords ,
				lat = coords.latitude ,
				lng = coords.longitude ,
				url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng

				var options = {
					url : url , 
					type : 'get' ,
					dataType : 'jsonp' , 
					data : {} , 
					success : function(d){
						console.log(d)
					} , 
				}
				$.ajax( options );
		} , 
		/*getWeather : function(){
			$.get("http://ipinfo.io", function( res ) {
				//console.log(res)
				var city = res.city , 
					country = res.country ;

				var appkey = 'E4805d16520de693a3fe707cdc962045' ,
					location = res.city ,
					url = 'http://api.map.baidu.com/telematics/v3/weather?location='+location+'&output=json&ak='+appkey;
					url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+','+country ;

				$.get(url , function(res){
					console.log(res);
				} , "jsonp");

			}, "jsonp");
		}*/

	};

	$(function(){
		//ins.getUser();
		ins.getRecentData();
		weather.location();

		$('.life .load_more').click(function(){
			$(this).text('加载中...');
			ins.getNext();
		});

		$('.image_list li img').live('click' , function(){
			imgOperation.showBigImg.call( $(this) );
		});

		$('.body_cover , .big_pic .close').live('click' , function(){
			imgOperation.hideBigImg.call( $('.big_pic') , $('.body_cover'));
		});

		$(window).resize(function(){
			if( $('.big_pic').length > 0 ){
				imgOperation.resetPos.call( $('.big_pic') );
			}
		});

	});

	

})(jQuery);