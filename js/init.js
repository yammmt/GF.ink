function initThree() {
    initScene();
    initCamera();
    initRenderer();
    initLight();
    //initAxis();
    initText();
}

function initScene() {
    Scene = new THREE.Scene();
}

function initCamera() {
    Width = window.innerWidth;
    Height = window.innerHeight;
    var fov = 60;
    var aspect = Width/Height;
    var near = 1;
    var far = 50;
    Camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    Camera.position.set(0, 0, 5);
}

function initRenderer() {
    Renderer = new THREE.WebGLRenderer();
    Renderer.setSize(Width, Height);
    Renderer.setClearColor(0x53c8ea); // (color, alpha)
    document.getElementById('print_zone').appendChild(Renderer.domElement);
}

function initLight() {
    var light = new THREE.DirectionalLight(0xffffff, 1.2); // (color, power)
    light.position.set(0, 0, 1);
    //var light = new THREE.AmbientLight(0xffffff);
    //light.position.set(0,0,-5);
    Scene.add(light);
}

function initAxis() {
    var axis = new THREE.AxisHelper(100);
    axis.position.set(0, 0, 0);
    Scene.add(axis);
}

function initCannon() {
    World = new CANNON.World();
    World.gravity.set(0, 0, 0); // gravities to each axis
    World.broadphase = new CANNON.NaiveBroadphase(); // way to judge collision
    World.solver.iterations = 10; // number of iterations
    World.solver.tolerance = 0.1; // tolerance err.
}

function initPlayer() {

/*
    // for collision
    var playerGeometry = new THREE.BoxGeometry(0.3, 0.5, 1.1);
    var playerMaterial = new THREE.MeshPhongMaterial({color: 0xff8b20});
    TmpMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    TmpMesh.position.z = 0;
    Scene.add(TmpMesh);
*/

    loader = new THREE.JSONLoader();
    loader.load( 'model/goldfish_centered.json', function ( geometry, materials ) { 
       //var faceMaterial = new THREE.MeshFaceMaterial( materials );
       var faceMaterial = new THREE.MeshBasicMaterial({color: 0xffb240, transparent: true, opacity: 0.9});
       PlayerMesh = new THREE.Mesh( geometry, faceMaterial );
       PlayerMesh.position.set(0, 0, 0);
       PlayerMesh.scale.set(0.5, 0.5, 0.5);
       PlayerMesh.rotation.set(Math.PI, 0, 0);
       Scene.add(PlayerMesh);
    } );

    // fix needed
    var shape = new CANNON.Box(new CANNON.Vec3(0.3, 0.5, 1.1));
    PlayerBody = new CANNON.Body({mass: 1});
    PlayerBody.addShape(shape);
    PlayerBody.velocity.set(0, -2.3, 0);
    World.add(PlayerBody);
}

function initText() {
    //Scene.remove(PrintedPointText);
    var textGeo = new THREE.TextGeometry( 'Score: '+Point, { 
            size: 2, height: 1, curveSegments: 4,
            font: "helvetiker", weight: "normal", style: "normal",
            bevelEnabled: false
    } );
    var material = new THREE.MeshLambertMaterial( { color: 0x5555aa } );
    PrintedPointText = new THREE.Mesh(textGeo, material);
    PrintedPointText.position.set(-22, 13, -25);
    Scene.add(PrintedPointText);
}

function showResult() {
    Scene.remove(PrintedPointText);
    Scene.remove(PlayerMesh);
    for(var i=0; i<PoyMeshes.length; i++) {
	Scene.remove(PoyMeshes[i]);
    }
    for(var i=0; i<MonakaMeshes.length; i++) {
	Scene.remove(MonakaMeshes[i]);
    }

    var textGeo = new THREE.TextGeometry( 'Score: '+Point, { 
            size: 2, height: 1, curveSegments: 4,
            font: "helvetiker", weight: "normal", style: "normal",
            bevelEnabled: false
    } );
    var material = new THREE.MeshLambertMaterial( { color: 0xaa5555 } );
    PrintedPointText = new THREE.Mesh(textGeo, material);
    PrintedPointText.position.set(-5, 2, -20);
    Scene.add(PrintedPointText);
}
