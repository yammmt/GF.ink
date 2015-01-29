// Three.js
var Scene;
var Camera;
var TopCamera;
var Renderer;
var Width, Height;
var DeltaD = 0.1;
var PlayerMesh;
var PrintedPointText;

// Cannon.js
var World;
var PlayerBody;
var TimeStep = 1.0/60.0;
var PoyBodies = []; // body of cannon.js
var PoyMeshes = []; // mesh of three.js
var MonakaBodies = []; 
var MonakaMeshes = [];

// sphere's status
var NumOfPoy = 4;
var NumOfMonaka = 3;
var XRange = 5;
var YRange = 3;
var ZRange = 15;

// difficulty
var Point = 0;
var Life = 1;
var sphereSpeed = 2;
