(function($){

	var ins = {
		token : '29561604.0d9e12b.f6b44a37388246918f27c9fa26b9a11c' ,
		//url : 'https://api.instagram.com/v1/users/3/media/recent/?access_token=' ,
		getRecntData : function(){
			var options = {
				url : 'https://api.instagram.com/v1/users/3/media/recent/?access_token=' + this.token ,
				type : 'get' , 
				dataType : 'jsonp' , 
				data : {}  ,
				success : function(d){
					console.log(d);
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
		} 
	};

	ins.getUser();


})(jQuery);