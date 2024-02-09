<template>
  <section class="output-panel">
    <dl class="pd-m">
      <li class="bg-bright pd-m-h ht-l">
        <span>文件已经导出</span>
      </li>
      <div class="output-info pd-m pointer">{{ distPath }}</div>
    </dl>
    <li class="mg-m-v">
      <button class="sd-cut wd-xl" @click='parsedStep'>上一步</button>
      <button class="sd-theme wd-xl mg-m-h" @click='download'>下载</button>
    </li>
  </section>
</template>
<script>
export default {
  methods: {
    parsedStep: function(e) {
      this.$store.commit('switchView', 'parsed-panel')
      this.$router.push('parsed')
    },
    download: function() {
      window.location.href = this.distPath
    }
  },
  computed: {
    distPath: function() {
      return this.$store.state.distPath
    }
  }
}

</script>
