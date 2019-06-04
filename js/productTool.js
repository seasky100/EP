//初始数据
	var arr1=[];
	var arr2=[];
	var arr3=[];
	var h=[];  
	var w=[];  
	var initW=" ";//初始起升重量值
	var initH=" ";//初始作业高度值
	//筛选后数据
	var nowArr1=[];
	var nowArr2=[];
	var nowArr3=[];	
	var nowW="";//当前起升重量值
	var nowH="";//当前作业高度值
	
	var productToolHtml="";

$(function(){

	//产品工具栏搜索框显示隐藏
	$(".button1").click(function() {
		$(".productToolBox1").show(500).animate({"left":50},500);
		$(".productToolBox2").hide(500).animate({"left":50},500);
	});
	
	$(".button2").click(function() {
		$(".productToolBox2").show(500).animate({"left":50},500);
		$(".productToolBox1").hide(500).animate({"left":50},500);
	});
	
	$(".quit").click(function() {
		$(".productToolBox").animate({"left":-380},500).hide(500);
	});
	
   
    //---------------------------------产品选型框---------------------------------- 
    //多选框收缩
	$(".subNav").click(function() {
		$(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt");
		$(this).next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
	})
 	

	//渲染分类选择列表
	$.ajax({
		url: common_url+'/getNavList',
		type: "get",
		async: false,
		dataType:'json',
		success:function(res){
	        if(res.navList){
	        	var topList =res.navList;   				
				for(var i = 0; i < topList.length; i++) {
					productToolHtml +='<li><input type="checkbox" name="c" value="'+topList[i].id+'">'+topList[i].name+'</li>';		
				}
				$("#productTool .navContent").eq(2).html(productToolHtml);	
				
				//第一次获取3列数组
				$("input:checkbox[name='a']").each(function(i) {
					var val = Number($(this).attr("value"));
					arr1.push(val);
				});
			 	$("input:checkbox[name='b']").each(function(i) {
					var val = Number($(this).attr("value"));
					arr2.push(val);
				});
				$("input:checkbox[name='c']").each(function(i) {
					var val = Number($(this).attr("value"));
					arr3.push(val);
				});														
	        }
		}
	})
	
	//请求数据后的操作 	
	//页面初始化的时候获取3组checkbox的自定义value值				 		 		 			
  	selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"初始化");		
		
	//3列数组发生勾选				
	$(".navContent1").on("change","input:checkbox[name='a']",function() { 		
		queryCheckedValue();
		ALLCheckedValue(nowArr1,nowArr2,nowArr3);
		selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"勾选1");		
	});
	$(".navContent2").on("change","input:checkbox[name='b']",function() { 	
		queryCheckedValue2();
		ALLCheckedValue(nowArr1,nowArr2,nowArr3);
		selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"勾选2");	
	});
 	$(".navContent3").on("change","input:checkbox[name='c']",function() { 		
		queryCheckedValue3();
		ALLCheckedValue(nowArr1,nowArr2,nowArr3);
		selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"勾选3");	
	});
		
	
	
	//进度条	
	var selector = '[data-rangeslider]';
	var $inputRange = $(selector);
	// Initialize the elements style
	$inputRange.rangeslider({
		polyfill: false
	});
	// Update value output
	$(document).on('input', selector, function(e) {
		//valueOutput(e.target);
		var value = e.target.value;
		var inputStep= e.target.step;
		var index= value/inputStep;		
//		var output = e.target.parentNode.getElementsByTagName('output')[0];
		
		if(e.target.getAttribute("a")==1){	
			//console.log("进度1output的值："+w[index]);
			//console.log("进度1进度条本身的值："+value);
			$(".weight output").html(w[index]);
			if(w.length>1){
				nowW=w[index];//当前作业重量				
			}else{
				nowW=w[0];
			}

		}else if(e.target.getAttribute("a")==2){		
			//console.log("进度2output的值："+h[index]);
			//console.log("进度2进度条本身的值："+value);
			$(".height output").html(h[index]);
			if(h.length>1){
				nowH=h[index];//当前起升高度
			}else{
				nowH=h[0];
			}		
		} 
	});
 
 
		//监听进度条变化（滑动停止发送请求）		
		$(".weightBox input[type=range]").on("change",function (e){
			if(nowW==0){
				$(".weight output").html("_");
			}else{
				$(".weight output").html(nowW);
			}
			//console.log("初始W值:"+initW);
			//console.log("当前W值:"+nowW);
			if(nowW!=initW){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条1");	
			}  			
        });
		$(".heightBox input[type=range]").change (function (e){	
			if(nowH==0){
				$(".height output").html("_");
			}else{
				$(".height output").html(nowH);
			}
			//console.log("初始H值:"+initH);
			//console.log("当前H值:"+nowH);
			if(nowH!=initH){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条2");
			}
        }); 
		
	//进度条重置
	$(".progressReset").click(function() {	
		$("#productTool .weight").html('<h2>作业重量<output>_</output>(kg)</h2><div class="weightBox">'
							+'<input a="1" type="range" min="0" max="100" step="10" value="0" data-rangeslider>'
				        	+'<span class="min"></span><span class="max"></span>'
							+'</div>');
		$("#productTool .height").html('<h2>起升高度<output>_</output>(mm)</h2><div class="heightBox">'
							+'<input a="2" type="range" min="0" max="100" step="100" value="0" data-rangeslider>'
				        	+'<span class="min"></span><span class="max"></span>'
						+'</div>');
						
		$('#productTool .weight input').rangeslider({ polyfill: false });
		$('#productTool .height input').rangeslider({ polyfill: false });
		nowW=" ";
		nowH=" ";
		selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"重置");	 

		//监听进度条变化（滑动停止发送请求）		
		$(".weightBox input[type=range]").on("change",function (e){
			if(nowW==0){
				$(".weight output").html("_");
			}else{
				$(".weight output").html(nowW);
			}
			if(nowW!=initW){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条1");	
			}  			
        });
		$(".heightBox input[type=range]").change (function (e){	
			if(nowH==0){
				$(".height output").html("_");
			}else{
				$(".height output").html(nowH);
			}
			if(nowH!=initH){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条2");
			}
        });		
	})

	//工具栏重置
	$(".reset").click(function() {
		$(".subNav").children("p").hide();		
		nowArr1.splice(0,nowArr1.length);
		nowArr2.splice(0,nowArr2.length);
		nowArr3.splice(0,nowArr3.length);
		
		$("#productTool .weight").html('<h2>作业重量<output>_</output>(kg)</h2><div class="weightBox">'
							+'<input a="1" type="range" min="0" max="100" step="10" value="0" data-rangeslider>'
				        	+'<span class="min"></span><span class="max"></span>'
							+'</div>');
		$("#productTool .height").html('<h2>起升高度<output>_</output>(mm)</h2><div class="heightBox">'
							+'<input a="2" type="range" min="0" max="100" step="100" value="0" data-rangeslider>'
				        	+'<span class="min"></span><span class="max"></span>'
						+'</div>');
						
		$('#productTool .weight input').rangeslider({ polyfill: false });
		$('#productTool .height input').rangeslider({ polyfill: false });
		nowW=" ";
		nowH=" ";
		selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"重置");	 

		//监听进度条变化（滑动停止发送请求）		
		$(".weightBox input[type=range]").on("change",function (e){
			if(nowW==0){
				$(".weight output").html("_");
			}else{
				$(".weight output").html(nowW);
			}
			if(nowW!=initW){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条1");	
			}  			
        });
		$(".heightBox input[type=range]").change (function (e){	
			if(nowH==0){
				$(".height output").html("_");
			}else{
				$(".height output").html(nowH);
			}
			if(nowH!=initH){
				selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,"进度条2");
			}
        });		
	})
		 
	//确定筛选
	$(".sure").click(function() { 		
		//console.log(nowArr1);
		//console.log(nowArr2);
		//console.log(nowArr3);
		var getWeightOutput = $(".weight output").val()=="_"?" ":$(".weight output").val();
		var getHeightOutput = $(".height output").val()=="_"?" ":$(".height output").val();
		var selectObj = {
			"environment":nowArr1,
			"powerType":nowArr2,
			"classId":nowArr3,
			"workingWeight":getWeightOutput,
			"liftingHeight":getHeightOutput
		}; 
		localStorage.setItem("searchData",JSON.stringify(selectObj));
		if(localStorage.getItem("searchData")){
			//console.log(JSON.parse(localStorage.getItem("searchData")));
			window.location.href="productSearch.html?getData=1";			
		}
		
	})
    
    
    
    
    //---------------------------------车型对比框----------------------------------     
    var toolIds=[];   //传递到对比页面的id数组
    var groupList="";   //所有产品下拉列表
    //下拉列表
	$.ajax({
		url: common_url+'/getGroupAllProductList',
		type: "get",
		async: true,
		dataType:'json',
		success:function(res){
	        if(res.groupList){
	        	groupList=res.groupList; 
	        	var html = '<option value="0">请选择车型</option>';
				for(var i = 0; i < groupList.length; i++) {               	
                	html += '<option value="'+groupList[i].id+'">'+groupList[i].name+'</option>';	
				}		
				$("#productTool .selectbox1").html(html);
				
				$('.selectbox1').val("0");
	        }
		}
	})  
 	
 	
 	
    $('.selectbox1').change(function(){
		var currentVal=$(this).val();
		//console.log(currentVal)
		if(currentVal==0){
			$(this).parent().find('.selectbox2').hide();
		}else{
			$(this).parent().find('.selectbox2').show();
		}
		var html2 = '<option value="">请选择型号</option>';
	 	if(currentVal){ 			 		
	 		for(var i = 0; i < groupList.length; i++) {
	 			if(currentVal==groupList[i].id){
	 				for(var j = 0; j < groupList[i].productList.length; j++) {               	
	                	html2 +='<option value="'+groupList[i].productList[j].id+'" data-name="'+groupList[i].productList[j].name+'['+groupList[i].productList[j].modelName+']">'+groupList[i].productList[j].name+'['+groupList[i].productList[j].modelName+']</option>';		                	
					}
	 			}	 			 
			}
	 		$(".selectbox2").html(html2);
	 	}
	})
    $('.selectbox2').change(function(){  	
    	if(toolIds.length<3){
    		var name=$(this).find("option:selected").attr("data-name");
			var currentId=$(this).val();
			toolIds.push(currentId);
// 			console.log(toolIds);
			$(".selectText").append('<div class="selectTextinside"><p>'+name+'</p> <span class="del" data-id="'+currentId+'"></span></div>');
									
			$(".del").on("click",function(){
		   		var removeId=$(this).attr("data-id");
		   		if(removeId){					
					toolIds.removeId(removeId);			 
					$(this).parent().remove();  
  					//console.log(toolIds);
		   		}	
		   	})	
    	}    														
	})
    
    //开始对比
    $(".toCompare").click(function(){    	
    	if(toolIds.length>0){
    		var abs = toolIds.join(",");
    		location.href="productCompare.html?id="+abs+"";
    	}else{
    		$(".selectDiv p").html("请至少选择一个");
    	}   	
    })
    
    //清空
    $(".empty").click(function(){
    	$('.selectbox1').val('0')
    	$(".selectText").html(' ');
    	$('.selectbox2').hide();
    	toolIds=[];
    })	
		 		
})

