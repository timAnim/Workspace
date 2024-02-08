<template>
  <transition name='slide'>
    <div class="mask bg-mask-i" v-if='seen' @click='close'>
      <section class="ht-max pd-s">
        <div class="sd-card sd-list mg-auto ht-max lay-v" @click.stop>
          <li class="ht-l bg-light">
            <button @click='close' class="ht-l wd-l">
              <icon name='chevron-down'></icon>
            </button>
            <h1 class="align-indent">{{ init.title }}</h1>
            <button @click='edit' class="ht-l wd-l" v-if='isAdmin'>
              <icon name='cog'></icon>
            </button>
          </li>
          <content class="ht-max">
            <img class="mg-auto mg-m-v" :src='init.cover'>
            <div id='_con' class="pd-m" v-html='init.content'></div>
          </content>
        </div>
      </section>
    </div>
  </transition>
</template>
<style scoped>
#_con {
  line-height: 2em;
}

p {
  padding: 0.08rem;
}

img {
  display: block;
  max-width: 3.6rem;
}
section {
  max-width: var(--wd-page);
  width: 100%;
}
</style>
<script>
export default {
  props: ["init"],
  methods: {
    close(ev) {
      this.seen = false;
    },
    edit() {
      if (!this.isAdmin) return this.$pd.toast("请登录");
      this.$router.push("/blogs/update?_id=" + this.init._id);
    }
  },
  data() {
    return {
      seen: false,
      isAdmin: sessionStorage.token ? true : false
    };
  }
};
</script>
