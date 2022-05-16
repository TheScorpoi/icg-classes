"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021

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
  createAirPlane(scene);  

  //create road
  scene.add(createRoad1(-7, -0.5, 0, 1.5));
  scene.add(createRoad2(0.5, -5.5, 1.35, 0));

  scene.add(createControlTower());
  scene.add(createAeroportBuilding());
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
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  for (var i = 0; i < l + 21; i += 1) {
    const white_line = new THREE.Mesh(geometry, material);
    white_line.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    white_line.position.set(-3.3 + posx + i * 0.5, 0.02, posz);
    const light = new THREE.PointLight(0x000000, 2, 180);
    light.position.set(-3.3 + posx + i * 0.5 + 1, 0.02, posz);
    white_line.receiveShadow = true;
    fullroad.add(white_line);
  }
    
  fullroad.add(road);
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

  const geometry = new THREE.PlaneGeometry(l / 40, w / 20);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });

  for (var i = 0; i < l + 21; i += 1) {
    //TODO: fazer as linhs da pista diagonal
    // const white_line = new THREE.Mesh( geometry, material );
    // white_line.rotateOnAxis(new THREE.Vector3(1, -1.1, 0), Math.PI / 2);
    // white_line.position.set(posx, 0.2 , posz + i)
    // white_line.receiveShadow = true;
    // fullroad.add(white_line);
  }

  fullroad.add(road);
  fullroad.position.set(posx, 0, posz);
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
  var geomSideWing = new THREE.BoxGeometry(40/258, 8/258, 210/258, 1, 1, 1);
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
  controlTower.add(cubeBase);
  controlTower.add(antena1);
  controlTower.add(antena2);
  controlTower.add(antena3);

  return controlTower;
}


function createAeroportBuilding() {

  const aeroportBuilding = new THREE.Group();

  var geometryBuilding = new THREE.BoxBufferGeometry(4.5, 0.7, 1);
  var materialBuilding = new THREE.MeshLambertMaterial({ color: 0xccccccc });
  const building = new THREE.Mesh(geometryBuilding, materialBuilding);
  building.position.set(0, 0.35, -1.5);


  //janelas
  // function createBuildingWindows(posy, posz, z){
  //   const windows = new THREE.Group();  

  //   for (var x = -60; x < 80; x +=60){
  //     for (var y = 150; y > -160; y-=70){
  //       const window = new THREE.Mesh( new THREE.PlaneGeometry( 35, 45 ), new THREE.MeshStandardMaterial({ color: 0x82fff0, side: THREE.DoubleSide }) );
  //       const r = new THREE.Mesh( new THREE.BoxBufferGeometry(40, 5, 70), new THREE.MeshStandardMaterial({ color: 0x362d20 }) );
        
  //       r.castShadow = true; r.receiveShadow = true;
        
  //       r.position.set(x, y-posy, posz);
  //       window.position.set(x, y, z)
  //       windows.add(window, r);
  //     }
  //   }
  //   return windows;
  // }

  aeroportBuilding.add(building);

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
