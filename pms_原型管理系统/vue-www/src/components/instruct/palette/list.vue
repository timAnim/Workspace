<template>
  <section class='sd-card'>
    <nav-inner :navs='navs' @nav='navHandler' :cur='cur'></nav-inner>
    <li class='pd-m-h ht-l'>
      <div>单击左键或右键复制</div>
      <button class='sd-theme' v-if='isadmin' @click.stop.prevent='editPalette'>编辑</button>
    </li>
    <div id="colorpicker" class="ht-dialog" @contextmenu.prevent></div>
    <li class='ht-m align-indent'>
      <div>相关颜色</div>
    </li>
    <div class="ht-l ht-fix">
      <color :colors='relates' :seen='true'></color>
    </div>
    <button v-if='isadmin' float @click='addPalette'>
      <icon name='plus'></icon>
    </button>
  </section>
</template>
<style scoped>
#colorpicker span {
  cursor: pointer;
  transform-origin: right center 0;
}
</style>
<script>
import color from "@/components/_common/color.vue";
import navBar from "@/components/_common/nav-bar-inner.vue";
var echarts = require("echarts");
export default {
  data() {
    return {
      palettes: [],
      curPalette: this.$store.state.curPalette,
      curColor: 0,
      relates: [],
      pieOption: {
        tooltip: {
          show: false
        },
        color: [],
        backgroundColor: "#ffffff",
        series: [
          {
            name: "RGB",
            type: "pie",
            radius: ["30%", "70%"],
            legendHoverLink: false,
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                position: "outside"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    window.onresize = e => {
      this.chart.resize();
    };
    this.$http.post("api/palettes/find").then(res => {
      if (!res.body) return;
      this.palettes = res.body.data;
      setTimeout(t => {
        this.chart = echarts.init(this.$pd.id("colorpicker"));
        this.switchPalette();
      }, 200);
    });
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    colorRgb(hex) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = hex.toLowerCase();
      if (!sColor || !reg.test(sColor)) return sColor;
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    },
    rgbToHsl(r, g, b) {
      (r /= 255), (g /= 255), (b /= 255);
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h, s, l];
    },
    selectColor(cindex) {
      this.colors.map((item, index) => {
        item.selected = index === cindex;
        if (item.selected) this.relates = this.related;
      });
      this.chart.setOption(this.pieOption);
    },
    tapHandler(chart) {
      chart.event.event.preventDefault();
      chart.event.event.stopPropagation();
      var item = chart.data;
      if (!document.execCommand) return this.$pd.toast("浏览器不支持");
      var _id = this.$pd.randId(4);
      var colorType = chart.event.event.button === 2 ? "rgb" : "hex";
      var color = colorType === "rgb" ? item.rgb : item.hex;
      color = color.toString();
      if (colorType === "hex") {
        color = color.split("#")[1];
      }
      var html = `<textarea id='${_id}'
        style="opacity: 0;position: absolute;z-index: -1;">${color}</textarea>`;
      document.body.append(this.$pd.toHTML(html));

      var ta = this.$pd.id(_id);
      ta.select();
      document.execCommand("copy");
      this.$store.commit("toast", "已复制 " + color);
      ta.parentNode.removeChild(ta);
      this.related = this.checkDarkText(item.related);
    },
    switchPalette() {
      this.$store.state.curPalette = this.curPalette;
      var _colors = [];
      this.colors.map(item => {
        item.value = 1;
        item.itemStyle = {
          emphasis: {
            color: item.hex
          }
        };
        _colors.push(item.hex);
      });
      this.pieOption.color = _colors;
      this.pieOption.series[0].data = this.colors;
      this.chart.on("mousedown", myChart => {
        this.tapHandler(myChart);
      });
      this.selectColor(this.curColor);
    },
    checkDarkText(arr) {
      arr.map(c => {
        c.rgb = this.colorRgb(c.hex);
        c.hsl = this.rgbToHsl(c.rgb[0], c.rgb[1], c.rgb[2]);
        c.darkText = c.hsl[2] > 0.5;
      });
      return arr;
    },
    addPalette() {
      this.$router.push("/palettes/upadd");
    },
    navHandler(nav) {
      var arr = this.palettes;
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i]._id === nav) {
          this.curPalette = i;
          this.switchPalette();
        }
      }
    },
    editPalette() {
      this.$router.push({
        path: "/palettes/upadd",
        query: {
          _id: this.palettes[this.curPalette]._id
        }
      });
    }
  },
  computed: {
    palette() {
      var curPalette = this.curPalette;
      return this.palettes[curPalette];
    },
    colors() {
      var curPalette = this.palettes[this.curPalette];
      if (!curPalette) return;
      curPalette.colors.map(color => {
        color.rgb = this.colorRgb(color.hex);
        color.hsl = this.rgbToHsl(color.rgb[0], color.rgb[1], color.rgb[2]);
        color.darkText = color.hsl[2] > 0.5;
      });
      return curPalette.colors;
    },
    related: {
      get() {
        var curPalette = this.palettes[this.curPalette];
        if (!curPalette) return;
        var curColor = JSON.parse(
          JSON.stringify(curPalette.colors[this.curColor])
        );
        if (!curColor) return;
        return this.checkDarkText(curColor.related);
      },
      set(_v) {
        this.relates = JSON.parse(JSON.stringify(_v));
      }
    },
    cur() {
      if (this.palettes[this.curPalette])
        return this.palettes[this.curPalette]._id;
    },
    navs() {
      this.palettes.map(n => {
        n.id = n._id;
      });
      return this.palettes;
    },
    isadmin(){
      return this.$store.state.isadmin
    }
  },
  components: {
    color: color,
    "nav-inner": navBar
  }
};
</script>
