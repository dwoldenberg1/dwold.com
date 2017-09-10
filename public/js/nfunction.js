/*** Globals ***/
  /** Three **/
  var tScene;
  var tCam;
  var tRender;
  var tComp;
  var glitch;

/*** jQuery on-ready ***/
$(function(){
  initVis();

  $('#main-cont').fullpage({
    anchors: ['main-sect', 'about-sect', 'project-sect', 'contact-sect'],
    scrollingSpeed: 1000,
    fadingEffect: true,
    fixedElements: 'canvas',
    css3: true,
    menu: '.nav-cont',
    afterSlideLoad: function(anchorlink, index){
      if(index) { $($('.nav-cont').children()[index-1]).css("color", "#0092c2"); }
      else                             { $('#d-home a').css("color", "#0092c2"); }
    }
  });

});

function initVis() {
  /* see https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_drawcalls.html */
  /* see https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_glitch.html */

  var bgc = new THREE.Color( 0x1a2125 );
  var matrix = THREE.Group();

  /* Config for Node Cloud */
  var num_nodes = 50;
  var positions, colors;
  var nodes, node_positions;


  /* Setting it up */
  tScene = new THREE.Scene();
  tScene.background = bgc;
  tCam = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  tScene.add(matrix);

  tRender = new THREE.WebGLRenderer( { antialias: true });
  tRender.setPixelRatio( window.devicePixelRatio );
  tRender.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( tRender.domElement );

  /* Spooky picture of me */
  var dwold = new THREE.ImageUtils.loadTexture( '/public/img/dwold.jpeg' );
  var pp = new THREE.MeshBasicMaterial( { map: dwold } );
  var ppg = new THREE.PlaneGeometry(14, 17, 1, 1);
  var PP = new THREE.Mesh(ppg, pp);
  PP.position.set(0, 15, 0);

  tScene.add(PP);

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

  tCam.position.z = 40;

  tComp = new THREE.EffectComposer( tRender );
  tComp.addPass( new THREE.RenderPass( tScene, tCam ) );

  glitch = new THREE.GlitchPass();
  glitch.renderToScreen = true;
  tComp.addPass( glitch );

  function animate() {
    requestAnimationFrame( animate );
    
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