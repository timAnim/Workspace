var predev = {
  // 通知
  toast: function (str) {
    var tst = document.createElement('div');
    tst.className = 'toast'
    tst.innerHTML = str;
    tst.id = this.randId(4);;
    document.body.appendChild(tst);
    setTimeout(function () {
      tst.setAttribute('style', 'opacity:0')
    }, 1800)
    setTimeout(function () {
      tst.parentNode.removeChild(tst);
    }, 2000);
  },
  id: function (arg) {
    if (typeof (arg) === "string") {
      arg = document.getElementById(arg);
    }
    return arg;
  },
  find: function (str, ele) {
    if (typeof (ele) === "string") {
      ele = document.getElementById(ele);
    }
    var el = ele || document;
    return el.querySelector(str);
  },
  findAll: function (str, ele) {
    if (typeof (ele) === "string") {
      ele = document.getElementById(ele);
    }
    var el = ele || document;
    return el.querySelectorAll(str);
  },
  loading: function () {
    if (this.id('waitBg')) return;
    var dlgtxt =
      "<mask class='waitingBg' id='waitBg'>" +
      "<div class='waiting' align='center'><p>加载中</p><i class='fa fa-spinner fa-3x fa-pulse fa-fw'></i></div>" +
      "</mask>";
    var bg = this.toHTML(dlgtxt);
    document.body.appendChild(bg);
  },
  loaded: function () {
    var bg = this.id('waitBg');
    if (!bg) return;
    this.animOut(bg, bg, 'out-opacity', 160, function () {
      if (!predev.id('waitBg')) return;
      bg.parentNode.removeChild(bg);
      predev.isLoading = false;
    });
  },
  animOut: function (outer, animObj, anim, time, callback) {
    var clickable = true;
    if (clickable) {
      clickable = false;
      animObj.classList.add(anim);
      setTimeout(function () {
        animObj.classList.remove(anim);
        if (callback) callback.call(outer);
        clickable = true;
      }, time);
    }
  },
  chars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  randId: function (n) {
    var res = "";
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += this.chars[id];
    }
    return res;
  },
  toHTML: function (text) {
    var i, a = document.createElement("div"),
      b = document.createDocumentFragment();
    a.innerHTML = text;
    while (i = a.firstChild) {
      b.appendChild(i);
    }
    return b;
  },
  clean: function (obj) {
    if (typeof (obj) === "string") {
      obj = this.id(obj);
    }
    if (obj && obj.parentNode) {
      obj.parentNode.removeChild(obj);
    }
  },
  getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  },
  getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  target(ev, str) {
    let target = ev.target
    let TAG = str.toUpperCase()
    while (target.tagName !== TAG || target.tagName === 'BODY') {
      target = target.parentNode
    }
    if (target.tagName === 'BODY') return false
    return target
  },
  err(res) {
    if (res.body.code !== 0) return predev.toast('系统异常')
  },
  wait(time) {
    var sync = new Promise((res, rej) => {
      var seed = setTimeout(() => {
        res(seed);
      }, time);
    });
    return sync;
  },
  copy(txt){
    if (!document.execCommand) {
      this.toast('浏览器不支持')
      return false
    }
    var _id = this.randId(4);
    var html = `
      <textarea
        style="opacity: 0;position: absolute;z-index: -1;"
        id='${_id}'>${txt}</textarea>`;
    document.body.append(this.toHTML(html));
    var ta = document.getElementById(_id);
    ta.select();
    document.execCommand("copy");
    ta.parentNode.removeChild(ta);
    this.toast('复制到剪切板')
    return true
  }
};

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export default predev
