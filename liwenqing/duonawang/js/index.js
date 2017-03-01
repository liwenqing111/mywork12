$(function(){
	
//轮播
var oClone = $("#lub li").eq(0).clone();
$("#lub").append(oClone);
var oLength = $("#lub li").size();
var index = 0;
function move(){
	index++;
	if(index >3){
		$("#lub").css("left",0);
    		index = 1;
	}
	$("#lub").stop().animate({"left":-($("#lub img").eq(0).width())*index},500);
}
var timer = setInterval(move,1000);
$("#content_1_right").mouseover(function(){
	clearInterval(timer);
})
$("#content_1_right").mouseout(function(){
	timer = setInterval(move,1000);
})
$("#next").click(function(){
	move();
})
$("#prev").click(function(){
	index--;
	if(index < 0){
		$("#lub").css("left",-($("#lub img").eq(0).width())*(oLength-1));
    		index = oLength-2;
	}
	$("#lub").stop().animate({"left":-($("#lub img").eq(0).width())*index},500);
})

	
	
//登录用户名效果	
var name =getUrl().name;
//console.log(name);
if(name){
	$("#nameul").find("a").eq(0).css("display","none");
	$("#nameul").find("a").eq(1).css("display","none");
	$("#nameul").find("a").eq(2).text(name).css("display","block");
}


//地图的点击事件
$("#ditu").on("click",function(){
	window.location = "ditu.html"
})



})
