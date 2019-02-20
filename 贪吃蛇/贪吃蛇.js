var cvs=document.getElementById('cvs');
var ctx=cvs.getContext('2d');
cvs.height=600;
cvs.width=800;
var snakeSize=20;
var cvsGridX=cvs.width/snakeSize;
var cvsGridY=cvs.height/snakeSize;
var length=0;
var snakeBody=[];
var dire=2;
var food={};
var count=0;


function init() {
  snakeBody=[];
  length=0;
  for(var i=0;i<3;i++){
    creatSnakeNode(parseInt(cvsGridX/2)+i,parseInt(cvsGridY/2));
  };
  drawSnake();
  putFood();
}

function creatSnakeNode(x,y) {
  snakeBody.push({x:x,y:y,color:length==0?'#f01':'#000'});
  length++;
}

function drawRect(snakeNode) {
  ctx.beginPath();
  ctx.fillStyle=snakeNode.color;
  ctx.fillRect(snakeNode.x*snakeSize,snakeNode.y*snakeSize,snakeSize,snakeSize);
  ctx.closePath();
}

function drawSnake() {
  ctx.clearRect(0,0,cvs.width,cvs.height);
  for(var i=0;i<snakeBody.length;i++){
    drawRect(snakeBody[i]);
  }
  drawRect(food);
}

function snakeMove() {
  for (var i=snakeBody.length-1; i >0 ; i--) {
    snakeBody[i].x=snakeBody[i-1].x;
    snakeBody[i].y=snakeBody[i-1].y;
  }
  if(dire==1) snakeBody[0].y-=1;
  if(dire==-1) snakeBody[0].y+=1;
  if(dire==2) snakeBody[0].x-=1;
  if(dire==-2) snakeBody[0].x+=1;
  isGetfood(snakeBody[0]);
  drawSnake();
}

function setDirection(dir) {
  if (Math.abs(dir)==Math.abs(dire)) return;
  dire=dir;
}

document.onkeydown=function (e) {
  // alert(e.keyCode);
  e.preventDefault();
  if(e.keyCode==38) setDirection(1);
  if(e.keyCode==40) setDirection(-1);
  if(e.keyCode==37) setDirection(2);
  if(e.keyCode==39) setDirection(-2);
}

function putFood() {
  var flag;
  while (1) {
    flag=1;
    var foodX=parseInt(Math.random()*cvsGridX);
    var foodY=parseInt(Math.random()*cvsGridY);
    for(var i=0;i<snakeBody.length;i++){
      if (snakeBody[i].x==foodX && snakeBody[i].y==foodY) flag=0;
    }
    if(flag) break;
  }
  food={x:foodX,y:foodY,color:'#f40'};
}

function isGetfood(node) {
  if(node.x==food.x && node.y==food.y){
    putFood();
    snakeBody.push({x:snakeBody[snakeBody.length-1].x,y:snakeBody[snakeBody.length-1].y,color:'000'});
    document.getElementById('values').innerHTML="values="+(++count);
  }
}

function isGameover() {
  if(snakeBody[0].x<0 || snakeBody[0].x>39 || snakeBody[0].y<0 || snakeBody[0].y>39) return 1;
  for(var i=snakeBody.length-1;i>0;i--){
    if(snakeBody[i].x==snakeBody[0].x && snakeBody[i].y==snakeBody[0].y) return 1;
  }
}

init();
var timer=setInterval(function () {
  snakeMove();
  if(isGameover()) {clearInterval(timer); alert('游戏结束');};
}, 150);
alert('游戏开始');
