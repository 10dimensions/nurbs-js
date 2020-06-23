var camera, scene, renderer, controls;

init();
animate();

function init() {

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.style.color = '#fff';
    info.style.link = '#f80';
    document.body.appendChild( info );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222 );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 150, 100, 500 );

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    scene.add( new THREE.AmbientLight( 0x222222 ) );

    var light = new THREE.PointLight( 0xffffff );
    light.position.copy( camera.position );
    scene.add( light );

    controls.update();
}


function animate() {

	requestAnimationFrame( animate );

	controls.update();
	renderer.render( scene, camera );

}