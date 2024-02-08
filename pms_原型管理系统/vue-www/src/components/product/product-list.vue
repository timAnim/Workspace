<template>
  <app-layout>
    <li slot='navs' class="ht-l">
      <div>
        <span class="pd-m-h">筛选</span>
        <button :class="{
            'sd-cut': curView!=='进行中',
            'sd-theme': curView==='进行中'}" @click='curView = "进行中"'>进行中
        </button>
        <button :class="{
            'sd-cut': curView!=='已关闭',
            'sd-theme': curView==='已关闭'}" @click='curView = "已关闭"'>已关闭
        </button>
        <button :class="{
            'sd-cut': curView!=='全部',
            'sd-theme': curView==='全部'}" @click='curView = "全部"'>全部
        </button>
      </div>
    </li>
    <section type='cover' slot='content' v-if='seen'>
      <ul>
        <dl @click='productDetail(item)' v-for='item in projects' class='lay-r pd-s pointer' :key='item.id'>
          <li class='ht-s'>
            <div>{{ item.name }}</div>
          </li>
          <div class='clip mg-m radius-m' :class='{landscape:item.isLandscape}'>
            <img :src='item.cover'
              @load='adjust($event,item)'>
          </div>
            <li class="fs-s ht-s">
              <div>
                <span class="pd-xs-h">迭代数</span>
                <span>{{item.projects.length}}</span>
              </div>
              <a
              v-if='item.material?true:false'
              class="cl-theme wd-auto"
              :href="item.material">
              相关资料
            </a>
            </li>
        </dl>
      </ul>
      <div class="ht-l"></div>
      <button v-if='isadmin' @click='add' float>
        <icon name='plus'></icon>
      </button>
    </section>
  </app-layout>
</template>
<script>
export default {
  data() {
    return {
      seen: false,
      projects: [],
      projectsBak: [],
    };
  },
  methods: {
    getData() {
      this.$http.post("/api/product/findAll")
        .then(res => {
          if (res.body.code !== 0) return;
          this.seen = true;
          this.projectsBak = JSON.parse(JSON.stringify(res.body.data));
          this.nav(this.curView)
        });
    },
    productDetail(item) {
      this.$router.push({
        path: "/product/detail",
        query: {
          id: item._id,
        }
      });
    },
    add() {
      this.$router.push("/product/add");
    },
    adjust(e, item) {
      item.isLandscape = e.target.height / e.target.width < 1;
    },
    nav(id) {
      if (id == "全部") {
        this.projects = this.projectsBak;
      } else if (id == '进行中') {
        this.projects = this.projectsBak.filter(item => {
          return !item.isClose;
        });
      } else {
        this.projects = this.projectsBak.filter(item => {
          return item.isClose;
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    isadmin() {
      return this.$store.state.isadmin
    },
    curView: {
      get() {
        return this.$store.state.productSort;
      },
      set(val) {
        this.$store.commit("setProductSort", val);
      }
    },
  },
  watch: {
    curView(id) {
      this.nav(id)
    }
  }
};

</script>
