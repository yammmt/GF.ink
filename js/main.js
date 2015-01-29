function main() {
    initThree();
    initCannon();
    initPlayer();
    for(var i=0; i<NumOfSphere; i++) {
	addSphere();
    }
    PlayerBody.addEventListener("collide", catchSphere);
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    updatePhysics();
    Renderer.render(Scene, Camera);
}

function updatePhysics() {
    // applying Cannon.js's coordinates to Three.js's one
    World.step(TimeStep);
    for(var i=0; i<PhysBodies.length; i++) {
	if(PhysBodies[i].position.z > 3) { // passed player
	    recalcSphere(PhysBodies[i]);
	}
	else {
	    PhysMeshes[i].position.copy(PhysBodies[i].position);
	    PhysMeshes[i].quaternion.copy(PhysBodies[i].quaternion);
	}
    }
    PlayerMesh.position.copy(PlayerBody.position);
    PlayerMesh.quaternion.copy(PlayerBody.quaternion);
}

window.addEventListener("keydown", function(e) {
    //console.log(e.keyCode);
    if(e.keyCode == 37) { // left
	PlayerBody.position.x = PlayerBody.position.x-DeltaD;
    }
    else if(e.keyCode == 38) { // up
	PlayerBody.position.y = PlayerBody.position.y+DeltaD;
    }
    else if(e.keyCode == 39) { // right
	PlayerBody.position.x = PlayerBody.position.x+DeltaD;
    }
    else if(e.keyCode == 40) { // down
	PlayerBody.position.y = PlayerBody.position.y-DeltaD;
    }
});

window.addEventListener("DOMContentLoaded", main, false);