import * as THREE from "three"
import gsap from "gsap"
export default class FlyLine{
    constructor(){
        let linePoints = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(5, 4, 0),
          new THREE.Vector3(10, 0, 0),
        ];

        //创建曲线
        this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
        this.geometry = new THREE.TubeGeometry(this.lineCurve,100,0.4,2,false);
        const textloader = new THREE.TextureLoader()
        this.texture = textloader.load("./textures/z_11.png")
        this.texture.repeat.set(1,2)
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.MirroredRepeatWrapping;
        this.material = new THREE.MeshBasicMaterial({
           
            map:this.texture,
            transparent:true
        })
        this.mesh = new THREE.Mesh(this.geometry,this.material);
        //创建飞线的动画
        gsap.to(this.texture.offset,{
            x:-1,
            duration:1,
            repeat:-1,
            ease:"none"
        })
    }
}