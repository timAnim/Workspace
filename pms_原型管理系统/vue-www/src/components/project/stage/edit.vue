<template>
  <transition name='opacity'>
    <div class='mask bg-mask-i' v-if='seen' @click='out'>
      <div class="dialog" @click.stop>
        <header>
          <li class="ht-l pd-m-h">
            <h1>里程碑详情</h1>
          </li>
        </header>
        <content>
          <dl class='pd-m' expand>
            <li>
              <span class="wd-xl">里程碑</span>
              <input-text :icon='"calendar"' :placeholder='"最多20个字"' v-model='initData.title'></input-text>
            </li>
            <li>
              <span class="wd-xl">截止日期</span>
              <input-date v-model='initData.date' :min='initData.min' :max='initData.max'></input-date>
            </li>
            <h4></h4>
            <div class="lay-h">
              <button class="wd-xl" @click='out'>关闭</button>
              <div class="wd-auto"></div>
              <button class="cl-alert wd-xl mg-m-h" @click='confirm'>删除</button>
              <button class="sd-theme wd-xl" @click='save'>保存</button>
            </div>
          </dl>
        </content>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["init"],
  data() {
    return {
      seen: false,
      initData: {},
      code: this.$route.query.code
    };
  },
  methods: {
    save() {
      if (!this.initData.title || !this.initData.date)
        return this.$pd.toast("请检查输入");

      this.$http
        .post("/api/projects/stage/update", {
          code: this.code,
          stage: this.initData
        })
        .then(res => {
          if (res.body.code !== 0) return;
          this.$pd.toast("操作成功");
          this.seen = false;
          this.$parent.refresh();
        });
    },
    out() {
      this.seen = false;
    },
    confirm() {
      this.$store.commit("setConfirm", {
        seen: true,
        msg: "确认删除里程碑？",
        out: res => {
          if (res) {
            this.del();
          }
        }
      });
    },
    del() {
      this.$http
        .post("/api/projects/stage-remove", {
          code: this.code,
          _id: this.initData._id
        })
        .then(res => {
          if (res.body.code !== 0) return;
          this.$pd.toast("删除成功");
          this.seen = false;
          this.$parent.refresh();
        });
    }
  },
  watch: {
    init(value) {
      this.initData = value;
    }
  }
};
</script>
