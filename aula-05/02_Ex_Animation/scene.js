"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
  sceneGraph: null,
  camera: null,
  renderer: null,
};

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph, sceneElements.camera);
requestAnimationFrame(computeFrame);

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(scene, camera) {
  // Create a ground plane
  const planeGeometry = new THREE.PlaneGeometry(10, 5);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(70, 158, 58)",
    side: THREE.DoubleSide,
  });
  const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(planeObject);

  planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  planeObject.receiveShadow = true;

  //const house = new House(sceneGraph, camera);
  //const airplaine = new Airplane(sceneGraph, camera);

  //airplane.position.set(4, (57/258) / 1.5, -1.3);
  createAirPlane(scene);  

  //create road
  scene.add(createRoad1(-7, -0.5, 0, 1.5));
  scene.add(createRoad1_5(-7, -0.5, 0, 0.5));
  scene.add(createRoad2(0.5, -4, 1.35, 0));
  scene.add(createRoad3(-6, -0.5, 0.35, -0.75));
  scene.add(createRoad3(-6, -0.5, 0.35, -0.53));
  scene.add(createRoad4(-0.5, -2.5, -2.5, -0.75));
  scene.add(createLargo());

  scene.add(createControlTower());
  scene.add(createAeroportBuilding());

  scene.add(createGate());
}

function createRoad1(l, w, posx, posz) {
  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.01, posz - 0.01);
  road.receiveShadow = true;

  const geometry = new THREE.PlaneGeometry(l / 40, w / 20);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });

  for (var i = 0; i < l + 20; i += 1) {
    const white_line = new THREE.Mesh(geometry, material);
    white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    white_line.position.set(-3.3 + posx + i * 0.5, 0.02, posz);
    const light = new THREE.PointLight(0x000000, 2, 180);
    light.position.set(-3.3 + posx + i * 0.5 + 1, 0.02, posz);
    white_line.receiveShadow = true;
    fullroad.add(white_line);
  }

  const white_line_cima = new THREE.Mesh( new THREE.PlaneGeometry(7, 0.01), material);
  white_line_cima.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_cima.position.set(0, 0.02, 1.235);

  const white_line_baixo = new THREE.Mesh( new THREE.PlaneGeometry(7, 0.01), material);
  white_line_baixo.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_baixo.position.set(0, 0.02, 1.75);

  const zero_1 = new THREE.Mesh( new THREE.PlaneGeometry(0.03, 0.1), material);
  zero_1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_1.position.set(3.15, 0.02, 1.6);

  const zero_2 = new THREE.Mesh( new THREE.PlaneGeometry(0.03, 0.1), material);
  zero_2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_2.position.set(3.3, 0.02, 1.6);

  const zero_3 = new THREE.Mesh( new THREE.PlaneGeometry(0.18, 0.03), material);
  zero_3.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_3.position.set(3.22, 0.02, 1.55);

  const zero_4 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.03), material);
  zero_4.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_4.position.set(3.22, 0.02, 1.65);

  const sete_1 = new THREE.Mesh(new THREE.PlaneGeometry(0.03, 0.13), material);
  sete_1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  sete_1.position.set(3.15, 0.02, 1.4);
  
  const sete_2 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.03), material);
  sete_2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  sete_2.position.set(3.22, 0.02, 1.35);
  sete_2.rotation.z = 0.2;
    
  fullroad.add(road);
  fullroad.add(white_line_cima);
  fullroad.add(white_line_baixo);

  fullroad.add(zero_1);
  fullroad.add(zero_2);
  fullroad.add(zero_3);
  fullroad.add(zero_4);

  fullroad.add(sete_1);
  fullroad.add(sete_2);

  return fullroad;
}

