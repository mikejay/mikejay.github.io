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
		console.log(getUrlParam('endPlace'));



		var startPlace = getUrlParam('startPlace') || '',
			endPlace = getUrlParam('endPlace') || '' ;

			if (startPlace) {
				$('.list li.departure span').text(startPlace);
			};

			if (endPlace) {
				$('.list li.destination span').text(endPlace);
			};



			// console.log(endPlace);
			// console.log(startPlace);

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
		//abc.html?from=start 	
		var baseUrl = 'C2.html' , 
			from = $(this).hasClass('departure') ? 'start' : 'end' ,
			paramsObj = getUrlArgObject() ,
			paramsStr = location.substring( location.indexOf('?') , location.length ) ,
			url = location.indexOf('?') > 0 ? baseUrl + paramsStr : baseUrl; 

			if (url.indexOf('?') > 0 ) {
				window.location.href = url + '&from='+from ;
			}else{
				window.location.href = url + '?from='+from ;
			}

			// console.log(url) 	

			// console.log(paramsStr)	
		  //	window.location.href = url + '&from='+from ;
	});

		//删除照片
	$('.album .delete').live('tap' , function(){
		var obj = $(this) ;

		deletePhoto.call(obj);
	});




})();