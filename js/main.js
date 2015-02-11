function main() {
    initThree();
    initCannon();
    initPlayer();
    for(var i=0; i<NumOfPoy; i++) {
	addPoy();
    }
    for(var i=0; i<NumOfMonaka; i++) {
	addMonaka();
    }
    PlayerBody.addEventListener("collide", recalcObj);
    loop();
}

function loop() {
    if(Life == 0) { // game over
	showResult();
	Renderer.render(Scene, Camera);
    }
    else {
        requestAnimationFrame(loop);
        updatePhysics();
        Renderer.render(Scene, Camera);
    }
}

function updatePhysics() {
    // applying Cannon.js's coordinates to Three.js's one
    World.step(TimeStep);
    for(var i=0; i<PoyBodies.length; i++) {
	if(PoyBodies[i].position.z > 3) { // passed player
	    recalcObj(PoyBodies[i]);
	}
	else {
	    PoyMeshes[i].position.copy(PoyBodies[i].position);
	    PoyMeshes[i].quaternion.copy(PoyBodies[i].quaternion);
	}
    }
    for(var i=0; i<MonakaBodies.length; i++) {
	if(MonakaBodies[i].position.z > 3) { // passed player
	    recalcObj(MonakaBodies[i]);
	}
	else {
	    MonakaMeshes[i].position.copy(MonakaBodies[i].position);
	    MonakaMeshes[i].quaternion.copy(MonakaBodies[i].quaternion);
	}
    }
    clipPos(PlayerBody);
    PlayerMesh.position.copy(PlayerBody.position);
    //PlayerMesh.quaternion.copy(PlayerBody.quaternion);
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
