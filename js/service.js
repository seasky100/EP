$(function() {
	//banner
	$.get(common_url + "/getBannerList", {
		type:2
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
	
	
})