$(function() {	
	var offon = true;
	var oTop = $(".topBar").offset().top;
	$(window).scroll(function() { //滚动浏览器就会执行
		//获取滚动高度
			var _top = $(document).scrollTop();			
			if(_top > oTop) {
				$(".topBar").addClass("fixTop");
				$("#introduction").addClass("newTop");
			}else{
				$(".topBar").removeClass("fixTop");
				$("#introduction").removeClass("newTop");
			};
 
		if(offon) {			
			$('.main .box').each(function(i) {
				//获取当前下标
				var _index = $(this).index();
				var _height = $(this).offset().top + 500; //获取上偏移值
				if(_height > _top) { //优先原则
					$('.topBar ul li').eq(_index).addClass('on').siblings().removeClass('on');
					return false; //跳出遍历
				};
			});
		};
	});
	$('.topBar ul li').click(function() {
		offon = false;
		var _index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		var _height = $('.main .box').eq(_index).offset().top-55; //获取上偏移值
		$('body,html').animate({
			scrollTop: _height
		}, 500, function() {
			offon = true;
		});
	});

	//公司简介ul>li变红特效
	$('.histroy li').mouseover(function(){
		$(this).children('img').addClass('changeShow').parent().siblings().children('img').removeClass('changeShow');
	})
	
	
	//大小图轮播切换
	var viewSwiper = new Swiper('.view .swiper-container', {
		onSlideChangeStart: function() {
			updateNavPosition()
		}
	})

	$('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
		e.preventDefault()
		if (viewSwiper.activeIndex == 0) {
			viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
			return
		}
		viewSwiper.slidePrev()
	})
	$('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
		e.preventDefault()
		if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
			viewSwiper.slideTo(0, 1000);
			return
		}
		viewSwiper.slideNext()
	})

	var previewSwiper = new Swiper('.preview .swiper-container', {
		//visibilityFullFit: true,
		slidesPerView: 'auto',
		allowTouchMove: false,
		onTap: function() {
			    viewSwiper.slideTo(previewSwiper.clickedIndex)
		}
	})

	function updateNavPosition() {
		$('.preview .active-nav').removeClass('active-nav')
		var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index() > previewSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
				previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
			} else {
				previewSwiper.slideTo(activeNav.index())
			}
		}
	}
	
	//中力团队左右切换轮播
	certifySwiper = new Swiper('#certify .swiper-container', {
		watchSlidesProgress: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,
		loopedSlides: 5,
		autoplay: 2500,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		pagination: '.swiper-pagination',
		//paginationClickable :true,
		onProgress: function(swiper, progress) {
			for (i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides.eq(i);
				var slideProgress = swiper.slides[i].progress;
				modify = 1;
				if (Math.abs(slideProgress) > 1) {
					modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
				}
				translate = slideProgress * modify * 260 + 'px';
				scale = 1 - Math.abs(slideProgress) / 5;
				zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
				slide.transform('translateX(' + translate + ') scale(' + scale + ')');
				slide.css('zIndex', zIndex);
				slide.css('opacity', 1);
				if (Math.abs(slideProgress) > 3) {
					slide.css('opacity', 0);
				}
			}
		},
		onSetTransition: function(swiper, transition) {
			for (var i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides.eq(i)
				slide.transition(transition);
			}
	
		},
		//处理分页器bug(没有分页器需注释)
//		onSlideChangeStart: function(swiper) {
//			if (swiper.activeIndex == 4) {
//				swiper.bullets.eq(6).addClass('swiper-pagination-bullet-active');
//				console.log(swiper.bullets.length);
//			}
//		}
	});
	
	//企业社会价值展开特效
	$(".valueItem").mouseenter(function() {	
		var $index = $(".valueItem").index(this);
		if($index>1){
			$(this).find("span").stop().animate({height:"160px"});
			$(this).find("span").removeClass("short");
		}
	});
	$(".valueItem").mouseleave(function() {
		var $index = $(".valueItem").index(this);
		if($index>1){
			 $(this).find("span").stop().animate({height:"63px"});
			$(this).find("span").addClass("short");			
		}
	});
	
	
	//公司历史特效
	$(".histroyFont p").mouseover(function() {			
		$(this).children().eq(0).addClass("histroyFont1");
		$(this).children().eq(1).addClass("histroyFont2");	
		$(this).siblings().children().removeClass("histroyFont1");
		$(this).siblings().children().removeClass("histroyFont2");	
		var $index = $(".histroyFont p").index(this);
		var $content = $(".historyImg").children();
		$content.eq($index).show().siblings().hide();
	});
	
	
})