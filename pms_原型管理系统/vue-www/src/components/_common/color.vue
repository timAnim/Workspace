<template>
  <transition name='opacity'>
      <div v-if='seen' class="ht-max lay-h wd-max">
        <em class="cl-white fs-s align-indent wd-auto"
        v-for='color in colors'
        :style="{ 'background-color':color.hex}"
        :key = 'color.hex'
        @mousedown.prevent.stop='tap($event,color)'
        :class="{'cl-black':color.darkText}"
        @contextmenu.prevent.stop>
          {{color.name}}
        </em>
      </div>
  </transition>
</template>
<script>
export default {
  props: ["colors", "seen"],
  methods: {
    tap(ev, color) {
      if (!document.execCommand) return this.$pd.toast("浏览器不支持");

      var target = ev.target;
      var _id = this.$pd.randId(4);
      var colorType = ev.button === 2 ? "rgb" : "hex";
      var color = colorType === "rgb" ? color.rgb : color.hex;
      color = color.toString();
      if (colorType === "hex") {
        color = color.split("#")[1];
      }

      var html = `<textarea style="opacity: 0;position: absolute;z-index: -1;"
                   id='${_id}'>${color}</textarea>`;

      target.append(this.$pd.toHTML(html));
      var ta = this.$pd.id(_id);
      ta.select();
      document.execCommand("copy");
      this.$pd.toast("已复制 " + color);
      ta.parentNode.removeChild(ta);
    }
  }
};
</script>