//-----------------函数方法--------------------------
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.removeId = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


function queryCheckedValue() {
	var str = "已选择：";
	var vall = "";
	var arr = [];
	$("input:checkbox[name='a']:checked").each(function(i) {
		var val = $(this).val();
		vall=$(".navContent1 input:checkbox[value='"+val+"']").parent("li").text();
		str += vall + " ";
	});	
	$(".subNav").eq(0).children("p").show().html(str);
}
function queryCheckedValue2() {
	var str = "已选择：";
	$("input:checkbox[name='b']:checked").each(function(i) {
		var val = $(this).val();
		vall=$(".navContent2 input:checkbox[value='"+val+"']").parent("li").text();
		str += vall + " ";
	});
	$(".subNav").eq(1).children("p").show().html(str);
}
function queryCheckedValue3() {
	var str = "已选择：";
	var vall = "";
	$("input:checkbox[name='c']:checked").each(function(i) {
		var val = $(this).val();
		vall=$(".navContent3 input:checkbox[value='"+val+"']").parent("li").text();
		str += vall + " ";
	});
	$(".subNav").eq(2).children("p").show().html(str);
}	
//获取选中checkbox项
function ALLCheckedValue(nowArr1,nowArr2,nowArr3) {
	nowArr1.splice(0,nowArr1.length);
	nowArr2.splice(0,nowArr2.length);
	nowArr3.splice(0,nowArr3.length);
	$("input:checkbox[name='a']:checked").each(function(i) {
		var val = Number($(this).val());
		nowArr1.push(val)
	});
	$("input:checkbox[name='b']:checked").each(function(i) {
		var val = Number($(this).val());
		nowArr2.push(val)
	});
	$("input:checkbox[name='c']:checked").each(function(i) {
		var val = Number($(this).val());
		nowArr3.push(val)
	});
 
} 

