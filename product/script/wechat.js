/**!
 * 微信网页
 * author by mikejay 
 * since 2014.08.23
*/
(function(){

	scripts = ['script/Zepto.min.js' , 'script/WeixinApi.js' , 'script/ZeptoScroll.min.js']  ,
	ua = navigator.userAgent.toLowerCase() ,
	isApple = ua.match(/ipad|iphone|ipod/i) ? true : false ,
	selectEvent = isApple ? 'blur' : 'change' ;

	//异步加载js
	head.js(scripts , function(){		
		_speed = 800  ,
		changeSelect = function(){
			var obj = this.obj , 
				val = this.value ,
				input = this.input ;

				if (obj.length > 0 && val.trim() != '') {
					obj.text(val) ;	
				};

				if (input.length > 0) {
					input.attr('value' , val)
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
		}  ,

		autoMargin = function(){
			if ($('.serveRang').length > 0) {
				var top = $('.serveRang .choiceList').height() + 10 ;
				$('#wrapper').animate({'margin-top' : top} , 0 , 'ease-in' ) ;
			};	
		} ,

		_v = [] ;
		selectCity = function(){
			var value = this.val();	
				_v = [] ;	

			$('.serveRang .choiceList li').each(function(){
				var text = $(this).text().replace(' x' , '');
					_v.push(text);
			});	
			// console.log()


			if (value && $.inArray(value , _v) < 0 ) {
				var h = '<li>'+value+' x</li>' ;
				$(h).appendTo($('.serveRang .choiceList'));

				if ($('.serveRang .serveList').is(":visible") == false ) {
					$('.serveRang .serveList').show();
				};

				autoMargin();
			};
		} ,

		removeObj = function(){
			var obj = this ;

			if (obj.length >0) {
				obj.remove();

				autoMargin();

			};
		} , 

		deletePhoto = function(){
			if (confirm("确定要删除该照片？")) {

				//do delete 

				var li = this.parent();
					li.fadeOut();

					

			};
		} , 
		String.prototype.replaceAll = function(s1,s2){
		　　return this.replace(new RegExp(s1,"gm"),s2);
		} , 
		//获取url参数值
		getUrlParam = function(name){
			var url = decodeURIComponent(window.location.search).replaceAll(' ' , '');

            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") ,
            	r = url.substr(1).match(reg); 	

            if (r != null){
            	return unescape(r[2]);
            } 
            	return null ;
        } , 

        //输入完成
        enterFinish = function(){
        	var label = this.label  ,
        		value = this.value  ;

        	if (value.trim() != '' && label.length > 0) {
        		var text = label.text() ;

        		if (text.indexOf('：') > 0) {

        		}else{
        			var newText = text + '：' ;
        			label.text(newText) ;	
        		}
        		
        	}

        	if (value.trim() == '' && label.length > 0) {
        		var text = label.text() ;
        		if (text.indexOf('：') > 0) {
        			var newText = text.replace('：' , '') ;
        			label.text(newText);
        		}
        	};

        } , 
        autoImportValue = function(){
        	var val = [
        			'                  ' , 
        			'                  ' , 
        			'' ,
        			'           '
        		] ;	
        	var value = this.textarea.val().trim() , 
        		index = this.textarea.parent().index() ;
     		
        	if (value != '') {

        	}else{	
        		this.textarea.text(val[index])
        	}

        } , 

        showLeftContain = function(){
        	var callback = this.callback || function(){} ;

			$('.rightContain').addClass('hide').removeClass('show') ;
			$('.leftContain').addClass('show').removeClass('hide') ;

        	$('.leftContain').animate({
				'margin-left' : '0' 
			} , _speed , 'ease' , function(){
				// $('.rightContain').removeClass('show').addClass('hide') ;
			});
        } , 
        showRightContain = function(){
        	var callback = this.callback || function(){} ;	
        	
        	$('.leftContain').animate({
				'margin-left' : '-100%' 
			} , _speed , 'ease' , function(){

				$('.leftContain').addClass('hide').removeClass('show') ;
				$('.rightContain').addClass('show').removeClass('hide') ;
			});

			
        } , 

        scrollAnyWhere = function(offset){
			$.scrollTo({
				endY: offset ,
				duration: 200, 
				callback: function(){
					    	
				}
			});
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


			$('.driverList .tab li').live('tap' , function(){
				console.log('f')

				var o = {
					parentClass : '.driverList' , 
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
				_type  ;

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
						} , _speed , 'ease-out' , getCurrentCity);

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
					} , _speed , 'ease-in' , callback);
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


		//司机搜索
		(function(){
			$('.driverSec li.keywords').bind('tap' , function(){
				//跳转到关键词输入：C6
				window.location.href = 'C6.html';

				// $('.driverSec .enterKeyword').removeClass('hide');
				// $('.driverSec .contain').animate({
				// 		'margin-left' : '-100%' 
				// } , _speed , 'ease-out' );

			});

			$('.driverSec .keywordInput input').focus(function(){
				var clearBut = $(this).parent().find('i');
					if (clearBut.is(":visible") ==false ) {
						clearBut.fadeIn();
					};

			}).blur(function(){
				var value = $(this).val().trim() ;

				if (value == '') {
					var clearBut = $(this).parent().find('i');
					clearBut.hide();
				};

			});	

			$('.driverSec .keywordInput i').bind('tap' , function(){
				var form = $('.driverSec .keywordForm');
				form[0].reset();
				form.find('input').attr('value' , '')
			});


			//form 提交后
			$('.driverSec .keywordForm').submit(function(){
				var input = $(this).find('input') , 
					callback = function(){
						$('.driverSec .enterKeyword').addClass('hide');
						$('.driverSec .keywords span').text(input.val())
					} ;

					input.blur();
					$('.driverSec .contain').animate({
							'margin-left' : '0' 
					} , _speed , 'ease-out' , callback);
			});	


			var clearBut ;
			$('.driverSec .enterKeyword li').bind('tap' ,function(){
				var text = $(this).text() , 
					input = $('.driverSec .keywordForm input') ;

					if (input.val().trim() != '') {
						var newVal = input.val() + ' ' + text ; 
					}else{
						var newVal = text ;
					}

					input.attr('value' , newVal);

					if (!clearBut) {
						clearBut =  $('.driverSec .keywordForm i') ;
					}

					if (clearBut.is(":visible") ==false ) {
						clearBut.fadeIn();
					};
			});

		})();
		//司机搜索end


		//选择
		$('.select .kit').bind(selectEvent , function(){
			var me = $(this) ,
				parent = me.parent() ;

			var o = {
					obj : parent.hasClass('isEm') ?  parent.parent().find('span') : parent.find('span'),
					input : parent.hasClass('isEm') ?  parent.parent().find('input') : parent.find('input'),
					value : me.val() , 
					me : me
			} ;

			changeSelect.call(o);	

			//bug to fixed
			var enterObj = {
				value : me.val(), 
				label : parent.find('label')
			} ;

			enterFinish.call(enterObj);

		});

		$('.selector select').bind(selectEvent , function(){
			var me = $(this) , 
				parent = me.parent() ;

			var o = {
					obj : parent.find('span') , 
					input : parent.find('input') ,
					value : me.val() , 
					me : me 
				} ;

			changeSelect.call(o) ;

			var enterObj = {
				value : me.val(), 
				label : parent.find('label')
			} ;

			enterFinish.call(enterObj);
		});	

		//公共
		// $('.select .kit , .selector select').bind('tap' , function(){
		// 	if ($(this).parent().hasClass('evaluate')) {
		// 		var p = $(this).parent();
		// 	}else{
		// 		var p = $(this).parent().parent();	
		// 	}

		// 	if (p.hasClass('peopleCount') || p.hasClass('sex') || p.hasClass('evaluate')) {
		// 		var value = $(this).val() ;
		// 		setTimeout(function(){
		// 			p.find('span').text(value);
		// 		} , 400);
		// 	};
		// });		

		//如果是在G2
		(function(){
			$('.serveRang .allCity select').bind(selectEvent , function(){
				selectCity.call($(this));
			});

			//selectCity
			$('.serveRang .choiceList li').live('tap' , function(){
				removeObj.call($(this)) ;
			});

		})();


		//修改label里面的字
		$('.profileCpl li input').blur(function(){
			//console.log('f');
			var label = $(this).parent().find('label') ,
				value = $(this).val() ;
			var o = {
				value : value , 
				label : label
			} ; 

			enterFinish.call(o);
		});


		//load b2 
		if ($('.touristApply').length > 0) {
			head.js('script/b2.js');
		};

		if ($('.choiceCity').length >0) {
			head.js('script/c2.js');
		}

		if ($('.addLine').length > 0) {
			head.js('script/f4.js');
		};

	});

})();



