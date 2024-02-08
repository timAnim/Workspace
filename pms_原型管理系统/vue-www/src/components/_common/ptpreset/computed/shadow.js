  /*
    shadow
    "--shadow-color-m": "#00000033",
    "--shadow-offset-m": "0.01rem",
    "--shadow-distance-m": "0.03rem",
    "--shadow-color-l": "#00000033",
    "--shadow-offset-l": "0.02rem",
    "--shadow-distance-l": "0.08rem",
  */
  export default {
    shadow_color_m: {
      get() {
        return this.config["--shadow-color-m"].slice(0, 7);
      },
      set(val) {
        this.setStyle("--shadow-color-m", val + this.hexOpacity(this.shadow_opacity_m));
        return val;
      }
    },
    /*
      opacity 是一个计算属性，不存到数据库
    */
    shadow_opacity_m: {
      get() {
        var hex = this.config["--shadow-color-m"].slice(7, 9)
        var op = parseInt(hex, 16) / 255
        return op.toFixed(2);
      },
      set(val) {
        this.setStyle("--shadow-color-m", this.shadow_color_m + this.hexOpacity(val));
        return val;
      }
    },
    shadow_distance_m: {
      get() {
        var val = this.config["--shadow-distance-m"].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle("--shadow-distance-m", val + "rem");
        return val;
      }
    },
    shadow_offset_m: {
      get() {
        var val = this.config["--shadow-offset-m"].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle("--shadow-offset-m", val + "rem");
        return val;
      }
    },
    shadow_color_l: {
      get() {
        return this.config["--shadow-color-l"].slice(0, 7);
      },
      set(val) {
        this.setStyle("--shadow-color-l", val + this.hexOpacity(this.shadow_opacity_l));
        return val;
      }
    },
    /*
      opacity 是一个计算属性，不存到数据库
    */
    shadow_opacity_l: {
      get() {
        var hex = this.config["--shadow-color-l"].slice(7, 9)
        var op = parseInt(hex, 16) / 255
        return op.toFixed(2);
      },
      set(val) {
        this.setStyle("--shadow-color-l", this.shadow_color_l + this.hexOpacity(val));
        return val;
      }
    },
    shadow_distance_l: {
      get() {
        var val = this.config["--shadow-distance-l"].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle("--shadow-distance-l", val + "rem");
        return val;
      }
    },
    shadow_offset_l: {
      get() {
        var val = this.config["--shadow-offset-l"].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle("--shadow-offset-l", val + "rem");
        return val;
      }
    },
  }
