/*** jQuery on-ready ***/
$(function(){
  resizeTitle();

  /*** Title resizer ***/
  $(window).resize(function(){
    resizeTitle();
  });

});

function resizeTitle(){
  var t = $('.title');
  var tWidth = $(t.children()[0]).width();
  var wWidth = window.outerWidth;
  if(tWidth > wWidth){
    while(tWidth > wWidth){
      t.css("font-size", Number(t.css("font-size").split("px")[0]) - 2 + "px");
      tWidth = $(t.children()[0]).width();
    }
  } else if(tWidth  < wWidth){
    while(tWidth < wWidth){
      t.css("font-size", Number(t.css("font-size").split("px")[0]) + 2 + "px");
      var tSize = Number(t.css("font-size").split("px")[0]);
      tWidth = $(t.children()[0]).width();
      if(tSize > 80){
        t.css("font-size", "80px");
        return;
      }
    }
    t.css("font-size", (Number(t.css("font-size").split("px")[0]) - 4) + "px");
  }
}