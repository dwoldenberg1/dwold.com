/*** jQuery on-ready ***/
$(function(){
  resizeTitle();

  /*** Title resizer ***/
  $(window).resize(function(){
    resizeTitle();
    resizeAbout();
  });

});

function resizeTitle(){
  var t = $('.title');
  var tWidth = $(t.children()[0]).width();
  var wWidth = window.outerWidth;
  if(tWidth > wWidth){
    while(tWidth > wWidth){
      t.css("font-size", Number(t.css("font-size").split("px")[0]) - 2 + "px");
      var tSize = Number(t.css("font-size").split("px")[0]);
      tWidth = $(t.children()[0]).width();
      if(tSize <= 50){
        $('main').css("zoom", "90%").css("padding-left", "60px").addClass("morphed");
      }
    }
  } else if(tWidth  < wWidth){
    while(tWidth < wWidth){
      t.css("font-size", Number(t.css("font-size").split("px")[0]) + 2 + "px");
      var tSize = Number(t.css("font-size").split("px")[0]);
      tWidth = $(t.children()[0]).width();
      if(tSize >= 50 && $('main').hasClass("morphed")){
        $('main').css("zoom", "unset").css("padding-left", "unset").removeClass("morphed");
      }
      if(tSize > 80){
        t.css("font-size", "80px");
        return;
      } 
    }
    t.css("font-size", (Number(t.css("font-size").split("px")[0]) - 4) + "px");
  }
}

function resizeAbout() {
  var ww = 1;
}