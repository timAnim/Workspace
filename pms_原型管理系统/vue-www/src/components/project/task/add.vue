<template>
  <transition name='in-left'>
    <ol expand class='pd-m'>
      <div>
        <li>
          <span class="wd-xl">计划名</span>
          <input-text type="text" v-model='task.name' placeholder='计划名' icon='i-cursor'></input-text>
        </li>
        <li><span class="wd-xl">开始日期</span>
          <input-date type="date" v-model='task.start' :min='task.start' :max='task.end'></input-date>
        </li>
        <li><span class="wd-xl">截止日期</span>
          <input-date type="date" v-model='task.end' :min='task.start' :max='task.end'></input-date>
        </li>
        <li class='blink-theme' @click='slctPrio'>
          <span class="wd-xl">优先级</span>
          <div id='prio'>{{ task.prioTxt }}</div>
          <label class='wd-m'>
            <icon name='angle-right'></icon>
          </label>
        </li>
        <li class='blink-theme' @click='slctPerson'>
          <span class="wd-xl">责任人</span>
          <div id='person'>{{ task.pname }}</div>
          <label class='wd-m'>
            <icon name='angle-right'></icon>
          </label>
        </li>
        <li>
          <div></div>
          <button @click='save' class="sd-theme wd-xl">保存</button>
        </li>
      </div>
      <presenter ref='prio' :title='"选择优先级"' :type='"radio"' :data='prios' @out='setPrio'>
      </presenter>
      <presenter ref='person' :title='"选择责任人"' :type='"radio"' :data='staffs' @out='setPerson'>
      </presenter>
    </ol>
  </transition>
</template>
<script>
export default {
  props: ["init"],
  data() {
    return {
      code: this.$route.query.code,
      prios: [
        { _id: "high", name: "高" },
        { _id: "regular", name: "中" },
        { _id: "low", name: "低" }
      ],
      task: {},
      staffs: []
    };
  },
  methods: {
    save() {
      var req = {
        code: this.code,
        plan: this.task
      };
      if (!this.task.name || !this.task.start || !this.task.end)
        return this.$pd.toast("请检查输入");
      this.$http.post("/api/projects/plan/insert", req).then(res => {
        if (res.body.code !== 0) return;
        this.$pd.toast("添加成功");
        this.$router.back();
      });
    },
    slctPrio() {
      this.$refs.prio.seen = true;
      this.$refs.prio.check([this.task.prio]);
    },
    setPrio(res) {
      if (!res) return;
      this.task.prio = res[0]._id;
      this.$set(this.task, "prioTxt", res[0].name);
    },
    slctPerson() {
      this.$refs.person.seen = true;
      this.$http
        .post("/api/projects/staff/find", {
          code: this.code
        })
        .then(res => {
          if (res.body.code !== 0) return;
          res.body.data.forEach(item => {
            item.pre = item.mobile;
          });
          this.staffs = res.body.data;
        });
    },
    setPerson(res) {
      if (!res) return;
      this.task.puid = res[0].puid;
      this.$set(this.task, "pname", res[0].name);
    }
  },
  mounted() {
    this.task = {
      start: this.init.start,
      end: this.init.end,
      prio: "low",
      prioTxt: "低"
    };
  }
};
</script>
