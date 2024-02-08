<template>
  <main>
    <transition name='slide'>
      <div class="ht-max wd-max lay-v" v-show='seen'>
        <header class="sd-front-i">
          <li>
            <button class='cl-prim wd-m' @click='$router.back()'>
              <icon name='chevron-down'></icon>
            </button>
            <div @click='copy' class="fs-s mg-m-h pointer">{{url}}</div>
          </li>
        </header>
        <iframe class="ht-auto wd-max" :src="url"></iframe>
      </div>
    </transition>
  </main>
</template>
<script>
export default {
  data() {
    return {
      url: '',
      seen: false,
      title: '',
    }
  },
  mounted() {
    this.seen = true;
    this.url = this.$route.query.url
  },
  methods:{
    copy(){
      let host = location.origin + '\\api';
      this.$pd.copy(this.url.replace(/^api/, host))
    }
  }
}

</script>
