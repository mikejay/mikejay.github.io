/**!
 * 微信网页
 * author by mikejay 
 * since 2014.08.23
*/
(function(){

	var scripts = ['script/Zepto.min.js' , 'script/WeixinApi.js' , 'script/ZeptoScroll.min.js'] ;

	//异步加载js
	head.js(scripts , function(){	
		//select 组件
		var changeSelect = function(){
				var parent = this.parent() ;

				var obj = parent.hasClass('isEm') ? parent.parent().find('span') : parent.find('span'), 
					val = this.val() || ''; 

					if (obj.length > 0 && val.trim() != '') {
						obj.text(val) ;	
					};

					//如果select处于可见状态（日期选择处），将背景图替换掉
					if (this.hasClass('visible')) {
						parent.css('background-image' , 'url(images/button_selected.png)');
					};
		} ,
		/*
		* 获取当前城市
		*/
		getCurrentCity = function(){
			var url = 'http://api.map.baidu.com/location/ip?ak=640be13b5b93ea737af29ee8f584eeff' ,
				options = {
						url : url , 
						dataType : 'jsonp' , 
						type : 'get' , 
						success : function(res){	
							if (res.status == '0') {
								var city = res.content.address_detail.city ,
									cityName = city.replace('市' , '') ;
									$('.currentCity span').text(cityName);
									//console.log(cityName);
							}else{
								alert('无法获取当前地址');
							}
						} 
				}

				$.ajax(options);
		} ,
		/*
		* tab之间地切换
		* this = { parentClass : '.driver' , li : li }
		*/
		switchTab = function(){
			if(!this.li.hasClass('action')){
				var index = this.li.index();

				$(this.parentClass + ' .tab .action').removeClass('action');
				this.li.addClass('action') ;
				$(this.parentClass + ' .tablist').removeClass('show');
				$(this.parentClass + ' .tablist').eq(index).removeClass('hide').addClass('show');
			}
		} ;


		//司机页面
		(function(){
			$('.driver .tab li').live('tap' , function(){
				var o = {
					parentClass : '.driver' , 
					li : $(this) 
				}

				switchTab.call(o) ;
			});

		})();


		//结伴查询
		(function(){
			
			var	goSearch = function(){

				} ,
				type ; 

				//console.log(type)

				$('.choiceCity .tab li').bind('tap' , function(){
					var o = {
						parentClass : ".choiceCity" , 
						li : $(this)
					}
					switchTab.call(o);
				});


				//选择城市 ，切换到选择城市页面
				$('.partnerSec .inputMes .departure , .partnerSec .inputMes .destination').bind('tap' , function(){
					_type = $(this).hasClass('departure') ? 'start' : 'end' ;

						$('.partnerSec .contain').animate({
							'margin-left' : '-100%' 
						} , 500 , 'ease-out' , getCurrentCity);

						$('head title').html('选择城市');
				});

				//选完城市，返回
				$('.partnerSec .cityList li').live('tap' , function(){
					var callback = function(){
						if (typeof _type != 'undefined' && city) {
							var p = _type == 'start' ? $('.partnerSec .departure') : $('.partnerSec .destination') ;
							p.find('span').text(city);
						};

						$('head title').html('结伴查询');
					} ,
					city = $(this).find('span').text() || ''; 

					$('.partnerSec .contain').animate({
						'margin-left' : '0' 
					} , 500 , 'ease-in' , callback);
				});

				//选择
				$('.select .kit').change(function(){
					changeSelect.call($(this));	
				});

		})();


	});

})();