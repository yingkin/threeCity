varying vec3 vPosition;
uniform float uHeight;
void main (){
          float gardMix = (vPosition.y + uHeight/2.0)/uHeight;
          gl_FragColor = vec4(1,1,0,1.0-gardMix);

  
}