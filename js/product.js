$(function() {
	//浏览器内核
//	var ua = window.navigator.userAgent.toLowerCase();
//	console.log(ua);
	
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
	
	
	//产品列表
	$.ajax({
		url: common_url+'/getGroupProductList',
		type: "get",
		async: true,
		dataType:'json',
		success:function(res){
	        if(res.groupList){
	        	var groupList =res.groupList;
   				var html = "";
   				//console.log(groupList)
				for(var i = 0; i < groupList.length; i++) {
					html += '<li><a href="productGroup.html?groupid='+groupList[i].id+'"><img src="'+img_url+groupList[i].defaultImageAfter+'"/><span>'+groupList[i].name+'</span></a><ul>';
						for(var j = 0; j < groupList[i].productList.length; j++) {
							if(j==5) { 
						        break; //最多渲染5个
						    } 
							html+='<li><a target="_blank" href="productDetail.html?id='+groupList[i].productList[j].id+'">'+groupList[i].productList[j].commonProductName+'</a>';
							if(groupList[i].productList[j].anotherName){
								html+='<div class="tip"><em></em>'+groupList[i].productList[j].anotherName+'</div>';
							}
							html+='<br/><b>'+groupList[i].productList[j].name+'</b></li>';								
						}
						if(groupList[i].productList.length>5){
							html+='<strong><a href="productGroup.html?groupid='+groupList[i].id+'">更多车型&gt;&gt;</a></strong>';
						}
					html+='</ul></li>';
				}		
				$(".content .ul1").html(html); 			
	        }
		}
	})
	
	
	

})


