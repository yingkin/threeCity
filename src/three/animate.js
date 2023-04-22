import * as THREE from "three";
import camera from "./camera";
import renderer from "./renderer";
import scene from "./scene";
import controls from "./controls";
//渲染函数
const clock = new THREE.Clock();
function animate(t) {
  controls.update();
  const time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
export default animate
