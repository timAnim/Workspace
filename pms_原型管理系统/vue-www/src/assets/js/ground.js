import * as THREE from "three";

// 地面
var groundGeometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);
var groundMaterial = new THREE.ShadowMaterial();
groundMaterial.opacity = 0.5;
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
ground.position.set(0, -200, 0);
ground.rotation.x = -Math.PI * 0.5;

export default ground
