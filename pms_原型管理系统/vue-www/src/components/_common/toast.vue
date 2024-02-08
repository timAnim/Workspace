<template>
  <div class='mask' v-show='seen'>
    <transition name='slide'>
      <div class='toast'  v-if='seen'>{{msg}}</div>
    </transition>
  </div>
</template>
<style scoped>
.mask {
  background: transparent !important;
  pointer-events: none;
}
</style>
<script>
export default {
  methods: {
    out() {
      this.seen = false;
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    seen() {
      return this.$store.state.toast.seen;
    },
    msg() {
      return this.$store.state.toast.msg;
    }
  }
  
};
</script>
