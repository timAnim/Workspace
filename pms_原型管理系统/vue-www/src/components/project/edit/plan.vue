<template>
  <transition name='in-left'>
    <section>
      <ol class='pd-m'>
        <date-ruler
          style='margin-left: var(--wd-xl);'
          :_start='start' :_end='end' :stageArr='stageArr' @stage-click='editStage' :disabled='disabled'></date-ruler>
        <slider-date  v-for='task in planArr' :key='task._id'  :id='task._id' @tap='editTask(task)' @change='save' :gant='task' :max='end' :min='start' :disabled='disabled'>
        </slider-date>
        <li v-if='isadmin'>
          <button class="ht-m wd-max" @click='updateSchedule'>更新日程</button>
        </li>
      </ol>
      <task-edit ref='taskEdit' :init='task'></task-edit>
      <stage-edit ref='stageEdit' :init='stage'></stage-edit>
    </section>
  </transition>
</template>
<script>
import dateRuler from "@/components/_common/date-ruler.vue";
import sliderDate from "@/components/_common/slider-date.vue";
import taskEdit from "../task/edit.vue";
import stageEdit from "../stage/edit.vue";
export default {
  props: ['proj', 'disabled'],
  data() {
    return {
      isadmin: this.$store.state.isadmin,
      code: this.$route.query.code,
      planArr: [],
      stageArr: [],
      end: "",
      start: "",
      task: {},
      stage: {},
      picWidth: 0,
      unit: 0,
      weekday: 0,
      today: 0,
      todayLeft: 0
    };
  },
  mounted() {
    this.init();
  },
  watch:{
    proj(){
      this.init()
    }
  },
  methods: {
    init() {
      if (!this.proj) return;
      //数据初始化
      this.start = new Date(this.proj.start).valueOf();
      this.end = new Date(this.proj.end).valueOf();
      this.planArr = this.proj.plan;
      this.planArr = this.planArr.sort((a, b) => {
        return new Date(a.start).valueOf() - new Date(b.start).valueOf();
      });
      this.planArr.forEach(item=>{
        item.disabled = !this.isadmin
      })
      this.stageArr = this.proj.stage;

      // 标尺格式化
      var week = this.getD((this.end - this.start) / 7);
      var total = this.$pd.id("list-zero").clientWidth;
      this.picWidth = total / week;
      this.unit = total / (7 * week);
      this.weekday =
        -(new Date(this.start).getDay() + 1) * this.unit + "px";
      //缓存
      var startStamp, endStamp;
      // 里程碑的格式化
      this.stageArr.forEach(stage => {
        startStamp = new Date(stage.date).valueOf();
        stage.left = this.getD(startStamp - this.start) * this.unit + "px";
        stage._date = new Date(stage.date).Format("MM-dd");
      });
      // 今天标签
      var today = new Date().valueOf();
      this.today = new Date().Format("MM-dd");
      if (today >= this.end) return;
      this.todayLeft = this.getD(today - this.start) * this.unit + "px";
    },
    addPlan() {
      this.$router.push({
        path: "/plan/add",
        query: { code: this.code }
      });
    },
    editStage(_s) {
      if (!this.isadmin) return false;
      this.stage = _s;

      Object.assign(this.stage, {
        date: new Date(_s.date).Format("yyyy-MM-dd"),
        min: new Date(this.start).Format("yyyy-MM-dd"),
        max: new Date(this.end).Format("yyyy-MM-dd")
      });
      this.$refs.stageEdit.seen = true;
    },
    editTask(_t) {
      if (!this.isadmin) return false;
      this.task = _t;
      var prios = {
        high: "高",
        regular: "中",
        low: "低"
      };
      Object.assign(this.task, {
        start: new Date(_t.start).Format("yyyy-MM-dd"),
        end: new Date(_t.end).Format("yyyy-MM-dd"),
        min: new Date(this.start).Format("yyyy-MM-dd"),
        max: new Date(this.end).Format("yyyy-MM-dd"),
        prioTxt: prios[_t.prio]
      });
      this.$refs.taskEdit.seen = true;
    },
    save(_t) {
      this.$http
        .post("/api/projects/plan/update", {
          task: _t,
          code: this.code
        })
        .then(res => {
          if (res.body.code !== 0) return this.$pd.toast("修改失败");
        });
    },
    refresh() {
      this.init();
    },
    getD(stamp) {
      return stamp / 1000 / 60 / 60 / 24;
    },
    updateSchedule() {
      this.$http
        .post("/api/projects/schedule/refresh", { code: this.code })
        .then(rep => {
          if (!rep.body) return false;
          this.$store.commit("toast", "操作成功");
          this.$emit('refresh',true);
        });
    }
  },
  components: {
    "stage-edit": stageEdit,
    "task-edit": taskEdit,
    "slider-date": sliderDate,
    "date-ruler": dateRuler
  }
};
</script>
