  /*
    mask遮罩
    "--cl-mask": "#0000007f",
    "--cl-mask-i": "#ffffff7f",
    */
  export default {
    cl_mask: {
      get() {
        return this.config["--cl-mask"];
      },
      set(val) {
        this.setStyle("--cl-mask", val);
        return val;
      }
    },
    cl_mask_color: {
      get() {
        return this.config["--cl-mask"].slice(0, 7);
      },
      set(val) {
        this.setStyle("--cl-mask", val + this.hexOpacity(this.cl_mask_opacity));
        return val;
      }
    },
    cl_mask_opacity: {
      get() {
        var hex = this.config["--cl-mask"].slice(7, 9)
        var op = parseInt(hex, 16) / 255
        return op.toFixed(2);
      },
      set(val) {
        this.setStyle("--cl-mask", this.cl_mask_color + this.hexOpacity(val));
        return val;
      }
    },
    cl_mask_i: {
      get() {
        return this.config["--cl-mask-i"];
      },
      set(val) {
        this.setStyle("--cl-mask-i", val);
        return val;
      }
    },
    cl_mask_i_color: {
      get() {
        return this.config["--cl-mask-i"].slice(0, 7);
      },
      set(val) {
        this.setStyle("--cl-mask-i", val + this.hexOpacity(this.cl_mask_i_opacity));
        return val;
      }
    },
    cl_mask_i_opacity: {
      get() {
        var hex = this.config["--cl-mask-i"].slice(7, 9)
        var op = parseInt(hex, 16) / 255
        return op.toFixed(2);
      },
      set(val) {
        this.setStyle("--cl-mask-i", this.cl_mask_i_color + this.hexOpacity(val));
        return val;
      }
    },
  }