function createRoad1_5(l, w, posx, posz) {
  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.01, posz - 0.01);
  road.receiveShadow = true;

  const geometry = new THREE.PlaneGeometry(l / 40, w / 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  for (var i = 0; i < l + 20; i += 1) {
    const white_line = new THREE.Mesh(geometry, material);
    white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    white_line.position.set(-3.3 + posx + i * 0.5, 0.02, posz);
    const light = new THREE.PointLight(0x000000, 2, 180);
    light.position.set(-3.3 + posx + i * 0.5 + 1, 0.02, posz);
    white_line.receiveShadow = true;
    fullroad.add(white_line);
  }

  const white_line_cima = new THREE.Mesh( new THREE.PlaneGeometry(7, 0.01), material);
  white_line_cima.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_cima.position.set(0, 0.02, 0.25);

  const white_line_baixo = new THREE.Mesh( new THREE.PlaneGeometry(7, 0.01), material);
  white_line_baixo.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_baixo.position.set(0, 0.02, 0.75);

  const zero_1 = new THREE.Mesh( new THREE.PlaneGeometry(0.03, 0.1), material);
  zero_1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_1.position.set(3.15, 0.02, 0.45);

  const zero_2 = new THREE.Mesh( new THREE.PlaneGeometry(0.03, 0.1), material);
  zero_2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_2.position.set(3.3, 0.02, 0.45);

  const zero_3 = new THREE.Mesh( new THREE.PlaneGeometry(0.18, 0.03), material);
  zero_3.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_3.position.set(3.22, 0.02, 0.5);

  const zero_4 = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.03), material);
  zero_4.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  zero_4.position.set(3.22, 0.02, 0.4);

  const um = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.03), material);
  um.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  um.position.set(3.22, 0.02, 0.6);


  fullroad.add(zero_1);
  fullroad.add(zero_2);
  fullroad.add(zero_3);
  fullroad.add(zero_4);

  fullroad.add(um);
    
  fullroad.add(road);
  fullroad.add(white_line_cima);
  fullroad.add(white_line_baixo);
  return fullroad;
}

function createRoad2(l, w, posx, posz) {
  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.01, posz);
  road.rotation.z = Math.PI / 4;
  road.receiveShadow = true;

  const yellow_line_1 = new THREE.Mesh( new THREE.PlaneGeometry(2.25, 0.0099), new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
  yellow_line_1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  yellow_line_1.position.set(1.9, 0.02, -0.55);
  yellow_line_1.rotation.z = -Math.PI / 4;

  const yellow_line_2 = new THREE.Mesh( new THREE.PlaneGeometry(0.65, 0.0099), new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
  yellow_line_2.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  yellow_line_2.position.set(.35, 0.02, 1);
  yellow_line_2.rotation.z = -Math.PI / 4;

  fullroad.add(road);
  fullroad.add(yellow_line_1);
  fullroad.add(yellow_line_2);
  fullroad.position.set(posx, 0, posz);
  return fullroad;
}

function createRoad3(l, w, posx, posz) {
  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.01, posz - 0.01);
  road.receiveShadow = true;

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });

  const white_line_cima = new THREE.Mesh( new THREE.PlaneGeometry(4.9, 0.01), material);
  white_line_cima.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_cima.position.set(0.21, 0.02, -0.3);

  const white_line_baixo = new THREE.Mesh( new THREE.PlaneGeometry(5.6, 0.01), material);
  white_line_baixo.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  white_line_baixo.position.set(0.55, 0.02, -0.99);

  const yellow_line = new THREE.Mesh( new THREE.PlaneGeometry(5.8, 0.0099), new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
  yellow_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  yellow_line.position.set(0.425, 0.02, -0.66);

  fullroad.add(white_line_cima);
  fullroad.add(white_line_baixo);
  fullroad.add(yellow_line);
  fullroad.add(road);
  return fullroad;
}

function createRoad4(l, w, posx, posz) {
  const fullroad = new THREE.Group();

  const roadGeometry1 = new THREE.PlaneGeometry(l, w);
  const roadMaterial1 = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeometry1, roadMaterial1);
  road.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  road.position.set(posx, 0.01, posz - 0.01);
  road.receiveShadow = true;

  const yellow_line = new THREE.Mesh( new THREE.PlaneGeometry(2, 0.0099), new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
  yellow_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  yellow_line.rotation.z = Math.PI / 2;
  yellow_line.position.set(-2.5, 0.02, -0.8);

  fullroad.add(yellow_line);
  fullroad.add(road);
  return fullroad;
}

