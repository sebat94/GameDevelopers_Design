$(document).ready(function(){



  /*-- slideshow --*/
  var aei = 1;
  var ini = 1;
  var max = 3;
  var $content_slide = $(".img_slideshow");

  function changePic(){

    if(aei > max) aei = ini;
    if(aei == 0) aei = max;

    $content_slide.clearQueue();
    $content_slide.animate({ opacity: 0 }, 400, function(){
      $content_slide.html(
        "<img src='img/slideshow/" + (aei-1) + ".jpg' alt=''>"
      );
    }).animate({ opacity: 1 }, 400);

    aei++;
  }
  changePic();
  var interval = setInterval(changePic, 5000);


  $('.flecha_izq').on('click', function(){
    aei-=2;
    clearInterval(interval);
    interval = setInterval(changePic, 5000);
    changePic();
  });


  $('.flecha_der').on('click', function(){
    clearInterval(interval);
    interval = setInterval(changePic, 5000);
    changePic();
  });




});
