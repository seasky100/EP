$(function(){
	var delCommon = false;
	var idss=[];	
    var compareList =""; 
    var comparehtml = '<option value="">请选择车型</option>';
    //下拉列表
	$.ajax({
		url: common_url+'/getGroupProductList',
		type: "get",
		async: true,
		dataType:'json',
		success:function(res){
	        if(res.groupList){        	
	        	compareList=res.groupList;  				
				for(var i = 0; i < compareList.length; i++) {               	
                	comparehtml += '<option value="'+compareList[i].id+'">'+compareList[i].name+'</option>';	
				}		
				$(".select1").html(comparehtml); 
	        }
		}
	})
    
    $('.select1').change(function(){
		var currentVal=$(this).val();
		var html2 = '<option value="">请选择型号</option>';
	 	if(currentVal){
	 		$(this).parent().find('.select2').show();		
	 		for(var i = 0; i < compareList.length; i++) {
	 			if(currentVal==compareList[i].id){
	 				for(var j = 0; j < compareList[i].productList.length; j++) {               	
	                	html2 += '<option value="'+compareList[i].productList[j].id+'">'+compareList[i].productList[j].name+'['+compareList[i].productList[j].modelName+']</option>';		                	
					}
	 			}	 			 
			}
	 		$(".select2").html(html2);
	 	}
	})
    $('.select2').change(function(){
		var currentVal=$(this).val();
		idss.push(currentVal);
		showTableData(idss,delCommon);
	})
    
 
    //获取id值
    var productId = getUrlParam('id');
	if(productId){
		//console.log(productId);
		var getArr=productId.split(",");
		//console.log(getArr);
		idss = getArr;  //重新赋值切割好的id数组
	}		
	showTableData(idss,delCommon);	
 	
 	//隐藏相同项
 	$(document).on("change","#hideCommon",function() { 		
		if($("#hideCommon").prop("checked")){
			delCommon=true;
		}else{
			delCommon=false;
		}
		showTableData(idss,delCommon);
	});
 	
	
	//删除对比产品
   	$(".close").on("click",function(){
  		var index=Number($(this).attr("data-index"));  	
   		var removeId=$(this).attr("data-id");
   		if(removeId){
 			$(this).removeAttr("data-id");
			$(".tableHead td").eq(3).text(" ");
			$(".tableHead td").eq(4).text(" ");
			$(".tableHead td").eq(5).text(" ");
			$(".topbox").find("img").attr('src',"img/noImg.png");
			$(".topbox").find(".select1").show();
			$(".topbox").eq(index).find(".select1").html(comparehtml);
					
			idss.remove(removeId);
			showTableData(idss,delCommon);			
   		}	
   	})	 		
})



function showTableData(idss,delCommon){	
	var ids=idss.join(",");
	//console.log(delCommon)
	if(idss.length>0){
		$.ajax({
			url: common_url+'/getProductDetailList',
			type: "get",
			async: true,
			data: {
				delCommon:delCommon,
				ids:ids
			},
			dataType:'json',
			success:function(res){
		        if(res){
		        	//console.log(res.list);
		        	var productDetail=res.list[0];
					var tableHtml="";				
					for(var i = 0; i < productDetail.parameterList.length; i++) {
						tableHtml += '<div class="tdTitle"><span class="suo"></span>'+productDetail.parameterList[i].name+'</div><table class="'+productDetail.parameterList[i].id+'">';	
									
							for(var j = 0; j < productDetail.parameterList[i].propertyList.length; j++) {
								tableHtml += '<tr class="'+productDetail.parameterList[i].propertyList[j].id+'"><td width="50px">'+productDetail.parameterList[i].propertyList[j].code+'</td><td width="250px">'+productDetail.parameterList[i].propertyList[j].name+'</td><td width="150px">'+productDetail.parameterList[i].propertyList[j].unit+'</td><td width="300px"></td><td width="300px"></td><td width="300px"></td></tr>';
							}									
							tableHtml+="</table>";	
					} 
					$(".tables").html(tableHtml); 
					
					//标准参数表格显示隐藏
					$(".tdTitle").click(function(){
						var index = $(".tdTitle").index(this);
						var index1 = $(".tdTitle").index(this)+1; 
						if ($(".suo").eq(index).hasClass("fang")) {
							$(".suo").eq(index).css("background","url(../img/suo.png) no-repeat");
							$(".suo").eq(index).removeClass("fang");
							$("table").eq(index1).show();
						}else{
							$(".suo").eq(index).css("background","url(../img/fang.png) no-repeat");
							$(".suo").eq(index).addClass("fang");
							$("table").eq(index1).hide();
						}		
					})
									
					var tableList=res.list;
					for(var i = 0; i < tableList.length; i++) { 
						$(".topbox").eq(1+i).find(".close").attr( "data-id",tableList[i].id);     
						$(".tableHead td").eq(3+i).text(tableList[i].name);
						$(".topbox").eq(1+i).find("img").attr('src',img_url+tableList[i].defaultImage);
						$(".topbox").eq(1+i).find("select").hide();
						for(var j = 0; j < tableList[i].parameterList.length; j++) {
							for(var k = 0; k < tableList[i].parameterList[j].propertyList.length; k++) {	
								//放入value值
								$("."+tableList[i].parameterList[j].propertyList[k].id).find("td").eq(3+i).text(tableList[i].parameterList[j].propertyList[k].value)
							}
						} 
					} 
		        }
			}
		})		
	}else{
		$(".tables").html(" ");
	}
	
};

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};