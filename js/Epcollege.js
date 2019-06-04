$(function() {
	//顶部栏效果
	var oTop=$("#nav").offset().top;
	$(window).scroll(function() { //滚动浏览器就会执行
		if($(document).scrollTop()>= oTop) {
			$("#nav").addClass("fixnav");
			$("#banner").addClass("new");
			$("#nav .logo").addClass("logoNew");
		}else{
			$("#nav").removeClass("fixnav");
			$("#banner").removeClass("new");
			$("#nav .logo").removeClass("logoNew");
		}
	})
	
	//banner
	$.get(common_url + "/getBannerList", {
		type:4
	}, function (data) {
		var banner = data.bannerList;
		var bannerStr="";				
		for (var i = 0; i < banner.length; i++) {
			if(banner[i].url){
				bannerStr+='<div class="swiper-slide"><a href="'+banner[i].url+'" target="_blank"><div class="bannerBox" style="background: url('+img_url+banner[i].file+') 50% 0px no-repeat;"></div></a></div>';
			}else{
				bannerStr+='<div class="swiper-slide"><a href="javascript:;"><div class="bannerBox" style="background: url('+img_url+banner[i].file+') 50% 0px no-repeat;"></div></a></div>';
			}		
		}
		$("#banner .swiper-wrapper").html(bannerStr);	

		//banner轮播
		var mySwiper = new Swiper('#banner .swiper-container', {
			// 轮播图的方向，也可以是vertical方向
			direction: 'horizontal',
			//播放速度
			loop: true,
			// 自动播放时间
			autoplay: 3000,
			// 播放的速度
			speed: 800,
			// 如果需要分页器，即下面的小圆点
			pagination: '#banner .swiper-pagination',
			paginationClickable: true,
			// 如果需要前进后退按钮
			nextButton: '#banner .swiper-button-next',
			prevButton: '#banner .swiper-button-prev',
			// 这样，即使我们滑动之后， 定时器也不会被清除
			autoplayDisableOnInteraction: false,
		});
	});
	
	//提交表单数据
	$('#formSubmit').on('click',function(){
		var name=$('#box1').val();
		var phone=$('#box2').val();
		var company=$('#box3').val();
		var course=$('.courses').val();
		var sexy=$('[name=radio1]:checked').val();
		sexy= sexy||'未选择';
		if(name==""){
       		$('.tip').html("请输入姓名！");
		}else if(phone==""){
			$('.tip').html("请输入手机号！");
		}else if(company==""){
			$('.tip').html("请输入公司名称！");
		}else if(course==0){
			$('.tip').html("请选择课程！");
		}else if(sexy=="未选择"){
			$('.tip').html("请选择性别！");
		}else{
			alert('发送成功')
			$.ajax({
				url: common_url+'/admin/Auth/editAdmin',
				type: "post",
				async: true,
				data: {
					name:name,
					phone:phone,
					company:company,
					course:course,
					sexy:sexy
				},
				dataType:'json',
				success:function(res){
                  if(res.Code==0){
                    layer.msg(res.Msg,{icon:1,time:1000})
                    setTimeout(function(){
                    	window.parent.initialDatas(parent.data.page);
                    	var index = parent.layer.getFrameIndex(window.name);
						parent.layer.close(index);
                    },1000)
                  }else{
                  	layer.msg(res.Msg,{icon:7,time:1000})
                  }
				}
			})
		}
	})
	
	//input去空格,手机只输入数字
	$("#box2").bind("keyup", function () {
		$(this).val($(this).val().replace(/[\D]/g, ""));
	});
	var inputs=document.getElementsByTagName("input");
    for (var i=0;i<inputs.length; i++) { 
        if(inputs[i].getAttribute("type")=="text")
         inputs[i].onkeyup=function(){
            this.value=this.value.replace(/(^\s+)|\s+$/g,"");
         };
    } 
	
	//分享页面
	$("#formShare").click(function(){
		var share_url="www.baidu.com";
		var share_title="";
		var share_from = '';
		window.open("http://connect.qq.com/widget/shareqq/index.html?url=" + share_url + "&title=" + share_title +"&site=" + share_from + "", "newwindow");
	})
	
})

