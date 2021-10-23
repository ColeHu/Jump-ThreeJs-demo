import * as THREE from "./three.js/build/three.module.js";
const color = [0x8080ff, 0xff6666, 0x4dffa6];

class stage{

    constructor(
        width,
        height,
        cameraPos,
        LightPos
    ) {
        this.width = width;
        this.height = height;
        this.cameraPos = cameraPos;
        this.LightPos = LightPos;
        this.scene = null;
        this.ground = null;
        this.camera = null;
        this.renderer = null;
        this.head = null;
        this.body = null;
        this.init();
    }



    init(){
        this.createCamera();
        this.createScene();
        this.createAxis();
        this.createRenderer();
        this.createGround();
        this.createLight();
        this.createPlayer();
    }

    createScene(){
        this.scene = new THREE.Scene();
    }

    createAxis(){
        this.scene.add(THREE.AxisHelper(1000))
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(this.cameraPos[0], this.cameraPos[1], this.cameraPos[2]);
        this.camera.lookAt(0, 0, 0);
    }

    createRenderer(){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xFFFFFF, 1.0);
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    createGround(){
        const plane = new THREE.PlaneGeometry(this.width, this.height);
        const mat = new THREE.MeshLambertMaterial({color: 0xeeeeee});
        const mesh = new THREE.Mesh(plane, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);   //添加地面
    }

    createLight(){
        const light = new THREE.PointLight(0xffffff, 1.8);   //添加点光源
        light.position.set(this.LightPos[0], this.LightPos[1], this.LightPos[2]);
        light.castShadow = true;
        this.scene.add(light);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.2))    //添加环境光
    }

    createBox(x, z){
        // const b = new THREE.BoxGeometry(30, 10, 30);
        // const mat = new THREE.MeshStandardMaterial({color: color});
        // const mesh = new THREE.Mesh(b, mat);
        // mesh.position.set(x, 5, z);
        // mesh.receiveShadow = true;
        // mesh.castShadow = true;
        const ran = Math.ceil(Math.random() * 10);
        const geo = new THREE.BoxGeometry(30, 10, 30);
        let mat;
        if (ran <= 3){
            mat = new THREE.MeshPhongMaterial({color: color[0]});
        }
        else if(ran <= 7){
            mat = new THREE.MeshLambertMaterial({color: color[1]});
        }
        else{
            mat = new THREE.MeshStandardMaterial({color: color[2]});
        }
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, 5, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    }

    createPlayer(){
        const sph = new THREE.SphereGeometry(3, 20, 20);
        const mat = new THREE.MeshStandardMaterial({color: 0x0052cc});
        this.head = new THREE.Mesh(sph, mat);
        this.head.position.set(0, 23, 0);
        this.head.castShadow = true;
        this.head.receiveShadow = true;
        this.scene.add(this.head);

        const cyl = new THREE.CylinderGeometry(1, 3, 12);
        this.body = new THREE.Mesh(cyl, mat);
        this.body.position.set(0, 15, 0);
        this.body.castShadow = true;
        this.body.receiveShadow = true;
        this.scene.add(this.body);
    }

    headMove(x, y, z){
        this.head.position.set(x, y, z);
    }

    bodyMove(x, y, z){
        this.body.position.set(x, y, z);
    }

    cameraMove(x, y, z){
        this.camera.position.set(x, y, z);
    }

    cameraLook(x, y, z){
        this.camera.lookAt(x, y, z);
    }

    stayBox(){
        this.body.position.set(this.body.position.x, 15, this.body.position.z);
        this.head.position.set(this.head.position.x, 23, this.head.position.z);
    }

    stayPlane(){
        this.body.position.set(this.body.position.x, 6, this.body.position.z);
        this.head.position.set(this.head.position.x, 14, this.head.position.z);
    }
}

export {stage};
