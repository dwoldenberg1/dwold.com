/*** Globals ***/
  /** Three **/
  var tScene;
  var tCam;
  var tRender;
  var tComp;
  var glitch;
  var PP;
  var tilelist;
  var doTiles;

/*** jQuery on-ready ***/
$(function(){
  initVis();





  $('#main-cont').fullpage({
    anchors: ['main-sect', 'about-sect', 'project-sect', 'contact-sect'],
    scrollingSpeed: 1000,
    scrollOverflow: true,
    keyboardScrolling: false,
    fadingEffect: true,
    fixedElements: 'canvas',
    css3: true,
    menu: '.nav-cont',
    afterLoad: function( anchorLink, index){
      $('.nav-cont').children().children().css("color", "#ffffff");
      $('#d-home a').css("color", "#ffffff");
      if(index > 1) { $($('.nav-cont').children()[index-2]).children().css("color", "#0092c2"); }
      else                             { $('#d-home a').css("color", "#0092c2"); }
    }
  });

});

function initVis() {
  /* see https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_drawcalls.html */
  /* see https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_glitch.html */

  var bgc = new THREE.Color( 0x1a2125 );
  var matrix = new THREE.Group();

  /* Config for tile filter */
  var num_tiles = 10;

  /* Config for Node Cloud */
  var num_nodes = 50;
  var positions, colors;
  var nodes, node_positions;


  /* Setting it up */
  tScene = new THREE.Scene();
  tScene.background = bgc;
  tCam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//  tScene.add(matrix);

  tRender = new THREE.WebGLRenderer( { antialias: true });
  tRender.setPixelRatio( window.devicePixelRatio );
  tRender.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( tRender.domElement );

  /* Spooky picture of me */
  var dload = new THREE.TextureLoader();
  var pp, ppg;
  PP = dload.load( 
    '/public/img/dwold.jpeg',
    function( texture ) {    
      pp = new THREE.MeshBasicMaterial( { map: texture } );
      ppg = new THREE.PlaneGeometry(15.5, 19.5, 1, 1);
      PP = new THREE.Mesh(ppg, pp);
      PP.position.set(0, 13, 0);
      tScene.add(PP);
      return PP;
    },
    function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); }
  );

  /* Tiles on Picture */

  doTiles = function() {
    tilelist = new THREE.Group();

    for(var x = 0; x < num_tiles; x++){
      var one = Math.round(Math.random() * 10);
      var two = Math.round(Math.random() * 10);
      var thr = Math.round(Math.random() * 10);

      var t1,t2,t3;
      var t2min = (Math.min((8 + (two * ((two%2 ==0)?1:-1))), 4.5) != 4.5);
      var t2max = (Math.max((8 + (two * ((two%2 ==0)?1:-1))), 13.5) != 13.5);
      t2 = (t2min)?4.5:(8 + (two * ((two%2 ==0)?1:-1)));
      t2 = (t2max)?13.5:t2;

      var t1min = (Math.min((one * ((one%2 ==0)?1:-1)), -6) != -5);
      var t1max = (Math.max((one * ((one%2 ==0)?1:-1)), 4) != 4);
      t1 = (t2min)?-5:(one * ((one%2 ==0)?1:-1));
      t1 = (t2max)?4:t1;

      var tileg = new THREE.PlaneGeometry( one/2, two/2);
      tileg.translate(t1, t2, 5 + (thr * ((thr%2 ==0)?1:-1)));
      var tilem = new THREE.MeshBasicMaterial( {
        color: 'rgba(' + Math.round((1/one) * 255) + ',' + Math.round((1/two) * 255) + ',' + Math.round((1/thr) * 255) + ',1)',
        opacity:1
      });
      var tile = new THREE.Mesh( tileg, tilem );
      tilelist.add( tile );
    }

    tScene.add(tilelist);
  };

  doTiles();

  /* Title and whatnot */
  var floader = new THREE.FontLoader();
  
  floader.load( 'public/js/pt_mono.json', function ( font ) {
    var t;
    var textShape = new THREE.BufferGeometry();
    var textmesh = new THREE.MeshBasicMaterial( {
      color: '#ffffff',
      transparent: true,
      opacity: 0.7
    } );

    var textmsg = "       { david woldenberg }\n\n[programmer | student | adventurer]";
    var tshapes = font.generateShapes( textmsg, 1, 100);
    var fg = new THREE.ShapeGeometry( tshapes );

    fg.computeBoundingBox();
    fg.translate( -14.2, 1.4, 3 );
    textShape.fromGeometry( fg );;

    t = new THREE.Mesh( textShape, textmesh );
    tScene.add(t);
  });


  /* Node Cloud */
  var line_segs = (num_nodes * num_nodes);

  positions = new Float32Array( line_segs * 3 );
  colors = new Float32Array( line_segs * 3 );

  var pMaterial = new THREE.PointsMaterial( {
    color: 0xFFFFFF,
    size: 3,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
  } );

  nodes = new THREE.BufferGeometry();
  node_positions = new Float32Array( num_nodes * 3 );

  /* Glitching */

  tCam.position.z = 37;

  tComp = new THREE.EffectComposer( tRender );
  tComp.addPass( new THREE.RenderPass( tScene, tCam ) );

  glitch = new THREE.GlitchPass();
  glitch.renderToScreen = true;
  tComp.addPass( glitch );

  function animate() {
    requestAnimationFrame( animate );

    /* Point Cloud stuff */

    tRender.render( tScene, tCam );
    tComp.render();
  }

  function onWindowResize(){
    tCam.aspect = window.innerWidth / window.innerHeight;
    
    tCam.updateProjectionMatrix();
    tRender.setSize( window.innerWidth, window.innerHeight );
  }

  window.addEventListener( 'resize', onWindowResize, false );
  
  animate();
}