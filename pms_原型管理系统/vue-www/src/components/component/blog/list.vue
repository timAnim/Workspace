<template>
  <section>
    <ul class='flow-up gap-s-v'>
      <dl v-for='item in blogs' :key='item._id' class='sd-card align-indent pointer' @click='detail(item)'>
        <div class="clip">
          <img :src='item.cover'>
        </div>
        <div class='ht-xs'>{{ item.title }}</div>
        <div class='fs-s ht-xs cl-disabled'>{{ item.cdate }}</div>
      </dl>
    </ul>
    <button v-if='isadmin' float @click='add'>
      <icon name='plus'></icon>
    </button>
    <preview :init='blog' ref='preview'></preview>
  </section>
</template>

<script>
import preview from "./preview.vue";

export default {
  methods: {
    add() {
      this.$router.push("/blogs/update");
    },
    detail(data) {
      this.blog = data;
      this.$refs.preview.seen = true;
    }
  },
  mounted() {
    this.$http.post("/api/blogs/find").then(res => {
      this.blogs = res.body.data;
      this.blogs.forEach(item => {
        item.cdate = new Date(item.cdate).Format("yyyy-MM-dd");
      });
    });
  },
  data() {
    return {
      coms: [],
      blogs: [],
      blog: {},
      notNextTick: true
    };
  },
  computed:{
    isadmin(){
      return this.$store.state.isadmin
    }
  },
  components: {
    preview: preview
  }
};
</script>
