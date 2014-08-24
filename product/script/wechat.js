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
		var changeSelect0 = function(){
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

		changeSelect = function(){
			var obj = this.obj , 
				val = this.value ; 



				if (obj.length > 0 && val.trim() != '') {
					obj.text(val) ;	
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

									if ($('.currentCity').length > 0) {
										$('.currentCity span').text(cityName);
									};
									
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

		//公共
		$('.select .kit , .selector select').bind('tap' , function(){
			if ($(this).parent().hasClass('evaluate')) {
				var p = $(this).parent();
			}else{
				var p = $(this).parent().parent();	
			}

			if (p.hasClass('peopleCount') || p.hasClass('sex') || p.hasClass('evaluate')) {
				p.find('span').text($(this).val())
			};
		});	


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
					window.location.href = 'A6.html' ;
				} ,
				type ,
				speed = 800 ;

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
						} , speed , 'ease-out' , getCurrentCity);

						//$('head title').html('选择城市');
				});

				//选完城市，返回
				$('.partnerSec .hotCity li').live('tap' , function(){
					var callback = function(){
						if (typeof _type != 'undefined' && city && city != '...') {
							var p = _type == 'start' ? $('.partnerSec .departure') : $('.partnerSec .destination') ;
							p.find('span').text(city);
						};
					} ,
					city = $(this).find('span').text() || ''; 

					$('.partnerSec .contain').animate({
						'margin-left' : '0' 
					} , speed , 'ease-in' , callback);
				});	


				//在全部城市里选择了城市
				$('.partnerSec .allCity select').change(function(){
					var city = $(this).val() || '' ,
						callback = function(){
							if (typeof _type != 'undefined' && city) {
								var p = _type == 'start' ? $('.partnerSec .departure') : $('.partnerSec .destination') ;
								p.find('span').text(city);
							};
						} ;

					if (city) {
						$('.partnerSec .contain').animate({
							'margin-left' : '0' 
						} , speed , 'ease-in' , callback);
					};

				});

				//go search
				$('#searchBut').bind('tap' , function(){
					goSearch();
				})
		})();


		//选择
		$('.select .kit').change(function(){
			var me = $(this) ,
				parent = me.parent() ;

			var o = {
					obj : parent.hasClass('isEm') ?  parent.parent().find('span') : parent.find('span'),
					value : me.val() , 
					me : me
			} ;

			changeSelect.call(o);	
		});

		$('.selector select').change(function(){
			var me = $(this) , 
				parent = me.parent() ;

			var o = {
					obj : parent.find('span') , 
					value : me.val() , 
					me : me 
				} ;

			changeSelect.call(o) ;
		});








	});

})();