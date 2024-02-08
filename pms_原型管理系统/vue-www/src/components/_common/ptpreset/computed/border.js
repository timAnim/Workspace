  /*
    border边框
    "--bdr-color": "#e0e0e0",
    "--bdr-color-i": "#424242",
    "--bdr-width": "0.01rem",
    "--bdr-style": "solid",
  */

  export default {
    border_color: {
      get() {
        return this.config["--bdr-color"];
      },
      set(val) {
        this.setStyle("--bdr-color", val);
        return val;
      }
    },
    border_color_i: {
      get() {
        return this.config["--bdr-color-i"];
      },
      set(val) {
        this.setStyle("--bdr-color-i", val);
        return val;
      }
    },
    border_style: {
      get() {
        return this.config["--bdr-style"];
      },
      set(val) {
        this.setStyle("--bdr-style", val);
        return val;
      }
    },
    border_width: {
      get() {
        var val = this.config["--bdr-width"].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle("--bdr-width", val + "rem");
        return val;
      }
    },
  }
