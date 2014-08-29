//选择城市
(function(){

	var ref = document.referrer || '';
		getCurrentCity();

		//haveChoice 
	var choiced = function(){
		var	city = this.city ;	

		if (typeof ref != 'undefined') {

			var from = getUrlParam('from') , 
				param ,
				location = document.location.href ; 

				//console.log(paramsStr);

			if (from == 'start') {

				//将原来的参数删除掉
				//if (location.indexOf('startPlace') > 0){
					//要replace的string
					var str = location.substring(location.indexOf('startPlace') , location.length) ,
						replaceStr = str.indexOf('&') > 0 ? str.substring(0 , str.indexOf('&')) : str.substring(0 , str.length)  ,
						newStr = str.replace(replaceStr , '').replace('&' , '') ;

						ref = ref + '?' + newStr ;
						
						// console.log(ref);
						// return ;
				//};

				var url = ref + '&startPlace = ' + encodeURIComponent(city) ;

			}else{ 

				//将原来的参数删除掉
				//if (location.indexOf('endPlace') > 0){
					var str = location.substring(location.indexOf('endPlace') , location.length) ,
						replaceStr = str.indexOf('&') > 0 ? str.substring(0 , str.indexOf('&')) : str.substring(0 , str.length)  ,
						newStr = str.replace(replaceStr , '').replace('&' , '') ;

						ref = ref + '?' + newStr ;
				//};

				//param = 'endPlace = ' + city ;
				var url = ref + '&endPlace = ' + encodeURIComponent(city) ;
			}

			//var url = ref.indexOf('?') > 0 ? ref + '&' +param : ref + '?' + param;
			window.location.href = url ;
		};
	}

	//热门城市
	$('.hotCity li').bind('tap' , function(){
		// var city = $(this).find('span').text() ; 
		// var o = {
		// 	city : city
		// } ;

		// choiced.call(o);
	});		

	//全部城市选
	$('.allCity li .kit').bind(selectEvent , function(){
		// alert('f')

		// var city = $(this).val() , 
		// 	o = {city : city}

		// 	choiced.call(o)
	}) ;


})();