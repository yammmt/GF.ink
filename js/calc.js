function addSphere() {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+7);

    var sphereShape = new CANNON.Sphere(0.3);
    var sphereBody = new CANNON.Body({mass: 1});
    sphereBody.addShape(sphereShape);
    sphereBody.velocity.set(0, 0, sphereSpeed);
    sphereBody.position.set(tmpX, tmpY, tmpZ);
    sphereBody.collisionResponse = false;
    //sphereBody.addEventListener("collide", recalcSphere);
    PhysBodies.push(sphereBody);
    World.add(sphereBody);

    var sphereGeometry = new THREE.SphereGeometry(0.5);
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x20ff8b});
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(tmpX, tmpY, tmpZ);
    PhysMeshes.push(sphereMesh);
    Scene.add(sphereMesh);
}

function catchSphere(e) {
    //console.log("e.body: " + e.body); // e.body.position とか使える
    //console.log("e.contact: " + e.contact);
    Point++;
    genText();
    console.log("point: " + Point);
    sphereSpeed += 0.5;
    recalcSphere(e);
}

function recalcSphere(e) {
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+7);
    if(e.body) {
	e.body.position.set(tmpX, tmpY, tmpZ);
	e.body.velocity.set(0, 0, sphereSpeed);
	console.log(e.body.position);
    }
    else {
	e.position.set(tmpX, tmpY, tmpZ);
	console.log(e.position);
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
