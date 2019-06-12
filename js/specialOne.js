
$(function () {
    //轮播
    var classArr = ["lunboCenBox1", "lunboCenBox2", "lunboCenBox3", "lunboCenBox4", "lunboCenBox5"];
    var index = 0;

    //开启定时器
    setInterval(function () {
        var tempArr = classArr.pop();
        classArr.unshift(tempArr);
        $(".lunboCen li").each(function (liIndex) {
            $(this).removeClass().addClass(classArr[liIndex])
        });
        index++;
        if (index > 4) {
            index = 0;
        }
        $(".anniu li").removeClass().eq(index).addClass("active");
    }, 3000)

    $(".anniu li").click(function () {
        var liIndex = $(this).index();
        // 由于我们需要对比当前index与期望的index的差距
        // 那么我们需要将其相减
        var chaIndex = liIndex - index;
        if (chaIndex == 0) {
            // 如果点击的是当前激活的index 那么不执行
            return;
        } else if (chaIndex > 0) {
            var tempArr = classArr.splice(-chaIndex, chaIndex);
            classArr = tempArr.concat(classArr);
            $(".lunboCen li").each(function (liIndex) {
                $(this).removeClass().addClass(classArr[liIndex])
            });
            index = liIndex;
            $(".anniu li").removeClass().eq(index).addClass("active");
        } else {
            var tempArr = classArr.splice(0, -chaIndex);
            classArr = classArr.concat(tempArr);
            $(".lunboCen li").each(function (liIndex) {
                $(this).removeClass().addClass(classArr[liIndex])
            });
            index = liIndex;
            $(".anniu li").removeClass().eq(index).addClass("active");
        }
    });

    //input去空格 
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "text")
			inputs[i].oninput = function () {
				this.value = this.value.replace(/(^\s+)|\s+$/g, "");
			};
	}
    $("#form .title").val("小金刚专题");
    //提交表单数据
    $('#formSubmit').on('click', function () {
        var name = $('.name').val();
        var phone = $('.phone').val();
        var place = $('.place').val();
        var email = $('.email').val();
        var title = $('.title').val();
        var content = $('.content').val();
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
                        $('.name').val("");
                        $('.phone').val("");
                        $('.place').val("");
                        $('.email').val("");
                        $('.title').val("");
                        $('.content').val("");
                    } else {
                        layer.msg(res.message, { icon: 7, time: 1000 });
                        $('.name').val("");
                        $('.phone').val("");
                        $('.place').val("");
                        $('.email').val("");
                        $('.title').val("");
                        $('.content').val("");
                    }
                }
            })
        }
    })
    
})

var keyshotVR;
    function initKeyShotVR() {
        var nameOfDiv = "KeyShotVR";
        var folderName = "chanpinyi";
        var viewPortWidth = 1712;
        var viewPortHeight = 1027;
        var backgroundColor = "#FFFFFF";
        var uCount = 30;
        var vCount = 1;
        var uWrap = true;
        var vWrap = false;
        var uMouseSensitivity = -0.0833333;
        var vMouseSensitivity = 0.0111111;
        var uStartIndex = 15;
        var vStartIndex = 0;
        var minZoom = 1;
        var maxZoom = 1;
        var rotationDamping = 0.94;
        var downScaleToBrowser = true;
        var addDownScaleGUIButton = false;
        var downloadOnInteraction = false;
        var imageExtension = "jpg";
        var showLoading = false;
        var loadingIcon = "ks_logo.png"; // Set to empty string for default icon.
        var allowFullscreen = true; // Double-click in desktop browsers for fullscreen.
        var uReverse = false;
        var vReverse = false;
        var hotspots = {};

        keyshotVR = new keyshotVR(nameOfDiv, folderName, viewPortWidth, viewPortHeight, backgroundColor, uCount, vCount, uWrap, vWrap, uMouseSensitivity, vMouseSensitivity, uStartIndex, vStartIndex, minZoom, maxZoom, rotationDamping, downScaleToBrowser, addDownScaleGUIButton, downloadOnInteraction, imageExtension, showLoading, loadingIcon, allowFullscreen, uReverse, vReverse, hotspots);
    }

    window.onload = initKeyShotVR;