function createAirPlane(scene) {
  const airplane = new THREE.Group();
  airplane.name = "airplane";

  // Create Engine
  var geomEngine = new THREE.BoxGeometry(20/258, 50/258, 50/258, 1, 1, 1);
  var matEngine = new THREE.MeshPhongMaterial({color: Colors.white,shading: THREE.FlatShading});
  var engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 40/258;
  engine.castShadow = true;
  engine.receiveShadow = true;
  airplane.add(engine);

  // Create Tailplane
  var geomTailPlane = new THREE.BoxGeometry(35/258, 50/258, 5/258, 1, 1, 1);
  var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.white, shading: THREE.FlatShading });
  var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-140/258, 25/258, 0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  airplane.add(tailPlane);

  // Create Wing
  var geomSideWing = new THREE.BoxGeometry(40/258, 8/258, 195/258, 1, 1, 1);
  var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.blue,shading: THREE.FlatShading});
  var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
  sideWing.position.set(-55/258, 0, 0);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  airplane.add(sideWing);
    
  // Propeller
  var geomPropeller = new THREE.BoxGeometry(20/258, 10/258, 10/258, 1, 1, 1);
  var matPropeller = new THREE.MeshPhongMaterial({color: Colors.brown,shading: THREE.FlatShading});
  const propeller = new THREE.Mesh(geomPropeller, matPropeller);
  propeller.name = "propeller";
  propeller.castShadow = true;
  propeller.receiveShadow = true;

  // Blades
  var geomBlade = new THREE.BoxGeometry(1/258, 57/258, 20/258, 1, 1, 1);
  var matBlade = new THREE.MeshPhongMaterial({color: Colors.brownDark,shading: THREE.FlatShading });
  var blade = new THREE.Mesh(geomBlade, matBlade);
  blade.position.set(8/258, 0, 0);
  blade.castShadow = true;
  blade.receiveShadow = true;
  propeller.add(blade);
  propeller.position.set(50/258, 0, 0);
  airplane.add(propeller);

  // Cockpit
  var geomCockpit = new THREE.BoxGeometry(170/258, 50/258, 50/258, 1, 1, 1);
  var matCockpit = new THREE.MeshPhongMaterial({color: Colors.red,shading: THREE.FlatShading});

  var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.position.set(-55/258, 0,0 );
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  airplane.add(cockpit);


  airplane.rotation.y = -2.3;
  airplane.position.set(4, (57/258) / 1.5, -1.3);
  //airplane.position.set(1.3, (57/258) / 1.5, 1.4);
  scene.add(airplane);

  const pivot = new THREE.Object3D();
  pivot.add(airplane);
  scene.add(pivot)
  pivot.name="pivot"

}

function normalize (v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}

function createLargo() {

  const largo = new THREE.Group();

  const largoGeometry = new THREE.PlaneGeometry(1.2, 1.2 );
  const largoMaterial = new THREE.MeshStandardMaterial({color: 0x000000, side: THREE.DoubleSide});
  const largo_chao = new THREE.Mesh(largoGeometry, largoMaterial);
  largo_chao.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  largo_chao.position.set(-3, 0.01, -1.4);
  largo_chao.receiveShadow = true;

  const geometry = new THREE.TorusGeometry( 0.35, 0.01, 2, 100 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 , side: THREE.DoubleSide } );
  const torus = new THREE.Mesh( geometry, material );
  torus.position.set(-3, 0.02, -1.4);
  torus.rotation.x = Math.PI / 2;

  largo.add(largo_chao);
  largo.add(torus);

  return largo;
}


