<template>
  <section class="input-panel">
    <dl class="pd-s ht-dialog">
      <textarea class="info-input wd-max ht-max sd-cut pd-s" style="line-height: 1.5em" v-model="inp"></textarea>
    </dl>
    <li class="mg-m-v">
      <button class="sd-theme wd-xl generate" @click="generate">解析</button>
    </li>
  </section>
</template>
<script>
export default {
  name: 'input-panel',
  methods: {
    generate: function(e) {
      if (!this.inp) return false
      this.$http.post('/api/parse-string', {
        inp: this.inp
      }).then(res => {
        this.$router.push('/parsed')
        this.$store.commit('switchView', 'parsed-panel')
        this.$store.commit('worshipMu', res.body)
      })
    }
  },
  computed: {
    inp: {
      get: function() {
        return this.$store.state.inp
      },
      set: function(newValue) {
        this.$store.commit('inpMu', newValue)
      }
    }
  }
}

</script>
