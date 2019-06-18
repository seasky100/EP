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
	

	//下载遮罩层  
	$(".close").click(function() {
		hideMask();
	});
	$("#login").click(function() {
		var account = $("#account").val();
		var pwd = $("#pwd").val(); 
 
		if(account == '') {
			$("#bg .error").html('请输入账号');
		} else if(pwd == '') {
			$("#bg .error").html('请输入密码');
		} else {
			//验证账号密码，如正确，存入浏览器缓存
			$.ajax({
				url: common_url + '/login',
				type: "post",
				async: true,
				data: {
					account: account,
					password: pwd
				},
				dataType: 'json',
				success: function(res) {
					//console.log(res)
					if(res.status == 0) {
						localStorage.setItem("userLogin", "isLogin");
						hideMask();
					} else {
						$("#bg .error").html('账号或密码有误!');
					}
				}
			})
		}
	})
	
	//初始化下载列表
 	initData();
	
	
})

//遮罩层 ，兼容火狐、IE8
function showMask() {
	$("#bg").show();
	$('body').css("overflow", "hidden");
}
//关闭遮罩层  
function hideMask() {
	$("#bg").hide();
	$('body').css("overflow", "");
}
//判断是否登陆来决定a标签下载
function isLogin() {
	if(localStorage.hasOwnProperty('userLogin')) {
		return true;
	} else {
		showMask(); 
		return false;
	}
}

//请求初始化数据
function initData() {
	$.ajax({
		url: common_url + '/getTopDownloadList',
		type: "get",
		async: true,
		dataType: 'json',
		success: function(res) {
		    if(res.topDownloadList){
		    	var html1 = "";
		    	var topList =res.topDownloadList;
				for(var i = 0; i < topList.length; i++) {
					html1 += '<li><a href="javascript:;" oid="'+topList[i].id+'" class="downfile"><i class="iconfont icon--wenjianxiazai"></i>'+topList[i].name+'</a></li>';	
				}
				$(".topList").html(html1);	

				$(".downfile").click(function() { 
					var oid=$(this).attr("oid");
					if(localStorage.hasOwnProperty('userLogin')) {
						console.log(oid);
						$.ajax({
							url: common_url + '/getUrl',
							type: "get",
							async: true,
							data: {
								id:oid, 
								type:2
							},
							dataType: 'json',
							success: function(res) {
								if(res.url) {
									window.location.href=img_url+res.url
								}
							}
						});
					} else {
						showMask();
						return false;
					}
				});


		    }
		}
	});
	

	$.ajax({
		url: common_url + '/getInsideDownloadList',
		type: "get",
		async: true,
		dataType: 'json',
		success: function(res) {
			if(res.groupList) {
				var insideList=res.groupList;
				var html = "";
				var i = 0;
				var row = Math.ceil(insideList.length / 3);//一行三列布局
				for(var r = 0; r < row; r++) {
					html += "<ul class='clearfix ul1'>";
					// 每行添加 3 个单元格
					for(var c = 0; c < 3; c++, i++) {
						if(i < insideList.length) {
							html += '<li><img src="'+img_url+insideList[i].defaultImageAfter + '" /><span>' + insideList[i].name + '</span><ul>';
							for(var b = 0; b < insideList[i].productList.length; b++) {
								html += '<li><a href="javascript:;" oid="'+insideList[i].productList[b].id+'" class="downfile">' +insideList[i].productList[b].commonProductName+ '</a></li>';
							}
							html += '</ul></li>';
				 			//console.log(i);i表示有几个li
						}
					}
					html += "</ul>";
				}
				$(".contentList").html(html);
				$(".downfile").click(function() { 
					var oid=$(this).attr("oid");
					if(localStorage.hasOwnProperty('userLogin')) {
						console.log(oid);
						$.ajax({
							url: common_url + '/getUrl',
							type: "get",
							async: true,
							data: {
								id:oid, 
								type:1
							},
							dataType: 'json',
							success: function(res) { 
								if(res.url) {
									window.location.href=img_url+res.url
								}
							}
						});
					} else {
						showMask();
						return false;
					}
				});				
			}
		}
	});
}





