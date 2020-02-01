$(document).ready(function(){


    // Ponemos las variables globales para asegurarnos de donde está el header en una primera instancia
    var scrollTop = $(window).scrollTop();
    var windowTop = $('.cabecera').offset().top;

    // Instanciamos a 'null' la variable que agarrará el 'top' del elemento a partir del cual el header mostrará su background
    var elem_mostrar_header = null;

    // En caso de que estemos en 'index' agarrará el valor de la posición del elemento para hacer el cáculo en la función
    // en caso de que no esté en index, mandará a la función un null, por lo tanto cuando pregunte si el 'top' del window
    // es mayor que 'null' devolverá que sí, haciendo que enel resto de páginas nos lo muestre desde un principio.
    if( $(".seccion_novedades").length > 0 ){
      elem_mostrar_header = $('.seccion_novedades').offset().top;
    }

    backgroundHeader( windowTop, elem_mostrar_header );



    $(window).on('scroll', function(){

      scrollTop = $(window).scrollTop();
      windowTop = $('.cabecera').offset().top;

      if( $(".seccion_novedades").length > 0 ){
        elem_mostrar_header = $('.seccion_novedades').offset().top;
      }

      backgroundHeader( windowTop, elem_mostrar_header );

    });



    function backgroundHeader( windowTop, elem_mostrar_header ){

      if( windowTop >= elem_mostrar_header ){
        $(".cabecera").css({
          'background-color' : 'rgb(20, 21, 26)',
          'border-bottom'    : '2px solid rgb(235, 2, 36)'
        });
      }else{
        $(".cabecera").css({
          'background-color' :  '',
          'border-bottom'    :  ''
        });
      }

    }



    $('#hamburguesa').on("click", function(){
        $(".cabecera_der").toggle("swing");
    });



});// Document Ready
