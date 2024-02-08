<template>
  <main>
    <transition name='slide'>
      <article v-show='seen'>
        <header class="sd-card">
          <section type='single'>
            <li class="ht-l">
              <button @click='backBtn' class="wd-l ht-l">
                <icon name="chevron-down"></icon>
              </button>
              <h1 id='project-name'>产品详情</h1>
              <button class="ht-l wd-l" @click='editProduct' v-if='isadmin'>
                <icon name='cog'></icon>
              </button>
            </li>
          </section>
        </header>
        <content id='outer'>
          <section type='single'>
            <div class="ht-l"></div>
            <div class="sd-card">
              <div class='pd-l lay-r' style="padding-top: var(--ht-l)">
                <div class="sd-cut float-nw radius-m mg-m-h" style="margin-top: -44px; height:88px; width: 88px;">
                  <div class="clip">
                    <img :src="product.cover">
                  </div>
                  </div>
                  <div class="wd-auto sd-list">
                    <li class="pd-s-v" style="height: inherit;">
                      <div style="max-width: 50%;">
                        <div class="cl-hint">产品名</div>
                        <div class="ht-l fs-xl">{{product.name}}</div>
                      </div>
                      <div style="max-width: 50%;">
                        <div class="cl-hint">产品代号</div>
                        <div class="ht-l">{{product.code}}</div>
                      </div>
                    </li>
                    <li class="pd-s-v">
                      <div style="max-width: 50%;">
                        <div class="cl-hint">产品介绍</div>
                        <div class="ht-s">{{product.description}}</div>
                      </div>
                      <div style="max-width: 50%;">
                        <div class="cl-hint">状态</div>
                        <div class="ht-s">{{product.isClose? '已关闭':'进行中'}}</div>
                      </div>
                    </li>
                    <div class="pd-s-v">
                      <div class="cl-hint">资料</div>
                      <div class="ht-s">
                        <span class="pd-s-h blink-wave" @click='$pd.copy(material)'><icon name='paste'></icon></span>
                        <span class="pointer underline fs-s" @click='href(product.material)'>
                        {{material}}
                      </span>
                      </div>
                    </div>
                    <div class="pd-s-v">
                      <div class="cl-hint">研发</div>
                      <div class="ht-s">
                        <span class="pd-s-h blink-wave" @click='$pd.copy(develop)'><icon name='paste'></icon></span>
                        <span class="pointer underline fs-s" @click='href(product.develop)'>
                        {{develop}}
                      </span>
                      </div>
                    </div>
                    <div class="pd-s-v">
                      <div class="cl-hint">正式</div>
                      <div class="ht-s">
                        <span class="pd-s-h blink-wave" @click='$pd.copy(product_url)'><icon name='paste'></icon></span>
                        <span class="pointer underline fs-s" @click='href(product.product)'>
                        {{product_url}}
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="sd-card pd-l mg-s-v">
                <li>
                  <h3 class="wd-auto">历史版本</h3>
                  <span class="pd-s-h underline fs-s" @click='previewVersions'>查看履历</span>
                  <span class="pd-s-h underline fs-s" @click='downloadVersions'>导出</span>
                </li>
                <div class="files sd-list">
                  <li class="ht-m blink-wave" @click='projectDetail(version.code)' v-for='version in product.projects'>
                    <span>{{version.name}}</span>
                    <span
                    class=" mg-s-h cl-theme"
                    v-if='version.isPublic'>已上架</span>
                    <div></div>
                    <span
                    class="cl-theme mg-s-h underline fs-s"
                    v-if='version.proto'
                    @click.prevent.stop="hrefTo(version,'proto')">
                    原型
                  </span>
                    <span
                    class="cl-theme mg-s-h underline fs-s"
                    v-if='version.design'
                    @click.prevent.stop="hrefTo(version,'design')">
                    设计
                  </span>
                    <span
                    v-if='isadmin'
                    class="mg-s-h underline fs-s"
                    @click.prevent.stop="editProject(version)">
                    编辑
                  </span>
                  </li>
                </div>
              </div>
              <h4></h4>
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
      product: {},
      product_url: '',
      develop: '',
      material: '',
      seen: false,
      id: this.$route.query.id,
      progress_show: false,
      percent: 0,
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1)
    },
    editProduct() {
      var id = this.product._id
      this.$router.push({
        path: "/product/edit",
        query: {
          id
        }
      });
    },
    href(url) {
      this.$router.push({
        path: '/url-viewer',
        query: {
          url
        }
      })
    },
    hrefTo(item, type) {
      this.$router.push({
        path: "/html-viewer",
        query: {
          code: item.code,
          type
        }
      });
    },
    editProject(item) {
      var code = item.code
      this.$router.push({
        path: "/project/edit",
        query: {
          code
        }
      });
    },
    projectDetail(code) {
      this.$router.push({
        path: "/project/detail",
        query: {
          code
        }
      });
    },
    previewVersions() {
      this.$http.post('/api/axdoc/gen-versions-html', {
          id: this.product._id
        })
        .then(res => {
          this.href(res.body)
        })
    },
    downloadVersions() {
      this.$http.post('/api/axdoc/output-versions', {
          id: this.product._id
        })
        .then(res => {
          location.href = res.body
        })
    }
  },
  mounted() {
    this.seen = true;
    this.$http.post("/api/product/findOne", { id: this.id })
      .then(res => {
        if (res.body.code !== 0) {
          return this.$store.commit("toast", "网络不给力");
        }
        this.product = res.body.data;
        let host = location.origin + '\\api';

        this.material = this.product.material && this.product.material.replace('api', host)
        this.develop = this.product.develop && this.product.develop.replace('api', host)
        this.product_url = this.product.product && this.product.product.replace('api', host)
      });
  },
  computed: {
    isadmin() {
      return this.$store.state.isadmin
    }
  },
};

</script>
