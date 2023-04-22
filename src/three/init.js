import camera from "./camera";
import renderer from "./renderer";
//监听屏幕大小变化，设置渲染的尺寸
window.addEventListener("resize",()=>{
    //更新摄像头
    camera.aspect = window.innerWidth /window.innerHeight;
    //更新相机的投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight);
    //设置渲染器像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
});
