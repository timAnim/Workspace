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
              <h1 id='project-name'>产品编辑</h1>
              <button v-if='isadmin' class="ht-l wd-l cl-alert" @click='confirmDel'>
                <icon name='trash'></icon>
              </button>
              <button class="ht-l wd-l" @click='save' v-if='cur==="update"&&isadmin'>
                <icon name='save'></icon>
              </button>
            </li>
          </section>
        </header>
        <content id='outer'>
          <section type='single'>
            <div class='pd-l lay-h sd-card'>
              <span
                style='
                  align-self: flex-start;
                  margin-right: var(--pd-l);
                  '>
                <upload @complete='setCover'>
                  <div class="clip wd-l sd-cut radius-m">
                    <img :src="product.cover">
                  </div>
                </upload>
              </span>
              <div class="wd-auto" expand>
                <li>
                  <span class="wd-xl">产品代号</span>
                  <input-text :icon='"code"' :placeholder='"最多20个字"' v-model='product.code' :disabled='!isadmin'></input-text>
                </li>
                <li>
                  <span class="wd-xl">产品名</span>
                  <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='product.name' :disabled='!isadmin'></input-text>
                </li>
                <li>
                  <span class="wd-xl">产品介绍</span>
                  <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='product.description' :disabled='!isadmin'></input-text>
                </li>
                <li class="ht-l">
                  <span class="wd-xl">资料</span>
                  <input-text :icon='"suitcase"' :disabled='!isadmin' v-model='product.material' :placeholder='"输入URL"'></input-text>
                </li>
                <li class="ht-l">
                  <span class="wd-xl">研发</span>
                  <input-text :disabled='!isadmin' :icon='"code"' :placeholder='"网址"' v-model='product.develop'></input-text>
                </li>
                <li class="ht-l">
                  <span class="wd-xl">正式</span>
                  <input-text :disabled='!isadmin' :icon='"home"' :placeholder='"网址"' v-model='product.product'></input-text>
                </li>
                <li class="ht-l">
                  <span class="wd-xl">状态</span>
                  <span
                    @click='product.isClose = !product.isClose'
                    class = 'pointer'>
                    <span class="fs-s cl-sec">{{ product.isClose?'已关闭':'进行中'}}</span>
                    <icon scale='2'
                      style='margin-bottom: -0.35em;'
                      class = 'cl-prim'
                      v-if='product.isClose' name='toggle-off'></icon>
                    <icon scale='2' v-else
                      style='margin-bottom: -0.35em;'
                      class = 'cl-theme'
                      name='toggle-on'></icon>
                  </span>
                </li>
              </div>
            </div>
            <div class="mg-s-v sd-card pd-l">
              <li>
                <h3 class="wd-auto">历史版本</h3>
                <button @click='slctVersion'><icon name='pencil'></icon></button>
              </li>
              <div class="sd-list">
                <li class="ht-m blink-wave" @click='config(version.code)' v-for = 'version in product.projects'>
                  <span>{{version.name}}</span>
                  <span class=" mg-s-h cl-theme" v-if='version.isPublic'>已上架</span>
                  <div></div>
                  <span class="cl-theme mg-s-h underline"
                    v-if='version.proto'
                    @click.prevent.stop="hrefTo(version,'proto')">
                    原型
                  </span>
                  <span class="cl-theme mg-s-h underline"
                    v-if='version.design'
                    @click.prevent.stop="hrefTo(version,'design')">
                    设计
                  </span>
                  <span class="mg-s-h underline"
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
    <presenter ref='present' title="选择迭代" type="check" @out='setVersion' :initData='projects'>
    </presenter>
  </main>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      seen: false,
      id: this.$route.query.id,
      progress_show: false,
      percent: 0,
      projects:[]
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1)
    },
    updateProj() {
      this.$router.push({
        path: "/product/update",
        query: { _id: this.id }
      });
    },
    navHdl(cur) {
      this.cur = cur;
    },
    del() {
      this.$http
        .post("/api/product/remove", { id: this.id })
        .then(rep => {
          if (!rep.body) return false;
          this.$store.commit("toast", "删除成功");
          setTimeout(time => {
            this.$router.push("/products");
          }, 2000);
        });
    },
    confirmDel() {
      this.$store.commit("setConfirm", {
        seen: true,
        msg: "确认删除项目？",
        out: res => {
          if (res) {
            this.del();
          }
        }
      });
    },
    hrefTo(item, type){
      this.$router.push({
        path: "/html-viewer",
        query: {
          code: item.code,
          type
        }
      });
    },
    setCover(ev) {
      this.$set(this.product, "cover", ev.resPath);
    },
    config(code) {
      this.$router.push({
        path: "/project/detail",
        query: {
          code: code
        }
      });
    },
    editProject(item){
      this.$router.push({
        path: "/project/edit",
        query: {
          code: item.code
        }
      });
    },
    save() {
      this.$http
        .post("/api/product/upsert", {
          data: this.product
        })
        .then(res => {
          if (!res.body) return false;
          this.$store.commit("toast", "保存成功");
        });
    },
    setVersion(res){
      if(!res)return false
      this.$http
        .post("/api/projects/updatePid", {
          projArr: res,
          pid: this.product._id
        })
        .then(res => {
          if (!res.body) return false;
          this.$store.commit("toast", "保存成功");
          this.$refs.present.seen = false
          this.init();
        });
    },
    slctVersion(){
      var checkArr = []
      this.product.projects.forEach(item=>{
        checkArr.push(item._id)
      })
      this.$http
        .post("/api/projects/find")
        .then(res => {
          if (!res.body) return false;
          this.projects = res.body.data
          this.projects.forEach(proj=>{
            proj.checked = proj.pid === this.product._id
          })
          this.$refs.present.seen = true
        });
    },
    init(){
      this.$http.post("/api/product/findOne", { id: this.id })
        .then(res => {
          var data = res.body.data
          if (res.body.code !== 0) {
            return this.$store.commit("toast", "网络不给力");
          }
          this.productName = data.name;
          this.product = data;
        });
    }
  },
  updated() {
    document.getElementById("outer").scrollTop = 0;
  },
  mounted() {
      this.seen = true;
      this.init();
  },
  computed: {
    cur: {
      get() {
        return this.$store.state.projEdit;
      },
      set(val) {
        this.$store.commit("setProjEdit", val);
      }
    },
    isadmin() {
      return this.$store.state.isadmin
    }
  },
};

</script>
