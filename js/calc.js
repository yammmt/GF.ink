function addPoy() {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+9);

    var sphereShape = new CANNON.Sphere(0.3);
    var sphereBody = new CANNON.Body({mass: 1});
    sphereBody.addShape(sphereShape);
    sphereBody.velocity.set(0, 0, sphereSpeed);
    sphereBody.position.set(tmpX, tmpY, tmpZ);
    sphereBody.collisionResponse = false;
    sphereBody.addEventListener("collide", breakPoy);
    PoyBodies.push(sphereBody);
    World.add(sphereBody);

    var sphereGeometry = new THREE.SphereGeometry(0.5);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x20ff8b});
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(tmpX, tmpY, tmpZ);
    PoyMeshes.push(sphereMesh);
    Scene.add(sphereMesh);
}

function addMonaka() {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+9);

    var sphereShape = new CANNON.Sphere(0.3);
    var sphereBody = new CANNON.Body({mass: 1});
    sphereBody.addShape(sphereShape);
    sphereBody.velocity.set(0, 0, sphereSpeed);
    sphereBody.position.set(tmpX, tmpY, tmpZ);
    sphereBody.collisionResponse = false;
    sphereBody.addEventListener("collide", breakMonaka);
    MonakaBodies.push(sphereBody);
    World.add(sphereBody);

    var sphereGeometry = new THREE.SphereGeometry(0.5);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x783800});
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(tmpX, tmpY, tmpZ);
    MonakaMeshes.push(sphereMesh);
    Scene.add(sphereMesh);
}

function addGlass() {
    var tmpX = (Math.random()*XRange+3)*plusOrMinus();
    var tmpY = -8.0;
    var tmpZ = -1*(Math.random()*ZRange+9);

    var loader = new THREE.JSONLoader();
    if(Math.random() > 0.5) {
	var fileName = 'model/glass01.json';
    }
    else {
	var fileName = 'model/glass02.json';
    }
    loader.load(fileName, function(geometry, materials) {
	var faceMaterial = new THREE.MeshFaceMaterial(materials);
	var glassMesh = new THREE.Mesh(geometry, faceMaterial);
	glassMesh.scale.set(0.6, 0.6, 0.6);
	glassMesh.position.set(tmpX, tmpY, tmpZ);
	glassMesh.rotation.set(0, Math.PI/2, 0);
	GlassMeshes.push(glassMesh);
	Scene.add(glassMesh)
    })
}

function addBubble() {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = Math.random()*ZRange-3;

    var bubbleGeometry = new THREE.SphereGeometry(0.2);
    var bubbleMaterial = new THREE.MeshBasicMaterial({color: 0x75d7ff, transparent: true, opacity: 0.9});
    var bubbleMesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubbleMesh.position.set(tmpX, tmpY, tmpZ);
    BubbleMeshes.push(bubbleMesh);
    Scene.add(bubbleMesh);
}

function breakPoy(e) {
    if(e.body.collisionResponse == true) {
        Point++;
        genText();
        sphereSpeed += 0.5;
    }
}

function breakMonaka(e) {
    if(e.body.collisionResponse == true) {
        Life--;
        sphereSpeed -= 0.25;
    }
}

function recalcObj(e) {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+9);
    if(e.body) {
	e.body.position.set(tmpX, tmpY, tmpZ);
	e.body.velocity.set(0, 0, sphereSpeed);
	//console.log(e.body.position);
    }
    else {
	e.position.set(tmpX, tmpY, tmpZ);
	//console.log(e.position);
    }
}

function plusOrMinus() {
    if(Math.random() > 0.5) {
	return 1;
    }
    else {
	return -1;
    }
}

function genText() {
    // set by manual
    Scene.remove(PrintedPointText);
    var textGeo = new THREE.TextGeometry( 'Score: '+Point, { 
            size: 2, height: 1, curveSegments: 4,
            font: "helvetiker", weight: "normal", style: "normal",
            bevelEnabled: false
    });
    var material = new THREE.MeshLambertMaterial({ color: 0x5555aa });
    PrintedPointText = new THREE.Mesh(textGeo, material);
    PrintedPointText.position.set(-22, 13, -25);
    Scene.add(PrintedPointText);
}

