import * as THREE from "three";
//初始化场景
const scene = new THREE.Scene();
//场景天空盒子
const textureCubeLoader = new THREE.CubeTextureLoader().setPath("./textures/");
const tetureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);
scene.background = tetureCube;
scene.environment =tetureCube;
export default scene;
