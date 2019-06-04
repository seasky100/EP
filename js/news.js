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
	
 	//初始化时获取年分
	$.get(common_url + "/getYear", function (data) {
		var years = data.years;
		for (var i = 0; i < years.length; i++) {
			$("#year").append("<option value=" + years[i] + ">" + years[i] + "</option>");
		}
	});
	
	// 查看全部
	$('.getAll:eq(0)').click(function () {
		// 将原有的内容清空
		$('.newsList:eq(0)').html("");
		status = "";
		getNewsList(status, 1);
	});

	// 获取某个年分的文章列表
	$("#year").change(function() {
		status = $(this).children('option:selected').val();
		$('.newsList:eq(0)').html("");
		getNewsList(status, 1);
	});

	// init
	var status = "";
	getNewsList(status, 1);
		//获取文章列表
		function getNewsList(status, page) {
			$.get(common_url + "/getNewsList", {
				year: status,
				currentPage: page
			}, function (data) {		
				//console.log(data)
				if (data.newsList.length>0) {
					var newsList = data.newsList;
					//分页
					pagetion(data.totlePages, page);
	 
					var newsHtml="";
					for (var i = 0; i < newsList.length; i++) {
					newsHtml+='<div class="news">';	
							if(newsList[i].img){
								newsHtml+='<div class="newsImg"><a href="newsDetail.html?id='+newsList[i].id+'"><img src="'+img_url+newsList[i].img+'"/></a></div>';
							}else{
								newsHtml+='<div class="newsImg"><a href="newsDetail.html?id='+newsList[i].id+'"><img src="img/newsDetail.jpg"/></a></div>';
							}										
							newsHtml+='<div class="newsFont">'
								+'<a href="newsDetail.html?id='+newsList[i].id+'"><h2>'+newsList[i].title+'</h2></a>'
								+'<h3>'+newsList[i].time.split("T")[0]+'</h3>'
								+'<p>'+newsList[i].brief+'</p>'							
								+'<a href="newsDetail.html?id='+newsList[i].id+'" class="more"><img src="img/more.png"/></a>'
							+'</div>'						
						+'</div>';
					}
					$(".newsList").html(newsHtml);
				}			
			});
		}
		
 
		//分页
		function pagetion(pages, num) {
			$(".zxf_pagediv").createPage({
				pageNum: pages, //总页码
				current: num, //当前页
				shownum: 10, //每页显示个数
				activepage: "current", //当前页选中样式
				activepaf: "nextpage", //下一页选中样式
				backfun: function(e) {
					if(e.current>pages){
						getNewsList(status, pages);
					}else if(e.current<1){
						getNewsList(status, 1);
					}else{
						getNewsList(status, e.current);
					}		
				}
			});
		}
	
})