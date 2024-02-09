<template>
  <main id="app">
    <aside>
      <header class="sd-dark">
        <li>
          <span class="wd-m"></span>
          <div>
            威盛小工具
          </div>
        </li>
      </header>
      <content>
        <li @click='hrefTo("input")'>
          <label class='wd-m'>
            <i class="fa fa-file-powerpoint-o"></i>
          </label>
          <div>崇拜幻灯片生成</div>
        </li>
        <li @click='hrefTo("monthly")'>
          <label class='wd-m'>
            <i class="fa fa-file-powerpoint-o"></i>
          </label>
          <div>月刊生成</div>
        </li>
      </content>
    </aside>
    <router-view/>
  </main>
</template>
<script>
export default {
  name: "app",
  methods: {
    hrefTo(url) {
      console.log(url);
      this.$router.push("/" + url);
    }
  }
};
</script>