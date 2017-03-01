//获取选择器
function $(selsect){
    /*获取第一个字符*/
    var firstStr = selsect.slice(0,1);
    if(firstStr == "#"){
        var str = selsect.replace("#","");
        return document.getElementById(str);
    }else if(firstStr == "."){
        var all = document.getElementsByTagName("*");
        /*存储claa*/
        var arr = [];
        for(var i = 0;i<all.length; i++){
            if(typeof(all[i].getAttribute("class")) == "string"){
                if(all[i].getAttribute("class").indexOf(selsect.substr(1)) != -1){
                    arr.push(all[i]);
                }
            }
        }
        return arr;
    }

}

//Dom 2级事件
function addEv(obj,ev,fn){
    /*判断是否支持attachEvent事件*/
    if(obj.attachEvent){
        obj.attachEvent("on"+ev,fn);
    }else{
        obj.addEventListener(ev,fn);
    }
}

//托拽
function drag(obj){
    obj.onmousedown = function(e){
        var e = e||event;
        /*鼠标和物体之间的距离*/
        var disX = e.clientX-obj.offsetLeft;
        var disY = e.clientY-obj.offsetTop;

        /*给document加移动事件*/
        document.onmousemove = function(e){
            var e = e||event;
            var l=e.clientX-disX;
			var t=e.clientY-disY;
			if (l<0) {
				l=0
			} else if (l>document.documentElement.offsetWidth-obj.offsetWidth) {
				l=document.documentElement.offsetWidth-obj.offsetWidth;
			}
			if (t<0) {
				t=0
			} else if (t>document.documentElement.offsetHeight-obj.offsetHeight) {
				t=document.documentElement.offsetHeight-obj.offsetHeight;
			}
            obj.style.left = l +"px";
            obj.style.top = t+"px";
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        }

    }
}

//阻止事件冒泡
function canCel(e){
    if(e.cancelBubble){
        e.cancelBubble = true;
    }else{
        e.stopPropagation();
    }
}


//setCook("名字","小宋",1)
        function setCook(name,value,oDate){
            var mdate = new Date();
            mdate.setDate(mdate.getDate()+oDate)
            document.cookie = name+"="+value+";expires=" + mdate;
        }
        //console.log(getCook("名字"));
        function getCook(name){
            var cooks = document.cookie;
            var al = cooks.split("; ");
            var arry = [];
            //循环document.cookie分割之后的长度
            for(var i = 0;i<al.length;i++){
                /*在以等号分割*/
                var arr = al[i].split("=");
                if(arr[0] == name){
                    arry.push(arr[1])
                }
            }
            return arry;
        }
        //deleCook("名字");
        function deleCook(name){
            /*删除cook 时间设为-1*/
            setCook(name,"",-1)
        }

//运动框架
function starMove(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(var attr in json){
            var timerStop = true;
            var cur = parseInt(getStyle(obj,attr));
            if(attr == 'opacity'){
                cur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                cur = parseInt(getStyle(obj,attr));
            }
            var speed = (json[attr] - cur)/5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if(cur !=  json[attr]){
                timerStop = false;
            }
    
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }else{
                obj.style[attr] = cur + speed + "px";
            }
            if(timerStop){
                clearInterval(obj.timer);
                if(fn){ fn(); };
            }
            
        }
    },30);
}
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}