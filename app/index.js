/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import THREELib from 'three-js';

// ================================
// START YOUR APP HERE
// ================================

var THREE = THREELib(["OrbitControls"])

var renderer = new THREE.WebGLRenderer( { antialias: true } );
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
var scene = new THREE.Scene();
var camPosition = 0;

function init() {

    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	document.body.appendChild( renderer.domElement );
    camera.position.set( 0, 0, 35 );
    scene.add( camera );

    controls.enableDamping = false;

    var geometry = new THREE.PlaneBufferGeometry( 10, 20, 32 );
    var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('assets/images/okgo/okgo_00000.jpg') } );


    var plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    window.addEventListener( 'resize', onResize, false );
    window.addEventListener('mousewheel', function(e) {

        camera.position.y += e.deltaY / 10
    })

    animate();
}

function animate() {

	renderer.render( scene, camera );
	requestAnimationFrame( animate );
}

function onResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = ( window.innerWidth / window.innerHeight );
    camera.updateProjectionMatrix();
}

document.addEventListener('DOMContentLoaded', init);
