var can = document.getElementById("can");
can.width = window.innerWidth-20;
can.height = window.innerHeight-20;
can.setAttribute("style","border: 1px solid #333");
var ctx = can.getContext('2d');
ctx.lineWidth = 2;
window.onload = function(){
var col = 8;
var row = 10;
var cell = 20; 
//generate(row,col,cell);
//animate(row,col,cell,2);
//genEilerLaberint(row,col,cell);

   
   
}

var segment = {
  add : function(type,x,y,size){
    if (type){
      this.vertical(x,y,size);
    }else{
      this.horezontal(x,y,size);
    }
  },
  horezontal:function(x,y,size){
  	hor = {x:x,y:y,size:size}
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+size+ctx.lineWidth/2,y);
    ctx.stroke();
    this.hor_seg.push(hor);
  },
  vertical:function(x,y,size){
  	ver = {x:x,y:y,size:size}
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x,y+size+ctx.lineWidth/2);
    ctx.stroke();
    this.ver_seg.push(ver);
  },
  hor_seg:new Array(),
  ver_seg :new Array(),
  dell_hor:function(elem){
  	ctx.clearRect(elem.x+ctx.lineWidth/2,(elem.y-ctx.lineWidth/2)-2,elem.size-ctx.lineWidth,ctx.lineWidth+3);
  },
  dell_ver:function(elem){
  	ctx.fillStyle = "#33ffcc";
  	ctx.clearRect(elem.x-2,elem.y+ctx.lineWidth/2,ctx.lineWidth+3,elem.size-ctx.lineWidth);
  }
  
}

function generate(row,col,cell){
	for (colu = 0;colu<row;colu++){
		for (s_count = 0;s_count<col;s_count++){
  			segment.add(false,(cell/2)*(s_count*2),cell*colu,cell);
		}	
		for (s_count = 0;s_count<col+1;s_count++){
	  		segment.add(true,(cell/2)*(s_count*2),cell*colu,cell);
		}	
	}
	for (s_count = 0;s_count<col;s_count++){
			segment.add(false,(cell/2)*(s_count*2),cell*row,cell);
	}	

}
function animate(row,col,cell,speed){
	inter = setInterval(function(){
		if(segment.hor_seg.length>0){
			var rand = getRandomInt(0,segment.hor_seg.length);
			segment.dell_hor(segment.hor_seg[rand]);
			segment.hor_seg.splice(rand,1);
			var rand = getRandomInt(0,segment.ver_seg.length);
			segment.dell_ver(segment.ver_seg[rand]);
			segment.ver_seg.splice(rand,1);
		}else {
			console.log("all interval");
			generate(row,col,cell);
		};
	},speed);
}
function genEilerLaberint(row,col,cell){
	segment.add(true,0,0,cell);
		for (s_count = 0;s_count<col;s_count++){
			segment.add(false,(cell/2)*(s_count*2),0,cell);
	}
	segment.add(true,col*cell,0,cell);
	var arr = new Array(col);
	for (i = 1;i<=col;i++){
		arr[i-1] = i;
		rnd = getRandomInt(0,2);
		if (rnd == 1){//рисуем границу справа
			segment.add(true,(cell/2)*((i-1)*2),0,cell);
		}else{//обьеденим множества
			arr[i-2] = i;
		}
		console.log(rnd);
	}
	console.log(arr);

}
function getRandomInt(min,max){
	return Math.floor(Math.random() * (max - min)) + min;
}