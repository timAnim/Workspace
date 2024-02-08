<template>
  <transition name='opacity'>
    <div class='mask bg-mask-i' @click.stop='out(false)' v-if='seen'>
      <div class="dialog shadow-l sd-list scroll-y" @click.stop>
        <header>
          <slot name='header'>
            <li class="ht-l">
              <h1 class="pd-m">{{ title }}</h1>
              <button v-if='del' class='sd-alert pd-m-h'>
                <icon name='trash'></icon>
              </button>
            </li>
          </slot>
        </header>
        <content>
          <slot name='content'></slot>
        </content>
        <footer>
          <slot name='footer'>
            <li class="ht-l pd-m-h">
              <div></div>
              <button class="pd-m-h mg-m-h" @click='out(false)'>取消</button>
              <button class="pd-m-h sd-theme" @click='out(true)'>确认</button>
            </li>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "请输入";
      }
    },
    seen: {
      type: Boolean,
      default() {
        return false;
      }
    },
    del: {
      type: Function
    }
  },
  methods: {
    out(res) {
      this.$emit("out", res);
    }
  }
};
</script>
