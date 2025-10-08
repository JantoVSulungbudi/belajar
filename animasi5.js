// Get the canvas element
var canvas = document.getElementById('renderCanvas');

// Create BabylonJS engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

  // Create scene
  var scene = new BABYLON.Scene(engine);

  // Camera
  var camera = new BABYLON.FreeCamera("camera1", 
    new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  // Light
  var light = new BABYLON.HemisphericLight("light1", 
    new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Materials
  var mat0 = new BABYLON.StandardMaterial('mat0', scene);
  mat0.diffuseColor = new BABYLON.Color3(1, 1, 0);

  var mat2 = new BABYLON.StandardMaterial('mat2', scene);
  mat2.diffuseColor = new BABYLON.Color3(0, 1, 0);

  // Ground
  var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  ground.material = mat0;

  // Cube
  var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
  cube.position = new BABYLON.Vector3(1, 1.5, 1);
  cube.material = mat2;

  // === Load the Heart model instead of sphere ===
  BABYLON.SceneLoader.ImportMesh("", "./", "Heart.glb", scene, function (meshes) {
    var heart = meshes[0];
    heart.name = "heart";
    heart.position = new BABYLON.Vector3(0, 1, 0);
    heart.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02); // adjust as needed

    // Nice red shiny material
    var heartMat = new BABYLON.PBRMaterial("heartMat", scene);
    heartMat.albedoColor = new BABYLON.Color3(0.9, 0.1, 0.1);
    heartMat.metallic = 0.3;
    heartMat.roughness = 0.4;
    heartMat.subSurface.isTranslucencyEnabled = true;
    heartMat.subSurface.tintColor = new BABYLON.Color3(1, 0, 0);
    heart.material = heartMat;

    // Animate heart beating (scaling up/down)
    var beat = 0;
    var baseScale = 0.02;
    var amplitude = 0.004;

    engine.runRenderLoop(function () {
      scene.render();

      // Heart beating
      beat += 0.15;
      var scale = baseScale + Math.sin(beat) * amplitude;
      heart.scaling.set(scale, scale, scale);

      // Random cube color
      if (Math.random() < 0.02) {
        cube.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      }
    });
  });

  return scene;
};

// Create scene
var scene = createScene();

// Resize event
window.addEventListener('resize', function () {
  engine.resize();
});

