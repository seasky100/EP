$(function(){	
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
		type:1
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
	
	//首页产品系列列表
	$.ajax({
		url: common_url+'/getNavList',
		type: "get",
		async: true,
		dataType:'json',
		success:function(res){
	        if(res){
	        	var topList =res.navList;
				var myHtml="";
				for(var i = 0; i < topList.length; i++) {
					if(i==7) { 
				        break; //最多渲染7个
				    } 
					myHtml += '<li><a href="productGroup.html?groupid='+topList[i].id+'"><div class="img" style="background: url('+img_url+topList[i].defaultImageBefore+') no-repeat center center;"><img src="'+img_url+topList[i].defaultImageAfter+'" alt="产品系列图片" /></div><p><a href="productGroup.html?groupid='+topList[i].id+'">'+topList[i].name+'</a></p></a></li>';
				}
				$(".centerUl").html(myHtml);			
	        }
		}
	})

	//公司简介ul>li变红特效
	$('.histroy li').mouseover(function(){
		$(this).children('img').addClass('changeShow').parent().siblings().children('img').removeClass('changeShow');
	})
 
	//新闻列表
	$.get(common_url + "/getNewsList", {
		year: "",
		currentPage: 1
	}, function (data) { 
		var newsList = data.newsList;
		var html1="";
		var html2=""; 
		
		if(newsList[0].bigImg){
			html1+='<img src="'+img_url+newsList[0].bigImg+'"/><span>'+newsList[0].title+'</span>';
		}else{
			html1+='<img src="img/newsDetail.jpg"/><span>'+newsList[0].title+'</span>';
		}
 		$(".newsList_l").html(html1);
		
		for (var i = 0; i < 3; i++) {
			if (newsList[i].bigImg) {
				html2+='<li data="'+img_url+newsList[i].bigImg+'" id="'+newsList[i].id+'"><a href="newsDetail.html?id='+newsList[i].id+'"><h3>'+newsList[i].title+'</h3></a><a href="newsDetail.html?id='+newsList[i].id+'"><div>'+newsList[i].brief+'</div></a><p>'+newsList[i].time.split("T")[0]+'</p></li>';
			}else{
				html2+='<li data="img/newsDetail.jpg" id="'+newsList[i].id+'"><a href="newsDetail.html?id='+newsList[i].id+'"><h3>'+newsList[i].title+'</h3></a><a href="newsDetail.html?id='+newsList[i].id+'"><div>'+newsList[i].brief+'</div></a><p>'+newsList[i].time.split("T")[0]+'</p></li>';
			}		
		}
		$(".newsUl").html(html2);
		$(".newsUl li").eq(0).addClass("newActive");

		//新闻鼠标移入事件
		$("#scrollDiv ul li").mouseenter(function(){
			$(this).addClass("newActive").siblings().removeClass("newActive"); 
			var imgSrc=$(this).attr("data");
			var title=$(this).children().find('h3').text();
			$(".newsList_l").find("img").attr('src',imgSrc);
			$(".newsList_l").find("span").text(title);
		})			
	});
 	 
})

 