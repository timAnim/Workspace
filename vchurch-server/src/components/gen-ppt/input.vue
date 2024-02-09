<template>
  <section class="content wd-max pd-s">
      <textarea class="info-input wd-max ht-max sd-cut pd-s" style="line-height: 1.5em" v-model="inp"></textarea>
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
  name: 'input-panel',
  computed: {
    inp: {
      get: function() {
        return this.$store.state.inp
      },
      set: function(newValue) {
        this.$store.commit('setInp', newValue)
      }
    }
  }
}

</script>
