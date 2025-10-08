// Get the canvas element
var canvas = document.getElementById('renderCanvas');

// Create BabylonJS engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight("light1", 
    new BABYLON.Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Materials
  var mat0 = new BABYLON.StandardMaterial('mat0', scene);
  mat0.diffuseColor = new BABYLON.Color3(1, 1, 0);

  var mat1 = new BABYLON.StandardMaterial('mat1', scene);
  mat1.diffuseColor = new BABYLON.Color3(1, 0, 0);
  
  var mat2 = new BABYLON.StandardMaterial('mat2', scene);
  mat2.diffuseColor = new BABYLON.Color3(0, 1, 0);

  // Our built-in 'ground' shape. Params: name, width, depth, 
  // subdivs, scene
  var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  ground.material = mat0

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", 
    {diameter: 2, segments: 16}, scene);
  sphere.material = mat1;
  sphere.position.y = 1;
  sphere.position.z = -1;

  var cube = BABYLON.MeshBuilder.CreateBox("cube", 
    { size: 1, height: 3 }, scene);
  cube.position = new BABYLON.Vector3(1, 1.5, 0);
  cube.material = mat2;

  // Merge sphere and cube into one mesh
  var mergedMesh = BABYLON.Mesh.MergeMeshes([sphere, cube], 
    true, true, undefined, false, true);
  mergedMesh.name = "mergedMesh";  // Assign a name to the merged mesh
  mergedMesh.position = new BABYLON.Vector3(0, 0, 0);

  return scene;
};

// Call the createScene function
var scene = createScene();

// Set initial position for animation
var animationSpeed = 0.02; // Speed of the movement

// Render loop with mesh animation
engine.runRenderLoop(function () {
  scene.render();

  // Animate merged mesh movement upwards
  var mergedMesh = scene.getMeshByName("mergedMesh");  // Get the merged mesh by name
  if (mergedMesh) {
    if ((mergedMesh.position.y > 2) || (mergedMesh.position.y < 0)) {
      animationSpeed *= -1;
    }

    mergedMesh.position.y += animationSpeed;  // Move the merged mesh upwards
    mergedMesh.position.x += (Math.random()-0.5)/10;
  }
});

// Resize the engine if the window is resized
window.addEventListener('resize', function () {
  engine.resize();
});

