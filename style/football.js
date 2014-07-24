var football=(function(){
	var requestAnimFrame=(function(){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			setTimeout(callback,1000/60);
		}
	})();
	var canvas;
	var context;
	var image;
	var ball;
	var supportCanvas=document.createElement('canvas').getContext;

	function Ball(ballimage,options){
		this.width=options.width;
		this.height=options.height;
		this.containerWidth=options.containerWidth;
		this.containerHeight=options.containerHeight;
		this.x=options.left;
		this.y=options.top;
		this.image=ballimage;
		this.gravity=0.4;//重力系数
		this.vy=0.8;//y方向增量
		this.vx=4;//x方向增量
		this.vyAdjust=-15;//y方向用于校准的参数
		this.vxAdjust=0.25;//x方向用于校准的参数
		this.factor=0.65;//衰减因子
		this.end=false;
		this.degree=0;
		this.ctx=options.ctx;
		this.canvas=options.canvas;
		this.ball=ballimage.parentNode;
	}

	Ball.prototype.draw=function(){
		if(supportCanvas){

			this.ctx.save();
			this.rotate();
			this.ctx.drawImage(this.image,
				0,0,
				100,100,
				this.x,this.y,
				this.width,this.height
			);
			this.ctx.restore();
			if(this.vx>0){
				this.degree+=1*this.vx;
			}
		}else{
			this.ball.style.left=this.x+'px';
			this.ball.style.top=this.y+'px';
		}
	}

	Ball.prototype.rotate=function(){
		this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
		this.ctx.rotate(Math.PI/180*this.degree);
		this.ctx.translate(-this.x-this.width/2,-this.y-this.height/2);
	}

	Ball.prototype.hit=function(){
		this.vy=this.vyAdjust;
	}

	Ball.prototype.move=function(){
		this.y+=this.vy;
		this.vy+=this.gravity;

		if(this.vx>0){
			this.x+=this.vx;
		}

		if((this.y+this.height)>this.containerHeight){
			this.hit();
			this.vyAdjust=(this.vyAdjust*this.factor);
			this.vx=this.vx-this.vxAdjust;
		}
		if(this.vx<-0.1){
			this.end=true;
		}
	}

	Ball.prototype.clearCanvas=function(){
		this.ctx && this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}

	Ball.prototype.update=function(){
		this.clearCanvas();
		this.draw();
		this.move();
	}

	function loop(){
		ball.update();
		if(!ball.end){
			requestAnimFrame(loop);
		}
	}

	function loadBall(){
		ball=new Ball(image,{
			width:100,
			height:100,
			containerWidth:1000,
			containerHeight:500,
			left:0,
			top:0,
			ctx:context,
			canvas:canvas
		});
		loop();
	}

	function init(){
		image=new Image();
		image.src='/mod/football/football.png';
		if(!supportCanvas){
			var ballContainer=document.getElementById('ball');
			ballContainer.appendChild(image);
			ballContainer.style.display='block';
		}else{
			canvas=document.getElementById('football');
			context=canvas.getContext('2d');
			canvas.style.display='block';
		}
		image.onload=loadBall;
	}

	var football={
		play:function(){
			init();
		}
	}
	return football;
})()
