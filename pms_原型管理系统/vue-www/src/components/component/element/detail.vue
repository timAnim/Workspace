<style scoped>
#_con {
  line-height: 2em;
}

ol {
  max-width: 5.6rem;
}

#_img > img {
  margin: 8px auto;
  display: block;
}

#_chart {
  height: 2.4rem;
  width: 100%;
}

#_dlg img {
  position: absolute;
  transition: all 0.4s linear;
}

.sd-card {
  box-shadow: 0 1px 3px black;
}

#_con hr {
  border-color: #e0e0e0;
  background-color: #e0e0e0;
}
.article {
  width: 100%;
  max-width: var(--wd-page);
}
</style>
<template>
  <transition name='slide'>
    <div class="mask" v-if='seen' @click='close'>
      <div class="ht-max article">
        <ol class='sd-card lay-v mg-auto' style="padding:0;" @click.stop>
          <li class="ht-l bg-light">
            <button @click='close' class="ht-l wd-l">
              <icon name='chevron-down'></icon>
            </button>
            <h1>{{ init.name }}</h1>
            <button @click='edit' class="ht-l wd-l">
              <icon name='cog'></icon>
            </button>
          </li>
          <content id='mask-outer' class="pd-m ht-max">
            <div id='_chart'></div>
            <div id='_img'>
              <img id='cover' :src='init.cover'>
            </div>
            <div id='_con' class="pd-m"></div>
          </content>
        </ol>
      </div>
    </div>
  </transition>
</template>

<script>
var echarts = require("echarts");
export default {
  props: ["init"],
  methods: {
    close(ev) {
      this.seen = false;
      this.$emit("close", true);
      if (this.preview) return;
      let mask = this.$pd.toHTML(
        '<div id="_dlg" class="mask" style="z-index=8000;background:transparent;"></div>'
      );
      let img = this.$pd.id("cover");
      let cimg = img.cloneNode(true);
      cimg.style =
        "left:" +
        this.$pd.getElementLeft(img) +
        "px;top:" +
        this.$pd.getElementTop(img) +
        "px;height:" +
        img.height +
        "px;width:auto;";

      document.body.appendChild(mask);
      this.$pd.id("_dlg").appendChild(cimg);

      setTimeout(
        () =>
          (cimg.style =
            "left:" +
            this.init.left +
            "px;height:144px;width:auto;top:" +
            this.init.top +
            "px;"),
        50
      );

      setTimeout(
        () => this.$pd.id(this.init.code).setAttribute("checked", true),
        450
      );

      setTimeout(() => {
        this.$pd.clean("_dlg");
        this.$pd.id(this.init.code).removeAttribute("checked");
      }, 600);
    },
    chart() {
      let myChart = echarts.init(this.$pd.id("_chart"));
      let data = [
        this.init.capability,
        this.init.capability,
        this.init.usability,
        this.init.study,
        this.init.integrity,
        this.init.recommand
      ];
      let indicator = [
        { name: "兼容程度", max: 10 },
        { name: "性能", max: 10 },
        { name: "使用程度", max: 10 },
        { name: "研究指数", max: 10 },
        { name: "完整度", max: 10 },
        { name: "推荐程度", max: 10 }
      ];
      myChart.setOption({
        radar: {
          indicator: indicator
        },
        series: [
          {
            name: "基础参数",
            type: "radar",
            data: [
              {
                value: data
              }
            ]
          }
        ]
      });
    },
    edit() {
      if (!this.isAdmin) return this.$pd.toast("请登录");
      this.seen = false;
      this.$emit("close", true);
      this.$router.push("/interacts/add?_id=" + this.init._id);
    }
  },
  data() {
    return {
      seen: false,
      preview: false,
      isAdmin: sessionStorage.token ? true : false
    };
  },
  watch: {
    seen(_v) {
      if (_v)
        setTimeout(ev => {
          this.chart();
          this.$pd.id("_con").innerHTML = this.init.content;
        }, 200);
    }
  }
};
</script>
