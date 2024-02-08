<style scoped>
#editor {
  box-sizing: border-box;
  padding: 0.08rem;
  min-height: 2rem;
}

.editor-outer {
  max-height: 6rem;
}

.expand {
  position: absolute;
  width: 6rem;
  box-sizing: border-box;
  top: 0.08rem;
  left: 50%;
  margin-left: -3rem;
  bottom: 0.08rem;
  z-index: 200;
  height: inherit;
  display: flex;
  flex-flow: column nowrap;
}
.expand content {
  flex: 1 1 100%;
}

.expand #editor {
  height: 100%;
}

.toolbar > * {
  flex: 1 1 5em;
  line-height: 0.32rem;
}

.mask {
  background-color: #eee;
}

.form-inp {
  margin-right: 0;
}

.float {
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
<template>
  <main>
    <transition name='slide'>
      <article v-show='seen'>
        <header class="shadow-l">
          <section type='single'>
            <li class="ht-l">
              <button class="ht-l wd-l" @click='$router.back()'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>{{ initData.name }}</h1>
              <button v-if='initData._id' class='cl-alert' title='删除' @click='delBtn'>
                <icon name="trash"></icon>
              </button>
              <button class="ht-l wd-l" @click='preview' title='预览'>
                <icon name='external-link-square'></icon>
              </button>
              <button class="ht-l wd-l" @click='saveBtn'>
                <icon name="save"></icon>
              </button>
            </li>
          </section>
        </header>
        <content @click.stop>
          <section type='single'>
            <ul>
              <dl class='wd-panel sd-card wd-fix' :style='{"margin-left":"0px"}'>
                <upload @complete='initData.cover=$event.resPath' @progress='progress'>
                  <div class="clip mg-m">
                    <img :src="initData.cover">
                  </div>
                  <div class="cl-sec mg-m fs-xs align-c">{{ initData.cover||"请选择" }}</div>
                </upload>
              </dl>
              <dl class="wd-auto form-inp pd-m" :style="{overflow:'visible'}">
                <ol expand>
                  <div>
                    <li>
                      <em class="wd-xl wd-fix">交互名称</em>
                      <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='initData.name'></input-text>
                    </li>
                    <li>
                      <em class="wd-xl wd-fix">图标</em>
                      <input-text :icon='"font-awesome"' :placeholder='"font-awesome图标"' v-model='initData.label'></input-text>
                    </li>
                    <li>
                      <em class="wd-xl wd-fix">英文名</em>
                      <input-text :icon='"tag"' :placeholder='"自定义标签"' v-model='initData.code'></input-text>
                    </li>
                    <li>
                      <em class="wd-xl wd-fix">标签</em>
                      <input-tag class="ht-s" :preset='types' :search='types' ref="tags"></input-tag>
                    </li>
                  </div>
                </ol>
              </dl>
            </ul>
            <dl class="pd-m align-c">
              <li class="ht-m">
                <div>兼容程度</div>
                <div>性能</div>
                <div>使用程度</div>
                <div>研究指数</div>
                <div>完整度</div>
                <div>推荐程度</div>
              </li>
              <li class="ht-xl">
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.compatibility'>
                </div>
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.capability'>
                </div>
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.usability'>
                </div>
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.study'>
                </div>
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.integrity'>
                </div>
                <div class="ht-xl">
                  <input class="wd-xl ht-max" direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.recommand'>
                </div>
              </li>
              <li>
                <div>{{ initData.compatibility }}</div>
                <div>{{ initData.capability }}</div>
                <div>{{ initData.usability }}</div>
                <div>{{ initData.study }}</div>
                <div>{{ initData.integrity }}</div>
                <div>{{ initData.recommand }}</div>
              </li>
            </dl>
            <ol class='canvas mg-s-v sd-card' :class='{expand:fullscreen}'>
                <li class='toolbar'>
                  <button title='退出全屏' @click='fullscreen=false' v-if='fullscreen'>
                    <icon name='compress'></icon>
                  </button>
                  <button title='全屏' @click='fullscreen=true' v-if='!fullscreen'>
                    <icon name='expand'></icon>
                  </button>
                  <button @focus='font=!font' @blur='font=!font' class='lay-r'>
                    <icon name="font"></icon>
                    <transition name='opacity'>
                      <ol class="float wd-xl" v-show='font'>
                        <li class='ht-low'>
                          <button @click='exec' exec='fontsize' argu='2'>13px
                          </button>
                        </li>
                        <li class='ht-low ft-big'>
                          <button @click='exec' exec='fontsize' argu='3'>16px
                          </button>
                        </li>
                      </ol>
                    </transition>
                  </button>
                  <button class='lay-r' @focus='color=!color' @blur='color=!color'>
                    <icon name="tint"></icon>
                    <transition name='opacity'>
                      <ol class="float wd-xl" v-show='color'>
                        <li class='ht-low'>
                          <button @click='exec' exec='forecolor' argu='#212121'>默认
                          </button>
                        </li>
                        <li class='ht-low'>
                          <button @click='exec' class='color-theme' exec='forecolor' argu='#8bc34a'>高亮
                          </button>
                        </li>
                      </ol>
                    </transition>
                  </button>
                  <button title='清除样式' @click='exec' exec='removeformat'>
                    <icon name="eraser"></icon>
                  </button>
                  <button @click='exec' exec='bold'>
                    <icon name="bold"></icon>
                  </button>
                  <button @click='exec' exec='italic'>
                    <icon name="italic"></icon>
                  </button>
                  <button @click='exec' exec='underline'>
                    <icon name="underline"></icon>
                  </button>
                  <button @click='exec' exec='indent'>
                    <icon name="indent"></icon>
                  </button>
                  <button @click='exec' exec='outdent'>
                    <icon name="dedent"></icon>
                  </button>
                  <button @click='exec' exec='JustifyLeft'>
                    <icon name="align-left"></icon>
                  </button>
                  <button @click='exec' exec='JustifyCenter'>
                    <icon name="align-center"></icon>
                  </button>
                  <button @click='exec' exec='JustifyRight'>
                    <icon name="align-right"></icon>
                  </button>
                  <button @click='exec' exec='inserthorizontalrule' title='分割线'>
                    <icon name="paragraph"></icon>
                  </button>
                  <button @click='exec' exec='CreateLink' argu='http://' title='插入链接'>
                    <icon name="link"></icon>
                  </button>
                  <span class='blink-wave align-c' title='插入图片'>
                    <upload @complete='img'>
                      <icon name="image"></icon>
                    </upload>
                  </span>
                </li>
                <content class="editor-outer">
                  <div id='editor' class='editor ft-s' @click='init' v-html='initData.content' spellcheck='false' contentEditable="true"></div>
                </content>
            </ol>
            <interact :init='initData' ref='detail'></interact>
          </section>
        </content>
        <div class="mask" v-show='fullscreen'></div>
      </article>
    </transition>
  </main>
</template>
<script>
import upload from "@/components/_common/file-upload.vue";
import InputTag from "@/components/_common/input-tag.vue";
import detail from "./detail.vue";
export default {
  data() {
    return {
      seen: false,
      font: false,
      color: false,
      fullscreen: false,
      initData: {
        name: "新增组件",
        code: "",
        label: "",
        cover: "/static/img/img01.jpg",
        content: "",
        compatibility: 5,
        capability: 5,
        usability: 5,
        study: 5,
        integrity: 5,
        recommand: 5,
        typeTxt: "请选择",
        type: "type"
      },
      types: [
        {
          _id: "com",
          txt: "组件"
        },
        {
          _id: "dialog",
          txt: "对话框"
        },
        {
          _id: "list",
          txt: "列表动画"
        },
        {
          _id: "card",
          txt: "卡片动画"
        },
        {
          _id: "mark",
          txt: "强调动画"
        },
        {
          _id: "switch",
          txt: "切换动画"
        }
      ]
    };
  },
  methods: {
    saveBtn() {
      console.log("shahs");
      if (!this.initData.name || !this.initData.code)
        return this.$pd.toast("请检查输入");
      this.initData.content = this.$pd.id("editor").innerHTML;
      this.initData.type = this.$refs.tags.tags[0];
      this.$http
        .post("/api/interact/update", {
          data: this.initData
        })
        .then(res => {
          this.$pd.err(res);
          this.$pd.toast("操作成功");
          if (this.initData._id) return;
          this.$router.back();
        });
    },
    progress(cent) {
      if (cent === 100) this.$pd.toast("上传完成");
    },
    exec(ev) {
      var target = this.$pd.target(ev, "button");
      document.execCommand(
        target.getAttribute("exec"),
        false,
        target.getAttribute("argu") || null
      );
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
      this.$store.commit("setConfirm", {
        seen: true,
        msg: "确认删除组件?",
        out: res => {
          this.delInteract(res);
        }
      });
    },
    delInteract(result) {
      if (!result) return;
      this.$http
        .post("/api/interact/remove", {
          _id: this.initData._id
        })
        .then(res => {
          this.$pd.err(res);
          this.$pd.toast("删除成功");
          this.$router.back();
        });
    },
    preview() {
      this.$set(this.initData, "content", this.$pd.id("editor").innerHTML);
      this.$refs.detail.preview = true;
      this.$refs.detail.seen = true;
    },
    img(ev) {
      document.execCommand("insertimage", false, ev.resPath);
    }
  },
  mounted() {
    this.seen = true;
    this.initData._id = this.$route.query._id || "";
    if (!this.initData._id) return false;

    this.$http
      .post("/api/interact/find", {
        _id: this.initData._id
      })
      .then(res => {
        this.$pd.err(res);
        var txt = this.types.filter(item => {
          return item._id === res.body.data[0].type;
        });
        res.body.data[0].typeTxt = txt[0].name;
        this.initData = res.body.data[0];
      });
  },
  components: {
    interact: detail,
    "input-tag": InputTag
  }
};
</script>
