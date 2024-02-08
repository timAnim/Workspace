<template>
<transition name='drop'>
  <div
    v-if='seen'
    :tabindex="0"
    @blur='seen=false'
    @click.stop
    class="float-nw drop-list shadow-l"
    :style="{
      left:cx + 'px',
      top:cy+'px', 
      transformOrigin:transformOrigin}">
    <content class="radius-m bg-front">
      <slot></slot>
    </content>
    <div class="badget bg-front" :style='badgetPos'></div>
  </div>
</transition>
</template>
<style scoped>
.drop-list {
  min-height: 0.4rem;
  min-width: 0.8rem;
  outline: none;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.1);
}
.drop-list > content {
  max-width: 50vw;
  max-height: 50vh;
  transform: translate(0);
}
.drop-list > .badget {
  position: absolute;
  height: 0.1rem;
  width: 0.1rem;
  transform: rotate(45deg);
  z-index: -1;
}
@media (max-width: 767px) {
  .drop-list {
    max-width: 100%;
    width: 100% !important;
    left: 0 !important;
  }
  .drop-list > content {
    max-width: 100%;
  }
}
</style>
<script>
/*
  组件名称: 下拉框
  作者: timchen
  入参: 
  trigger: <String> //dom的id
  center:true //是否居中
  插槽: 非具名插槽
  方法: seen,
  事件: drop=>{trigger,seen}
  示例:
    <div id='fruit' @click="$refs.fruid.seen=true">下午茶列表</div>
  示例:
    <dropdown :trigger='"fruit"' ref='fruit'>
      <ol>
        <li>
          <label>
            <icon name='circle-o'></icon>
          </label>
          <em>
            {{item.name}}
          </em>
        </li>
      </ol>
    </dropdown>
*/
export default {
  name: "dropdown",
  props: ["trigger", "center"],
  data() {
    return {
      cx: 0,
      cy: 0,
      seen: false,
      badgetPos: "left:0.1rem;top:0;margin-top:0.04rem;",
      transformOrigin: "50% 0%",
      direct: ["bottom", "left"]
    };
  },
  methods: {
    init() {
      this.con = this.$el.nodeType == 1 ? this.$el : false;
      if (!this.con) return false;
      this.getElementPosition();
      this.getDropDirect();
      this.setPosition();
      this.con.focus();
    },
    getElementPosition() {
      var ele = document.getElementById(this.trigger)
      this.cx = 0;
      this.cy = 0;
      while (ele != null) {
        this.cx += ele.offsetLeft;
        this.cy += ele.offsetTop;
        ele = ele.offsetParent;
      }
    },
    getDropDirect() {
      var ele = document.getElementById(this.trigger)

      var tStyle = getComputedStyle(ele);
      this.triggerSize = [parseInt(tStyle.width), parseInt(tStyle.height)];

      var minH = window.innerHeight - this.cy - this.triggerSize[1];

      this.direct[0] = minH <= this.con.clientHeight ? "top" : "bottom";
      this.badgetPos =
        this.direct[0] == "top"
          ? "bottom:0;margin-bottom:-0.04rem;"
          : "top:0;margin-top:-0.04rem;";
      // 判断下是否需要强制居中
      if (!this.center) {
        this.direct[1] =
          window.innerWidth - this.cx <= this.con.clientWidth
            ? "right"
            : "left";
        this.badgetPos += this.direct[1] + ":0.1rem;";
      } else {
        this.direct[1] = "center";
        this.badgetPos += "left:50%;margin-left:-0.02rem;";
      }
    },
    setPosition() {
      this.cy +=
        this.direct[0] === "bottom"
          ? this.triggerSize[1]
          : -this.con.clientHeight;

      // 设置动画的方向
      var _t = "50% ";
      this.transformOrigin = _t + (this.direct[0] === "bottom" ? "0%" : "100%");

      if (this.direct[1] === "right") {
        this.cx += this.triggerSize[0];
        this.cx -= this.con.clientWidth;
      } else if (this.direct[1] === "center") {
        this.cx -= (this.con.clientWidth - this.triggerSize[0]) / 2;
      }
    }
  },
  watch: {
    seen(val) {
      var ele = document.getElementById(this.trigger)
      if (val) {
        setTimeout(ev => {
          ele.style.pointerEvents = "none";
          this.init();
          this.$emit("drop", {
            trigger: ele,
            state: true
          });
        }, 8);
      } else {
        setTimeout(ev => {
          ele.style.pointerEvents = "all";
          this.$emit("drop", {
            trigger: ele,
            state: false
          });
        }, 8);
      }
    }
  }
};
</script>
