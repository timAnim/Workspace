<style scoped>
.doc {
  height: 0.96rem;
  overflow: hidden;
  cursor: pointer;
}

.doc:hover img {
  filter: grayscale(0%) brightness(100%);
}

img {
  filter: grayscale(80%) brightness(80%);
  display: block;
  transform: translateY(-50%);
  transition: filter 0.8s ease;
  width:100%;
  height: auto;
}

</style>
<template>
  <app-layout>
    <nav-bar :cur='cur' slot='navs' :navs='navlist' @nav='navHdl'></nav-bar>
    <section slot='content'>
      <palettes v-if='cur==="palettes"'></palettes>
      <instruct v-if='cur==="instruct"'></instruct>
      <workflow v-if='cur==="workflow"'></workflow>
    </section>
  </app-layout>
</template>
<script>
import instruct from './list.vue'
import palettes from './palette/list.vue'
import workflow from './workflow/index.vue'

export default {
  data() {
    return {
      seen: false,
      cur:'instruct',
      navlist:[{
        id:'instruct',
        name:'规范'
      },{
        id:'palettes',
        name:'色板'
      },{
        id:'workflow',
        name:'流程'
      }]
    }
  },
  methods:{
    navHdl(id){
      this.cur = id
    }
  },
  mounted() {
    this.seen = true
  },
  components: {
    instruct: instruct,
    workflow: workflow,
    palettes: palettes
  }
}

</script>
