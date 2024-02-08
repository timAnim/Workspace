<style scoped>
.img-con {
  width: 200%;
  transform: translateX(-50%);
  transition: transform 0.2s ease;
}

.img-con .clip {
  width: 50%;
  box-sizing: border-box;
}

.img-con .clip svg {
  transform: translate(-50%, -50%) scale(0.5);
}

#inner > .cover {
  overflow: hidden;
  flex-basis: 1.2rem;
  margin: 0.04rem;
}

.cover[checked="true"] .img-con,
.cover:hover .img-con {
  transform: translateX(0);
}

#scroller {
  position: relative;
  overflow: hidden;
}

.mask > img {
  position: absolute;
  height: 144px;
  width: auto;
  transition: all 0.4s ease;
  z-index: 2;
  box-shadow: 0 3px 12px #9e9e9e;
}

#h-scroller {
  animation: expand 0.5s ease;
}
</style>
<template>
  <app-layout>
    <nav-bar slot='navs' :navs='navs' @nav='navHdl' :cur='cur'></nav-bar>
    <section slot = 'content'>
      <elements v-show='cur==="elements"'></elements>
      <anim v-show='cur==="anims"'></anim>
      <blogs v-show='cur==="blogs"'></blogs>
      <interact :init='interact' ref='detail' @close='onclose'></interact>
    </section>
  </app-layout>
</template>
<script>
import detail from "./element/detail.vue";
import anim from "./anim/list.vue";
import elements from "./element/list.vue";
import blogs from "./blog/list.vue";
export default {
  methods: {
    detail(ev, data) {
      this.$router.replace({
        path: this.$route.path,
        query: { code: data.code }
      });

      let img = this.$pd.find("img", ev.currentTarget);
      img.blur();
      this.interact = data;
      this.interact.left = this.$pd.getElementLeft(img);
      this.interact.top = this.$pd.getElementTop(img) - 72;

      var mask = this.$pd.toHTML(
        '<div id="_dlg" class="mask" style="background:transparent;z-index:200;"></div>'
      );

      let cimg = img.cloneNode(true);
      cimg.style =
        "left:" +
        this.interact.left +
        "px;top:" +
        (this.interact.top - 72) +
        "px;";

      this.$pd.id("app").appendChild(mask);
      this.$pd.id("_dlg").appendChild(cimg);

      setTimeout(
        () =>
          (cimg.style =
            "left:50%;height:auto;width:auto;top:335px;transform:translateX(-50%);"),
        50
      );
      setTimeout(() => (this.$refs.detail.seen = true), 450);
      setTimeout(() => this.$pd.clean(this.$pd.id("_dlg")), 650);
    },
    add() {
      this.$router.push("/interacts/add");
    },
    onclose(res) {
      this.$router.replace({ path: this.$route.path, query: {} });
    },
    navHdl(id) {
      this.cur = id;
    }
  },
  mounted() {
    this.$http.post("/api/interact/find").then(res => {
      this.coms = res.body.data.filter(item => {
        return item.type === "com";
      });
      this.dlgs = res.body.data.filter(item => {
        return item.type === "dialog";
      });
      let code = this.$route.query.code;
      if (!code) return;
      let _int = res.body.data.filter(item => {
        return item.code === code;
      });
      this.interact = _int[0];
      this.$refs.detail.seen = true;
      this.$refs.detail.preview = true;
    });
  },
  data() {
    return {
      coms: [],
      dlgs: [],
      interact: {},
      cur: "elements",
      navs: [
        {
          id: "elements",
          name: "组件",
          checked: true
        },
        {
          id: "anims",
          name: "动画"
        },
        {
          id: "blogs",
          name: "文章"
        }
      ]
    };
  },
  components: {
    interact: detail,
    anim: anim,
    elements: elements,
    blogs: blogs
  }
};
</script>
