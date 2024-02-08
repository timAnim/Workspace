<template>
  <transition name='slide'>
    <div class="mask bg-mask-i" v-if='seen'>
      <article class="pd-m">
        <div class="wd-page ht-max sd-card mg-auto pd-s lay-r  radius-m">
          <button class="bg-front-i cl-front-i ht-s wd-s float-ne radius-l" @click='$emit("close")'>
            <icon name='times'></icon>
          </button>
          <span class='mg-s radius-m bg-light ht-xs pd-xs pointer' v-for='(word,i) in data' @click='ontap' :key='i'>
          {{ word.words }}
        </span>
        </div>
      </article>
    </div>
  </transition>
</template>
<style scoped>
article {
  background-color: transparent;
}

button {
  transform: translate(50%, -50%);
}

</style>
<script>
export default {
  props: {
    data: {
      default: []
    },
    seen: {
      default: false
    }
  },
  methods: {
    ontap(ev) {
      if (this.$pd.copy(ev.innerHTML)) {
        this.$store.commit("toast", "文字已复制到剪切板");
      }else{
        this.$store.commit("toast", "浏览器不支持");
      }
    }
  }
};

</script>
