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
	
})