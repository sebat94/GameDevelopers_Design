(function(){

  var dds = $("dd");
  var dts = $("dt");
  dds.hide();
  dds.eq(0).show();

  dts.on("click", function(){

    dts.removeClass("faq_active");

    dds.slideUp(200);
    $(this).next().slideDown(200);

    $(this).addClass("faq_active");

  });

})();
