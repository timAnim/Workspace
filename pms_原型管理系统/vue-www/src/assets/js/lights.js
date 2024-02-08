import * as THREE from "three";
//灯光
var ambient = new THREE.AmbientLight(0xffcc80, 0.02);

var main = new THREE.PointLight(0xffffff, 5, 2000);
main.position.set(0, 500, 1000);

// 镜头光晕
var textureLoader = new THREE.TextureLoader();
var textureFlare = textureLoader.load("static/img/lensflare.png");
var flareColor = new THREE.Color(0xffffff);
flareColor.setHSL(0.55, 0.9, 0.5);

var lensFlare = new THREE.LensFlare(
  textureFlare,
  700,
  0.0,
  THREE.AdditiveBlending,
  flareColor
);
lensFlare.add(textureFlare, 70, 1.0, THREE.AdditiveBlending);
lensFlare.position.copy(main.position);

// 主光
var spotLight = new THREE.SpotLight(0xd0d9ff, 2.5);
spotLight.position.set(500, 1000, 0);
spotLight.penumbra = 0.5;
spotLight.decay = 2;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.camera.near = 1000;
spotLight.shadow.camera.far = 3500;

export default {
  main,
  ambient,
  spotLight,
  lensFlare
}
