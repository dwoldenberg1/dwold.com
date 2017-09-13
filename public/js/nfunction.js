/*** Globals ***/
  /** Three **/
  var tScene;
  var tCam;
  var tRender;
  var tComp;
  var glitch;
  var PP, t, tilelist, sb;
  var doTiles;
  var tilescalled = false;
  var mouse = { x: 0, y: 0 };

  var hoveredorclicked = true;

/*** jQuery on-ready ***/
$(function(){
  initVis();

  $('#d-home a').mousemove(function(){
    tilescalled = true;
    glitch.gwStart = true;
    glitch.goWild = true;
    hoveredorclicked = true;
    tScene.remove(sb);
  }).mouseleave(function(){
    glitch.goWild = false;
    hoveredorclicked = false;
    tScene.add(sb);
  }).click(function(){
    tilescalled = true;
    glitch.gwStart = true;
    glitch.goWild = true;
    hoveredorclicked = true;
    tScene.remove(sb);
    setTimeout(function(){
      glitch.goWild = false;
      hoveredorclicked = false;
      tScene.add(sb);
    },  1500);
  });

  $('#main-cont').fullpage({
    anchors: ['main-sect', 'about-sect', 'project-sect', 'contact-sect'],
    scrollingSpeed: 1000,
    scrollOverflow: true,
    keyboardScrolling: false,
    fadingEffect: true,
    fixedElements: 'canvas',
    normalScrollElements: '#proj-cont',
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
  /* see https://stemkoski.github.io/Three.js/Mouse-Over.html */

  var bgc = new THREE.Color( 0x1a2125 );
  var matrix = new THREE.Group();

  /* Config for tile filter */
  var num_tiles = 500;

  /* Config for Node Cloud */
  var num_nodes = 50;
  var positions, colors;
  var nodes, node_positions;


  /* Setting it up */
  tScene = new THREE.Scene();
  tScene.background = bgc;
  tCam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  tRender = new THREE.WebGLRenderer( { antialias: true });
  tRender.setPixelRatio( window.devicePixelRatio );
  tRender.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( tRender.domElement );

  tCam.position.z = 37;

  /* Tiles on Picture */

  doTiles = function(addTiles) {
    tilelist = new THREE.Group();

    for(var x = 0; x < num_tiles; x++){
      var one = (Math.random() * 10);
      var two = (Math.random() * 10);
      var thr = (Math.random() * 10);
      var htc = 25.5; /* height top constant */
      var hbc = 6.5; /* height bottom constant */


      /* translation x,y, and z respectively */

      /*var t1min = (Math.min((one * ((one%2 ==0)?1:-1)), -6) != -5);
      var t1max = (Math.max((one * ((one%2 ==0)?1:-1)), 4) != 4);
      t1 = (t2min)?-5:(one * ((one%2 ==0)?1:-1));
      t1 = (t2max)?4:t1;*/
      t1 = (3 + (one * 7 * ((Math.round(one * 7)%2 ==0)?1:-1)));

      var t1,t2,t3;
      var t2exp = (15 + (two * 0.5 * ((Math.round(two * 1.5)%2 ==0)?1:-1)));
      var t2min = (Math.min(t2exp, hbc) != hbc);
      var t2max = (Math.max(t2exp, htc) != htc);
      t2 = (t2min)?hbc:((t2max)?thc:t2exp);

      /* Just needs to be less than the image, can be any negative number though, adds an interesting layering */
      /* right now its negative, changing it to pos/neg has a big impact on range because of the zoom factor */
      t3 = thr * (((Math.round(thr)%2) == 0)?-1:-1);

      while((two + t2) > htc){
        t2-= 0.1
      }
      var tileg = new THREE.PlaneGeometry( one, two);
      tileg.translate(t1, t2, t3);
      var tilem = new THREE.MeshBasicMaterial( {
        color: 'rgba(' + Math.floor((1/one) * 255) + ',' + Math.floor((1/two) * 255) + ',' + Math.floor((1/thr) * 255) + ',1)',
        opacity: 1
      });
      var tile = new THREE.Mesh( tileg, tilem );
      tilelist.add( tile );
    }
    if(!addTiles){
      tScene.add(tilelist);
    }
  };

  /* Title and whatnot */
  var floader = new THREE.FontLoader();

  var dwload = function( texture ) { 
    var pp, ppg;

    pp = new THREE.MeshBasicMaterial( { map: texture } );
    ppg = new THREE.PlaneGeometry(15.5, 19.5, 1, 1);
    PP = new THREE.Mesh(ppg, pp);
    PP.position.set(-0.15, 12.5, 0);

    /* add spooky box */

    var sbtile = new THREE.PlaneGeometry(3.6, 5.3);
    sbtile.translate(0, 13, 5);
    var tilesb = new THREE.MeshBasicMaterial( { color: '#000000', opacity: 1 });
    sb = new THREE.Mesh( sbtile, tilesb );

    /* Final adding of everything */ 

    tScene.add(PP);
    tScene.add(t);
    tScene.add(sb);
    doTiles(1);
    tScene.add(tilelist);
  }; 

  var fload = function ( font ) {
    var temp;
    var textShape = new THREE.BufferGeometry();
    var textmesh = new THREE.MeshBasicMaterial( {
      color: '#ffffff',
      transparent: true,
      opacity: 0.7
    } );

    var textmsg = "        { david woldenberg }\n\n[programmer | creative | adventurer]";
    var tshapes = font.generateShapes( textmsg, 1, 100);
    var fg = new THREE.ShapeGeometry( tshapes );

    fg.computeBoundingBox();
    fg.translate( -15.2, 0.7, 3 );
    textShape.fromGeometry( fg );;

    t = new THREE.Mesh( textShape, textmesh );

    /* Spooky picture of me inside callback */
    var dload = new THREE.TextureLoader();

    dload.load( 
      '/public/img/dwold.jpeg',
      dwload,
      function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); }
    );
  };

  floader.load( 'public/js/pt_mono.json', fload);

//  tScene.add(matrix);

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

  tComp = new THREE.EffectComposer( tRender );
  tComp.addPass( new THREE.RenderPass( tScene, tCam ) );

  glitch = new THREE.GlitchPass();
  glitch.renderToScreen = true;
  tComp.addPass( glitch );

  setTimeout(function(){
    glitch.goWild = false;
    hoveredorclicked = false;
  },  1500);

  function animate() {
    requestAnimationFrame( animate );

    /* Intersection stuff */

    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    vector.unproject( tCam );
    var ray = new THREE.Raycaster( tCam.position, vector.sub( tCam.position ).normalize() );

    if(typeof sb != "undefined"){
      var intersects = ray.intersectObjects( [sb] );
      
      // if it intersects
      if(!hoveredorclicked){
        if ( intersects.length > 0 ) {
          glitch.goWild = true;
          tScene.remove(sb);
        } else {
          tScene.add(sb);
          glitch.goWild = false;
        }
      }
    }

    /* Point Cloud stuff */

    tRender.render( tScene, tCam );
    tComp.render();
  }

  function onWindowResize(){
    tCam.aspect = window.innerWidth / window.innerHeight;
    
    tCam.updateProjectionMatrix();
    tRender.setSize( window.innerWidth, window.innerHeight );
  }

  function onDocumentMouseMove( event ) 
  { 
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  window.addEventListener( 'resize', onWindowResize, false );
  
  animate();
}