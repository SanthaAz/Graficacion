// Creamos el objeto Escena
const scene = new THREE.Scene();

//Estadisticas
var stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.domElement);

// Creamos el objeto Camara y pasamos parámetros
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

// Crear el renderer para poder renderizar el escenario junto con todos los objetos
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));

document.getElementById("webgl-output").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabledDamping = true;

// Crear un plano
const planeGeometry = new THREE.PlaneGeometry(70,70, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({color: 
    0xffffff,
    roughness: 0.044,
    metalness: 0.0
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
// Rotar y posicionar el plano
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -2 ,0);
scene.add(plane);

// Inicicalizar variables  para los incrementos de los controles


// Acomodo de coordenadas de la camara
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
scene.add(camera);
camera.lookAt(scene.position);
controls.update();

animate();

// Creamos la función para animar y renderizar el escenario
function animate() {
    
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
    stats.end();
};

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize, false);
