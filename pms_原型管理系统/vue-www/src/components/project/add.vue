<template>
  <main>
    <transition name='slide' mode='out-in' duration='100'>
      <article v-if='seen'>
        <header class="shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button class="ht-l wd-l" @click='$router.back()'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>添加项目</h1>
              <button class='ht-l wd-l' @click='save'>
                <icon name='save'></icon>
              </button>
            </li>
          </section>
        </header>
        <content>
          <section type='single'>
            <dl expand class="pd-m">
              <li>
                <span class="wd-xl">项目名</span>
                <input-text v-model='proj.name' :icon='"suitcase"' :placeholder='"最多20个字"' :max='20' class='wd-dialog wd-fix'>
                </input-text>
              </li>
              <li>
                <span class="wd-xl">项目代号</span>
                <input-text v-model='proj.code' :icon='"code"' :placeholder='"数字和字母"' class='wd-dialog wd-fix'>
                </input-text>
              </li>
              <li>
                <span class="wd-xl">开始日期</span>
                <input-date class='wd-dialog wd-fix' v-model='proj.start'></input-date>
              </li>
              <li>
                <span class="wd-xl">截止日期</span>
                <input-date class='wd-dialog wd-fix' v-model='proj.end'></input-date>
              </li>
            </dl>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
export default {
  data() {
    return {
      seen: false,
      proj: {
        name: "",
        isover: "",
        code: "",
        index: "",
        start: "",
        end: "",
        responseTxt: ""
      }
    };
  },
  methods: {
    save() {
      console.log(this.proj.start
        ,this.proj.end
        ,this.proj.name
        ,this.proj.code)
      if (
        !this.proj.start ||
        !this.proj.end ||
        !this.proj.name ||
        !this.proj.code
      ) {
        return this.$store.commit("toast", "请检查输入");
      }
      this.$http
        .post("/api/projects/insert", {
          data: this.proj
        })
        .then(res => {
          if (res.body.code !== 0) return this.$store.commit("toast", res.body.msg);
          this.$store.commit("toast", "添加成功");
          this.$store.commit("setProjStage", "all");
          setTimeout(time => {
            this.$router.replace({
              path: "/project/edit",
              query:{
                code: this.proj.code
              }
            });
          }, 2000);
        });
    }
  },
  mounted() {
    this.seen = true;
  },
};
</script>
