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

  $('#d-home').hover(function(){
    $(this).src
  });
});

function initVis() {
  var bgc = new THREE.Color( 0x1a2125 );
  var matrix = THREE.Group();

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

  tComp = new THREE.EffectComposer( tRender );
  tComp.addPass( new THREE.RenderPass( tScene, tCam ) );

  glitch = new THREE.GlitchPass();
  glitch.renderToScreen = true;
  tComp.addPass( glitch );

  function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    
    //tRender.render( tScene, tCam );
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