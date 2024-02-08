<template>
  <transition name='opacity'>
    <div class='mask bg-mask-i' v-if='seen' @click='out'>
      <div class="dialog" @click.stop>
        <header>
          <li class="ht-l pd-m-h">
            <h1>任务详情</h1>
          </li>
        </header>
        <content>
          <ol class="pd-m" expand>
            <div>
              <li>
                <span class="wd-xl">计划名</span>
                <input-text type="text" v-model='initData.name' placeholder='最长20字' icon='i-cursor'></input-text>
              </li>
              <li><span class="wd-xl">开始日期</span>
                <input-date type="date" v-model='initData.start' :min='initData.min' :max='initData.max'></input-date>
              </li>
              <li>
                <span class="wd-xl">截止日期</span>
                <input-date type="date" v-model='initData.end' :min='initData.min' :max='initData.max'></input-date>
              </li>
              <li @click='slctPrio'>
                <span class="wd-xl">优先级</span>
                <div class="lay-h bg-light ht-s raduis-m pointer">
                  <pre>{{initData.prioTxt}}</pre>
                  <label>
                    <icon name='angle-right'></icon>
                  </label>
                </div>
              </li>
              <li  @click='slctPerson'>
                <span class="wd-xl">责任人</span>
                <div class="lay-h bg-light ht-s raduis-m pointer">
                  <pre>{{initData.pname}}</pre>
                  <label>
                    <icon name='angle-right'></icon>
                  </label>
                </div>
              </li>
              <h4></h4>
              <div class="lay-h">
                <div class="wd-auto"></div>
                <button class='cl-alert wd-xl mg-m-h' @click='delTask'>
                  <icon name='trash'></icon>
                </button>
                <button class='sd-theme wd-xl' @click='save'>保存</button>
              </div>
            </div>
          </ol>
        </content>
      </div>
      <presenter ref='prio' :title='"选择优先级"' :type='"radio"' :data='prioArr' @out='setPrio'>
      </presenter>
      <presenter ref='person' :title='"选择责任人"' :type='"radio"' :data='staffs' @out='setPerson'>
      </presenter>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["init"],
  data() {
    return {
      seen: false,
      code: this.$route.query.code,
      staffs: [],
      initData: {},
      prios: {
        high: "高",
        regular: "中",
        low: "低"
      },
      prioArr: []
    };
  },
  methods: {
    save() {
      if (!this.initData.name || !this.initData.start || !this.initData.end)
        return this.$pd.toast("请检查输入");
      if (this.initData.end <= this.initData.start)
        return this.$pd.toast("开始日期要小于截止日期");
      this.$http
        .post("/api/projects/plan/update", {
          task: this.initData,
          code: this.code
        })
        .then(res => {
          if (res.body.code !== 0) return;
          this.$pd.toast("操作成功");
          this.seen = false;
          this.$parent.refresh();
        });
    },
    delTask(ev) {
      this.$http
        .post("/api/projects/plan/remove", {
          code: this.code,
          _id: this.initData._id
        })
        .then(res => {
          if (res.body.code !== 0) return;
          this.$pd.toast("删除成功");
          this.seen = false;
          this.$parent.refresh();
        });
    },
    slctPrio() {
      this.prioArr = [];
      for (var prop in this.prios) {
        this.prioArr.push({
          _id: prop,
          name: this.prios[prop],
          checked: this.initData.prio == prop
        });
      }
      this.$refs.prio.seen = true;
    },
    setPrio(res) {
      if (!res) return;
      this.$set(this.initData, "prio", res[0]._id);
      this.$set(this.initData, "prioTxt", res[0].name);
    },
    slctPerson() {
      this.$refs.person.seen = true;
      this.$http
        .post("/api/projects/staff/find", {
          code: this.code
        })
        .then(res => {
          if (res.body.code !== 0) return;
          this.staffs = [];
          res.body.data.forEach(item => {
            this.staffs.push({
              _id: item._id,
              name: item.name,
              pre: item.mobile,
              checked: item._id == this.initData.puid
            });
          });
        });
    },
    setPerson(res) {
      if (!res) return;
      this.initData.pname = res[0].name;
      this.initData.puid = res[0]._id;
    },
    out() {
      this.seen = false;
    }
  },
  watch: {
    init() {
      this.initData = JSON.parse(JSON.stringify(this.init));
    }
  }
};
</script>
