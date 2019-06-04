$(function() {
	//顶部栏效果
	var oTop = $("#nav").offset().top;
	$(window).scroll(function() { //滚动浏览器就会执行
		if($(document).scrollTop() >= oTop) {
			$("#nav").addClass("fixnav");
			$("#banner").addClass("new");
			$("#nav .logo").addClass("logoNew");

		} else {
			$("#nav").removeClass("fixnav");
			$("#banner").removeClass("new");
			$("#nav .logo").removeClass("logoNew");
		}
	})

	//获取分类id
	var groupid = getUrlParam('groupid');
	//initialData(1);
	
	//如果groupid存在请求数据
	if(groupid){
		$.ajax({
			url: common_url+'/getClassProductList?cid='+groupid,
			type: "get",
			async: true,
			dataType:'json',
			success:function(res){
		        if(res){
		        	document.title = res.className+'-中力电动叉车|搬运车价格|厂家-搬运绿色 提升未来';
		        	$(".content h2").text(res.className);  	        	  	        	  
	   				var html = "";	
					for(var i = 0; i < res.list.length; i++) {
						html +='<li>'
							+'<a href="productDetail.html?id='+res.list[i].id+'"><img src="'+img_url+res.list[i].defaultImage+'"/></a>'
							+'<div class="productName">'
							+'<p><a href="productDetail.html?id='+res.list[i].id+'">'+res.list[i].commonProductName+' '+res.list[i].name+'</a></p>'
							+'</div></li>';	
					}		
					$(".content .ul1").html(html);
										
		        }
			}
		})
	}

})