function createControlTower() {
  const controlTower = new THREE.Group();

  const geometryRoom = new THREE.CylinderGeometry( 7/15, 4/15, 17/45, 32 );
  const materialRoom = new THREE.MeshPhongMaterial( {color: 0xcccccc} );
  const room = new THREE.Mesh(geometryRoom, materialRoom);
  room.position.set(-3.7, 1, -1.5);

  const geometryBase = new THREE.CylinderGeometry( 4/15, 4/15, 14/15, 32 );
  const materialBase = new THREE.MeshPhongMaterial( {color: 0xcccccc} );
  const base = new THREE.Mesh(geometryBase, materialBase);
  base.position.set(-3.7, 0.5, -1.5);

  const geometryRoof = new THREE.CylinderGeometry( 6.5/15, 6.5/15, 0.05, 32 );
  const materialRoof = new THREE.MeshPhongMaterial( {color: 0x666666} );
  const roof = new THREE.Mesh(geometryRoof, materialRoof);
  roof.position.set(-3.7, 1.2, -1.5);

  var geometryCubeBase = new THREE.BoxBufferGeometry(0.5, 1, 0.5);
  var materialCubeBase = new THREE.MeshLambertMaterial({ color: 0x000000 });
  const cubeBase = new THREE.Mesh(geometryCubeBase, materialCubeBase);
  cubeBase.position.set(-3.7, 0.5, -1.5);

  var geometryAntena = new THREE.BoxBufferGeometry(0.03, 0.2, 0.03);
  var materialAntena = new THREE.MeshLambertMaterial({ color: 0x000000 });
  const antena1 = new THREE.Mesh(geometryAntena, materialAntena);
  antena1.position.set(-3.9, 1.3, -1.5);

  const antena2 = new THREE.Mesh(geometryAntena, materialAntena);
  antena2.position.set(-3.5, 1.3, -1.2);

  const antena3 = new THREE.Mesh(geometryAntena, materialAntena);
  antena3.position.set(-3.6, 1.3, -1.6);

  controlTower.add(room);
  controlTower.add(base);
  controlTower.add(roof);
  controlTower.add(cubeBase);
  controlTower.add(antena1);
  controlTower.add(antena2);
  controlTower.add(antena3);

  controlTower.position.set(-0.4, 0, 0.75);

  return controlTower;
}


function createGate() {
  const gate = new THREE.Group();

  var geometryBuilding = new THREE.BoxBufferGeometry(0.25, 0.25, 1.8);
  var materialBuilding = new THREE.MeshLambertMaterial({ color: 0xccccccc });
  const gateBox = new THREE.Mesh(geometryBuilding, materialBuilding);
  gateBox.position.set(2.7, 0.4, -1.5);
  gateBox.rotation.y = 1.35;
  
  gate.add(gateBox);

  return gate;
}

function createAeroportBuilding() {

  const aeroportBuilding = new THREE.Group();

  var geometryBuilding = new THREE.BoxBufferGeometry(4.5, 0.7, 1);
  var materialBuilding = new THREE.MeshLambertMaterial({ color: 0xccccccc });
  const building = new THREE.Mesh(geometryBuilding, materialBuilding);
  building.position.set(0, 0.35, -1.5);

  var geometryBuildingRoofTop = new THREE.BoxBufferGeometry(4.2, 0.5, 0.8);
  var materialBuildingRoofTop = new THREE.MeshLambertMaterial({ color: 0x000000 });
  const buildingRoofTop = new THREE.Mesh(geometryBuildingRoofTop, materialBuildingRoofTop);
  buildingRoofTop.position.set(0, 0.5, -1.5);



  const geometryJanela = new THREE.PlaneGeometry(4, 0.3);
  const materialJanela = new THREE.MeshStandardMaterial({ color: Colors.blue, side: THREE.DoubleSide });
  const janela = new THREE.Mesh(geometryJanela, materialJanela);
  janela.position.set(0, 0.4, -0.99);

  
  const geometrySeparador = new THREE.PlaneGeometry(0.025, 0.3);
  const materialSeparador = new THREE.MeshStandardMaterial({ color: Colors.brown, side: THREE.DoubleSide });

  const separador1 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador1.position.set(-2, 0.4, -0.98);

  const separador2 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador2.position.set(-1.5, 0.4, -0.98);

  const separador3 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador3.position.set(-1, 0.4, -0.98);

  const separador4 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador4.position.set(-0.5, 0.4, -0.98);

  const separador5 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador5.position.set(0, 0.4, -0.98);

  const separador6 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador6.position.set(0.5, 0.4, -0.98);

  const separador7 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador7.position.set(1, 0.4, -0.98);

  const separador8 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador8.position.set(1.5, 0.4, -0.98);

  const separador9 = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador9.position.set(2, 0.4, -0.98);

  const geometryMuldura = new THREE.PlaneGeometry(0.025, 4);
  const materialMuldura = new THREE.MeshStandardMaterial({ color: Colors.brown, side: THREE.DoubleSide });

  const mulduraCima = new THREE.Mesh(geometryMuldura, materialMuldura);
  mulduraCima.position.set(0, 0.55, -0.98);
  mulduraCima.rotation.z = 1.57;

  const mulduraBaixo = new THREE.Mesh(geometryMuldura, materialMuldura);
  mulduraBaixo.position.set(0, 0.25, -0.98);
  mulduraBaixo.rotation.z = 1.57;

  const janela_ = new THREE.Mesh(geometryJanela, materialJanela);
  janela_.position.set(0, 0.4, -2.01);
  janela_.rotation.y = Math.PI;

  const separador1_ = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador1_.position.set(-2, 0.4, -2.01);

  const separador9_ = new THREE.Mesh(geometrySeparador, materialSeparador);
  separador9_.position.set(2, 0.4, -2.01);

  const mulduraCima_ = new THREE.Mesh(geometryMuldura, materialMuldura);
  mulduraCima_.position.set(0, 0.55, -2.01);
  mulduraCima_.rotation.z = 1.57;

  const mulduraBaixo_ = new THREE.Mesh(geometryMuldura, materialMuldura);
  mulduraBaixo_.position.set(0, 0.25, -2.01);
  mulduraBaixo_.rotation.z = 1.57;


  aeroportBuilding.add(building);
  aeroportBuilding.add(buildingRoofTop);
  aeroportBuilding.add(janela);
  aeroportBuilding.add(separador1);
  aeroportBuilding.add(separador2);
  aeroportBuilding.add(separador3);
  aeroportBuilding.add(separador4);
  aeroportBuilding.add(separador5);
  aeroportBuilding.add(separador6);
  aeroportBuilding.add(separador7);
  aeroportBuilding.add(separador8);
  aeroportBuilding.add(separador9);

  aeroportBuilding.add(mulduraCima);
  aeroportBuilding.add(mulduraBaixo);

  aeroportBuilding.add(janela_);
  aeroportBuilding.add(separador1_);
  aeroportBuilding.add(separador9_);

  aeroportBuilding.add(mulduraCima_);
  aeroportBuilding.add(mulduraBaixo_);

  return aeroportBuilding;
}


