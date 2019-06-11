$(function () {

	//获取报价按钮
	$(".getPrice").click(function () {
		$('html, body').animate({ scrollTop: $('#form').offset().top }, 1000);
	})

	//楼梯特效
	var offon = true;
	var oTop = $(".topBar").offset().top;
	$(window).scroll(function () { //滚动浏览器就会执行
		//获取滚动高度
		var _top = $(document).scrollTop();
		if (_top > oTop) {
			$(".topBar").addClass("fixTop");
			$("#introduction").addClass("newTop");
		} else {
			$(".topBar").removeClass("fixTop");
			$("#introduction").removeClass("newTop");
		};

		if (offon) {
			$('.main .box').each(function (i) {
				//获取当前下标
				var _index = $(this).index();
				var _height = $(this).offset().top + $(this).outerHeight(true) - 57; //获取上偏移值(自身高度)
				if (_height > _top) { //优先原则
					$('.topBar ul li').eq(_index).addClass('on').siblings().removeClass('on');
					return false; //跳出遍历
				};
			});
		};
	});
	$('.topBar ul li').click(function () {
		offon = false;
		var _index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		var _height = $('.main .box').eq(_index).offset().top; //获取上偏移值
		$('body,html').animate({
			scrollTop: _height
		}, 500, function () {
			offon = true;
		});
	});


	//产品360旋转
	//	var arrayOfImages = [
	//    'imgs/1.png',
	//    'imgs/2.png',
	//    'imgs/3.png',
	//    'imgs/4.png',
	//    'imgs/5.png',
	//	  'imgs/6.png',
	//	  'imgs/7.png'
	//  ]
	//  $("#target").rollerblade({imageArray:arrayOfImages});


	//下载遮罩层  
	$(".close").click(function () {
		hideMask();
	});
	$("#login").click(function () {
		var account = $("#account").val();
		var pwd = $("#pwd").val();
		if (account == '') {
			$("#bg .error").html('请输入账号');
		} else if (pwd == '') {
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
				success: function (res) {
					//console.log(res)
					if (res.status == 0) {
						localStorage.setItem("userLogin", "isLogin");
						hideMask();
					} else {
						$("#bg .error").html('账号或密码有误!');
					}
				}
			})
		}
	})

	//获取id值
	var productId = getUrlParam('id');
	//console.log(productId);

	if (productId) {
		$.ajax({
			url: common_url + '/getProductDetail?id=' + productId,
			type: "get",
			async: true,
			dataType: 'json',
			success: function (res) {
				if (res) {
					//console.log(res.list[0])
					var productDetail = res.list[0];

					//productDetail.firstFocusImage
					$(".name h2").text(productDetail.commonProductName);
					document.title = productDetail.name + '-中力电动叉车|搬运车价格|厂家-搬运绿色 提升未来';
					if (productDetail.anotherName) {
						$(".name p").text(productDetail.name + " " + productDetail.anotherName);
					} else {
						$(".name p").text(productDetail.name);
					}

					$("#form .titleName").val(productDetail.commonProductName);

					var firstFocusImageHtml = "";
					for (var i = 0; i < productDetail.firstFocusImage.length; i++) {
						firstFocusImageHtml += '<div class="swiper-slide"><img src="' + img_url + productDetail.firstFocusImage[i] + '" alt=""></div>';
					}
					$(".view .swiper-wrapper").html(firstFocusImageHtml);
					$(".preview .swiper-wrapper").html(firstFocusImageHtml);
					$(".preview .swiper-wrapper .swiper-slide").eq(0).addClass("active-nav");
					//顶部大小图轮播切换
					var viewSwiper = new Swiper('.view .swiper-container', {
						onSlideChangeStart: function () {
							updateNavPosition()
						}
					})
					$('.view .arrow-left,.preview .arrow-left').on('click', function (e) {
						e.preventDefault()
						if (viewSwiper.activeIndex == 0) {
							viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
							return
						}
						viewSwiper.slidePrev()
					})
					$('.view .arrow-right,.preview .arrow-right').on('click', function (e) {
						e.preventDefault()
						if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
							viewSwiper.slideTo(0, 1000);
							return
						}
						viewSwiper.slideNext()
					})
					var previewSwiper = new Swiper('.preview .swiper-container', {
						//visibilityFullFit: true,
						slidesPerView: 'auto',
						allowTouchMove: false,
						onTap: function () {
							viewSwiper.slideTo(previewSwiper.clickedIndex)
						}
					})
					function updateNavPosition() {
						$('.preview .active-nav').removeClass('active-nav')
						var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav')
						if (!activeNav.hasClass('swiper-slide-visible')) {
							if (activeNav.index() > previewSwiper.activeIndex) {
								var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1
								previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
							} else {
								previewSwiper.slideTo(activeNav.index())
							}
						}
					}

					var saleHtml = ""
					for (var i = 0; i < productDetail.sellingPoint.length; i++) {
						if (productDetail.sellingPoint[i] != "") {
							saleHtml += '<li><span></span>' + productDetail.sellingPoint[i] + '；</li>';
						}
					}
					$(".salePointUl").html(saleHtml);


					var introduceImageHtml = ""
					for (var i = 0; i < productDetail.introduceImage.length; i++) {
						introduceImageHtml += '<img src="' + img_url + productDetail.introduceImage[i] + '"/>';
					}
					$(".productImgs").html(introduceImageHtml);

					var othersImageHtml = ""
					for (var i = 0; i < productDetail.othersImage.length; i++) {
						othersImageHtml += '<img src="' + img_url + productDetail.othersImage[i] + '"/>';
					}
					$(".otherDataImg").html(othersImageHtml);

					if (productDetail.video.length > 0) {
						var videoHtml = ""
						for (var i = 0; i < productDetail.video.length; i++) {
							videoHtml += '<video src="' + img_url + productDetail.video[i] + '" controls="controls">您的浏览器不支持 video 标签。</video>';
						}
						$(".videoBox").html(videoHtml);
					} else {
						$("#video h2").text("暂无视频");
					}

					if (productDetail.file) {
						$("#example .download").html('<a href="javascript:;" oid="' + productDetail.id + '" class="downfile"><i class="iconfont icon--wenjianxiazai"></i>' + productDetail.commonProductName + '</a>');
						$(".downfile").click(function () {
							var oid = $(this).attr("oid");
							if (localStorage.hasOwnProperty('userLogin')) {
								console.log(oid);
								$.ajax({
									url: common_url + '/getUrl',
									type: "get",
									async: true,
									data: {
										id: oid,
										type: 1
									},
									dataType: 'json',
									success: function (res) {
										console.log(res)
										if (res.url) {
											window.location.href = img_url + res.url
										}
									}
								});
							} else {
								showMask();
								return false;
							}
						});
					} else {
						$("#example .download").html('暂无下载文件');
					}


					var tableHtml = "";
					for (var i = 0; i < productDetail.parameterList.length; i++) {
						tableHtml += '<div class="tdTitle"><span class="suo"></span>' + productDetail.parameterList[i].name + '</div><table class="' + productDetail.parameterList[i].id + '">';

						for (var j = 0; j < productDetail.parameterList[i].propertyList.length; j++) {
							tableHtml += '<tr class="' + productDetail.parameterList[i].propertyList[j].id + '"><td width="100px">' + productDetail.parameterList[i].propertyList[j].code + '</td><td width="350px">' + productDetail.parameterList[i].propertyList[j].name + '</td><td width="150px">' + productDetail.parameterList[i].propertyList[j].unit + '</td></tr>';
						}
						tableHtml += "</table>";
					}
					$(".tables").html(tableHtml);
					//标准参数表格显示隐藏
					$(".tdTitle").click(function () {
						var index = $(".tdTitle").index(this);
						var index1 = $(".tdTitle").index(this) + 1;
						if ($(".suo").eq(index).hasClass("fang")) {
							$(".suo").eq(index).css("background", "url(../img/suo.png) no-repeat");
							$(".suo").eq(index).removeClass("fang");
							$("table").eq(index1).show();
						} else {
							$(".suo").eq(index).css("background", "url(../img/fang.png) no-repeat");
							$(".suo").eq(index).addClass("fang");
							$("table").eq(index1).hide();
						}
					})


					var tableList = res.list;
					var w = 600;
					for (var i = 0; i < tableList.length; i++) {
						w += 300;
						$(".tableBox").css("width", w + "px");
						$(".tableHead").append('<td style="width:300px"><a class="addCompare" href="productCompare.html?id=' + tableList[i].id + '">+对比</a></td>');
						for (var j = 0; j < tableList[i].parameterList.length; j++) {
							for (var k = 0; k < tableList[i].parameterList[j].propertyList.length; k++) {
								$("." + tableList[i].parameterList[j].propertyList[k].id).append('<td width="300px">' + tableList[i].parameterList[j].propertyList[k].value + '</td>');
							}
						}
					}
					if (w <= 900) {
						$(".tableBox").css("padding-left", "130px");
					}
				}
			}
		})
	}

	//input去空格
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "text")
			inputs[i].onkeyup = function () {
				this.value = this.value.replace(/(^\s+)|\s+$/g, "");
			};
	}

	//提交表单数据
	$('#formSubmit').on('click', function () {
		var name = $('#form .name').val();
		var phone = $('#form .phone').val();
		var place = $('#form .area').val();
		var email = $('#form .mail').val();
		var title = $('#form .titleName').val();
		var content = $('#form .content').val();
		if (name == "" || name == null) {
			$('.tips').html("请输入姓名！");
		} else if (phone == "") {
			$('.tips').html("请输入手机号！");
		} else if (place == "") {
			$('.tips').html("请输入所在地！");
		} else if (title == "") {
			$('.tips').html("请输入主题！");
		} else if (content == "") {
			$('.tips').html("请输入内容！");
		} else {
			$.ajax({
				url: common_url + '/contactUs',
				type: "post",
				async: true,
				data: {
					name: name,
					phone: phone,
					place: place,
					email: email,
					title: title,
					content: content
				},
				dataType: 'json',
				success: function (res) {
					if (res.status == 1) {
						layer.msg("提交成功", { icon: 1, time: 1000 });
						$('#form .name').val("");
						$('#form .phone').val("");
						$('#form .area').val("");
						$('#form .mail').val("");
						$('#form .titleName').val("");
						$('#form .content').val("");
					} else {
						layer.msg(res.message, { icon: 7, time: 1000 });
						$('#form .name').val("");
						$('#form .phone').val("");
						$('#form .area').val("");
						$('#form .mail').val("");
						$('#form .titleName').val("");
						$('#form .content').val("");
					}
				}
			})
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
	if (localStorage.hasOwnProperty('login')) {
		return true;
	} else {
		showMask();
		return false;
	}
}
