// $("#rotateCen-zhong1").load("小金刚一代.html")
// $("#rotateCen-zhong2").load("小金刚二代.html")
var keyshotVR;
$(function() {
    //轮播
    var classArr = ["lunboCenBox1","lunboCenBox2","lunboCenBox3","lunboCenBox4"];
    var index = 0;

    //开启定时器
    setInterval(function () {
        var tempArr = classArr.pop();
        classArr.unshift(tempArr);
        $(".lunboCen li").each(function(liIndex){
            $(this).removeClass().addClass(classArr[liIndex])
        });
        index ++;
        if(index > 3){
            index = 0;
        }
        $(".anniu li").removeClass().eq(index).addClass("active");
    },2000)

    $(".anniu li").click(function(){
        var liIndex = $(this).index();
        // 由于我们需要对比当前index与期望的index的差距
        // 那么我们需要将其相减
        var chaIndex = liIndex - index;
        if(chaIndex == 0){
            // 如果点击的是当前激活的index 那么不执行
            return ;
        }else if(chaIndex > 0){
            var tempArr = classArr.splice(-chaIndex,chaIndex);
            classArr = tempArr.concat(classArr);
            $(".lunboCen li").each(function(liIndex){
                $(this).removeClass().addClass(classArr[liIndex])
            });
            index = liIndex;
            $(".anniu li").removeClass().eq(index).addClass("active");

        }else{
            var tempArr = classArr.splice(0,-chaIndex);
            classArr = classArr.concat(tempArr);
            $(".lunboCen li").each(function(liIndex){
                $(this).removeClass().addClass(classArr[liIndex])
            });
            index = liIndex;

            $(".anniu li").removeClass().eq(index).addClass("active");
        }
    });

    var nameOfDiv = "KeyShotVR";
    var folderName = "chanpinyi";
    var viewPortWidth = 1712;
    var viewPortHeight = 1119;
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
    var allowFullscreen = false; // Double-click in desktop browsers for fullscreen.
    var uReverse = false;
    var vReverse = false;
    var hotspots = {};

    keyshotVR = new keyshotVR(nameOfDiv,folderName,viewPortWidth,viewPortHeight,backgroundColor,uCount,vCount,uWrap,vWrap,uMouseSensitivity,vMouseSensitivity,uStartIndex,vStartIndex,minZoom,maxZoom,rotationDamping,downScaleToBrowser,addDownScaleGUIButton,downloadOnInteraction,imageExtension,showLoading,loadingIcon,allowFullscreen,uReverse,vReverse,hotspots);



})
