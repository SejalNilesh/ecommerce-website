// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setClearColor(0x1abc9c);

renderer.setSize(window.innerWidth, window.innerHeight);
let shoe;

// Load GLTF model

const loader = new THREE.GLTFLoader();
loader.load('./assets/salomon_x_ultra_04w.glb', function (gltf) {
shoe=gltf.scene;
scene.add(shoe);
shoe.position.set(2.9, -1, 0); // Position of the shoe
shoe.scale.set(16, 16, 16); // Scale of the shoes

// Add a spotlight
const spotLight = new THREE.SpotLight(0xffffff); // White light
spotLight.position.set(10,10 ,10); // Position of the spotlight
spotLight.angle = Math.PI / 6; // Spotlight angle
spotLight.penumbra = 0.3; // Soft edges
spotLight.decay = 2; // Distance falloff
spotLight.distance = 50; // Maximum distance of light
spotLight.intensity = 5; // Adjust brightness here (default is 1)

// Add light to the scene
scene.add(spotLight);

// Optional: Add a helper to visualize the spotlight
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
}, undefined, function (error) {
console.error(error);
});


// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (shoe) {
    shoe.rotation.y += 0.01; // Rotate around the Y-axis
  }
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});