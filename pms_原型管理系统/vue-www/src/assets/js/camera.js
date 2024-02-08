import * as THREE from "three";
var camera = new THREE.PerspectiveCamera(
  35,
  1,
  //   canvas.clientWidth / canvas.clientHeight,
  1,
  2000
);
camera.position.set(0, 0, 1250);
camera.rotation.x = -Math.PI * 0.125;
camera.lookAt({
  x: 0,
  y: 0,
  z: 0
});

export default camera
