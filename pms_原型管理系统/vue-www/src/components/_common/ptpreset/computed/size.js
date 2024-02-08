  /*
    width宽度xs，s，m，l，xl，panel，dialog
    用于padding和magin
    "--wd-xs": "0.24rem",
    "--wd-s": "0.32rem",
    "--wd-m": "0.4rem",
    "--wd-l": "0.56rem",
    "--wd-xl": "1.2rem",
    "--wd-panel": "2rem",
    "--wd-dialog": "4.2rem",
    "--wd-page": "9.6rem",
  */

  /*
  padding间隙xs，s，m，l，xl
  用于padding和magin
  "--pd-xs": "0.04rem",
  "--pd-s": "0.08rem",
  "--pd-l": "0.24rem",
  "--pd-m": "0.16rem",
  "--pd-xl": "0.32rem",
*/
  /*
    height高度xs，s，m，l，xl，panel，dialog
    用于padding和magin
    "--ht-xs": "0.24rem",
    "--ht-s": "0.32rem",
    "--ht-m": "0.4rem",
    "--ht-l": "0.56rem",
    "--ht-xl": "1.2rem",
    "--ht-panel": "2rem",
    "--ht-dialog": "3.6rem",
    "--ht-page": "9.6rem",
  */

  /*
    fontsize字体大小xs，s，m，l，xl
    "--fs-xs": "0.1rem",
    "--fs-s": "0.12rem",
    "--fs-m": "0.14rem",
    "--fs-l": "0.16rem",
    "--fs-xl": "0.28rem",
  */
  /*
    radius s,m,l
    "--radius-s": "0.02rem",
    "--radius-m": "0.04rem",
    "--radius-l": "0.08rem",
  */

  var size = {}
  var list = [
    '--pd-xs',
    '--pd-s',
    '--pd-m',
    '--pd-l',
    '--pd-xl',
    '--ht-xs',
    '--ht-s',
    '--ht-m',
    '--ht-l',
    '--ht-xl',
    '--ht-panel',
    '--ht-dialog',
    '--ht-page',
    '--wd-xs',
    '--wd-s',
    '--wd-m',
    '--wd-l',
    '--wd-xl',
    '--wd-panel',
    '--wd-dialog',
    '--wd-page',
    "--fs-xs",
    "--fs-s",
    "--fs-m",
    "--fs-l",
    "--fs-xl",
    "--radius-s",
    "--radius-m",
    "--radius-l"
  ]

  list.forEach(para => {
    var key = para.replace('--', '').replace('-', '_')
    size[key] = {
      get() {
        var val = this.config[para].replace(/rem/g, "")
        return parseInt(parseFloat(val) * 100);
      },
      set(val) {
        val = (val / 100).toFixed(2)
        this.setStyle(para, val + "rem");
        return val;
      }
    }
  })

  export default size
