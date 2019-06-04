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
 
	if(getUrlParam('getData')==1){
		var selectionData =JSON.parse(localStorage.getItem("searchData"));
		initialData(1,selectionData);
	}
 
})



// 初始数据加载
function initialData(page,selectionData) {
	$.ajax({
		url: common_url + '/getSelectedResult',
		type: "get",
		async: true,
		data: {
			pageIndex: page,
			pageSize: 12,
			selection: selectionData
		},
		dataType: 'json',
		success: function(res) {
			if(res) {
				//console.log(res)
				list(res.pageList)
				pagetion(res.totlePages,page,selectionData)
			} else {
				layer.msg(res.Msg, {
					icon: 7,
					time: 1000
				});
			}
		}
	})
}
//翻页数据加载 
function initialDatas(page,selectionData) {
	$.ajax({
		url: common_url + '/getSelectedResult',
		type: "get",
		async: true,
		data: {
			pageIndex: page,
			pageSize: 12,
			selection: selectionData
		},
		dataType: 'json',
		success: function(res) {
			if(res) {
				//console.log(res)
				list(res.pageList)
			} else {
				layer.msg(res.Msg, {
					icon: 7,
					time: 1000
				});
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
	$('.ul1').html(str);
}

//分页
function pagetion(page, num,selectionData) {
	$(".zxf_pagediv").createPage({
		pageNum: page, //总页码
		current: num, //当前页
		shownum: 10, //每页显示个数
		activepage: "current", //当前页选中样式
		activepaf: "nextpage", //下一页选中样式
		backfun: function(e) {			
			if(e.current>page){
				initialData(page,selectionData)
			}else if(e.current<1){
				initialData(1,selectionData)
			}else{
				initialDatas(e.current,selectionData)
			}	
		}
	});
}