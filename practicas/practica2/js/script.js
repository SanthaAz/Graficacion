// creamos el objeto Escena
const scene = new THREE.Scene();

// creamos el objeto Camara y pasamos parametros
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// crear el renderer para poder renderizar el escebario junto con todos los objetos
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(new THREE.Color(0x000000));

document.getElementById("webgl-output").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// crear y agregar un plano
const planeGeometry = new THREE.PlaneGeometry(100, 70);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// rotar y posicionar el plano
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15, 0, 0);
scene.add(plane);

// configurar y agregar lampara
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 40, -15);
scene.add(spotLight);

// acomodo de coordenadas de la camara

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);
controls.update();
scene.add(camera);

// creamos la funcion para animar y renderizar el escenario
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
