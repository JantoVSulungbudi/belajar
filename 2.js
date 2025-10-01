// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Create the Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Create the scene
// var createScene = function () {
const createScene = () => {
  // Create a basic scene with a camera and a light
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, 
    Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", 
    new BABYLON.Vector3(1, 1, 0), scene);

  // Material to change the colors of the spheres
  const redMaterial = new BABYLON.StandardMaterial("redMat", scene);
  redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

  const blueMaterial = new BABYLON.StandardMaterial("blueMat", scene);
  blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);

  // Create a loop to generate multiple spheres
  for (let i = 0; i < 2; i++) {
    const sphere = BABYLON.MeshBuilder.CreateSphere(`sphere${i}`, 
      { diameter: 1 }, scene);
    sphere.position.x = i * 2; // Positioning spheres on the X-axis

    // Conditional statement to assign material
    if (i % 2 === 0) {
      sphere.material = redMaterial;  // Red for even indices
    } else {
      sphere.material = blueMaterial; // Blue for odd indices
    }
  }
  return scene;
};

// Call the createScene function to set up the scene
const scene = createScene();

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Resize event handler
window.addEventListener("resize", () => {
  engine.resize();
});

