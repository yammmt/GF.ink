// Three.js
var Scene;
var Camera;
var TopCamera;
var Renderer;
var Width, Height;
var DeltaD = 0.04;
var PlayerMesh;
var PrintedPointText;

// Cannon.js
var World;
var PlayerBody;
var TimeStep = 1.0/60.0;
var PhysBodies = []; // body of cannon.js
var PhysMeshes = []; // mesh of three.js

// sphere's status
var NumOfSphere = 4;
var XRange = 5;
var YRange = 3;
var ZRange = 15;

// difficulty
var Point = 0;
var Life = 1;
var sphereSpeed = 2;
