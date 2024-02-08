
<template>
  <div class='mask' style="background:transparent!important;" v-if='seen' @click='out'>
    <div class='sd-black pd-s' style="background: rgba(0,0,0,0.8); width:200px; height:200px;" align='center'>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="width:200px; height:200px;">
        <circle cx="100" cy='100' r='40' stroke="#424242" fill="transparent" stroke-width="4" />
        <path :d="dAttr" stroke="white" fill="transparent" stroke-width="4" />
        <text x="100" y="106" fill='white' style="text-anchor: middle">{{ txt }}</text>
      </svg>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  props: ["percent", "seen"],
  name: "progress-circle",
  data() {
    return {
      txt: "0%",
      dAttr: "M 100 60 A 40 40 0 1 1 100 60"
    };
  },
  methods: {
    out() {
      this._seen = false;
    }
  },
  watch: {
    percent(per) {
      var RND = Math.PI * 2;
      if (per >= 100) {
        this.dAttr = `M 100 60 A 40 40 0 1 1 99.9 60`;
        this.txt = "100%";
      } else {
        var endX = 100 + 40 * Math.sin(RND * per / 100);
        var endY = 100 - 40 * Math.cos(RND * per / 100);
        this.dAttr = `M 100 60 A 40 40 0 ${per > 50 ? 1 : 0} 1 ${endX} ${endY}`;
        this.txt = per + "%";
      }
    }
  },
  computed: {
    _seen: {
      get() {
        return this.seen;
      },
      set(val) {
        return val;
      }
    }
  }
};

</script>
