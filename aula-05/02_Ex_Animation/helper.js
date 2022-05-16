"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021

const helper = {

    initEmptyScene: function (sceneElements) {

        // Create the 3D scene
        sceneElements.sceneGraph = new THREE.Scene();

        // Add camera
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;
        camera.position.set(0, 7, 6);
        camera.lookAt(0, 0, 0);

        // Illumination
        // Add ambient light
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // Add spotlight (with shadows)
        const spotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
        spotLight.position.set(-5, 8, 0);        
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        spotLight.name = "light";
        sceneElements.sceneGraph.add(spotLight);
        

        // Create renderer (with shadow map)
        const renderer = new THREE.WebGLRenderer();
        sceneElements.renderer = renderer;
        //renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.5);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        // add orbit controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.123;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = true;
        controls.enableZoom = true;
        controls.minDistance = 1;
        controls.maxDistance = 35;
        controls.maxPolarAngle = Math.PI / 2;


        // Add the rendered image in the HTML DOM
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
        
        window.addEventListener('resize', onResize, false);

        function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },
    
    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },


    
};