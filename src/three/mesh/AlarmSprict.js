import * as THREE from "three";
import camera from "../camera";
export default class AlarmSprict{
    constructor(type="火警",position={x:-1.8,z:3},color=0xffffff){
        const textureLoader =new THREE.TextureLoader();
        const typeObj = {
          火警: "./textures/tag/fire.png",
          治安: "./textures/tag/jingcha.png",
          电力: "./textures/tag/e.png",
        };
        const map = textureLoader.load(typeObj[type]);
        this.material = new THREE.SpriteMaterial({map:map,color:color,transparent:true,depthTest:false});
        this.mesh = new THREE.Sprite(this.material);
        this.mesh.position.set(position.x, 3.5, position.z);
        //封装点击事件
        this.fns = [];
        //创建射线
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        //事件监听
        window.addEventListener("click",(event)=>{
            this.mouse.x = (event.clientX/window.innerWidth)*2-1
            this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
            this.raycaster.setFromCamera(this.mouse,camera);
            const intersects = this.raycaster.intersectObject(this.mesh);
            if (intersects.length>0) { //检测碰撞，当intersects长度大于0，则有碰撞
               this.fns.forEach((fn) => {
                 fn(event,this.mesh);
               });
                
            }

        })
    }
    onClick(fn){
       this.fns.push(fn)
    }
    remove(){
        this.mesh.remove();
        this.mesh.removeFromParent();
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();
    }
}