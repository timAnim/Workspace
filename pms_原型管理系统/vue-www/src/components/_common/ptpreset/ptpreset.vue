<template>
  <transition name='in-right'>
    <div class="mask" v-show='show' @click.prevent.stop='show=false'>
      <edit :ptpreset='config' ref="edit" v-show='panel==="edit"' @close='onClose' @save='onSave' @nav='onNav'>
      </edit>
      <explore ref="explore" :ptpreset='config' v-show='panel==="explore"' @close='onClose' @saveas='onSaveas' @use='onUse' @create='onCreate' @default='onDefault' @nav='onNav'>
      </explore>
      <mylist ref="mylist" :ptpreset='config' v-show='panel==="mylist"' @close='onClose' @default='onDefault' @create='onCreate' @edit='onEdit' @use='onUse' @delete='onDelete' @nav='onNav'>
      </mylist>
    </div>
  </transition>
</template>
<script>
import dfConfig from "./config.js";
import edit from "./edit";
import explore from "./explore";
import mylist from "./mylist";
export default {
  data() {
    return {
      panel: "edit",
      config: JSON.parse(JSON.stringify(dfConfig)),
    };
  },
  methods: {
    onNav(nav) {
      this.panel = nav;
      this.$refs[nav].init();
    },
    onClose() {
      this.show = false;
    },
    onEdit(_pt) {
      // 编辑模板, 更新配置文件config, 不绑定到user
      this.config = _pt;
      // 当前的面板切换到编辑
      this.panel = "edit";
      this.$store.commit("toast", "编辑主题");
    },
    onSaveas(_pt) {
      // 另存模板, 拷贝配置文件config, 不绑定到user
      var _pt = JSON.parse(JSON.stringify(_pt));
      // 没有id就是创建
      delete _pt._id;
      // 修改标题
      _pt.title = _pt.title + " 副本";
      // 更新配置文件config
      this.config = _pt;
      // 当前的面板切换到编辑
      this.panel = "edit";
      this.$store.commit("toast", "编辑副本");
    },
    onUse(_pt) {
      // 使用模板, 更新配置文件config
      this.config = _pt;
      // 将模板和user绑定
      this.setPreset(_pt._id);
      this.$store.commit("toast", "更改主题");
    },
    onDefault() {
      // 先把当前重置
      document.body.removeAttribute("style");
      // 使用默认的主题
      this.config = JSON.parse(JSON.stringify(dfConfig));
      // 用户绑定的主题设为空
      this.setPreset(null);
      this.$store.commit("toast", "使用位默认主题");
    },
    onCreate() {
      // 先把当前重置
      document.body.removeAttribute("style");
      // 面板切换到编辑
      this.panel = "edit";
      // 使用默认的主题
      this.config = JSON.parse(JSON.stringify(dfConfig));
      // 增加一个默认的标题
      this.config.title = "新建的主题";
      this.$store.commit("toast", "创建新主题");
    },
    onSave(_id) {
      this.setPreset(_id);
    },
    onDelete(pt) {
      // 如果删的主题是当前主题, 把用户设为默认主题
      if (pt._id == this.config._id) this.onDefault();
      this.$http
        .post("/api/ptpreset/remove", {
          data: pt._id
        })
        .then(res => {
          this.$store.commit("toast", "删除成功");
          // 删除时在我的列表, 所以要把列表刷新
          this.$refs.mylist.init();
        });
    },
    setPreset(id) {
      this.$http
        .post("/api/ptpreset/set", {
          ptId: id
        })
        .then(res => {
          if (res.body.code != 0) return false;
          // 当前的配置, 更新下id
          this.config._id = id;
          this.$store.commit("toast", "主题已更改");
        });
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.state.presetPanel;
      },
      set(res) {
        this.$store.commit("showPreset", res);
      }
    },
    ptpreset(){
      return this.$store.state.ptpreset
    }
  },
  watch: {
    ptpreset(_id) {
      if (!_id) return false;
      this.$http
        .post("/api/ptpreset/find", {
          _id
        })
        .then(res => {
          if (!res.body.data || !res.body.data.length) return false;
          this.config = res.body.data[0];
        });
    }
  },
  components: {
    edit: edit,
    explore: explore,
    mylist: mylist
  }
};

</script>
