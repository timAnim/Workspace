<template>
  <div id='canvas'>
    <ol id="colorpicker">
      <li v-for='color in colors' @mouseenter='color.seen=true' @mouseleave='color.seen=false' :key='color.hex'>
        <div :style="{ 'background-color': color.hex}" @mousedown.prevent.stop='tap($event,color)' @contextmenu.prevent :class="{'dark-text':color.darkText}">
          {{color.name}}
        </div>
        <color :colors='color.related' :seen='color.seen'></color>
      </li>
    </ol>
    <ol>
      <li>
        <input type="file" @change='uploadImg'>
        <button @click='rotateImg(previewer)'>
          <icon name='rotate-right'></icon>
        </button>
        <button @click='imgScale(4)'>
          <icon name='compress'></icon>
        </button>
      </li>
    </ol>
    <ul>
      <dl id='previewer'>
        <!-- <img :src="previewer"> -->
      </dl>
    </ul>
  </div>
</template>
<style scoped>
li {
  width: 100%;
  color: white;
  font-size: 0.875rem;
  text-indent: 0.8rem;
  position: relative;
  cursor: pointer;
}

li div {
  margin: 0 !important;
}

li ol {
  position: absolute;
  top: 0;
  left: 100%;
  display: block;
  margin: 0;
}

#colorpicker {
  width: 16rem;
}

.dark-text {
  color: black !important;
}

dl img {
  height: 10rem;
  width: auto;
}
</style>
<script>
import color from "@/components/_common/color.vue";
import EXIF from "exif-js";
export default {
  data() {
    var colors = [
      {
        name: "Deep Orange",
        hex: "#ff5722",
        related: ["#fbe9e7", "#ffccbc", "#ffab91"]
      },
      {
        name: "Orange",
        hex: "#ff9800",
        related: ["#fff3e0", "#ffe0b2", "#ffcc80"]
      },
      {
        name: "Yellow",
        hex: "#ffeb3b",
        related: ["#fffde7", "#fff9c4", "#fff59d"]
      },
      {
        name: "Light Green",
        hex: "#8bc34a",
        related: ["#f1f8e9", "#dcedc8", "#c5e1a5"]
      },
      {
        name: "Green",
        hex: "#259b24",
        related: ["#d0f8ce", "#a3e9a4", "#72d572"]
      }
    ];
    colors.map(color => {
      color.seen = false;
      var rgb = this.colorRgb(color.hex);
      color.rgb = rgb;
      color.hsl = this.rgbToHsl(rgb[0], rgb[1], rgb[2]);
      color.darkText = color.hsl[2] > 0.5;

      var related = [];
      var arr = JSON.parse(JSON.stringify(color.related));
      arr.map(c => {
        var child = {};
        child.hex = c;
        child.rgb = this.colorRgb(c);
        child.hsl = this.rgbToHsl(child.rgb[0], child.rgb[1], child.rgb[2]);
        child.darkText = child.hsl[2] > 0.5;
        related.push(child);
      });
      color.related = related;
    });
    return {
      colors: colors,
      previewer: "",
      canvas: "",
      rotateStep: 2
    };
  },
  mounted() {},
  methods: {
    tap(ev, item) {
      if (!document.execCommand) return this.$pd.toast("浏览器不支持");
      var target = ev.target;
      var _id = this.$pd.randId(4);
      var color = ev.button === 2 ? item.rgb : item.hex;
      var html = `<textarea style="opacity: 0;position: absolute;z-index: -1;"
                   id='${_id}'>${color}</textarea>`;

      target.append(this.$pd.toHTML(html));
      var ta = this.$pd.id(_id);
      ta.select();
      document.execCommand("copy");
      this.$pd.toast("复制成功");
      ta.parentNode.removeChild(ta);
    },
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
    uploadImg: function(e) {
      let tag = e.target;
      let fileList = tag.files;
      let imgNum = fileList.length;
      let _this = this;
      this.previewer = ""; //图片数据清零
      if (!fileList.length) return;
      var Orientation;
      EXIF.getData(fileList[0], function() {
        Orientation = EXIF.getTag(fileList[0], "Orientation");
      });
      let reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = function() {
        var oReader = new FileReader();
        oReader.onload = function(e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            _this.previewer = image;
            var expectWidth = this.naturalWidth;
            var expectHeight = this.naturalHeight;
            if (
              this.naturalWidth > this.naturalHeight &&
              this.naturalWidth > 800
            ) {
              expectWidth = 800;
              expectHeight =
                expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (
              this.naturalHeight > this.naturalWidth &&
              this.naturalHeight > 1200
            ) {
              expectHeight = 1200;
              expectWidth =
                expectHeight * this.naturalWidth / this.naturalHeight;
            }
            var canvas = document.createElement("canvas");
            document.getElementById("previewer").appendChild(canvas);
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            var base64 = null;
            //修复ios上传图片的时候 被旋转的问题
            if (Orientation != "" && Orientation != 1) {
              switch (Orientation) {
                case 6: //需要顺时针（向左）90度旋转
                  _this.rotateImg(this, "left", canvas);
                  break;
                case 8: //需要逆时针（向右）90度旋转
                  _this.rotateImg(this, "right", canvas);
                  break;
                case 3: //需要180度旋转
                  _this.rotateImg(this, "right", canvas); //转两次
                  _this.rotateImg(this, "right", canvas);
                  break;
              }
            }
            base64 = canvas.toDataURL("image/jpeg", 0.8);
            if (fileList[0].size / 1024000 > 1) {
              _this.imgScale(4);
            } else {
              // _this.previewer.src = base64
            }
            console.log(JSON.stringify(_this.imgArr));
          };
        };
        oReader.readAsDataURL(fileList[0]);
      };
    },
    imgScale: function(quality) {
      var img = this.previewer;
      let _this = this;
      var canvas = this.$pd.find("canvas", "previewer");
      let cxt = canvas.getContext("2d");
      let width = img.naturalWidth / quality;
      let height = img.naturalHeight / quality;
      canvas.width = width;
      canvas.height = height;
      cxt.drawImage(img, 0, 0, width, height);
    },
    rotateImg(direction) {
      //图片旋转
      direction = "right";
      var canvas = this.$pd.find("canvas", "previewer");
      var min_step = 0;
      var max_step = 3;
      var img = this.previewer;
      if (img == null) return;
      console.log(img.height);
      var height = img.height;
      var width = img.width;
      var step = this.rotateStep;
      if (direction == "right") {
        this.rotateStep++;
        this.rotateStep > max_step && (this.rotateStep = min_step);
      } else {
        this.rotateStep--;
        this.rotateStep < min_step && (this.rotateStep = max_step);
      }
      var degree = this.rotateStep * 90 * Math.PI / 180;
      var ctx = canvas.getContext("2d");
      switch (this.rotateStep) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    }
  },
  components: {
    color: color
  }
};
</script>
