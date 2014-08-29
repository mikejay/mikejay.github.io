/*
* 结伴申请
*/

(function() {

	var location = document.location.href ;	

	var getUrlArgObject = function(){
	    var args = new Object() ,
	    	query = document.location.search.substring(1);
	    var pairs = query.split(",");
	    
	    for(var i = 0 ; i < pairs.length ; i++){
	        var pos = pairs[i].indexOf('=');

	        if(pos == -1){
	            continue;
	        }

	        var argname = pairs[i].substring(0 , pos) ,
	        	value = pairs[i].substring(pos + 1);
	        	
	        	args[argname] = unescape(value);
	    }

	    return args;
	} , 
	//将参数加进input
	autoValue = function(){

		var value = {
				nick : getUrlParam('nick') || '' ,
				startPlace : getUrlParam('startPlace') || '',
				endPlace : getUrlParam('endPlace') || '' ,
				sex : getUrlParam('sex') || '' ,
				peopleCount : getUrlParam('peopleCount') || '' ,
				contact : getUrlParam('contact') || '' ,
				sex : getUrlParam('sex') || '' 
			} ,
			date = {
				start : {
					year : getUrlParam('startYear') || '' ,
					mon : getUrlParam('startMon') || '' , 
					day : getUrlParam('startDay') || '' 
				} , 
				end : {	
					year : getUrlParam('endYear') || '' , 
					mon : getUrlParam('endMon') || '' , 
					day : getUrlParam('endMon') || '' 
				}
			} ;
 			
			if (value.startPlace) {
				$('.list li.departure span').text(value.startPlace);
			};

			if (value.endPlace) {
				$('.list li.destination span').text(value.endPlace);
			};

	} ; 	
	
	autoValue();

	$('.touristApply .tab li').live('tap' , function(){
		var o = {
			parentClass : '.touristApply' , 
			li : $(this) 
		}

		switchTab.call(o) ;
	});

	$('.touristApply .departure , .touristApply .destination').bind('tap' , function(){
		//abc.html?from=start&startYear=&startMon=&staryDay=&endYear=&endMon&endDay&contact=
		var baseUrl = 'C2.html' , 
			from = $(this).hasClass('departure') ? 'start' : 'end' ,
			paramsObj = getUrlArgObject() ,
			paramsStr = location.substring( location.indexOf('?') , location.length ) ,
			url = location.indexOf('?') > 0 ? baseUrl + paramsStr : baseUrl ,
			date = { 
				start : {
					year : $('.needs .start .year').find('select').val() || '' ,
					mon : $('.needs .start .mon').find('select').val() || '' , 
					day : $('.needs .start .day').find('select').val() || ''
 				} , 
 				end : {
 					year : $('.needs .end .year').find('select').val() || '' , 
 					mon : $('.needs .end .mon').find('select').val() || ''  , 
 					day : $('.needs .end .day').find('select').val() || '' 
 				}
			} ,
			contact = $('.needs .contact input').val() , 
			sex = $('.needs .sex select').val() ,
			nick = $('.needs .nick input').val() ,
			age = $('.uneeds .age select').val() ;


			if (url.indexOf('?') > 0 ) {
				window.location.href = url + '&from='+from + '&startYear='+date.start.year+'&startMon='+date.start.mon+'&staryDay='+date.start.day+'&endYear='+date.end.year+'&endMon='+date.end.mon+'&endDay='+date.end.day+'&contact='+contact + '&sex='+sex+'&nick='+nick+'&age='+age;
			}else{
				window.location.href = url + '?from='+from + '&startYear='+date.start.year+'&startMon='+date.start.mon+'&staryDay='+date.start.day+'&endYear='+date.end.year+'&endMon='+date.end.mon+'&endDay='+date.end.day+'&contact='+contact + '&sex='+sex+'&nick='+nick+'&age='+age;
			}
	});

	//删除照片
	$('.album .delete').live('tap' , function(){
		var obj = $(this) ;

		deletePhoto.call(obj);
	});




})();