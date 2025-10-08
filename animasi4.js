// Get the canvas element
var canvas = document.getElementById('renderCanvas');

// Create BabylonJS engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-3, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-1, 1, 0), scene);
  light.intensity = 0.7;

  // Materials
  var mat0 = new BABYLON.StandardMaterial('mat0', scene);
  mat0.diffuseColor = new BABYLON.Color3(1, 1, 0);

  var mat1 = new BABYLON.StandardMaterial('mat1', scene);
  mat1.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red sphere

  var mat2 = new BABYLON.StandardMaterial('mat2', scene);
  mat2.diffuseColor = new BABYLON.Color3(0, 1, 0); // Green cube (initial)

  // Ground
  var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  ground.material = mat0;

  // Sphere (beating ball)
  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter: 2, segments: 16 }, scene);
  sphere.material = mat1;
  sphere.position.y = 1;

  // Cube (static size, random color)
  var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
  cube.position = new BABYLON.Vector3(1, 1.5, 0);
  cube.material = mat2;

  // Store materials for easy access
  scene.mat1 = mat1;
  scene.mat2 = mat2;

  return scene;
};

var scene = createScene();
scene.clearColor = new BABYLON.Color3(0, 0, 0);

// Animation variables
var time = 0;
var colorChangeInterval = 1.5; // seconds between color changes
var colorTimer = 0;

engine.runRenderLoop(function () {
  scene.render();

  var sphere = scene.getMeshByName("sphere1");
  var cube = scene.getMeshByName("cube");
  var mat2 = scene.mat2;

  if (sphere && cube) {
    // Gentle floating
    var groupY = Math.sin(Date.now() * 0.001) * 0.5 + 1;
    sphere.position.y = groupY + 0.5;
    cube.position.y = groupY + 1.5;

    // 🩶 Heartbeat animation
    time += engine.getDeltaTime() / 1000;
    var beatSpeed = 1.2;
    var t = (time % beatSpeed) / beatSpeed;
    let scale = 1;

    if (t < 0.1) {
      scale = 1.3 - 3 * (t - 0.05) ** 2;
    } else if (t < 0.2) {
      scale = 1.15 - 10 * (t - 0.15) ** 2;
    }

    sphere.scaling.set(scale, scale, scale);

    // 🎨 Random color change for cube
    colorTimer += engine.getDeltaTime() / 1000;
    if (colorTimer > colorChangeInterval) {
      colorTimer = 0;

      // Pick a random color
      var r = Math.random()*0.3+0.7;
      var g = Math.random()*0.3+0.7;
      var b = Math.random()*0.3+0.7;
      mat2.diffuseColor = new BABYLON.Color3(r, g, b);
    }
  }
});

window.addEventListener('resize', function () {
  engine.resize();
});
