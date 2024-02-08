<style scoped>
#crosshair {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 8px;
  width: 8px;
  margin-left: -4px;
  margin-top: -4px;
  border-radius: 50%;
  border: solid 3px #03a9f4;
  box-shadow: 0 0 3px white;
  z-index: 20;
}

#info {
  position: absolute;
  top: 0;
  left: 25%;
  width: 50%;
}

#canvas {
  min-height: 4rem;
  width: 100%;
  cursor: w-resize;
  position: relative;
  display: block;
}

#colorpicker {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  top: 50%;
  right: 0.08rem;
  line-height: 0.4rem;
  margin-top: 0.28rem;
}

#insight-btn {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  top: 50%;
  margin-top: -0.2rem;
  right: 0.08rem;
  line-height: 0.4rem;
}

#enviroment {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  top: 50%;
  margin-top: -0.68rem;
  right: 0.08rem;
  line-height: 0.4rem;
}

#vr-btn {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  bottom: 0.08rem;
  right: 0.08rem;
  line-height: 0.4rem;
}

#fullscreen {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  top: 0.08rem;
  right: 0.08rem;
  line-height: 0.4rem;
}

#colorpicker div {
  display: none;
  background-color: #f5f5f5;
  box-shadow: 0 1px 3px #bdbdbd;
  padding: 0;
  width: 1.6rem;
  margin-left: -1.6rem;
  word-spacing: -6px;
  margin-top: -0.4rem;
}

#colorpicker button {
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0 !important;
}

#colorpicker:hover div {
  display: block;
}

.red {
  fill: #e51c23;
}

.purple {
  fill: #9c27b0;
}

.blue {
  fill: #303f9f;
}

.green {
  fill: #8bc34a;
}

.leave_btn {
  position: absolute;
  height: 0.4rem;
  width: 0.4rem;
  border-radius: 50%;
  top: 50%;
  margin-top: -0.2rem;
  left: 0.08rem;
  line-height: 0.4rem;
}
</style>

<template>
  <app-layout>
    <div id='canvas' slot='content'>
      <div id='crosshair' v-show='isVr'></div>
      <button id='colorpicker' class="sd-card" name='vr-btn' @click='selectColor'>
        <icon name='paint-brush'></icon>
        <div>
          <button @click='color("#e51c23")'>
            <icon name='circle' class='red'></icon>
          </button>
          <button @click='color("#9c27b0")'>
            <icon name='circle' class='purple'></icon>
          </button>
          <button @click='color("#303f9f")'>
            <icon name='circle' class='blue'></icon>
          </button>
          <button @click='color("#8bc34a")'>
            <icon name='circle' class='green'></icon>
          </button>
        </div>
      </button>
      <button id='fullscreen' class=" sd-card" @click='fullscreen' name='vr-btn'>
        <icon v-if='!ifFullscreen' name='expand'></icon>
        <icon v-if='ifFullscreen' name='compress'></icon>
      </button>
      <button class="leave_btn sd-card" @click='leave' name='vr-btn'>
        <icon name='angle-left'></icon>
      </button>
      <button id='enviroment' class="sd-card" @click='env' name='vr-btn'>
        <icon v-if='!isDaytime' name='sun-o'></icon>
        <icon v-if='isDaytime' name='moon-o'></icon>
      </button>
      <button id='insight-btn' class="sd-card" @click='insight' name='vr-btn'>
        <icon name='eye'></icon>
      </button>
      <button id='vr-btn' class="sd-card" @click='vr' name='vr-btn'>
        <icon name='simplybuilt'></icon>
      </button>
      <loading :show='loading'></loading>
    </div>
  </app-layout>
</template>

<script>
var THREE = require("../../assets/js/three.js").THREE;
var OBJLoader = require("../../assets/js/OBJLoader.js");

import Hammer from "../../assets/js/hammer.js";
import materials from "../../assets/js/materials.js";
import lights from "../../assets/js/lights.js";

import cloud from "../../assets/js/cloud.js";
import ground from "../../assets/js/ground.js";
import camera from "../../assets/js/camera.js";
import renderers from "../../assets/js/renderers.js";

