<template>
  <dl expand class="mg-m sd-card pd-l">
    <li class="ht-xs">
      <span class="pd-s-h"> 统计模式 </span>
      <span  class="pointer" @click="sumMode=!sumMode">
        <icon scale="1.5" class="cl-theme" name='toggle-on' v-if="sumMode"></icon>
        <icon scale="1.5" name='toggle-off' v-else></icon>
      </span>
    </li>
    <div class="ht-dialog wd-max" id='canvas'></div>
    <div class="ht-dialog wd-max" id='stay'></div>
  </dl>
</template>
<script>
import { lineChart, barChart } from "./wxcharts.js";
export default {
  props: ['statistic'],
  data(){
    return{
      sumMode:false
    }
  },
  mounted() {
    var statistic = this.statistic;
    var bars = [];
    var lines = [];
    var xAxis = [];
    statistic.forEach(item => {
      xAxis.push(item.ref_date);
      lines.push(item.visit_uv);
      bars.push(item.stay_time_session.toFixed(2));
    });

    this.chart = lineChart.init("周访客数量", xAxis, lines, document.getElementById("canvas"))

    barChart.init("单次访问时长", xAxis, bars, document.getElementById("stay"))
  },
  watch: {
    sumMode(val) {
      this.chart.sum(val)
    }
  }
};

</script>
