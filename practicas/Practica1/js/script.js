//Creamos el objeto escena
const scene = new THREE.Scene();

//Creamos el objeto camara y pasamos parametros
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//Creamos el renderer para poder renderizar el escenario junto con todos los objetos
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("webgl-output").appendChild(renderer.domElement);

//Agregar los ejes de ayuda 
const axesHelper= new THREE.AxesHelper(5);
scene.add(axesHelper);

//Crear y agregar un cubo

const geometryCubo = new THREE.BoxGeometry(2,2,2);  //Se agrega un cubo
const materialCube = new THREE.MeshBasicMaterial({color: 0x990000}); //Se agrega el color en RGB
const cube = new THREE.Mesh(geometryCubo, materialCube); //Se agrega el material
cube.position.x = 2;    //Position x
cube.position.y = 2;    //Position y
cube.position.z = -0.5; //Position z
scene.add(cube);

//En este mismo escenario agregar un cilindro y un torus


//Crear y agregar un circulo
const radius = 2;  // ui: radius
const segments = 24;  // ui: segments
//Si no se inicializa el parametro se puede agregar ahi mismo como con el cubo
const geometryCircle = new THREE.CircleGeometry(radius, segments);
const materialCircle = new THREE.MeshBasicMaterial({color: 0x000099});
const circulo = new THREE.Mesh(geometryCircle, materialCircle);
circulo.position.x = -2;
circulo.position.y = 2
circulo.position.z = -0.5;
scene.add(circulo);

//Crear y agregar un torus
const radiusTorus = 5;  // ui: radius
const tubeRadius = 2;  // ui: tubeRadius
const radialSegments = 8;  // ui: radialSegments
const tubularSegments = 24;  // ui: tubularSegments

const geometryTorus = new THREE.TorusGeometry(2, 0.75, 4, 11);
const materialTorus = new THREE.MeshBasicMaterial({color: 0xff0011});
const torus = new THREE.Mesh(geometryTorus, materialTorus);
torus.position.x = -4;
torus.position.y = 2
torus.position.z = 4;
scene.add(torus);

//Crear un cilindro

const geometryCylinder = new THREE.CylinderGeometry(1, 1, 2, 16);
const materialCylinder = new THREE.MeshBasicMaterial({color: 0xffff00});
const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
cylinder.position.x = 2;
cylinder.position.x = 2;
cylinder.position.x = 2;
scene.add(cylinder);






//Acomodo de coordenada de camaraas
camera.position.x = 3;
camera.position.y = 4;
camera.position.z = 8;
scene.add(camera);
camera.lookAt(scene.position); //Funciona para que mire lo que esta entre parentecis

//Creamos la funcion para animar y renderizar el escenario
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera)
};

animate();



