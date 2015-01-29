function addSphere() {
    var sphereShape = new CANNON.Sphere(0.3);
    var sphereBody = new CANNON.Body({mass: 1});
    sphereBody.addShape(sphereShape);
    sphereBody.velocity.set(0, 0, sphereSpeed);
    sphereBody.position.set(0, 1, -5);
    sphereBody.collisionResponse = false;
    //sphereBody.addEventListener("collide", recalcSphere);
    PhysBodies.push(sphereBody);
    World.add(sphereBody);

    var sphereGeometry = new THREE.SphereGeometry(0.5);
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x20ff8b});
    var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(3, 0, 0);
    PhysMeshes.push(sphereMesh);
    Scene.add(sphereMesh);
}

function catchSphere(e) {
    console.log("caught!");
    //console.log("e.body: " + e.body); // e.body.position とか使える
    //console.log("e.contact: " + e.contact);
    Point++;
    sphereSpeed += 0.4;
    recalcSphere(e);
}

function hittedByPlayer(e) {
}

function recalcSphere(e) {
    console.log(e.body.position);
    var tmpX = Math.random()*XRange*plusOrMinus();
    var tmpY = Math.random()*YRange*plusOrMinus();
    var tmpZ = -1*(Math.random()*ZRange+5);
    e.body.position.set(tmpX, tmpY, tmpZ);
    e.body.velocity.set(0, 0, sphereSpeed);
    console.log(e.body.position);
}

function plusOrMinus() {
    if(Math.random() > 0.5) {
	return 1;
    }
    else {
	return -1;
    }
}
