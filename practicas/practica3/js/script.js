// Creamos el objeto Escena
const scene = new THREE.Scene();

// Creamos el objeto Camara y pasamos parámetros
const camera = new THREE.PerspectiveCamera(85,window.innerWidth/window.innerHeight,0.1,1000);

// Crear el renderer para poder renderizar el escenario junto con todos los objetos
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));
// Opciones para la configuración de las sombras
renderer.shadowMap.Type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

document.getElementById("webgl-output").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Crear un plano
const planeGeometry = new THREE.PlaneGeometry(60,20);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
// Rotar y posicionar el plano
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15,0,0);
scene.add(plane);

// Crear y agregar un cubo
const cubeGeometry = new THREE.BoxGeometry(4,4,4);
const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000
});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.castShadow = true;
cube.position.set(-4,2,0);
scene.add(cube);

// Crear y agregar una esfera
const sphereGeometry = new THREE.SphereGeometry(4,20,20);
const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(20,4,2);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

// Configurar y agregar lámpara
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-30,30,-15);
spotLight.castShadow = true;
spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
spotLight.shadow.camera.far = 130;
spotLight.shadow.camera.near = 40;
scene.add(spotLight);

const ambientLight = new THREE.AmbientLight(0x353535);
scene.add(ambientLight);

// Acomodo de coordenadas de la camara
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
scene.add(camera);
camera.lookAt(scene.position);
controls.update();

var step = 0;
animate();

// Creamos la función para animar y renderizar el escenario
function animate() {
    
    // rotar el cubo sobre sus ejes
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    // rebotar la esfera arriba y abajo
    step += 0.04;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
};

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize, false);
