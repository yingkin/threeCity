<template>
    <div class="scene" ref="sceneDiv"></div>
</template>
<script setup>
import {onMounted,ref, watch}from "vue"
import * as THREE from "three"
//导入场景
import scene from "@/three/scene"
//导入相机
import camera from "@/three/camera"
//导入GUI对象
import gui from "@/three/gui"
//导入渲染器
import renderer from "@/three/renderer"
//导入坐标轴
import axesHelper from "@/three/axesHelper"
//导入控制器
import controls from "@/three/controls"
//初始化函数
import "@/three/init"
//导入每一帧的执行函数
import animate from "@/three/animate"
//导入添加物体函数
import createMesh from "@/three/createMesh"

import AlarmSprict from "@/three/mesh/AlarmSprict"
import LightWall from "@/three/mesh/LightWall"
import FlyLineShader from "@/three/mesh/flyLineShader"
import LightRadar from "@/three/mesh/LightRadar"
import eventHub from "@/utils/eventHub"
import gsap from "gsap"


const props = defineProps(["eventList"])
//场景元素div
let sceneDiv = ref(null);

//初始化场景
// const scene = new THREE.Scene();

//添加相机到场景
scene.add(camera);

scene.add(axesHelper);
//创建物体
createMesh()



onMounted(()=>{

    sceneDiv.value.appendChild(renderer.domElement)
    animate();
})
const eventListMesh = []
let mapFn={
    火警:(postion,i)=>{
        const lightWall = new LightWall(1,2,postion,0xffff00);
         lightWall.eventListIndex = i; //索引
        scene.add(lightWall.mesh);
        eventListMesh.push(lightWall)
    },
    治安:(postion,i)=>{
        const flyLineShader = new FlyLineShader(postion,0x00fff0);
          flyLineShader.eventListIndex = i; //索引
        scene.add(flyLineShader.mesh);
        eventListMesh.push(flyLineShader)
    },
    电力:(postion,i)=>{
        const lightRadar = new LightRadar(2,postion,0xff0000);
        lightRadar.eventListIndex = i; //索引
        scene.add(lightRadar.mesh);
        eventListMesh.push(lightRadar)
    },
}
eventHub.on("eventToggle",(i)=>{
    eventListMesh.forEach((item)=>{
        if (item.eventListIndex===i) {
            item.mesh.visible =true;
        } else {
             item.mesh.visible =false;
        }
    })
    const position ={
        x:props.eventList[i].position.x /5 -10,
        y:0,
        z:props.eventList[i].position.y /5 -10,
    }
    gsap.to(controls.target,{
        x:position.x,
        y:position.y,
        z:position.z,
        duration:1
    })
})
watch(
    ()=>props.eventList,
    (val)=>{
        // console.log(val);
        eventListMesh.forEach(item=>{
            item.remove();
        })
        props.eventList.forEach((item,i) => {
            const position={
                x:item.position.x/5-10,
                z:item.position.y/5-10,
            }
            const alarmSprite = new AlarmSprict(item.name,position);
            alarmSprite.onClick(()=>{
                eventHub.emit("spriteClick",{event:item,i})
            })
            alarmSprite.eventListIndex = i; //索引
            eventListMesh.push(alarmSprite)
            scene.add(alarmSprite.mesh)
            if (mapFn[item.name]) {
                mapFn[item.name](position)
            }
        });
    }

)
</script>
<style>
.scene{
    width: 100vw;
    height: 100vh;
    position:fixed;
    z-index: 100;
    left: 0;
    top: 0;
}
</style>