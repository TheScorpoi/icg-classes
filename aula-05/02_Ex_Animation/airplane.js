
//COLORS
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

const Airplane = {

  constructor: function(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.mesh = new THREE.Group();
    this.createPlane(scene);
  },

    
  createEngine: function() {
    // Create Engine
    var geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    var matEngine = new THREE.MeshPhongMaterial({color: Colors.white,shading: THREE.FlatShading});
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
    },
      
    // Create Tailplane
  createTailplane: function() {
    var geomTailPlane = new THREE.BoxGeometry(35, 50, 5, 1, 1, 1);
    var matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.white, shading: THREE.FlatShading });
    var tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-140, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
  },
  
    // Create Wing
    createWing: function() {
    var geomSideWing = new THREE.BoxGeometry(40, 8,250, 1, 1, 1);
    var matSideWing = new THREE.MeshPhongMaterial({ color: Colors.blue,shading: THREE.FlatShading});
    var sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(-55, 0, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
    },
      
    // Propeller
  createPropeller: function() {
    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    var matPropeller = new THREE.MeshPhongMaterial({color: Colors.brown,shading: THREE.FlatShading});
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
  },
    // Blades
  createBlades: function() {
    var geomBlade = new THREE.BoxGeometry(1, 87, 20, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({color: Colors.brownDark,shading: THREE.FlatShading });
    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  },

    // Cockpit
  createCockpit: function() {
    var geomCockpit = new THREE.BoxGeometry(170, 50, 50, 1, 1, 1);
    var matCockpit = new THREE.MeshPhongMaterial({color: Colors.red,shading: THREE.FlatShading});
  
    // we can access a specific vertex of a shape through
    // the vertices array, and then move its x, y and z property:
    //geomCockpit.verticesNeedUpdate = true;

    // geomCockpit.vertices[4].y -= 10;
    // geomCockpit.vertices[4].z += 20;
    // geomCockpit.vertices[5].y -= 10;
    // geomCockpit.vertices[5].z -= 20;
    // geomCockpit.vertices[6].y += 30;
    // geomCockpit.vertices[6].z += 20;
    // geomCockpit.vertices[7].y += 30;
    // geomCockpit.vertices[7].z -= 20;

    //var geometry = new THREE.BufferGeometry().fromGeometry(geomCockpit);
  
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.position.set(-55, 0,0 );
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
  },

   loop: function() {
    updatePlane();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  },

  updatePlane: function() {
    var targetY = this.normalize(1, -0.75, 0.75, 25, 175);
    var targetX = this.normalize(1, -0.75, 0.75, -100, 100);
  
    // Move the plane at each frame by adding a fraction of the remaining distance
    this.mesh.position.y += (targetY - this.mesh.position.y) * 0.1;
  
    // Rotate the plane proportionally to the remaining distance
    this.mesh.rotation.z = (targetY - this.mesh.position.y) * 0.0128;
    this.mesh.rotation.x = (this.mesh.position.y - targetY) * 0.0064;
  
    this.propeller.rotation.x += 0.278;

    this.mesh.position.z +=  -2.5;
  },

  normalize: function(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + pc * dt;
    return tv;
  },
  
  // 3D Models
  
  createPlane: function(scene) {

    this.createEngine();
    this.createTailplane();
    this.createWing();
    this.createPropeller();
    this.createBlades();
    this.createCockpit();
    this.mesh.position.set(300, 4, 100);
    this.mesh.rotation.y = Math.PI / 2;
    this.mesh.rotation.x = Math.PI / 2;
    scene.add(this.mesh);

  }

}
  