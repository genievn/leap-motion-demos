var camera, scene, renderer,
	geometry, material, mesh,
	posX, posY, posZ,
	pointer, roundedX;

var originX			= 600,
	originY			= 600,
	originZ			= 600,
	maxX			= originX,
	maxY			= originY,
	maxZ			= originZ,
	maxSpan			= 100,
	maxZSpan		= 160,
	offsetY			= 1400;

function translateX(distance) {
	return (distance / maxSpan) * maxX;
}
function translateY(distance) {
	return offsetY - ((distance / maxSpan) * maxY);
}
function translateZ(distance){
	return (distance / maxZSpan) * maxZ;
}
Leap.loop(function(frame) {
	pointer = frame.pointables[0];
	if(pointer){
		posX = translateX(pointer.tipPosition[0]);
		posY = translateY(pointer.tipPosition[1]);
		posZ = translateZ(pointer.tipPosition[2]);
		animate(posX, posY, posZ);
	}
});

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 500;

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry( 200, 200, 200 );
	material = new THREE.MeshBasicMaterial({
		color: 0x0084d6,
		wireframe: true,
		wireframeLinewidth: 10
	});

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
}

function animate(posX,posY,posZ) {
	mesh.rotation.x = posY / 200;
	mesh.rotation.y = posX / 200;
	mesh.rotation.z = posZ / 200;
	renderer.render( scene, camera );
}