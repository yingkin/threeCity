//初始化控制器
import camera from "./camera";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const controls = new OrbitControls(camera, renderer.domElement);
//设置控制器阻尼
controls.enableDamping = true;
export default controls;
