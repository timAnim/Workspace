var THREE = require("./three.js").THREE;
var StereoEffect = require("./StereoEffect.js");

var flat = new THREE.WebGLRenderer();
flat.shadowMap.enabled = true;
flat.shadowMap.type = THREE.PCFSoftShadowMap;
flat.antialias = true;
flat.setClearColor(0xf5f5f5, 1.0);
flat.setPixelRatio(window.devicePixelRatio * 2);

var stereo = new StereoEffect(flat, THREE);

export default {
  flat,
  stereo
}
