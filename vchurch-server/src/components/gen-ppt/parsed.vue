<template>
  <section class="content scroll-y">
    <ol class='parsed pd-l'>
      <div v-for='(item, i) in worship' :key = 'i'>
        <li :key='item.id'>
          <label>{{item.id||''}}</label>
          <span class='wd-xl'>{{item.name}}</span>
          <div>{{item.value||''}}</div>
          <button @click='delItem(item)'>
            <i class="fa fa-minus-circle cl-sec"></i>
          </button>
        </li>
        <div
          class='pd-m'
          v-if="item.parseType == 'scripture'|| item.parseType == 'hymn'"
          v-html="item.parseTxt">
        </div>
      </div>
    </ol>
  </section>

</template>
<style type="text/css" scoped>
  .content{
    position: absolute;
    top:0;
    bottom:0;
  }
</style>
<script>
export default {
  mounted(){
    if(!this.worship){
      this.$store.commit('setCur', 'input')
      this.$router.replace('/gen-ppt/input')
    }
  },
  methods: {
    delItem: function(item) {
      this.worship = this.worship.filter(function(t) {
        return t.key !== item.key
      })
      this.$store.commit('setWorship', this.worship)
    }
  },
  computed: {
    worship: {
      get: function() {
        if (!this.$store.state.worship) {
          return null
        }
        this.$store.state.worship.forEach(item => {
          if (item.parseType === 'scripture' || item.parseType === 'hymn') {
            item.parseTxt = item.parsed.join(`<br/>`)
          }
        })
        return this.$store.state.worship
      },
      set: function(val) {
        this.$store.commit('setWorship', val)
      }
    }
  }
}

</script>
