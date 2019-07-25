$(function(){

	//input去空格 
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "text")
			inputs[i].oninput = function () {
				this.value = this.value.replace(/(^\s+)|\s+$/g, "");
			};
	}
	// $("#form .title").val("锂电专题");
  //提交表单数据
	$('#formSubmit').on('click', function () {
		var name = $('.name').val();
		var phone = $('.phone').val();
		var place = $('.place').val();
		var email = $('.email').val();
		var title = $('.title').val();
		var content = $('.content').val();
		if (name == "" || name == null) {
			$('.tips').html("请输入姓名！");
		} else if (phone == "") {
			$('.tips').html("请输入手机号！");
		} else if (place == "") {
			$('.tips').html("请输入所在地！");
		} else if (title == "") {
			$('.tips').html("请输入主题！");
		} else if (content == "") {
			$('.tips').html("请输入内容！");
		} else {
			$.ajax({ 
				url: common_url + '/contactUs',
				type: "post",
				async: true,
				data: {
					name: name,
					phone: phone,
					place: place,
					email: email,
					title: title,
					content: content
				},
				dataType: 'json',
				success: function (res) {
					if (res.status == 1) {
						layer.msg("提交成功", { icon: 1, time: 1000 });
						$('.name').val("");
						$('.phone').val("");
						$('.place').val("");
						$('.email').val("");
						$('.title').val("");
						$('.content').val("");
					} else {
						layer.msg(res.message , { icon: 7, time: 1000 });
						$('.name').val("");
						$('.phone').val("");
						$('.place').val("");
						$('.email').val("");
						$('.title').val("");
						$('.content').val("");
					}
				}
			})
		}
	})


})