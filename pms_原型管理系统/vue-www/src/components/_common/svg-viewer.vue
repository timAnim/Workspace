<template>
  <div class="ht-max wd-max lay-v">
    <header class="wd-max">
      <nav-bar :navs='navs' :cur="curImg" @nav='navHdl' v-if='navs.length'></nav-bar>
    </header>
    <img-viewer v-if='curImg' :src='curImg'></img-viewer>
    <div v-else class="wd-max" style="height:calc(100vh - 0.56rem)">
      <div class="ht-l align-c">不包含资料</div>
    </div>
  </div>
</template>
<script>
export default {
  props:["namespace"],
  data() {
    return {
      clicked: null,
      imgArr: [],
      curImg: "",
    };
  },
  methods: {
    navHdl(e) {
      this.curImg = e
    }
  },
  mounted() {
    if (this.namespace) {
      this.$http
        .post("api/flowchart", {
          namespace: this.namespace
        })
        .then(res => {
          var arr = res.body.imgArr
          if (arr) {
            this.curImg = arr[arr.length - 1]
            this.imgArr = res.body.imgArr || []
          }
        })
    }
  },
  computed: {
    navs() {
      var arr = []
      var url
      this.imgArr.forEach(img => {
        url = img.split('\\')
        arr. unshift({
          id: img,
          name: url[url.length - 1]
        })
      })
      return arr
    }
  }
};

</script>
