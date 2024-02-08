<template>
  <transition name='in-left'>
    <ol class="pd-m" expand>
      <li>
        <span class="wd-xl">里程碑</span>
        <input type="text" v-model='title'>
      </li>
      <li><span class="wd-xl">截止日期</span>
        <input type="date" v-model='date' :min='min' :max='max'>
      </li>
      <li>
        <div></div>
        <button @click='save' class="sd-theme wd-xl">保存</button>
      </li>
    </ol>
  </transition>
</template>
<script>
export default {
  props: ["init"],
  data() {
    return {
      title: "",
      date: this.init.end,
      code: this.$route.query.code,
      min: this.init.start,
      max: this.init.end
    };
  },
  methods: {
    save() {
      if (!this.title || !this.date) return this.$pd.toast("请检查输入");
      this.$http.post("/api/projects/stage/insert", this.$data).then(res => {
        if (res.body.code !== 0) return;
        this.$pd.toast("添加成功");
        this.$router.back();
      });
    }
  }
};
</script>
