<template>
  <transition name='drop'>
    <div class='mask bg-mask-i' style='z-index:9999;' v-if='seen' @click='out(false)'>
        <div class='wd-dialog shadow-l radius-m bg-front pd-m-h' @click.stop>
            <div class="pd-xl-v fs-l align-c">{{msg}}</div>
            <li class="ht-l">
              <div></div>
              <button class="wd-xl mg-s-h" @click='out(false)'>取消</button>
              <button class="wd-xl sd-theme" @click='out(true)'>确认</button>
            </li>
        </div>
    </div>
  </transition>
</template>
<script>
export default {
  methods: {
    out(res) {
      this.$store.state.confirm.out(res);
      this.$store.commit("setConfirm", {
        seen: false
      });
    }
  },
  computed: {
    seen() {
      return this.$store.state.confirm.seen;
    },
    msg() {
      return this.$store.state.confirm.msg;
    }
  }
};
</script>
