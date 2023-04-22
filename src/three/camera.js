import * as THREE from "three";
//创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
//设置相机位置
camera.position.set(0, 10, 30);
export default camera;
