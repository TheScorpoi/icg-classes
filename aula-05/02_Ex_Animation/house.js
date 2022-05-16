class House {

    constructor(scene, camera) {

        this.scene = scene;
        this.camera = camera;
        this.house = new THREE.Group();
        this.airplane = new Airplane(scene, camera);
        this.create(scene);
        //this.createRoad(370, 0, 0, scene);
        //this.createAirplanes(scene);

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async createAirplanes(scene) {

        for (let i = 0; i < 10; i++) {
            
            this.airplane = new Airplane(scene, this.camera);
            await this.sleep(7000);
            
        }
    }
    
    create(scene) {
        //const light = new THREE.AmbientLight(0xCCCCCC);
        //scene.add(light);

        //this.createGrass(scene);
        this.createHouse();
        scene.add(this.house);
        //scene.fog = new THREE.Fog(0xffffff, 10, 1500);

        //this.createPlane(scene);
    }

    createHouse() {
        this.createFloor();
        const sideWall = this.createSideWall();
        const sideWall2 = this.createSideWall();
        sideWall2.position.z = 300;

        this.createFrontWall();
        this.createBackWall();

        const roof = this.createRoof();
        const roof2 = this.createRoof();
        roof2.rotation.x = Math.PI / 2;
        roof2.rotation.y = Math.PI / 4 * 0.6;
        roof2.position.y = 130;
        roof2.position.x = -50;
        roof2.position.z = 155;

        this.createWindow();
        this.createDoor();
    }


    createRoad(posX, posY, posZ, scene){
        const geometry = new THREE.PlaneGeometry( 400, 2000 );
        const material = new THREE.MeshLambertMaterial( {color: 0x000000, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );
        plane.rotation.x=Math.PI/2;
        plane.position.x=posX;
        plane.position.y=posY+0.5;
        plane.position.z=posZ;
        plane.receiveShadow = true;

        for (var i=0; i < 1000; i+=10){
            const geometry = new THREE.PlaneGeometry( 10, 3 );
            const material = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
            const plane = new THREE.Mesh( geometry, material );
            plane.rotation.x=Math.PI/2;
            plane.position.x=posX + i;
            plane.position.y=posY+0.6;
            plane.position.z=i;
            plane.receiveShadow = true;
            scene.add(plane)
        }
        scene.add(plane)
    }


    createGrass(scene) {
        const planeGeometry = new THREE.PlaneGeometry(10, 3);
        const planeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(70, 158, 58)', side: THREE.DoubleSide });
        const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
        scene.add(planeObject);

        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        scene.sceneGraph.add(ambientLight);
    }

    createFloor() {
        const geometry = new THREE.PlaneGeometry( 200, 300);

        const texture = new THREE.TextureLoader().load('images/grey.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 2, 2 );

        const material = new THREE.MeshBasicMaterial({map: texture});

        const floor = new THREE.Mesh( geometry, material );

        floor.rotation.x = -0.5 * Math.PI;
        floor.position.y = 1;
        floor.position.z = 150;

        this.house.add(floor);
    }

    createSideWall() {
        const shape = new THREE.Shape();
        shape.moveTo(-100, 0);
        shape.lineTo(100, 0);
        shape.lineTo(100,100);
        shape.lineTo(0,150);
        shape.lineTo(-100,100);
        shape.lineTo(-100,0);

        const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

        const texture = new THREE.TextureLoader().load('images/grey.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.01, 0.005 );

        var material = new THREE.MeshBasicMaterial( {map: texture} );

        const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

        this.house.add(sideWall);

        return sideWall;
    }

    createFrontWall() {
        const shape = new THREE.Shape();
        shape.moveTo(-150, 0);
        shape.lineTo(150, 0);
        shape.lineTo(150,100);
        shape.lineTo(-150,100);
        shape.lineTo(-150,0);

        const window = new THREE.Path();
        window.moveTo(30,30)
        window.lineTo(80, 30)
        window.lineTo(80, 80)
        window.lineTo(30, 80);
        window.lineTo(30, 30);
        shape.holes.push(window);

        const door = new THREE.Path();
        door.moveTo(-30, 0)
        door.lineTo(-30, 80)
        door.lineTo(-80, 80)
        door.lineTo(-80, 0);
        door.lineTo(-30, 0);
        shape.holes.push(door);

        const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

        const texture = new THREE.TextureLoader().load('./images/grey.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.01, 0.005 );

        const material = new THREE.MeshBasicMaterial({map: texture} );

        const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

        frontWall.position.z = 150;
        frontWall.position.x = 100;
        frontWall.rotation.y = Math.PI * 0.5;

        this.house.add(frontWall);
    }

    createBackWall() {
        const shape = new THREE.Shape();
        shape.moveTo(-150, 0)
        shape.lineTo(150, 0)
        shape.lineTo(150,100)
        shape.lineTo(-150,100);

        const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

        const texture = new THREE.TextureLoader().load('images/grey.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.01, 0.005 );

        const material = new THREE.MeshBasicMaterial({map: texture});

        const backWall = new THREE.Mesh( extrudeGeometry, material) ;

        backWall.position.z = 150;
        backWall.position.x = -100;
        backWall.rotation.y = Math.PI * 0.5;

        this.house.add(backWall);
    }

    createRoof() {
        const geometry = new THREE.BoxGeometry( 120, 320, 10 );

        const texture = new THREE.TextureLoader().load('images/telhado.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 5, 1);
        texture.rotation = Math.PI / 2;
        const textureMaterial = new THREE.MeshBasicMaterial({ map: texture});

        const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });

        const materials = [
            colorMaterial,
            colorMaterial,
            colorMaterial,
            colorMaterial,
            colorMaterial,
            textureMaterial
        ];

        const roof = new THREE.Mesh( geometry, materials );

        this.house.add(roof);

        roof.rotation.x = Math.PI / 2;
        roof.rotation.y = - Math.PI / 4 * 0.6;
        roof.position.y = 130;
        roof.position.x = 50;
        roof.position.z = 155;
        
        return roof;
    }

    createWindow() {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 50)
        shape.lineTo(50,50)
        shape.lineTo(50,0);
        shape.lineTo(0, 0);

        const hole = new THREE.Path();
        hole.moveTo(5,5)
        hole.lineTo(5, 45)
        hole.lineTo(45, 45)
        hole.lineTo(45, 5);
        hole.lineTo(5, 5);
        shape.holes.push(hole);

        const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

        var extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'silver' });

        var window = new THREE.Mesh( extrudeGeometry, extrudeMaterial ) ;
        window.rotation.y = Math.PI / 2;
        window.position.y = 30;
        window.position.x = 100;
        window.position.z = 120;

        this.house.add(window);

        return window;
    }

    createDoor() {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 80);
        shape.lineTo(50,80);
        shape.lineTo(50,0);
        shape.lineTo(0, 0);

        const hole = new THREE.Path();
        hole.moveTo(5,5);
        hole.lineTo(5, 75);
        hole.lineTo(45, 75);
        hole.lineTo(45, 5);
        hole.lineTo(5, 5);
        shape.holes.push(hole);

        const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

        const material = new THREE.MeshBasicMaterial( { color: 'silver' } );

        const door = new THREE.Mesh( extrudeGeometry, material ) ;

        door.rotation.y = Math.PI / 2;
        door.position.y = 0;
        door.position.x = 100;
        door.position.z = 230;

        this.house.add(door);
    }

    update() {
        this.airplane.updatePlane();

  }

}