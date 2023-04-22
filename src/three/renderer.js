import * as THREE from "three";
//初始化渲染器
const renderer = new THREE.WebGLRenderer({
    antialias:true,
});
//设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

export default renderer;
