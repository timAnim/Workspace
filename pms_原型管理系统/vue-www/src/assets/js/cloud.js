import * as THREE from 'three'

var geom = new THREE.Geometry();
//粒子系统材质，
var material = new THREE.PointsMaterial({
  size: 8, //默认大小
  transparent: true, //透明的
  opacity: 0.6, //不透明
  vertexColors: true,
  sizeAttenuation: true, //粒子透视
  blending: true
});

var range = 3000,
  createNums = 5000, //粒子数
  color = new THREE.Color(0xffffff); //颜色在vertexColors为true时
for (var i = 0; i < createNums; i++) {
  var particle = new THREE.Vector3(
    Math.random() * range - range / 2,
    Math.random() * range - range / 2,
    Math.random() * range - range / 2
  );
  geom.vertices.push(particle); //点加入
  geom.colors.push(color); //颜色加入
}
var cloud = new THREE.Points(geom, material); //粒子云系统
cloud.name = "particles"; //命名名字，在重绘的时候使用

export default cloud
