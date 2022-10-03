// Creamos el objeto Escena
const scene = new THREE.Scene();

// Creamos el objeto Camara y pasamos parámetros
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

// Crear el renderer para poder renderizar el escenario junto con todos los objetos
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000));
// Opciones para la configuración de las sombras
renderer.shadowMap.Type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

document.getElementById("webgl-output").appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabledDamping = true;

// Crear un plano
const planeGeometry = new THREE.PlaneGeometry(20,20);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;
// Rotar y posicionar el plano
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -2 ,0);
scene.add(plane);

// Crear y agregar un cubo
const cubeGeometry = new THREE.BoxGeometry(6,4,6);
const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.6
});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.name = 'cube';
cube.castShadow = true;
cube.position.set(-4,1,0);
scene.add(cube);


// Configurar y agregar lámpara
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-15,30,-15);
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

animate();

// Creamos la función para animar y renderizar el escenario
function animate() {


    
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
