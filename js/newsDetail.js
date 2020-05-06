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

	// 获取id
	var id = window.location.search.split("=")[1];
	$.get(common_url + '/getNewsDetail', {
		id: id
	}, function (data){
		var detail = data.newsDetail;

		document.title = detail.title+'-中力电动叉车|搬运车价格|厂家-搬运绿色 提升未来';
		// 标题
		$('.top .nTitle').text(detail.title);
		// 时间
		$('.top .nTime').text(detail.time.split('T')[0]);
		// 内容(富文本解析)
		$('.detail').html(unescape(detail.content));
		// 上下篇
		if(detail.pre) {
			$('.prev a:eq(0)').attr({href: 'newsDetail.html?id=' + detail.pre.id});
			$('.prev span:eq(0)').text(detail.pre.title);
		} else {
			$('.prev:eq(0)').hide();
		}
		if(detail.next) {
			$('.next a:eq(0)').attr({href: 'newsDetail.html?id=' + detail.next.id});
			$('.next span:eq(0)').text(detail.next.title);
		} else {
			$('.next:eq(0)').hide();
		}
	});
	
})