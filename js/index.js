$(document).ready(function(){


  // BOTÓN DESPLAZAR HACIA ABAJO (PORTADA)
  $(".circle_fill_red").on("click", function(){

    $("html, body").animate({ scrollTop: $(window).height() }, 850, 'swing');

  });


});
