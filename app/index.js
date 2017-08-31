/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss'
import THREELib from 'three-js'

// ================================
// START YOUR APP HERE
// ================================

var THREE = THREELib(["OrbitControls"])

var renderer = new THREE.WebGLRenderer( { antialias: true } )
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 )
//var controls = new THREE.OrbitControls( camera, renderer.domElement )
//controls.enableZoom = false
var scene = new THREE.Scene()
var camPosition = 0

var totalFrames = 300
var materials = []


function init() {

    renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	renderer.gammaInput = true
	renderer.gammaOutput = true
	document.body.appendChild( renderer.domElement )
    camera.position.set( 0, 0, 45 )
    scene.add( camera )

    //controls.enableDamping = false

    var geometry = new THREE.PlaneBufferGeometry( 10, 20, 32 )
    var material = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('assets/images/okgo/okgo_00000.jpg') } )

    loadFrames()

    var plane = new THREE.Mesh( geometry, material )
    scene.add( plane )

    window.addEventListener( 'resize', onResize, false )
    window.addEventListener('mousewheel', function(e) {

        camera.position.x += e.deltaX / 10
    })

    animate()
}


function loadFrames() {

    var frameGeometry = new THREE.PlaneBufferGeometry(20,10,1)

    for(var i = 0; i < totalFrames; i++) {
        var mat = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(
                `assets/images/moment/moment_${pad(i, 4)}.jpg`
            )}
        )
        var frame = new THREE.Mesh(frameGeometry, mat)
        frame.position.x = (i * 21)
        scene.add(frame)
    }
}


function animate() {

	renderer.render( scene, camera )
	requestAnimationFrame( animate )
}

function onResize() {
    renderer.setSize( window.innerWidth, window.innerHeight )
    camera.aspect = ( window.innerWidth / window.innerHeight )
    camera.updateProjectionMatrix()
}

document.addEventListener('DOMContentLoaded', init)



function pad(n, width, z) {
    z = z || '0'
    n = n + ''
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}
