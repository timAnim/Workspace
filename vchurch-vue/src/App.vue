<template>
  <main id="app">
    <aside-panel></aside-panel>
    <article-panel></article-panel>
  </main>
</template>
<script>
import asidePanel from './components/aside-panel'
import articlePanel from './components/article-panel'
export default {
  name: "app",
  components:{
    "aside-panel": asidePanel,
    "article-panel": articlePanel
  }
};
</script>