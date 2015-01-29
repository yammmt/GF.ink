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
