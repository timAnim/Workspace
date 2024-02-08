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
              <h1 id='project-name'>迭代详情</h1>
              <button class="ht-l wd-l" @click='edit' v-if='isadmin'>
                <icon name='cog'></icon>
              </button>
            </li>
          </section>
        </header>
        <content id='outer'>
          <section type='single'>
            <div class="sd-card">
              <nav-bar :navs='navs' :cur='cur' @nav='navHdl' type='inner'></nav-bar>
              <keep-alive> 
                <update v-if='cur==="update"' ref='update' :proj='proj'></update>
                <staff v-if='cur==="staff"' :proj='proj'></staff>
                <plan v-if='cur==="plan"' :disabled='true' :proj='proj'></plan>
              </keep-alive> 
            </div>
            <h4></h4>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
import detailView from "./config.vue";
import staffView from "./staff.vue";
import planView from "../edit/plan.vue";
export default {
  data() {
    return {
      proj: null,
      projName: '项目名称',
      seen: false,
      code: this.$route.query.code,
      navs: [{
        id: "update",
        name: "迭代详情"
      }, {
        id: "staff",
        name: "人员"
      }, {
        id: "plan",
        name: "计划"
      }]
    };
  },
  methods: {
    backBtn() {
      this.$router.go(-1);
    },
    navHdl(cur) {
      this.cur = cur;
    },
    edit() {
      this.$router.push({
        path: "/project/edit",
        query: { code: this.code }
      });
    }
  },
  updated() {
    document.getElementById("outer").scrollTop = 0;
  },
  mounted() {
    this.seen = true;
    this.$http.post("/api/projects/findOne", { code: this.code })
      .then(res => {
        var data = res.body.data
        if (res.body.code !== 0) {
          return this.$store.commit("toast", "网络不给力");
        }
        data.start = new Date(data.start).Format("yyyy-MM-dd");
        data.end = new Date(data.end).Format("yyyy-MM-dd");
        this.projName = data.name;
        this.proj = data;
      });
  },
  components: {
    staff: staffView,
    plan: planView,
    update: detailView
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
  }
};

</script>
