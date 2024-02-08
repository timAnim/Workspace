<template>
  <main>
    <transition name='slide' mode='out-in' duration='100'>
      <article v-if='seen'>
        <header class="shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button class="ht-l wd-l" @click='$router.back()'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>添加产品</h1>
              <button class='ht-l wd-l' @click='save'>
                <icon name='save'></icon>
              </button>
            </li>
          </section>
        </header>
        <content>
          <section type='single'>
            <div class="ht-l"></div>
            <div class="sd-card" expand>
              <div class='pd-l lay-r'
                style="padding-top: var(--ht-l)">
                <div class="sd-cut float-nw radius-m mg-m-h"
                  style="margin-top: -44px; height:88px; width: 88px;">
                  <upload @complete='setCover'>
                    <div class="clip">
                      <img :src="product.cover">
                    </div>
                  </upload>
                </div>
                <li>
                  <span class="wd-xl">产品名</span>
                  <input-text v-model='product.name' :icon='"suitcase"' placeholder="最多20个字" :max='20' class='wd-auto'>
                  </input-text>
                </li>
                <li>
                  <span class="wd-xl">产品代号</span>
                  <input-text v-model='product.code' icon="code" placeholder="数字和字母" class='wd-auto'>
                  </input-text>
                </li>
                <li>
                  <span class="wd-xl">产品介绍</span>
                  <input-text v-model='product.description' :icon='"suitcase"' placeholder='最多20个字' class='wd-auto'>
                  </input-text>
                </li>
                <li>
                  <span class="wd-xl">相关资料</span>
                  <input-text class='wd-auto' :icon='"code"' v-model='product.material' placeholder="网址"></input-text>
                </li>
                <li>
                  <span class="wd-xl">开发环境</span>
                  <input-text class='wd-auto' :icon='"code"' v-model='product.develop' placeholder="网址"></input-text>
                </li>
                <li>
                  <span class="wd-xl">正式环境</span>
                  <input-text class='wd-auto' :icon='"code"' v-model='product.product' placeholder="网址"></input-text>
                </li>
              </div>
            </div>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
export default {
  data() {
    return {
      seen: false,
      product: {
        name: "",
        cover: '/static/img/yxt-logo.png',
        code: "",
        develop: "",
        product: "",
      }
    };
  },
  methods: {
    save() {
      if ( !this.product.name ||!this.product.code ) {
        this.$store.commit("toast", "请检查输入");
        return false
      }
      this.$http
        .post("/api/product/upsert", {
          data: this.product
        })
        .then(res => {
          if (res.body.code !== 0){
            this.$store.commit("toast", "添加失败, 请检查输入");
            return false
          }
          this.$store.commit("toast", "添加成功");
          setTimeout(time => {
            this.$router.push("/product/list");
          }, 2000);
        });
    },
    setCover(ev){
      this.$set(this.product, "cover", ev.resPath);
    }
  },
  mounted() {
    this.seen = true;
  },
};

</script>
