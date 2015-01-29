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
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x20ff8b});
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
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x783800});
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(tmpX, tmpY, tmpZ);
    MonakaMeshes.push(sphereMesh);
    Scene.add(sphereMesh);
}

function breakPoy() {
    Point++;
    genText();
    sphereSpeed += 0.5;
}

function breakMonaka() {
    Life--;
    sphereSpeed -= 0.25;
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