// Displacement value
var delta = 0.1;
function computeFrame(time) {
  // Can extract an object from the scene Graph from its name
  const light = sceneElements.sceneGraph.getObjectByName("light");

  // Apply a small displacement

  // if (light.position.x >= 10) {
  //   delta *= -1;
  // } else if (light.position.x <= -10) {
  //   delta *= -1;
  // }
  // light.translateX(delta);

  var targetY = normalize(1, -0.75, 0.75, 25, 175) / 18;
  var targetX = normalize(1, -0.75, 0.75, -100, 100) / 18;

  let airplane = sceneElements.sceneGraph.getObjectByName("airplane");
  let propeller = sceneElements.sceneGraph.getObjectByName("propeller");
  let pivot = sceneElements.sceneGraph.getObjectByName("pivot");

  if (airplane.position.x > 1.16 && airplane.position.z < 1.41) {

    // Move the plane at each frame by adding a fraction of the remaining distance
    airplane.position.x += (targetY - airplane.position.y) * -0.001;
    airplane.position.z += (targetY - airplane.position.y) * 0.001;
  } else if (airplane.position.x > 0.906 && airplane.position.z > 1.419) {
    airplane.position.x += (targetX - airplane.position.x) * -0.001;
    airplane.rotation.y += -0.009;
  } else if (airplane.position.y < 1) {
    if (airplane.position.x > -1.306) {
      airplane.position.x -= 0.004 * delta;
    } else {
      airplane.position.x -= 0.009 * delta;
      airplane.position.y += 0.0009 * delta + 0.0009;
    }
  } else if (airplane.position.y > 1) {
    if (airplane.position.x > -11.63) {
      airplane.position.x += (targetX - airplane.position.x) * -0.001;
      airplane.rotation.y += -0.009;
    } else if (pivot.rotation.y > -3.3) {
      console.log(pivot.rotation.y);
      pivot.rotation.y -= 0.01;
    } else {
      console.log(pivot.rotation.y);
      console.log("tou aqui oh boi do caralho filho da puta arrombado cara cu de garrafa");
      airplane.position.y -= 1;



      

    }
  } 


  delta += 0.01;

  //TODO fazer com que o propeller ande mais rapido a medida que ele descola
  propeller.rotation.x += 0.278;

  //airplane.position.x +=  0.005;


  // Rendering
  helper.render(sceneElements);

  // Call for the next frame
  requestAnimationFrame(computeFrame);
}
