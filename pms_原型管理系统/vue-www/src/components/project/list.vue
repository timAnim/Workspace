<template>
  <app-layout>
    <nav-bar :navs='navs' :cur='cur' @nav='navHdl' slot='navs'></nav-bar>
    <section v-if='seen' type='cover' slot='content'  style="max-width: var(--wd-page)">
      <project-list></project-list>
      <h4></h4>
    </section>
  </app-layout>
</template>
<script>
import projectList from './project-list'
export default {
  data() {
    return {
      seen: false,
      projects: [],
      projectsBak: [],
      buttonSeen: false,
      item: {},
      navs: [{
          id: "develop",
          name: "进行中"
        },
        {
          id: "public",
          name: "已上线"
        },
        {
          id: "all",
          name: "全部"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.$http.post("/api/projects/find")
        .then(res => {
          if (res.body.code !== 0) return;
          this.projects = res.body.data;
          this.init();
        });
    },
    init() {
      let end = 0,
        start = 0,
        total = 0,
        diff,
        diff_day;
      this.projects.forEach(item => {
        item.cover = item.cover || "/static/img/logistics.png";
        item.startVal = new Date(item.start).valueOf();
        item.endVal = new Date(item.end).valueOf();
        item.start = new Date(item.start).Format("yyyy-MM-dd");
        item.start_short = new Date(item.start).Format("MM-dd");
        item.end_short = new Date(end).Format("MM-dd");
      });
      this.projectsBak = JSON.parse(JSON.stringify(this.projects));
      this.$pd.wait(1200).then(seed => (this.buttonSeen = true));

      this.navHdl(this.cur);
    },
    navHdl(id) {
      this.cur = id;

      if (this.cur === "all") {
        this.projects = this.projectsBak;
      }else if(this.cur ==='develop'){
        var nowDate = new Date().valueOf()
        this.projects = this.projectsBak.filter(item => {
          return item.startVal <= nowDate && item.endVal >= nowDate;
        });
      } else {
        this.projects = this.projectsBak.filter(item => {
          return item.isover;
        });
      }

      this.seen = false;
      this.buttonSeen = false;
      this.$pd.wait(50).then(seed => (this.seen = true));
      this.$pd.wait(350).then(seed => (this.buttonSeen = true));
    },
    projectDetail(item) {
      if (this.cur === "all") {
        return this.config(item.code, 'update');
      }
      this.$router.push({
        path: "/html-viewer",
        query: {
          code: item.code,
          type: this.cur
        }
      });
    },
    config(code, type) {
      this.$store.commit("setProjEdit", type);
      this.$router.push({
        path: "/project/detail",
        query: {
          code: code
        }
      });
    },
    add() {
      this.$router.push("/project/add");
    },
    adjust(e, item) {
      item.isLandscape = e.target.height / e.target.width < 1;
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    cur: {
      get() {
        return this.$store.state.projStage;
      },
      set(id) {
        this.$store.commit("setProjStage", id);
      }
    },
    isadmin() {
      return this.$store.state.isadmin
    }
  },
  components: {
    'project-list': projectList,
  }
};

</script>
