/*
Instructions:
Press start to start the timer
Press stop to stop it
Options lets you change the length
  Pomodoro, as well as the break
  delay. You can also reset the 
  timer there by clicking reset
*/

//utility function for canvas
function rad(deg){
  return Math.PI*deg/180;
}

/*--------------
variables
----------------*/
var timeout   = null;
var secmove   = null;
var minutes   = 25;
var startmin  = 25;
var seconds   = minutes*60;
var totaltime = minutes*60;
var angle     = rad(360/totaltime);
var delay     = 1;                    

//canvas stuff
var canvas    = document.getElementById("clock");
var ctx       = canvas.getContext('2d');
var canvas1   = document.getElementById("clock-back");
var ctx1      = canvas1.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx1.imageSmoothingEnabled = true;
var interval  = 1000;

//colors
var colors    = {
  blue: '#2F323A',
  white:"#F1F7ED",
  green:'#71F79F',
  orange:'#FE7F2D',
  purple:'#5F5566'
}

//circle object
var circle = 
  {
    rotation:rad(360)
  };

/*-------
functions
---------*/

//reduce angle and restart animation
//when necessary
function updateCircle(){
  if(circle.rotation>0){
    circle.rotation-=angle;
  }
  else {
    //for when the timer runs out
    clearInterval(secmove);
    circle.rotation=360;
    drawEmptyCircle();
    $(".clock-text").html("break");
    $(".clock-text").addClass("pulse");
    //user can click start 
    //to prematurely end the break
    $(".start-button").removeClass("disable-button");
    reset(startmin);
    
    //if start button is not clicked during break
    timeout= setTimeout(
      function(){
        $(".start-button").addClass("disable-button");
        $(".clock-text").removeClass("pulse");
        secmove = setInterval(animate, interval);
        clearTimeout(timeout);
      }, 
      delay*60*1000
    );
  }
}

//draw the circle
function drawCircle(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineCap='round';
  ctx.arc(canvas.height/2, canvas.width/2, canvas.width/2-15, rad(270), rad(270) - circle.rotation, true);
  ctx.strokeStyle=colors.blue;
  ctx.lineWidth=4;
  ctx.stroke();
  updateCircle();
}

//draw empty circle
function drawEmptyCircle(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineCap='round';
  ctx.arc(canvas.height/2, canvas.width/2, canvas.width/2-15, rad(270), rad(270), true);
  ctx.strokeStyle=colors.blue;
  ctx.lineWidth=4;
  ctx.stroke();
}

//draw container
function drawBack(){
  ctx1.strokeStyle=colors.orange;
  ctx1.arc(canvas.height/2, canvas.width/2, canvas.width/2-15, rad(270), 270+360, false);
  ctx1.lineWidth=10;
  ctx1.stroke();
}

var sec=60;
minutes-=1;
//change minutes and seconds
function drawText(){
  var disp;
  var dispsec;
  var dispmin;
  if (sec===0){
    if(minutes!==0)
      minutes-=1;
    if(seconds!==0)
      sec=60;
  }
  
  if (sec<10)
    dispsec="0"+sec;
  else if (sec==60)
    dispsec="00";
  else 
    dispsec=sec;
  if (minutes<10)
    dispmin= "0"+minutes;
  else 
    dispmin=minutes;
  if(minutes<1)
    dispmin="00";
  if(seconds>=1)
    disp=dispmin+":"+dispsec;
  else 
    disp="00:00";
  sec--;
  seconds--;
  $(".clock-text").html(disp);
}

//reset when minutes are changed
function reset(m){
  circle.rotation = rad(360);
  sec             = 60;
  minutes         = m;
  seconds         = minutes*60;
  totaltime       = minutes*60;
  minutes        -= 1;
  angle           = rad(360/totaltime);
}

//limit values entered in the options
function limitvalues(input){
    var value= input.value;
    if(isNaN(value)|| !input.value.length){
      input.value=input.placeholder;    
  }
    else{
      value=Math.floor(value);
      if(value>0){
        if(value<1000)
          input.value=value;
        else 
          input.value=999;
      }
      else 
        input.value=1;
  }
}

//animation
function animate(){
  drawText();
  drawCircle();
}
//draw outer circle
//------------------
//event handlers
//------------------
$(".stop-button").click(
  function(){
    clearInterval(secmove);
    $(".start-button").removeClass("disable-button");
  });

$(".start-button").click(
  function(){
    clearTimeout(timeout);
    $(".clock-text").removeClass("pulse");
    secmove= setInterval(animate, interval);
    $(".start-button").addClass("disable-button");
  });

$(".option-button").click(
  function(){
    $(".options-container").fadeIn(100);
    $(".stop-button").click();
  }
);

$(".close-text").click(
  function(){
     $(".options-container").hide();
     $(".reset-text").removeClass("disable-button");
    if(circle.rotation!=rad(360))
      $(".start-button").click();
  }
);

$(".reset-text").click(
  function(){
    $(this).addClass("disable-button");
    reset(startmin);
    drawEmptyCircle();
    if(startmin<10)
      $(".clock-text").html("0"+startmin+":00");
    else
      $(".clock-text").html(""+startmin+":00");
  }
);

$(".op-in").on("focus", function(e){
  console.log("#"+e.target.id);
  $("#"+e.target.id).val("");
});

$(".op-in").on("focusout", function(e){
  limitvalues(e.target);
  var textid = "#"+ e.target.id;
  var newmin = Math.floor($(textid).val());
  var old    = +e.target.placeholder;
  
  if(textid=="#length-in"){
    if(!(newmin==old))
      {
        $(".clock-text").removeClass("pulse");
        $(textid).attr("placeholder", newmin);
        reset(newmin);
        startmin=newmin;
        if(newmin>=10)
          $(".clock-text").html((newmin)+":00");
        else
          $(".clock-text").html("0"+(newmin)+":00");
      }
  }
  else{
    $(textid).attr("placeholder", newmin);
    delay=newmin;
  }
});

$(document).ready(function(){
  drawBack();
  $(".options-container").hide();
  if(minutes>=10)
    var disp = ""+(minutes+1)+":00";
  else 
    disp= "0"+(minutes+1)+":00";
  $(".clock-text").html(disp);
});