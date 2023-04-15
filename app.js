import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true ;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

class Box extends THREE.Mesh {
    constructor({width,height,depth, color = '#00ff00', velocity = {
        x:0, y:0, z:0},
        position = {x:0, y:0, z:0}
    
    }) {
        super(
            new THREE.BoxGeometry(width,height,depth),
            new THREE.MeshStandardMaterial({ color })
        )
        this.width = width;        
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z);
        this.bottom = this.position.y - this.height/2;
        this.top = this.position.y + this.height/2;

        this.velocity = velocity;
        this.gravity = -0.0005;
    }
    update(){
        this.bottom = this.position.y - this.height/2;
        this.top = this.position.y + this.height/2;

        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
        //this is where we hit the ground
        if (this.bottom + this.velocity.y <= ground.top) {
            //this.velocity.y *= 0.8;        
            this.velocity.y = -this.velocity.y;
        }
}
};


const cube = new Box({
    width:1, height:1, depth:1, velocity:{
        x:0, y:-0.01, z:0
    }
});
cube.castShadow = true;
scene.add(cube);

const ground = new Box({
    width:5, height:0.5, depth:10, color:'#0000ff', position:{
        x:0, y:-2, z:0
    }
})

ground.receiveShadow = true;
scene.add(ground);

//adding light in z axis
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 2;
light.castShadow = true;
scene.add(light);

camera.position.z = 5;
console.log(ground.top, cube.bottom)

//console.log(cube.position.y - cube.height/2);
//console.log(ground.position.y + ground.height/2);

function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
cube.update(ground);
//cube.position.y += -0.01;
//cube.rotation.x += 0.01;
//cube.rotation.y += 0.01;
}
animate();