// 模型
export default {
  data() {
    return {
      models: {
        cur: 0,
        list: ["/static/model/bus2.obj", "/static/model/bus1.obj"]
      },
      canvas: {}, // 画布
      loader: {},
      effect: {},
      cloudSpeed: 0.001,
      gamma: 0,
      beta: 0,
      btns: [],
      header: 0,
      fireSeed: 0,
      fireable: true,
      fireOver: false,
      rotateSeed: 0,
      rotateSpeed: 0.01,
      pinchSeed: 0,
      _position: 0,
      _scale: 1,
      dragging: 0,
      dragDelta: 0,
      colorpicker: false,
      loading: true,
      maxRotateSpeed: 0.04,
      fromInsight: false,
      isDaytime: true,
      isVr: false,
      ifFullscreen: false,
      colorArr: ["#e51c23", "#9c27b0", "#303f9f", "#8bc34a"],
      curColor: 0
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    cancelAnimationFrame(this.rotateSeed);
    cancelAnimationFrame(this.leaveSeed);
  },
  methods: {
    init() {
      this.loading = false;
      this.canvas = document.querySelector("#canvas");
      window.onresize = this.resize;
      setTimeout(t => {
        this.initScene();
      }, 400);
      if (!window.DeviceOrientationEvent) return;
      // window.addEventListener(
      //   "deviceorientation",
      //   this.orientationHandler,
      //   false
      // );
    },
    initScene() {
      window.renderer = renderers.flat;
      this.canvas.appendChild(renderer.domElement);
      var styles = getComputedStyle(document.querySelector("#container"));
      this.height = parseInt(styles.height) - 4;
      this.width = parseInt(styles.width);
      this.resize();

      window.scene = new THREE.Scene();
      scene.background = new THREE.TextureLoader().load(
        "static/img/motorsky.jpg"
      );
      scene.add(lights.ambient);
      scene.add(lights.spotLight);
      scene.add(lights.main); //有bug添加有问题
      scene.add(lights.lensFlare); //有bug添加有问题
      scene.add(ground);
      scene.add(cloud);

      this.render();
      this.cloudAnim();
      this.ctrlInit();

      this.loader = new THREE.OBJLoader();
      this.loadSync(this.models.list[this.models.cur]).then(obj => {
        window.object = obj;
        this.rotateAnim();
      });
    },

    rotateAnim() {
      this.rotateSeed = requestAnimationFrame(this.rotateAnim);
      object.rotation.y += this.rotateSpeed;
      if (object.rotation.y > Math.PI * 2 || object.rotation.y < -Math.PI * 2)
        object.rotation.y = 0;
      this.render();
    },
    resize() {
      var canvas = this.canvas;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();
      renderer.setSize(this.width, this.height);
    },
    render() {
      renderer.render(scene, camera);
    },

    selectColor(ev) {
      this.curColor++;
      if (this.curColor > 4) this.curColor = 0;
      this.color(this.colorArr[this.curColor]);
    },
    panstart(ev) {
      this._position = object.rotation.y;
      cancelAnimationFrame(this.rotateSeed);
      this.dragAnim();
    },
    panmove(ev) {
      this.dragDelta = ev.deltaX;
    },
    panend(ev) {
      cancelAnimationFrame(this.dragging);
      this.rotateAnim();
      let speed = ev.velocityX * 0.01;
      if (speed > 0.1) speed = this.maxRotateSpeed;
      if (speed < -0.1) speed = -this.maxRotateSpeed;
      this.rotateSpeed = speed;
    },
    pinchstart(ev) {
      this._scale = object.scale.x;
    },
    pinchmove(ev) {
      if (ev.scale) {
        let scale = ev.scale * this._scale;
        if (scale > 2) scale = 2;
        else if (scale < 0.5) scale = 0.5;
        object.scale.set(scale, scale, scale);
      } else if (ev.deltaY) {
        let direct = ev.deltaY > 0 ? -0.03 : 0.03;
        this._scale = object.scale.x;
        this._scale += direct;
        object.scale.set(this._scale, this._scale, this._scale);
        ev.preventDefault();
      }
    },
    pinchend(ev) {
      this._scale = object.scale.x;
    },
    dragAnim() {
      this.dragging = requestAnimationFrame(this.dragAnim);
      object.rotation.y = this._position + this.dragDelta * 0.01;
      this.render();
    },

    pinchAnim() {
      this.pinchSeed = requestAnimationFrame(this.pinchAnim);
      this._scale -= 0.01;
      object.scale.set(this._scale, this._scale, this._scale);
      this.render();
    },
    cloudAnim() {
      requestAnimationFrame(this.cloudAnim);
      cloud.position.y -= 1;
      cloud.position.x += 0.3;
      if (cloud.position.y < -1200) cloud.position.y = 1500;
      if (cloud.position.x > 1200) cloud.position.x = -1500;
    },
    leave() {
      if (this.loading) return;
      this.leaveSync()
        .then(res => {
          scene.remove(object);
          this.rotateSpeed = 0.01;
          return this.loadSync(models.list[models.cur]);
        })
        .then(obj => {
          object = obj;
          this.rotateAnim();
        });
    },
    leaveSync() {
      var _p = new Promise((resolve, reject) => {
        var leaveSeed = 0;
        this.loading = true;
        var self = this;
        var anim = function() {
          leaveSeed = requestAnimationFrame(anim);
          if (object.rotation.y > -Math.PI * 0.4) {
            object.rotation.y -= Math.PI * 0.1;
          } else if (object.rotation.y < -Math.PI * 0.6) {
            object.rotation.y += Math.PI * 0.1;
          } else {
            object.rotation.y = -Math.PI * 0.5;
            object.position.x -= 20;
            if (object.position.x < -2000) {
              cancelAnimationFrame(leaveSeed);
              resolve(true);
            }
          }
          self.render();
        };
        anim();
      });
      return _p;
    },
    color(_c) {
      materials.bodyMaterial.color = new THREE.Color(_c);
    },
    insight() {
      if (this.fromInsight) {
        camera.position.set(0, 0, 1250);
      } else {
        camera.position.set(0, 20, 0);
      }
      this.fromInsight = !this.fromInsight;
    },
    ctrlInit() {
      var control = new Hammer(this.canvas);
      control.on("panstart", this.panstart);
      control.on("panmove", this.panmove);
      control.on("panend", this.panend);
      control.on("pancancel", this.panend);

      control.get("pinch").set({ enable: true });
      control.on("pinchstart", this.pinchstart);
      control.on("pinchmove", this.pinchmove);
      control.on("pinchend", this.pinchend);
      control.on("pinchcancel", this.pinchend);

      // this.canvas.addEventListener("mousewheel", this.pinchmove);
    },
    env() {
      if (this.isDaytime) {
        var texture = new THREE.TextureLoader().load("static/img/skydark.jpg");
        materials.bodyMaterial.envMap = materials.textureCubeNight;
        materials.glassMaterial.envMap = materials.textureCubeNight;
        scene.background = texture;
        lights.ambient.intensity = 0.05;
      } else {
        var texture = new THREE.TextureLoader().load("static/img/motorsky.jpg");
        materials.bodyMaterial.envMap = materials.textureCube;
        materials.glassMaterial.envMap = materials.textureCube;
        scene.background = texture;
        lights.ambient.intensity = 0;
      }
      this.isDaytime = !this.isDaytime;
    },
    vr() {
      if (this.isVr) {
        renderer = renderers.flat;
      } else {
        renderer = renderers.stereo;
      }
      this.isVr = !this.isVr;
      this.resize();
    },
    loadSync(url) {
      var _p = new Promise((resolve, reject) => {
        this.loading = true;

        this.loader.load(url, model => {
          model.traverse(child => {
            if (!child instanceof THREE.Mesh) return;
            child.castShadow = true;
            child.receiveShadow = false;
            switch (child.name) {
              case "Archmodels55_13_red_lights":
              case "Archmodels55_13_Texts":
                child.material = materials.oringeLightMaterial;
                break;
              case "Archmodels55_13_carpaint":
              case "Archmodels55_12_carpaint":
                child.material = materials.bodyMaterial;
                break;
              case "Archmodels55_12_glass":
              case "Archmodels55_13_glass":
                child.material = materials.glassMaterial;
                break;
              case "Archmodels55_13_tire":
              case "Archmodels55_12_tire":
              case "Archmodels55_13_black":
                child.material = materials.tireMaterial;
                break;
              case "Archmodels55_12_headlights_glass":
              case "Archmodels55_13_headlights_glass":
              case "Archmodels55_13_lights_glass":
                child.material = materials.brightGlassMaterial;
                break;
              case "Archmodels55_12_banners":
                child.material = materials.bannerMaterial;
                break;
              case "Archmodels55_12_pipes":
              case "Archmodels55_12_rims_caps":
              case "Archmodels55_12_mirrors":
              case "Archmodels55_12_rims":
              case "Archmodels55_13_details":
              case "Archmodels55_13_mirrors":
              case "Archmodels55_13_white_lights":
              case "Archmodels55_13_front_details":
              case "Archmodels55_13_lightsblack":
                child.material = materials.metalMaterial;
                break;
              case "Archmodels55_12_seats":
              case "Archmodels55_13_seats":
                child.material = materials.seatMaterial;
                break;
              default:
                child.material = materials.defaultMaterial;
                // console.log(child.name)
                return;
            }
          });
          model.position.set(0, -200, 0);
          model.castShadow = true;
          this.models.cur = this.models.cur + 1;
          if (this.models.cur >= this.models.list.length) this.models.cur = 0;
          scene.add(model);
          this.loading = false;
          resolve(model);
        });
      });
      return _p;
    },
    launchFullScreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozExitFullScreen) {
        document.mozExitFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    fullscreen() {
      if (this.ifFullscreen) {
        this.exitFullscreen();
      } else {
        this.launchFullScreen(this.canvas);
      }
      this.ifFullscreen = !this.ifFullscreen;
    },

    checkBtn: axis => {
      console.log(
        "fireable:" + fireable,
        "fireOver:" + fireOver,
        "fireSeed:" + fireSeed
      );
      if (!btns.length) initBtn();
      axis[0] += this.canvas.clientWidth / 2;
      axis[1] += this.canvas.clientHeight / 2 + header;
      var bd;
      for (var i = btns.length - 1; i >= 0; i--) {
        bd = btns[i].getBoundingClientRect();
        bd = [bd.top, bd.right, bd.bottom, bd.left];
        if (
          axis[0] > bd[3] &&
          axis[0] < bd[1] &&
          axis[1] > bd[0] &&
          axis[1] < bd[2]
        ) {
          // 2. 如果在上面就是悬停
          fireOver = true;
          // 3. 悬停状态下如果可以 触发就触发
          if (fireable) fireEnter(btns[i]);
        }
      }
      // 如果没在悬停就是离开
      if (!fireOver) fireLeave();
    },
    initBtn: function() {
      header = document.getElementsByTagName("header")[0].clientHeight;
      btns = document.getElementsByName("vr-btn");
    },
    orientationHandler: event => {
      gamma = event.gamma;
      beta = event.beta;
      if (beta > 65) beta = 65;
      if (beta < 25) beta = 25;
      beta = 45 - beta;
      if (gamma > 20) gamma = 20;
      if (gamma < -20) gamma = -20;

      gamma = -Math.floor(this.canvas.clientWidth * gamma / 40);
      beta = Math.floor(this.canvas.clientHeight * beta / 40);
      document.getElementById(
        "crosshair"
      ).style.transform = `translate(${gamma}px, ${beta}px)`;
      // 1. 每次动手机都检查
      if (Math.abs(gamma) > this.canvas.clientWidth / 2 - 50)
        checkBtn([gamma, beta]);
      else fireLeave();
    },
    fire: btn => {
      console.log("fire");
      btn.click();
    },
    fireEnter: btn => {
      // 触发一次就不能再触发
      fireable = false;
      console.log("enter");
      fireSeed = setTimeout(ev => {
        // 400毫秒之后点击
        fire(btn);
      }, 400);
    },
    fireLeave: () => {
      // 如果离开则不是悬停，可以触发
      console.log("leave");
      fireOver = false;
      fireable = true;
      // 如果有计时就清空
      clearTimeout(fireSeed);
      fireSeed = null;
    }
  }
};
</script>
