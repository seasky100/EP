var common_url ="http://api.ep-zl.com"    //"http://10.10.10.196:9118" ;   //接口
var img_url ="http://wwwht.ep-zl.com" //"http://10.10.10.196:9119";   //图片和文件   

//判断是手机重定向
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	var url = document.location.toString();
	var arrUrl = url.split("//");
	var start = arrUrl[1].indexOf("/");
	var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
	//console.log(relUrl)
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		//跳转移动端页面
		window.location.href = "http://m.ep-zl.com" + relUrl;
	}
}
browserRedirect();

$(function () {
	//右侧工具栏	
	//当滚动条的位置处于距顶部100像素以下时，返回顶部箭头出现，否则消失
	$(window).scroll(function () {
		if ($(window).scrollTop() > 100) {
			$("#back-to-top").fadeIn(400);
		} else {
			$("#back-to-top").fadeOut(400);
		}
	});
	//当点击跳转链接后，回到页面顶部位置
	$("#back-to-top").click(function () {
		$('body,html').animate({ scrollTop: 0 }, 1000);
		return false;
	});

	//导航栏和底部导航栏
	$.ajax({
		url: common_url + '/getNavList',
		type: "get",
		async: true,
		dataType: 'json',
		success: function (res) {
			if (res.navList) {
				var topList = res.navList;
				var html = '<li><a href="download.html">下载中心<i style="background: url(img/icon1.png) no-repeat center right;"></i><i style="background: url(img/icon11.png) no-repeat center right;display: none;"></i><span class="right">&gt;</span></a></li>';
				var html2 = "";
				var productToolHtml = "";
				for (var i = 0; i < topList.length; i++) {
					html += '<li><a href="productGroup.html?groupid=' + topList[i].id + '">' + topList[i].name + '<i style="background:url(' + img_url + topList[i].iconImageBefore + ') no-repeat top right;"></i><i style="background:url(' + img_url + topList[i].iconImageAfter + ') no-repeat top right;display: none;"></i><span class="right">&gt;</span></a></li>';
					html2 += '<li><a href="productGroup.html?groupid=' + topList[i].id + '">' + topList[i].name + '</a></li>';
					productToolHtml += '<li><input type="checkbox" name="c" value="' + topList[i].id + '">' + topList[i].name + '</li>';
				}
				$(".menuDiv .productUl").html(html);
				$(".bottomUl").html(html2);
				$("#productTool .navContent").eq(2).html(productToolHtml);

				//顶部导航栏效果				
				$(".productUl li").on('mouseenter', function () {
					$(this).find('i').eq(0).hide();
					$(this).find('i').eq(1).show();
				});
				$(".productUl li").on('mouseleave', function () {
					$(this).find('i').eq(0).show();
					$(this).find('i').eq(1).hide();
				});
			}
		}
	})
})

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}
