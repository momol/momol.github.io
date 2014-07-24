window.onload=function(){
	$( "#main" ).draggable({ containment: 'parent' ,drag: setChoice});//拖动效果
	/*document.onselectstart=new Function('event.returnValue=false;');//取消图片选中*/
	var rightDiv=document.getElementById('right');
	var upDiv=document.getElementById('up');
	var leftDiv=document.getElementById('left');
	var downDiv=document.getElementById('down');
	var rightUpDiv=document.getElementById('right-up');
	var leftUpDiv=document.getElementById('left-up');
	var leftDownDiv=document.getElementById('left-down');
	var rightDownDiv=document.getElementById('right-down');
	var mainDiv=document.getElementById('main');
	var ifKeyDown=false;
	var contact="";//表示按下的触点
	//鼠标按下事件
	rightDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="right";
	}
	upDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="up";
	}
	leftDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="left";
	}
	downDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="down";
	}
	rightUpDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="right-up";
	}
	leftUpDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="left-up";
	}
	leftDownDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="left-down";
	}
	rightDownDiv.onmousedown=function(e){
		e.stopPropagation();
		ifKeyDown=true;
		contact="right-down";
	}
	//鼠标松开事件
	window.onmouseup=function(){
		ifKeyDown=false;
	}
	//鼠标移动事件
	window.onmousemove=function(e){
		e.preventDefault();
		if(ifKeyDown==true){
			switch(contact){
				case "right":moveRight(e);break;
				case "up":moveUp(e);break;
				case "left":moveLeft(e);break;
				case "down":moveDown(e);break;
				case "right-up":moveRight(e);moveUp(e);break;
				case "left-up":moveLeft(e);moveUp(e);break;
				case "left-down":moveLeft(e);moveDown(e);break;
				case "right-down":moveRight(e);moveDown(e);break;
			}
		}
		setChoice();
		setPreview();
	}
	//右边移动
	function moveRight(e){
		var x=e.clientX;//鼠标X坐标
		var widthBefore=mainDiv.offsetWidth;//选取框变化前的宽度
		var addWidth=x-getPosition(mainDiv).left-widthBefore;//鼠标移动后选取框增加的宽度
		mainDiv.style.width=addWidth+widthBefore+'px';//选取框变化后的宽度
	}
	//上边移动
	function moveUp(e){
		var y=e.clientY;//鼠标纵坐标
		var mainY=getPosition(mainDiv).top;//选取框相对于屏幕上方距离
		var addHeight=mainY-y;
		var heightBefore=mainDiv.offsetHeight;
		mainDiv.style.height=heightBefore+addHeight+'px';
		mainDiv.style.top=mainDiv.offsetTop-addHeight+'px';
	}
	//左边移动
	function moveLeft(e){
		var x=e.clientX;//鼠标的横坐标
		var mainX=getPosition(mainDiv).left;//选取框相对于屏幕左边的距离
		var addWidth=mainX-x;//增加的宽度
		var widthBefore=mainDiv.offsetWidth;//原来的宽度
		mainDiv.style.width=widthBefore+addWidth+'px';
		mainDiv.style.left=mainDiv.offsetLeft-addWidth+'px';
	}
	//下边移动
	function moveDown(e){
		var y=e.clientY;
		var heightBefore=mainDiv.offsetHeight;
		var addHeight=y-heightBefore-getPosition(mainDiv).top;
		mainDiv.style.height=heightBefore+addHeight+'px';
	}
	//设置选取框区域高亮可见
	function setChoice(){
		var top=mainDiv.offsetTop;
		var right=mainDiv.offsetLeft+mainDiv.offsetWidth;
		var bottom=mainDiv.offsetTop+mainDiv.offsetHeight;
		var left=mainDiv.offsetLeft;
		var img2=document.getElementById('img2');
		img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}
	//预览
	function setPreview(){
		var top=mainDiv.offsetTop;
		var right=mainDiv.offsetLeft+mainDiv.offsetWidth;
		var bottom=mainDiv.offsetTop+mainDiv.offsetHeight;
		var left=mainDiv.offsetLeft;
		var img3=document.getElementById('img3');
		img3.style.top=-top+'px';
		img3.style.left=-left+'px';
		img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
	}
}

//获取元素相对屏幕左边的距离
function getPosition (node) {
	var left=node.offsetLeft;
	var top=node.offsetTop;
	var parent=node.offsetParent;
	while(parent !=null){
		left+=parent.offsetLeft;
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return {"left":left,"top":top};
}

