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
 
  

	$(".searchButton").click(function(){
		initialData(1);
		$(".pagetion").show();
	})
 
})



// 初始数据加载
function initialData(page) {
	$.ajax({
		url: common_url+'/searchProduct',
		type: "get",
		async: true,
		data: {
			pageIndex: page,
			pageSize: 12,
			key:$("#searchText").val()
		},
		dataType: 'json',
		success: function(res) {
			if(res.totleCount>0) {
				list(res.pageList)
				pagetion(res.totlePages,page)
			}else{				
 				$('.ul1').html("<p style='margin:10px'>未搜索到相关结果</p>");
 				$(".pagetion").hide();
			}
		}
	})
}
//翻页数据加载 
function initialDatas(page) {
	$.ajax({
		url: common_url + '/searchProduct',
		type: "get",
		async: true,
		data: {
			pageIndex: page,
			pageSize: 12,
			key:$("#searchText").val()
		},
		dataType: 'json',
		success: function(res) {
			if(res.totleCount>0) {
				list(res.pageList)
			}else{				
 				$('.ul1').html("<p style='margin:10px'>未搜索到相关结果</p>");
 				$(".pagetion").hide();
			}
		}
	})
}
//列表加载
function list(data) {
	var str = "";
	for(var i = 0; i < data.length; i++) {
		str +='<li>'
					+'<a href="productDetail.html?id='+data[i].id+'"><img src="'+img_url+data[i].defaultImage+'"/></a>'
					+'<div class="productName">'
						+'<p><a href="productDetail.html?id='+data[i].id+'">'+data[i].modelName+' '+data[i].name+'</a></p>'
					+'</div>'					
				+'</li>';
	}
	$('.ul1').html(str)
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
				initialData(pages);
			}else if(e.current<1){
				initialData(1);
			}else{
				initialDatas(e.current);
			}
		}
	});
}