$(document).ready(function(){


  var $input_nombre   = $("#nombre_usuario");
  var $input_email    = $("#email_usuario");
  var $input_asunto   = $("#asunto_usuario");
  var $input_desc     = $("#descripcion_usuario");


  estilos_contacto();
  altura_contacto();


  $(".nombre_contacto_izq label, .email_contacto_izq label, .asunto_contacto_izq label, .descripcion_contacto_izq label").on("click", function(){

    $(this).css({
      "width" : "auto",
      "height": "40px",
      "top"   : "-30px",
      "cursor": "pointer",
      "color" : "rgb(235, 2, 36)",
      "padding-left": "0px"
    });

  });
  
  // Cuando el input tenga el foco, subiremos el label
  $("#nombre_usuario, #email_usuario, #asunto_usuario, #descripcion_usuario").on("focusin", function(){
    $(this).prev().css({
      "width" : "auto",
      "height": "40px",
      "top"   : "-30px",
      "cursor": "pointer",
      "color" : "rgb(235, 2, 36)",
      "padding-left": "0px"
    });
  });


  function estilos_contacto(){

    if( $input_nombre.val().length > 0 ){
      $input_nombre.prev().css({
        "width" : "auto",
        "top"   : "-30px",
        "height": "40px",
        "cursor": "pointer",
        "color" : "rgb(235, 2, 36)",
        "padding-left": "0px"
      });
    }
    if( $input_email.val().length > 0 ){
      $input_email.prev().css({
        "width" : "auto",
        "top"   : "-30px",
        "height": "40px",
        "cursor": "pointer",
        "color" : "rgb(235, 2, 36)",
        "padding-left": "0px"
      });
    }
    if( $input_asunto.val().length > 0 ){
      $input_asunto.prev().css({
        "width" : "auto",
        "top": "-30px",
        "height": "40px",
        "cursor": "pointer",
        "color" : "rgb(235, 2, 36)",
        "padding-left": "0px"
      });
    }
    if( $input_desc.val().length > 0 ){
      $input_desc.prev().css({
        "width" : "auto",
        "top"   : "-30px",
        "height": "40px",
        "cursor": "pointer",
        "color" : "rgb(235, 2, 36)",
        "padding-left": "0px"
      });
    }

  }





  $(window).resize(function(){

    altura_contacto();

  });

  function altura_contacto(){

    var windowTop = $(document).scrollTop();
    var windowBottom = windowTop + window.innerHeight;
    var contactoTop = $('.contacto').offset().top;
    var contactoBottom = contactoTop + $('.contacto').height();


    var altura_contacto = contactoBottom - contactoTop;
    var espacio_libre = windowBottom - altura_contacto;

    var padding_top = ((espacio_libre - 100) / 2);                              // -100px por la cabecera


    if( windowBottom > (altura_contacto + 140) ){                               // +140 para que cuente a partir del header y un margen de 40px por debajo

      $(".section_contacto").css({
        "padding-top": (padding_top + 100) + "px"                               // +100px por la cabecera, para que empiece a partir del header
      });

    }else{

      $(".section_contacto").css({
        "padding-top": "140px"
      });

    }

  }



});
