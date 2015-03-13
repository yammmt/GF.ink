// Three.js
var Scene;
var Camera;
var TopCamera;
var Renderer;
var Width, Height;
const DeltaD = 0.2; // プレイヤーの移動量
const LowPower = -1.8; // プレイヤーの重力
var PlayerMesh;
//var TmpMesh;
var PrintedPointText;

// Cannon.js
var World;
var PlayerBody;
const TimeStep = 1.0/60.0; // 60fps
var PoyBodies = []; // body of cannon.js
var PoyMeshes = []; // mesh of three.js
var MonakaBodies = []; 
var MonakaMeshes = [];

// sphere's status
var NumOfPoy = 6;
var NumOfMonaka = 4;
const XRange = 5;
const YRange = 3;
const ZRange = 15;

// glass
var NumOfGlass = 8;
var GlassMeshes = [];
var GlassMeshSpeed = 0.25;

// bubble
var NumOfBubble = 30;
var BubbleMeshes = [];
var BubbleMeshSpeed = 0.3;

// difficulty
var Point = 0;
var Life = 1;
var sphereSpeed = 10;
