<template>
  <div id="viewer_outer">
    <div class="container ht-max wd-max">
      <iframe class="ht-max wd-max" :src="filename" v-show='extend==="pdf"'></iframe>
      <img id='viewer_img' v-show='extend!=="pdf"' :src="filename" draggable="false" @mousedown='panstart' @mouseup='panend'>
    </div>
  </div>
</template>
<style scoped>
#viewer_outer {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
*[draggable="false"] {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
</style>
<script>
export default {
  props: ["src"],
  mounted() {
    this.img = document.querySelector('#viewer_img')
    this.bindScroll(this.pinchmove);
  },
  methods: {
    panstart(ev) {
      ev.preventDefault()
      this.x0 = ev.clientX
      this.y0 = ev.clientY
      this.img.addEventListener('mousemove',this.panmove,false)
    },
    panmove(ev) {
      this.x = ev.clientX - this.x0 + this.initX
      this.y = ev.clientY - this.y0 + this.initY
      this.refresh()
      ev.preventDefault()
    },
    panend(ev) {
      ev.preventDefault()
      this.img.removeEventListener('mousemove',this.panmove,false)
      this.initX = this.x
      this.initY = this.y
    },
    pinchmove(ev) {
      // 兼容chrome 和 ff
      this.deltaY = ev.wheelDeltaY ? ev.wheelDeltaY : -ev.detail * 40;
      // 计算缩放因子
      if (this.deltaY > 0) {
        this.scale += 0.1
      } else if (this.deltaY < 0) {
        this.scale -= 0.1
      }
      // 最大3倍, 最小0.4倍
      if (this.scale < 0.4) {
        this.scale = 0.4
      } else if (this.scale > 3) {
        this.scale = 3
      }
      // 刷新视图
      this.refresh()
    },
    refresh() {
      this.img.style.transform =
        `translate(${this.x}px, ${this.y}px) scale( ${this.scale})`
    },
    bindScroll(func) {
      if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", func, false)//firefox
      }
      window.onmousewheel = document.onmousewheel = func//滚动滑轮触发func方法  //ie 谷歌
    }
  },
  data() {
    return {
      scale: 1,
      img: "",
      initX: 0,
      initY: 0,
      x: 0,
      y: 0,
    }
  },
  computed:{
    filename(){
      return this.src
    },
    extend(){
      var arr = this.src.split('.')
      return arr[arr.length - 1]
    }
  }
}
</script>
