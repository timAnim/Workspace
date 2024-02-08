<style scoped>
section {
  max-width: 767px;
}

.info-row {
  padding: 0.8rem 0;
}

.icon {
  height: 5.6rem;
  line-height: 5.6rem;
  text-align: center;
  color: #9e9e9e;
  margin-top: 0.4rem;
}

dialog content label:first-child {
  flex: 0 0 5em;
}

li a {
  color: #9e9e9e;
}

.open-btn {
  transform: scale(0.8);
  margin: 0;
}

.open-btn[checked="false"] + em {
  color: #9e9e9e;
}

.check-btn {
  margin-right: 0;
}

.header-h1 {
  flex: 0 0 6em;
}

.compact {
  padding-bottom: 0;
}

.nav-tab {
  text-align: center;
  line-height: 4rem;
  box-sizing: border-box;
}

.nav-tab[checked="true"] {
  color: #8bc34a;
  font-weight: bolder;
  border-bottom: 0.4rem solid #8bc34a;
}
ol > ol {
  margin-left: 2.4rem;
}
</style>

<template id='depart-tpl'>
    <div class='mask' evnt='mask' id='add-dlg' @click='close'>
        <dialog out='out-top' @click='prevent'>
            <header><li>
                <label evnt='previous' id='_back'>
                    <icon name='chevron-left'></icon>
                </label>
                <h1>部门选择</h1>
            </li></header>
            <content>
                <section id='dlg-inner' class='shade-as-list'>
                    <ol class="shade-as-card">
                    <li v-for='{id,level,value,description} in departs' :lv='level' :id='id' :key='id'>
                        <label type='switch' class='check-btn' @click='checkBtn' name='depart-check'>
                            <icon name="square-o"></icon>
                            <icon name="check-square"></icon>
                        </label>
                        <label type='switch' checked='true' @click='openChild' class='open-btn'>
                            <icon name="minus"></icon>
                            <icon name="plus"></icon>
                        </label>
                        <em>{{ value }}</em>
                        <pre>{{description}}</pre>
                    </li>
                </ol>
                </section>
            </content>
            <footer><li>
                <button type='half' @click='close'>取消</button>
                <button type='half' evnt='submit'>确认</button>
            </li></footer>
        </dialog>
    </div>
</template>


<script>
let pd = window.pd,
  selectedItem;

export default {
  methods: {
    checkBtn(ev) {
      let target = ev.target;
      while (target.tagName != "LABEL") {
        target = target.parentNode;
      }
      // 去除现有的对号
      if (selectedItem) {
        var label = pd.find("label", pd.id(selectedItem));
        if (label != target) label.removeAttribute("checked");
      }
      // 更改现有的对号
      var flag = target.getAttribute("checked") == "true" ? true : false;
      target.setAttribute("checked", !flag);
      if (flag) return;
      // 记录选择状态
      if (!flag) {
        selectedItem = target.parentNode.id;
      }
      // 对于子部门的状态控制
      pd.next(target).setAttribute("checked", true);
      var ele = pd.next(target.parentNode);
      if (ele.tagName !== "OL") return;
      ele.parentNode.removeChild(ele);
      // sclHdl.refresh();
    },
    openChild(ev) {
      let target = ev.target;
      while (target.tagName != "LABEL") {
        target = target.parentNode;
      }
      var pre = pd.previous(target);
      if (pre.getAttribute("checked") == "true") {
        pd.toast("已选择全部子部门");
        return;
      }
      var flag = target.getAttribute("checked") == "true" ? true : false;
      target.setAttribute("checked", !flag);
      if (flag) {
        var id = target.parentNode.id;
        this.childDepartments(id, target);
      } else {
        var ele = pd.next(target.parentNode);
        if (ele.tagName !== "OL") return;
        ele.parentNode.removeChild(ele);
        // sclHdl.refresh();
      }
      var preVisiable = flag ? "none" : "block";
      pd.find("pre", target.parentNode).style.display = preVisiable;
    },
    close(ev) {
      pd.log.pop();
    },
    prevent(ev) {
      ev.stopPropagation();
    },
    childDepartments(id, self) {
      pd.ajax("/depart/list/" + id, this, data => {
        if (!data || data.length == 0) {
          pd.toast("没有更多了");
          return;
        }
        var Vue = require("vue").default;
        var addApp = Vue.extend(require("./depart-item.vue"));
        var dlg = new addApp().$mount();
        pd.insertAfter(dlg.$el, self.parentNode);
        dlg.$data.departs = data;
        // this.scroller.refresh();
      });
    }
  },
  data() {
    return {
      departs: []
    };
  },
  mounted() {
    pd.ajax("/depart/list", this, data => {
      this.departs = data;
    });
  }
};
</script>