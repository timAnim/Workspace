<template>
  <section class="parsed-panel">
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
        <div class='pd-m' v-if="item.parseType == 'scripture'|| item.parseType == 'hymn'" v-html="item.parseTxt">
        </div>
      </div>
    </ol>
    <li class="mg-m-v">
      <button class="sd-cut wd-xl last-step" @click="inputStep">上一步</button>
      <button class="sd-theme wd-xl mg-m-h output" @click="outputEvnt">导出</button>
    </li>
  </section>
</template>
<script>
export default {
  methods: {
    outputEvnt: function(e) {
      this.$http.post('/api/gen-ppt', {
        worship: this.worship
      }).then(res => {
        var distPath = res.body
        // var distPath = 'http://localhost/' + res.body
        this.$store.commit('switchView', 'output-panel')
        this.$store.commit('distPathMu', distPath)
        this.$router.push('/output')
        window.location.href = distPath
      })
    },
    inputStep: function(e) {
      this.$store.commit('switchView', 'input-panel')
      this.$router.push('input')
    },
    delItem: function(item) {
      this.worship = this.worship.filter(function(t) {
        return t.key !== item.key
      })
      this.$store.commit('worshipMu', this.worship)
    }
  },
  computed: {
    worship: {
      get: function() {
        if (!this.$store.state.worship.length) {
          return false
        }
        this.$store.state.worship.forEach(item => {
          if (item.parseType === 'scripture' || item.parseType === 'hymn') {
            item.parseTxt = item.parsed.join(`<br/>`)
          }
        })
        return this.$store.state.worship
      },
      set: function(val) {
        this.$store.commit('worshipMu', val)
      }
    }
  }
}

</script>
