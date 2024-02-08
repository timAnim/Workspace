<template>
  <main>
    <transition name='slide'>
      <article v-show='seen'>
        <header class="shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button type='circle-m' @click='$router.back()'>
                <icon name="chevron-down"></icon>
              </button>
              <h1 class="pd-m-h" v-once>{{ palette.name }}</h1>
              <button v-if='palette._id' type='circle-m' class='color-alert' title='删除' @click='delBtn'>
                <icon name="trash"></icon>
              </button>
              <button type='circle-m' @click='saveBtn'>
                <icon name="save"></icon>
              </button>
            </li>
          </section>
        </header>
        <content @click.stop>
          <section type='single'>
            <ol expand>
              <div>
                <li>
                  <span class="wd-xl">色板名称</span>
                  <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='palette.name' class='wd-dialog'></input-text>
                </li>
                <li>
                  <span class="wd-xl">简介</span>
                  <input-text :icon='"tag"' :placeholder='"简介"' v-model='palette.des'></input-text>
                </li>
              </div>
            </ol>
            <ol expand class="mg-m-v">
              <div v-for='(c,i) in palette.colors' class="pd-m-v" :key='i'>
                <li class="ht-l">
                  <label class='wd-l'>
                    <icon name='circle' :style='{fill:c.hex}'></icon>
                  </label>

                  <input-text v-model='c.name' :placeholder='"添加颜色"' :icon='"i-cursor"' class='mg-m-h'></input-text>

                  <input-text  v-model='c.hex' :reg='"^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"' :placeholder='"例#fafafa"' :icon='"paint-brush"' class='wd-panel wd-fix'></input-text>

                  <button type='circle-m' @click.prevent.stop='delColor(i)'>
                    <icon name='trash'></icon>
                  </button>
                  <button type='circle-m' @click.prevent.stop='addColor(i)'>
                    <icon name='plus-circle'></icon>
                  </button>
                </li>
                <div v-if='c.related'>
                  <li class="ht-l" v-for='(r,index) in c.related' :key='index'>
                    <label class='wd-l' style="margin-left:0.32rem">
                      <icon name='circle' :style='{fill:r.hex}'></icon>
                    </label>

                    <input-text class='mg-m-h' v-model='r.name' :placeholder='"关联颜色"' :icon='"link"'></input-text>

                    <input-text v-model='r.hex' :placeholder='"例#fafafa"' :reg='"^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"' class='wd-panel wd-fix' :icon='"paint-brush"'></input-text>

                    <button type='circle-m' @click.prevent.stop='delRelate(c,index)'>
                      <icon name='trash'></icon>
                    </button>
                    <button type='circle-m' @click.prevent.stop='addRelate(c,index)'>
                      <icon name='plus-circle'></icon>
                    </button>
                  </li>
                </div>
              </div>
            </ol>
            <presenter ref="confirm" :title='"确认删除？"' :type='"confirm"' @out='delInteract'></presenter>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
export default {
  data() {
    return {
      seen: false,
      palette: {
        name: "新增色板",
        des: "",
        colors: []
      }
    };
  },
  methods: {
    saveBtn() {
      if (!this.palette.name) return this.$pd.toast("请检查输入");
      this.palette.colors.map((c, i) => {
        if (!c.name || !c.hex) this.palette.colors.splice(i, 1);
        c.related.map((r, j) => {
          if (!r.name || !r.hex) c.related.splice(j, 1);
        });
      });
      this.$http
        .post("/api/palettes/upadd", {
          data: this.palette
        })
        .then(res => {
          if (!res.body.data) return;
          this.$pd.toast("操作成功");
          if (!this.palette._id) this.$router.back();
        });
    },
    init(ev) {
      if (this.$pd.id("editor").children.length === 0)
        document.execCommand("formatblock", false, "div");

      var target = ev.target;
      if (target.tagName !== "A") return;

      var link = target.href;
      var hint = this.$pd.toHTML(
        `<div class="float hint" contentEditable="false">
        <input id='link-input' type='text' value=` +
          link +
          `>
        <button class="theme-mark" id='link-confirm'>确定</button>
        <button id='link-del'>删除</button>
        </div>`
      );
      target.appendChild(hint);

      this.$pd.id("link-confirm").onclick = evnt => {
        target.href = this.$pd.id("link-input").value;
      };

      this.$pd.id("link-del").onclick = evnt => {
        clean(".hint");
        target.outerHTML = target.innerHTML;
        return false;
      };

      this.$pd.find("input", target).focus();

      this.$pd.find("input", target).onblur = evnt => {
        setTimeout(t => {
          clean(".hint");
        }, 200);
      };

      var clean = () => {
        var arr = document.getElementsByClassName("hint");
        for (var i = arr.length - 1; i >= 0; i--) {
          this.$pd.clean(arr[i]);
        }
      };
    },
    delBtn() {
      this.$refs.confirm.seen = true;
    },
    delInteract(result) {
      if (!result) return;
      this.$http
        .post("/api/interact/remove", {
          _id: this.palette._id
        })
        .then(res => {
          this.$pd.err(res);
          this.$pd.toast("删除成功");
          this.$router.back();
        });
    },
    addColor(index) {
      this.palette.colors.splice(index + 1, 0, {
        hex: "#e0e0e0",
        name: "",
        related: [{ hex: "#e0e0e0", name: "" }]
      });
    },
    delColor(index) {
      if (this.palette.colors.length === 1) return;
      this.palette.colors.splice(index, 1);
    },
    addRelate(color, index) {
      color.related.splice(index + 1, 0, { hex: "#e0e0e0", name: "" });
    },
    delRelate(color, index) {
      if (color.related.length === 1) return;
      color.related.splice(index, 1);
    }
  },
  mounted() {
    this.seen = true;
    this.palette._id = this.$route.query._id;
    if (!this.palette._id) {
      this.palette.colors.push({
        name: "新增颜色",
        hex: "#e0e0e0",
        related: []
      });
      this.palette.colors[0].related.push({
        name: "关联颜色",
        hex: "#e0e0e0"
      });
      return false;
    }
    this.$http
      .post("/api/palettes/find", {
        _id: this.palette._id
      })
      .then(res => {
        if (!res.body) return;
        this.palette = res.body.data[0];
        this.palette.colors.map(c => {
          if (!c.related || !c.related.length) {
            c.related[0] = {};
          }
        });
      });
  }
};
</script>
