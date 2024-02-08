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

.cover[checked="true"] .img-con,
.cover:hover .img-con {
  transform: translateX(0);
}

.mask > img {
  position: absolute;
  height: 144px;
  width: auto;
  transition: all 0.4s ease;
  z-index: 2;
  box-shadow: 0 3px 12px #9e9e9e;
}
</style>
<template>
  <div>
    <div>
      <h2 class="align-indent ht-l">页面元素</h2>
      <ul class='flow-up'>
        <dl v-for='item in coms' :id='item.code' class='pointer cover' @click='detail($event,item)' :key='item.code'>
          <div class="lay-h img-con">
            <div class="clip">
              <img :src='item.cover'>
            </div>
            <div class="clip cl-sec">
              <icon :name='item.label'></icon>
            </div>
          </div>
          <div class='ht-s align-c'>{{ item.name }}</div>
        </dl>
      </ul>
    </div>
    <div>
      <h2 class="align-indent ht-l">窗体类</h2>
      <ul class='flow-up'>
        <dl v-for='item in dlgs' :id='item.code' class='pointer cover' @click='detail($event,item)' :key='item.code'>
          <div class="lay-h img-con">
            <div class="clip">
              <img :src='item.cover'>
            </div>
            <div class="clip cl-sec">
              <icon :name='item.label'></icon>
            </div>
          </div>
          <div class='ht-s align-c'>{{ item.name }}</div>
        </dl>
      </ul>
    </div>
    <button v-if='isadmin' float @click='add'>
      <icon name='plus'></icon>
    </button>
    <interact :init='interact' ref='detail' @close='onclose'></interact>
  </div>
</template>
<script>
import detail from "./detail.vue";
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
      console.log(id);
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
      navs: [
        {
          id: "element",
          name: "页面元素",
          checked: true
        },
        {
          id: "window",
          name: "窗体"
        },
        {
          id: "anim",
          name: "动画"
        },
        {
          id: "blog",
          name: "文章"
        }
      ]
    };
  },
  computed:{
    isadmin(){
      return this.$store.state.isadmin
    }
  },
  components: {
    interact: detail
  }
};
</script>
