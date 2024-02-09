<template>
  <section class="pd-m">
    <dl>
      <li class="bg-bright pd-m-h ht-l">
        <span>文件已经导出</span>
      </li>
      <div class="output-info pd-m pointer" @click='download'>{{ distPath }}</div>
    </dl>
  </section>
</template>
<script>
export default {
  mounted(){
    if(!this.distPath){
      this.$store.commit('setCur', 'parsed')
      this.$router.push("/gen-ppt/parsed")
    }
  },
  methods: {
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
