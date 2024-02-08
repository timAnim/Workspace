/*
  palette配色
  "--cl-theme-light": "#dcedc8",
  "--cl-theme": "#8bc34a",
  "--cl-theme-dark": "#558b2f",
  "--cl-theme-sec-light": "#8bc34a",
  "--cl-theme-sec": "#8bc34a",
  "--cl-theme-sec-dark": "#8bc34a",
  "--cl-alert-light": "#ffe082",
  "--cl-alert": "#ff9800",
  "--cl-alert-dark": "#ff8f00",
*/
/*
  greyscale灰阶
  "--cl-light": "#f5f5f5",
  "--cl-front": "#ffffff",
  "--cl-back": "#eeeeee",
  "--cl-hint": "#9e9e9e",
  "--cl-sec": "#757575",
  "--cl-prim": "#616161",
*/
/*
  greyscale-i灰阶反色
  "--cl-light-i": "#424242",
  "--cl-front-i": "#424242",
  "--cl-back-i": "#424242",
  "--cl-hint-i": "#9e9e9e",
  "--cl-sec-i": "#f5f5f5",
  "--cl-prim-i": "#ffffff",
*/
var palette = {}
var list = [
  "--cl-theme-light",
  "--cl-theme",
  "--cl-theme-dark",
  "--cl-theme-sec-light",
  "--cl-theme-sec",
  "--cl-theme-sec-dark",
  "--cl-alert-light",
  "--cl-alert",
  "--cl-alert-dark",
  "--cl-light",
  "--cl-front",
  "--cl-back",
  "--cl-hint",
  "--cl-sec",
  "--cl-prim",
  "--cl-light-i",
  "--cl-front-i",
  "--cl-back-i",
  "--cl-hint-i",
  "--cl-sec-i",
  "--cl-prim-i",
]
list.forEach(para => {
  var key = para.replace('--', '').replace(/-/g, '_')
  palette[key] = {
    get() {
      return this.config[para]
    },
    set(val) {
      this.setStyle(para, val);
      return val;
    }
  }
})
export default palette
