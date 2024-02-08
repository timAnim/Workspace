<style>
.data-router-outer{
  padding-top: var(--pd-l);
}
#list-zero {
  border-top: var(--ht-s) solid transparent;
  border-bottom: var(--pd-s) solid transparent;
  height: var(--pd-m);
  position: relative;
  background-image: url(./ruler.svg);
  background-size: 49px var(--pd-s);
  background-repeat: repeat-x;
  height: 4px;
  margin-left: var(--pd-m);
  margin-right: var(--pd-m);
  box-sizing: content-box;
  line-height: normal;
}
#list-zero:after,
#list-zero:before {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  left: 0;
  bottom: 0;
  margin-bottom: -0.03rem;
  border: 1px solid #bdbdbd;
  border-radius: 50%;
}
#list-zero:after{
  left: 100%;
  margin-left: -4px;
}

.stage {
  position: absolute;
  left: 0;
  min-width: var(--wd-s);
  text-align: center;
  font-size: var(--fs-xs);
  color: var(--cl-front-i);
  top: 0;
  margin-top: -0.36rem;
  transform: translateX(-50%);
  border: none;
}

.stage div {
  border-radius: var(--raduis-s);
  background: var(--cl-hint);
  transform: translate(0);
  color: var(--cl-front);
  min-width: var(--wd-s);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  bottom: 0;
  margin-bottom: -0.04rem;
  border-width: 0.16rem 0.16rem 0;
  border-style: solid;
  border-color: var(--cl-hint) transparent transparent;
}

.stage .stage-date {
  background: transparent;
  color: var(--cl-hint);
}

.indicator {
  position: absolute;
  height: var(--ht-m);
  width: 2px;
  background: var(--cl-theme);
  bottom: 0;
  margin-left: -1px;
}

.indicator:after {
  content: attr(start);
  background: var(--cl-theme);
  position: absolute;
  left: 0;
  top: 0;
  height: var(--pd-m);
  line-height: var(--pd-m);
  width: var(--wd-m);
  font-size: var(--fs-xs);
  text-align: center;
  overflow: hidden;
  border-radius: var(--raduis-s);
  margin-left: -0.2rem;
  margin-top: -0.16rem;
  border: 1px solid #9e9e9e;
  color: white;
}
</style>
<template>
  <div class='data-router-outer'>
    <div id='list-zero' ref='list-zero' :style='"background-size:"+picWidth+"px 10px; background-position:"+ weekday + " 0px;"'>
      <span class='stage in-bottom' v-for='stage in stageArr' :style='"left:"+ stage.left' @click='_click(stage)' :id='stage._id' :key='stage._id' :class='{pointer: !disabled}'>
        <div class='stage-date' :date='stage.date'>
            {{stage._date}}
        </div>
        <div>{{stage.title}}</div>
      </span>
      <div v-if='indicator' class="indicator" :start='format(today)' :style='"left:"+todayLeft'></div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    _start: {
      required:true
    },
    _end: {
      required:true
    },
    stageArr: Array,
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  computed:{
    start(){
      return new Date(this._start).valueOf()
    },
    end(){
      return new Date(this._end).valueOf()
    },
    indicator(){
      return this.today<this.end && this.today> this.start
    }
  },
  data() {
    return {
      picWidth: 0,
      unit: 0,
      weekday: 0,
      today: 0,
      todayLeft: 0
    };
  },
  mounted(){
      this.initData()
  },
  methods: {
    initData() {
      // 标尺格式化
      var week = this.getD((this.end - this.start) / 7);
      var total = this.$refs["list-zero"].clientWidth;
      this.picWidth = total / week;

      this.unit = total / (7 * week);
      this.weekday =
        -(new Date(this.start).getDay() + 1) * this.unit + "px";
      //缓存
      var startStamp, endStamp;
      // 里程碑的格式化
      this.stageArr.forEach(stage => {
        startStamp = new Date(stage.date).valueOf();
        stage.left = this.getD(startStamp - this.start) * this.unit + "px";
        stage._date = this.format(stage.date);
      });
      // 今天标签
      this.today = new Date().valueOf();
      if (this.today >= this.end) return;
      this.todayLeft = this.getD(this.today - this.start) * this.unit + "px";
    },
    getD(stamp) {
      return stamp / 1000 / 60 / 60 / 24;
    },
    format(date){
      var _date = new Date(date);
      var month = _date.getMonth() + 1
      month = month < 10? '0' + month : month
      var day = _date.getDate() 
      day = day < 10? '0' + day : day
      return month + '-' + day
    },
    _click(stage){
      if(this.disabled)return false
      this.$emit('stage-click', stage)
    }
  },
  watch:{
    stageArr(){
      this.initData()
    }
  }
};
</script>
