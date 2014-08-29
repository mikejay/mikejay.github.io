/*
* 添加路线
*/
(function(){
	// console.log('f');

	$('.addLine li textarea').focus(function(){
		//console.log('f')
		var me = $(this) ,
			label = me.parent().find('label') ;

		var o = {
				textarea : me , 
				label :  label
			};

		autoImportValue.call(o);
	}).blur(function(){
		if ($(this).val().trim() == '' || $(this).text().trim() == '') {
			$(this).text('');
		};

		var label = $(this).parent().find('label') ,
			value = $(this).val().trim() ;

			$(this).attr('value' , 'fuck')

			var o = {
				value : value , 
				label : label
			} ; 

			// console.log(value)

			enterFinish.call(o);
	});

	$('.addLine li input').blur(function(){
		var me = $(this) ;
		var o = {
				value : me.val().trim() , 
				label : me.parent().find('label') 
			}

			enterFinish.call(o);
	}) ;

	//
	$('.profileCpl .addLineBut').bind('tap' , function(){
		var callback = function(){

		} ;	
		
		showRightContain.call({callback : callback});
	}) ;

	//save 
	$('.profileCpl .saveLine').bind('tap' , function(){

		//do save ,after saved go back 
		/*
		var options = {
				url : '' , 
				data : '' , 
				dataType : 'json' , 
				type : 'post' , 
				success : function(res){

				} , 
				error : function(){

				}
			} ; 
		$.ajax(options) ;
		*/

		showLeftContain.call({callback:function(){}});

	}) ;

})();



