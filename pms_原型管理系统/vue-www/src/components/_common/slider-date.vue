<style lang='scss' scoped>
.gant-container {
  background: #eee;
  height: 0.08rem;
  border-radius: 0.08rem;
  border: 0.04rem solid #eee;
  position: relative;
  margin: 0.04rem 0;
  box-shadow: 0 0 0.08rem #bdbdbd inset;
}

.gant {
  height: 0.08rem;
  min-width: 0.05em;
  border-radius: 0.06rem;
  transition: all 0.1s ease;
}

.starter,
.ender {
  background: white;
  position: absolute;
  left: 0;
  top: 0;
  height: 0.2rem;
  line-height: 0.2rem;
  overflow: hidden;
  border-radius: 0.02rem;
  margin-top: -0.12rem;
  margin-left: -0.4rem;
}

.ender {
  left: 100%;
  margin-left: 0;
}

</style>
<template>
  <li class='ht-m pd-s lay-h' :name='initData.name' :id='initData._id' @click='_click' :title='initData.name'>
    <span class='wd-xl'>{{initData.name}}</span>
    <div class="gant-container wd-auto" ref='gant-container'>
      <div
        class="gant sd-theme float-nw"
        :style='{
          left: initData.left+"px",
          right: initData.right+"px",
          cursor: disabled? "normal":"move"
        }'
        @mousedown.prevent.stop='movestart'
        tap='cancel'>
          <div
            ref='starter'
            class="starter bg-light cl-prim fs-s wd-m align-c"
            @mousedown.prevent.stop="dragstart"
            initData='left'
            tap='cancel'
            :style='{
              cursor:disabled?"normal":"w-resize"
            }'>
            {{ initData._left }}
          </div>
          <div
            ref='ender'
            class="ender bg-light cl-prim fs-s wd-m align-c"
            @mousedown.prevent.stop="dragstart"
            initData='right'
            tap='cancel'
            :style='{
              cursor: disabled?"normal":"w-resize"
            }'>
            {{ initData._right }}
          </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    min: {
      required: true
    },
    max: {
      required: true
    },
    gant: {
      required: true
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      initData: {},
      origin: 0,
      unit: 0,
      target: "",
      direct: "",
      length: 0,
      starter: "",
      ender: "",
      _min: "",
      _max: "",
      isDrag: false
    };
  },
  mounted() {
    this.initData = JSON.parse(JSON.stringify(this.gant));
    this.starter = this.$refs.starter;
    this.ender = this.$refs.ender;

    var min = (this._min = new Date(this.min).valueOf());
    var max = (this._max = new Date(this.max).valueOf());

    var start = new Date(this.initData.start).valueOf();
    var end = new Date(this.initData.end).valueOf();
    var total = this.getD(max - min);
    var length = this.$refs['gant-container'].offsetWidth;

    var unit = length / total;
    this.unit = unit;

    this.initData.left = this.getD(start - min) * unit;
    this.initData.right = this.getD(max - end) * unit;

    this.initData._left = this.format(this.initData.start);
    this.initData._right = this.format(this.initData.end);
  },
  methods: {
    getD(stamp) {
      return parseInt(stamp / 1000 / 60 / 60 / 24);
    },
    format(date){
      var _date = new Date(date);
      var month = _date.getMonth() + 1
      month = month < 10? '0' + month : month
      var day = _date.getDate() 
      day = day < 10? '0' + day : day
      return month + '-' + day
    },
    dragstart(ev) {
      if(this.disabled)return false
      var direct = (this.direct = ev.target.getAttribute("initData"));

      this.initX = ev.x;
      this.origin = this.initData[direct];
      this.target = ev.target;

      document.body.addEventListener("mousemove", this.drag);
      document.body.addEventListener("mouseup", this.dragend);
    },
    drag(ev) {
      if(this.disabled)return false
      var direct = this.direct;
      var sign = direct === "left" ? 1 : -1;
      this.isDrag = true;

      this.initData[direct] = this.origin + (ev.x - this.initX) * sign;
      var _d = Math.floor(this.initData[direct] / this.unit);
      if (_d < 0) return;

      this.target.parentNode.style[direct] = this.unit * _d + "px";

      var ex = this["_" + (direct === "left" ? "min" : "max")];
      var date = ex + _d * 24 * 60 * 60 * 1000 * sign;

      this.initData[direct === "left" ? "start" : "end"] = new Date(date);
      this.target.innerHTML = this.initData["_" + direct] = this.format(date);
    },
    dragend(ev) {
      if(this.disabled)return false
      document.body.removeEventListener("mousemove", this.drag);
      document.body.removeEventListener("mouseup", this.dragend);
      this.$emit("change", this.initData);
      setTimeout(_t => (this.isDrag = false), 50);
    },
    movestart(ev) {
      if(this.disabled)return false
      this.initX = ev.x;
      this.target = ev.target;
      this.origin = [this.initData.left, this.initData.right];

      document.body.addEventListener("mousemove", this.move);
      document.body.addEventListener("mouseup", this.moveend);
    },
    move(ev) {
      if(this.disabled)return false
      this.isDrag = true;
      var delta = ev.x - this.initX;
      this.initData.left = this.origin[0] + delta;
      this.initData.right = this.origin[1] - delta;

      var _d = Math.floor(this.initData.left / this.unit);
      var _dr = Math.floor(this.initData.right / this.unit);
      if (_d < 0 || _dr < 0) return;

      this.target.style.left = this.unit * _d + "px";
      this.target.style.right = this.unit * _dr + "px";

      var start = this._min + _d * 24 * 60 * 60 * 1000;
      var end = this._max - _dr * 24 * 60 * 60 * 1000;

      this.initData.start = new Date(start);
      this.initData.end = new Date(end);

      this.starter.innerHTML = this.initData._left = this.format(start);
      this.ender.innerHTML = this.initData._right = this.format(end);
    },
    moveend(ev) {
      if(this.disabled) return false
      document.body.removeEventListener("mousemove", this.move);
      document.body.removeEventListener("mouseup", this.moveend);
      this.$emit("change", this.initData);
      setTimeout(_t => (this.isDrag = false), 50);
    },
    _click(ev) {
      if(this.disabled)return false
      if (this.isDrag) return;
      if (ev.target.getAttribute("tap") === "cancel") return;
      this.$emit("tap", ev);
    }
  }
};

</script>
