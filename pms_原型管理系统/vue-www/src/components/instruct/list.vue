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
  width: 100%;
  height: auto;
}

</style>
<template>
  <section id='list' v-if='seen' slot='content'>
    <example></example>
    <router-link :to="{
          path:'/html-viewer',
          query:{
            target:'/static/files/宇通集团平台类产品设计规范 1.0.pdf',
            name:'平台类产品设计规范',
          }
        }">
      <dl class='doc lay-r mg-s-v'>
        <em class="float-nw cl-white gap-s">平台类产品设计规范</em>
        <img src="/static/img/platform_instruction.png">
      </dl>
    </router-link>
    <router-link :to="{
          path:'/html-viewer',
          query:{
            target:'/static/files/响应式组件设计建议1.0.pdf',
            name:'响应式组件设计建议',
          }
        }">
      <dl class='doc lay-r mg-s-v'>
        <em class="float-nw cl-white gap-s">响应式组件设计建议</em>
        <img src="/static/img/aboutUsBgSmall.png">
      </dl>
    </router-link>
    <router-link :to="{
          path:'/html-viewer',
          query:{
            type:'proto',
            code:'componentLib',
            name:'基础组件库',
          }
        }">
      <dl class='doc lay-r mg-s-v'>
        <em class="float-nw cl-white gap-s">基础组件库</em>
        <img src="/static/img/aboutUsBgSmall.png">
      </dl>
    </router-link>
  </section>
</template>
<script>
import example from './example.vue'

export default {
  data() {
    return {
      seen: false,
    }
  },
  mounted() {
    this.seen = true
  },
  components: {
    example: example,
  }
}

</script>
