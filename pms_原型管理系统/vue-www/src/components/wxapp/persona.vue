<template>
    <dl class="mg-m sd-card pd-s">
      <li>
          <div class="fs-l pd-m-h">用户画像</div>
      </li>
      <div class="lay-r">
        <div class="ht-max wd-max" id='canvas'  style="height:640px;"></div>
        <div class="float-nw ht-dialog wd-dialog" id='ages'></div>
        <div class="float-sw ht-panel wd-panel" id='genders'></div>
        <div class="float-ne ht-max wd-panel pd-l-v" style="background:rgba(256,256,256,0.2)">
          <li><div class="pd-m-h">机型TOP20</div></li>
          <li class="ht-xs fs-s cl-hint" v-for="(dvc,i) in devices" :key="i">
            <label>{{i + 1 }}</label><span>{{dvc.name}}</span><pre class="pd-s-h">{{dvc.value}}</pre>
          </li>
        </div>
      </div>
    </dl>
</template>
<script>
import { geoCoord, barChart, pieChart } from "@/components/_chart/geoCoordMap";
export default {
  data() {
    return {
      total: 0,
      devices: [],
      source: "微信数据分析"
    };
  },
  methods: {},
  mounted() {
    this.$http.post("/api/wxapp/getAnalysisUserPortrait").then(res => {
      var list = res.body.data.visit_uv;
      var chart = geoCoord.init(
        list.province,
        document.getElementById("canvas")
      );
      this.total = 0;
      this.devices = list.devices;
      var genders = list.genders;
      genders.forEach(item => {
        this.total += item.value;
      });
      this.devices.sort((a, b) => {
        return b.value - a.value;
      });
      var bars = barChart.init(list.ages, document.getElementById("ages"));
      var genders = pieChart.init(
        list.genders,
        document.getElementById("genders")
      );

      window.onresize = e => {
        if (this.cur !== "persona") return;
        chart.resize();
        bars.resize();
        genders.resize();
      };
      this.$emit("change", this.total, "persona");
    });
  }
};
</script>

