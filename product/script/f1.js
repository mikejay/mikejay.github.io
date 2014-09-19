//司机报名
(function(){
	// var pattern = /^(?:13\d|14|15|18)-?\d{5}(\d{3}|\*{3})$/ ;
	// var phone = /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ ;

	var pattern = {
			phone : /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ , 
			pwd : ''
	} , 
	text = ['发送验证码' , '59秒后重新发送'] , 
	clearTimer = function(){
		var seconds = 0 ;

		//将按钮设置为计时器
		var em = $('.driverApply .phoneNum em');
			em.addClass('disable').text(text[1]);

		if (em.length > 0 && em.hasClass('disable')) {

			setInterval(function(){	
				seconds += 1 ;
				var s = 60 - seconds ;

				em.text(s+'秒后重新发送');

				if (s > 0) {
					if (seconds == 60) {
						em.removeClass('disable').text(text[0]);
						return ;
					};

				};
			} ,  1000) ;

		};
	} ,
	//将密码和验证码发送到后台
	submitForm = function(){
		//判断密码长度
		var pwd = this.find('.password input').val() ;

		if (pwd.length < 6) {
			alert('密码长度不能小于6位');
			return ;
		}else{
			//send to server
			console.log('OK');
		}
	} ;

	//clearTimer();
	$('.driverApply .phoneNum em').bind('tap' , function(){
		var tel = $('.driverApply .phoneNum input').val().trim();
		if (pattern.phone.test(tel)) {
			clearTimer();

		}else{
			alert('请正确填写手机号码！');
			return 
		}
	});

	//报名提交
	$('.driverApply .applyForm').submit(function(){
		var form = $(this);

		submitForm.call(form);
	}) ;

	$('#driverAppNext').bind('tap' , function(){
		var form = $('.driverApply .applyForm') ;
		submitForm.call(form);
	}) ;

})();


