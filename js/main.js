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
    for(var i=0; i<NumOfGlass; i++) {
	addGlass();
    }
    for(var i=0; i<NumOfBubble; i++) {
	addBubble();
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
    for(var i=0; i<GlassMeshes.length; i++) {
	if(GlassMeshes[i].position.z > 3) {
	    GlassMeshes[i].position.z = -2*ZRange;
	}
	else {
	    GlassMeshes[i].position.z += GlassMeshSpeed;
	}
    }
    for(var i=0; i<BubbleMeshes.length; i++) {
	if(BubbleMeshes[i].position.y > 5) {
	    BubbleMeshes[i].position.y = -3*Math.random()-2;
	}
	else {
	    BubbleMeshes[i].position.y += BubbleMeshSpeed;
	}
    }
    clipPos(PlayerBody);
    PlayerMesh.position.copy(PlayerBody.position);
    //TmpMesh.position.copy(PlayerBody.position);
    //PlayerMesh.quaternion.copy(PlayerBody.quaternion);
    function clipPos(myBody) {
        if(myBody.position.y < -1*YRange) {
	    myBody.position.y = -1*YRange;
        }
        else if(myBody.position.y > YRange) {
            myBody.position.y = YRange;
        }
        if(myBody.position.x < -1*XRange) {
            myBody.position.x = -1*XRange;
        }
        else if(myBody.position.x > XRange) {
            myBody.position.x = XRange;
        }
    }
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
    /*
    else if(e.keyCode == 40) { // down
	PlayerBody.position.y = PlayerBody.position.y-DeltaD;
    }
    */
});

window.addEventListener("DOMContentLoaded", main, false);