//数组找不同
function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}

//监控请求数据
var count= 0;
//筛选请求
function selectChange(nowArr1,nowArr2,nowArr3,nowW,nowH,arr1,arr2,arr3,tip){
	count++;
	// console.log("-----------请求------------")
	// console.log(nowArr1)
	// console.log(nowArr2)
	// console.log(nowArr3)	
	
	// console.log(nowW)
	// console.log(nowH)
	// console.log(tip)
		
	$.ajax({
		url: common_url+'/selection',
		type: "get",
		async: true,
		data: {
			environment:nowArr1, 
			powerType:nowArr2,
			classId:nowArr3,
			workingWeight:nowW,
			liftingHeight:nowH,
		},
		dataType:'json',
		success:function(res){	
	        if(res){
	        	//console.log(res);
 		    
		    $("#productTool .navContent1").html('<li><input type="checkbox" name="a" value="1">水平搬运</li>'
							            	+'<li><input type="checkbox" name="a" value="2">堆高</li>'
							            	+'<li><input type="checkbox" name="a" value="3">牵引</li>'
							            	+'<li><input type="checkbox" name="a" value="4">拣选</li>'
							            	+'<li><input type="checkbox" name="a" value="5">步行式</li>'
							            	+'<li><input type="checkbox" name="a" value="6">站驾式</li>'
							            	+'<li><input type="checkbox" name="a" value="7">座驾式</li>');
		    $("#productTool .navContent2").html('<li><input type="checkbox" name="b" value="1">电动</li>'
		            	+'<li><input type="checkbox" name="b" value="2">内燃</li>'
		            	+'<li><input type="checkbox" name="b" value="3">手动</li>');
			$("#productTool .navContent3").html(productToolHtml);	
				
			var getArr1= res.environment;
		 	var getArr2= res.powerType;
		 	var getArr3= res.classId;
		 	
		 	//进度条重新赋值
		 	if(tip=="进度条1"){
				h=res.liftingHeight;
			}else if(tip=="进度条2"){
 				w=res.workingWeight;
			}else{
				w=res.workingWeight;
				h=res.liftingHeight;
			}
		 	
 
		 	//禁选
		 	getArrDifference(getArr1,arr1).forEach(function(val,i){
				$(".navContent1 input:checkbox[value='"+val+"']").prop("disabled",true); 
			})
		 	getArrDifference(getArr2,arr2).forEach(function(val,i){
				$(".navContent2 input:checkbox[value='"+val+"']").prop("disabled",true); 
			})
		 	getArrDifference(getArr3,arr3).forEach(function(val,i){
				$(".navContent3 input:checkbox[value='"+val+"']").prop("disabled",true); 
			})
//		 	for(var val of getArrDifference(getArr1,arr1)){
//		 		$(".navContent1 input:checkbox[value='"+val+"']").prop("disabled",true); 	
//		 	}
//			for(var val of getArrDifference(arr2, getArr2)){
//		 		$(".navContent2 input:checkbox[value='"+val+"']").prop("disabled",true);
//		 	}
//		 	for(var val of getArrDifference(arr3, getArr3)){
//		 		$(" .navContent3 input:checkbox[value='"+val+"']").prop("disabled",true);
//		 	}


			//重新赋值
			if(nowArr1.length>0){
				//console.log("1打钩");
				// nowArr1.forEach(function(val,i){
				// 	$(".navContent1 input:checkbox[value='"+val+"']").prop("checked",true);
				// });
				getArr1.filter(function(val) {
				    if(nowArr1.indexOf(val) != -1){
				    	$(".navContent1 input:checkbox[value='"+val+"']").prop("checked",true);
				    }
				});
			}
			if(nowArr2.length>0){
				//console.log("2打钩");
				// nowArr2.forEach(function(val,i){
				// 	$(".navContent2 input:checkbox[value='"+val+"']").prop("checked",true);
				// });
				getArr2.filter(function(val) {
				    if(nowArr2.indexOf(val) != -1){
				    	$(".navContent2 input:checkbox[value='"+val+"']").prop("checked",true);
				    }
				});
			}
			if(nowArr3.length>0){
				//console.log("3打钩");
				// nowArr3.forEach(function(val,i){
				// 	$(".navContent3 input:checkbox[value='"+val+"']").prop("checked",true);
				// });
				getArr3.filter(function(val) {
				    if(nowArr3.indexOf(val) != -1){
				    	$(".navContent3 input:checkbox[value='"+val+"']").prop("checked",true);
				    }
				});
			}

			
 
			//重量进度条初始化
			if(w.length>1){
				var stepA=Math.floor(100/(w.length-1));
			}else{
				var stepA=100;				
			}
			var minA=w[0];
			var maxA=w[w.length-1];					
			//高度进度条初始化
			if(h.length>1){
				var stepB=Math.floor(100/(h.length-1));
			}else{
				var stepB=100;
			}			
			var minB=h[0];
			var maxB=h[h.length-1];
 	

			if(tip=="进度条1"&&h.length>1){
				$(".height input").attr({step:stepB}).rangeslider('update', true);
				//$(".height output").text(minB);
				$(".height .min").text(minB);
				$(".height .max").text(maxB);
				//console.log("高重置")
			}else if(tip=="进度条2"&&w.length>1){
				$(".weight input").attr({step:stepA}).rangeslider('update', true);
				//$(".weight output").text(minA);
				$(".weight .min").text(minA);
				$(".weight .max").text(maxA);
				//console.log("重量重置")
			}else{
				$(".weight input").attr({step:stepA}).rangeslider('update', true);
				$(".height input").attr({step:stepB}).rangeslider('update', true);
				//$(".weight output").text(minA);
				$(".weight .min").text(minA);
				$(".weight .max").text(maxA);
				//$(".height output").text(minB);
				$(".height .min").text(minB);
				$(".height .max").text(maxB);
				//console.log("重量/高度重置")
			}
			
			initW=nowW;
			initH=nowH;
			

			//console.log("请求数据次数："+count)
			//debugger
 
	        }
		}
	})
}