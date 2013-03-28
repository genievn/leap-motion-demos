LEAP = {
	init: function(){
		Leap.loop(function(data) {
			LEAP.filterData(data);
		});		
	},
	filterData: function(data){
		if( data.valid ){		
			if(typeof data.hands[0] !== "undefined" ){
				
				var hand = data.hands[0];				
//				console.log(hand);				
				DEMO.sphereRadius = hand.sphereRadius;
				DEMO.spherePosX = hand.palmPosition[0];
				DEMO.spherePosY = hand.palmPosition[1] - 275;
				DEMO.spherePosZ = hand.palmPosition[2] - 50;
				DEMO.sphereRotX = (hand.rotation[1][2] * 4) * -1;
				DEMO.sphereRotY = hand.rotation[0][2] * 3;
				DEMO.sphereRotZ = hand.rotation[0][1] * -1;	
				
				DEMO.update();
			}
		}
	}
};

DEMO = {
	renderer: null,
	camera: null,
	scene: null,
	sphereRadius: 100,
	
	windowWidth: 600,
	windowHeight: 400,
	
	spherePosX: 0,
	spherePosY: 0,
	spherePosZ: 0,
	
	sphereRotX: 0,
	sphereRotY: 0,
	sphereRotZ: 0,
	
	rotationMatrix: new THREE.Matrix4(),	
	
	init: function(){
		DEMO.setupScene();
		DEMO.addLight();
		DEMO.createSphere();
		LEAP.init();
	},
	update: function(){
		DEMO.createSphere();
	},
	setupScene: function(){

		DEMO.windowWidth	=	$(window).width(),
		DEMO.windowHeight	=	$(window).height();

		var viewingAngle =	60,
			aspect =		DEMO.windowWidth / DEMO.windowHeight,
			near =			0.1,
			far =			10000;

		var $container = $('#main-container');
		$container.css({
			'width': DEMO.windowWidth+'px',
			'height': DEMO.windowHeight+'px'
		});

		DEMO.renderer =	new THREE.WebGLRenderer();
		DEMO.camera =	new THREE.PerspectiveCamera(
			viewingAngle,
			aspect,
			near,
			far
		);
			
		DEMO.scene = new THREE.Scene();
		
		DEMO.scene.add(DEMO.camera);
		DEMO.camera.position.z = 500;
		
		DEMO.renderer.setSize(DEMO.windowWidth, DEMO.windowHeight);
		
		$container.append(DEMO.renderer.domElement);
	},
	createSphere: function(){
		
		var radius = DEMO.sphereRadius,
			segments = 16,
			rings = 16;
	
		var sphereMaterial = new THREE.MeshPhongMaterial({
			specular: 0xffffff,
			ambient: 0x00619e,
			color: 0x0084d6,
			wireframe: true
		});
			
		var mesh = new THREE.Mesh(
			new THREE.SphereGeometry(
				radius,
				segments,
				rings
			),
			sphereMaterial
		);
			
		DEMO.scene.add(mesh);	
		
//		console.log( DEMO.spherePosX.toFixed(2)+', '+DEMO.spherePosY.toFixed(2)+', '+DEMO.spherePosZ.toFixed(2) );		
		mesh.position.set( DEMO.spherePosX, DEMO.spherePosY, DEMO.spherePosZ );
		
//		console.log( DEMO.sphereRotX.toFixed(2)+', '+DEMO.sphereRotY.toFixed(2)+', '+DEMO.sphereRotZ.toFixed(2) );
		mesh.rotation.set(DEMO.sphereRotX, DEMO.sphereRotY, DEMO.sphereRotZ);
		
		mesh.matrix.setRotationFromEuler(mesh.rotation);
		
		DEMO.renderScene();		
		DEMO.scene.remove(mesh);
	},
	addLight: function(){
		var pointLight = new THREE.PointLight(0xFFFFFF);
		pointLight.position.x = 200;
		pointLight.position.y = 500;
		pointLight.position.z = 1000;		
		DEMO.scene.add(pointLight);
	},
	renderScene: function(){
		DEMO.renderer.render(DEMO.scene, DEMO.camera);
	}
};

//---[ HERE WE GO... ]--------------------------------------------------------//
$(document).ready( DEMO.init );
//----------------------------------------------------------------------------//