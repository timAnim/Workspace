  /*
    last时间
    "--presto": "100ms",
    "--vivo": "200ms",
    "--largo": "800ms",
  */
  export default {
    largo: {
      get() {
        return this.config["--largo"].replace(/ms/gi, "");
      },
      set(val) {
        this.setStyle("--largo", val + "ms");
        return val;
      }
    },
    presto: {
      get() {
        return this.config["--presto"].replace(/ms/gi, "");
      },
      set(val) {
        this.setStyle("--presto", val + "ms");
        return val;
      }
    },
    vivo: {
      get() {
        return this.config["--vivo"].replace(/ms/gi, "");
      },
      set(val) {
        this.setStyle("--vivo", val + "ms");
        return val;
      }
    },
  }
