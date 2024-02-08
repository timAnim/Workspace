<template>
  <dl class="mg-m sd-card pd-l">
    <li class="ht-xs">
      <span class="pd-s-h"> 统计模式 </span>
      <span  class="pointer" @click="sumMode=!sumMode">
        <icon scale="1.5" class="cl-theme" name='toggle-on' v-if="sumMode"></icon>
        <icon scale="1.5" name='toggle-off' v-else></icon>
      </span>
    </li>
    <div class="ht-dialog wd-max" id='canvas'></div>
  </dl>
</template>
<script>
import { lineChart, barChart } from "./wxcharts.js";

export default {
  data() {
    return {
      sumMode: false,
      chart: {},
    };
  },
  mounted() {
    this.$http.post("/api/wxapp/getAnalysisWeeklyVisitTrend").then(res => {
      var statistic = res.body.list;
      statistic.sort((a, b) => {
        return parseInt(a.ref_date) - parseInt(b.ref_date);
      });
      var list = [],
        xAxis = [];
      statistic.forEach(visit => {
        xAxis.push(visit.ref_date);
        list.push(visit.visit_uv_new)
      });
      this.chart = lineChart.init("用户总数",xAxis,list,document.getElementById('canvas'))
    });
  },
  watch: {
    sumMode(val) {
      this.chart.sum(val);
    }
  }
};

</script>
