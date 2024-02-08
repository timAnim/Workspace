import * as THREE from "three";

var texture = new THREE.TextureLoader().load("static/img/motorsky.jpg");

var metalTxtr = new THREE.CubeTextureLoader()
  .setPath("static/img/")
  .load([
    "posX.jpg",
    "negX.jpg",
    "posY.jpg",
    "negY.jpg",
    "posZ.jpg",
    "negZ.jpg"
  ])

var textureCube = new THREE.CubeTextureLoader()
  .setPath("static/img/")
  .load([
    "texture_motorsky_pos_x.jpg",
    "texture_motorsky_neg_x.jpg",
    "texture_motorsky_pos_y.jpg",
    "texture_motorsky_neg_y.jpg",
    "texture_motorsky_pos_z.jpg",
    "texture_motorsky_neg_z.jpg"
  ])

export default {
  // 材质
  metalMaterial: new THREE.MeshPhongMaterial({
    color: 0x212121,
    envMap: metalTxtr,
    combine: THREE.MixOperation,
    reflectivity: 0.6
  }),
  bodyMaterial: new THREE.MeshLambertMaterial({
    color: 0xd01716,
    envMap: textureCube,
    combine: THREE.MixOperation,
    reflectivity: 0.2,
    side: THREE.DoubleSide
  }),
  glassMaterial: new THREE.MeshPhongMaterial({
    color: 0x000000,
    shininess: 60,
    opacity: 0.7,
    transparent: true,
    envMap: textureCube,
    combine: THREE.MixOperation,
    reflectivity: 0.2
  }),
  brightGlassMaterial: new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 60,
    opacity: 0.7,
    transparent: true
  }),
  tireMaterial: new THREE.MeshLambertMaterial({
    color: 0x000000
  }),
  bannerMaterial: new THREE.MeshStandardMaterial({
    color: 0xff5722
  }),
  defaultMaterial: new THREE.MeshLambertMaterial({
    color: 0x9e9e9e,
    envMap: metalTxtr,
    combine: THREE.MixOperation,
    reflectivity: 0.6
  }),
  seatMaterial: new THREE.MeshLambertMaterial({
    color: 0x424242,
    flatShading: true
  }),
  oringeLightMaterial: new THREE.MeshBasicMaterial({
    color: 0xff7043,
    side: THREE.DoubleSide
  }),
  textureCubeNight: new THREE.CubeTextureLoader()
    .setPath("static/img/")
    .load([
      "texture_skydark_pos_x.jpg",
      "texture_skydark_pos_x.jpg",
      "texture_skydark_pos_x.jpg",
      "texture_skydark_neg_y.jpg",
      "texture_skydark_pos_x.jpg",
      "texture_skydark_pos_x.jpg"
    ])
}
