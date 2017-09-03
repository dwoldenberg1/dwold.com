/*** Globals ***/
  /** Three **/
  var tScene;
  var tCam;
  var tRender;

/*** jQuery on-ready ***/
$(function(){
  // resizeTitle();


  // /*** Title resizer ***/
  // $(window).resize(function(){
  //   resizeTitle();
  //   resizeAbout();
  //   setTimeout(function(){
  //    resizeMainSec();
  //   }, 200);
  // });

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
      /*if(tSize <= 50){
        $('main').css("zoom", "90%").css("padding-left", "60px").addClass("morphed");
      }*/
    }
  } else if(tWidth  < wWidth){
    while(tWidth < wWidth){
      t.css("font-size", Number(t.css("font-size").split("px")[0]) + 2 + "px");
      var tSize = Number(t.css("font-size").split("px")[0]);
      tWidth = $(t.children()[0]).width();
      /*if(tSize >= 50 && $('main').hasClass("morphed")){
        $('main').css("zoom", "unset").css("padding-left", "unset").removeClass("morphed");
      }*/
      if(tSize > 80){
        t.css("font-size", "80px");
        return;
      } 
    }
    t.css("font-size", (Number(t.css("font-size").split("px")[0]) - 4) + "px");
  }
}

function resizeMainSec(){
  var bh = $('.bottom').height();
  var mh = $('#mainSec').height();
  if($($('.hwchron')[0]).height() + $($('.hwchron')[0]).offset().top + bh > mh){
    var mZoom = Number($('main').css("zoom"));
    while($($('.hwchron')[0]).height() + $($('.hwchron')[0]).offset().top + bh > mh){
      $('main').css("zoom", mZoom - 0.01);
      mZoom = Number($('main').css("zoom"));
    }
  } else {
    $('main').css("zoom", 1);
    var mZoom = Number($('main').css("zoom"));
    while($($('.hwchron')[0]).height() + $($('.hwchron')[0]).offset().top + bh < mh 
      && mZoom <= 1){
      $('main').css("zoom", mZoom + 0.01);
      mZoom = Number($('main').css("zoom"));
    }

    if(mZoom > 1){
      $('main').css("zoom", 1);
    }
  }
}

function resizeAbout() {
  var ww = 1;
}

function initVis() {
  var bgc = new THREE.Color( 0x1a2125 );

  tScene = new THREE.Scene();
  tScene.background = bgc;
  tCam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  tRender = new THREE.WebGLRenderer();
  tRender.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( tRender.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  tScene.add( cube );

  tCam.position.z = 5;

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    
    tRender.render( tScene, tCam );
  }

  animate();
}