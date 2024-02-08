<template>
  <main>
    <transition name='slide' mode='out-in' duration='100'>
      <article v-if='seen'>
        <header class="shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button class="wd-l ht-l" @click='backBtn'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>添加任务</h1>
            </li>
          </section>
        </header>
        <content id='outer'>
          <section type='single' id='calendar' class="shadow-m">
            <nav-bar type='inner' :navs='navs' :cur='cur' @nav='navHdl'></nav-bar>
            <keep-alive>
              <task-add v-if='cur==="task"&&init' :init='init'></task-add>
              <stage-add v-if='cur==="stage"&&init' :init='init'></stage-add>
              <task-import v-if='cur==="import"&&init' :init='init'></task-import>
            </keep-alive>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
import stageAdd from "../stage/add.vue";
import taskAdd from "../task/add.vue";
import taskImport from "../task/import.vue";
export default {
  data() {
    return {
      seen: false,
      navs: [
        {
          id: "task",
          name: "任务"
        },
        {
          id: "import",
          name: "导入"
        },
        {
          id: "stage",
          name: "里程碑"
        }
      ],
      cur: "task",
      code: this.$route.query.code,
      init: ""
    };
  },
  methods: {
    backBtn() {
      this.$router.back();
    },
    navHdl(cur) {
      this.cur = cur;
    }
  },
  mounted() {
    this.seen = true;
    this.$http.post("/api/projects/find", { code: this.code }).then(res => {
      if (res.body.code !== 0) return;
      this.init = res.body.data;
      this.init.start = new Date(res.body.data.start).Format("yyyy-MM-dd");
      this.init.end = new Date(res.body.data.end).Format("yyyy-MM-dd");
    });
  },
  components: {
    "stage-add": stageAdd,
    "task-add": taskAdd,
    "task-import": taskImport
  }
};
</script>
