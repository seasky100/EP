$(function() {
	//第一个轮播图
	var mySwiper = new Swiper('#banner', {
    autoplay: 3000,//可选选项，自动滑动
    pagination : '.swiper-pagination',
  });

  // 第二个轮播图
  var tabsSwiper1 = new Swiper("#tabs", {
    // speed: 500,
    onSlideChangeStart: function(swiper) {
      $(".tabs .active").removeClass("active");
      $(".tabs .tabsImgP")
        .eq(swiper.activeIndex)
        .addClass("active");
    }
  });
  $(".tabs .tabsImgP").on("touchstart click", function(e) {
    e.preventDefault();
    $(".tabs .active").removeClass("active");
    $(this).addClass("active");
    tabsSwiper1.slideTo($(this).index());
  });



    // 锂电中力造轮播
    var tabsSwiper2 = new Swiper("#tabsLunbo", {
      onSlideChangeStart: function(swiper) {
        $(".lunbotabs .active").removeClass("active");
        $(".lunbotabs .tabsImgP1")
          .eq(swiper.activeIndex)
          .addClass("active");
      }
    });
    $(".lunbotabs .tabsImgP1").on("touchstart click", function(e) {
      e.preventDefault();
      $(".lunbotabs .active").removeClass("active");
      $(this).addClass("active");
      tabsSwiper2.slideTo($(this).index());
    });
  
    var leftRight = new Swiper(".child", {
      // autoplay: 5000, //可选选项，自动滑动,
      prevButton:'.swiper-button-prev',
      nextButton:'.swiper-button-next',
    });



   // 锂电优势轮播
   var tabsSwiper3 = new Swiper("#btmtabs", {
    // speed: 500,
    onSlideChangeStart: function(swiper) {
      $(".tabsTwo .active").removeClass("active");
      $(".tabsTwo .tabsImgPTwo")
        .eq(swiper.activeIndex)
        .addClass("active");
    }
  });
  $(".tabsTwo .tabsImgPTwo").on("touchstart click", function(e) {
    e.preventDefault();
    $(".tabsTwo .active").removeClass("active");
    $(this).addClass("active");
    tabsSwiper3.slideTo($(this).index());
  });




})
