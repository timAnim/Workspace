<style scoped>
#editor {
  box-sizing: border-box;
  padding: 0.08rem;
  min-height: 2rem;
}

.editor-outer {
  max-height: 6rem;
}

.canvas[expand] {
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
.canvas[expand] content {
  flex: 1 1 100%;
}

.canvas[expand] #editor {
  height: 100%;
}

.toolbar button {
  flex: 1 1 5em;
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
              <button class="ht-l wd-l cl-alert" v-if='initData._id' title='删除' @click='delBtn'>
                <icon name="trash"></icon>
              </button>
              <button  class="ht-l wd-l" @click='preview' title='预览'>
                <icon name='external-link-square'></icon>
              </button>
              <button  class="ht-l wd-l" @click='saveBtn'>
                <icon name="save"></icon>
              </button>
            </li>
          </section>
        </header>
        <content @click.stop>
          <section type='single'>
            <ul>
              <dl class='wd-panel shadow-m bg-white wd-fix'>
                <upload @complete='initData.cover=$event.resPath' @progress='progress'>
                  <div class="clip mg-m">
                    <img :src="initData.cover">
                  </div>
                  <div class="cl-sec mg-m">{{ initData.cover||"请选择" }}</div>
                </upload>
              </dl>
              <dl class="wd-auto form-inp">
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
                    <li @click='getType' class='blink-theme'>
                      <em class="wd-xl wd-fix">类型</em>
                      <pre>{{ initData.typeTxt }}</pre>
                      <label>
                        <icon name='angle-right'></icon>
                      </label>
                    </li>
                    <li>
                      <em class="wd-xl wd-fix">标签</em>
                      <input-tag :preset='types' :search='types'></input-tag>
                    </li>
                  </div>
                </ol>
              </dl>
            </ul>
            <ol class="pd-m">
              <li class="align-c">
                <em>兼容程度</em>
                <em>性能</em>
                <em>使用程度</em>
                <em>研究指数</em>
                <em>完整度</em>
                <em>推荐程度</em>
              </li>
              <li class="ht-xl">
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.compatibility'>
                </span>
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.capability'>
                </span>
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.usability'>
                </span>
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.study'>
                </span>
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.integrity'>
                </span>
                <span class="wd-xl">
                  <input direction='v' type="range" min='1' max='10' step="1" defaultValue='5' v-model='initData.recommand'>
                </span>
              </li>
              <li class="align-c">
                <em>{{ initData.compatibility }}</em>
                <em>{{ initData.capability }}</em>
                <em>{{ initData.usability }}</em>
                <em>{{ initData.study }}</em>
                <em>{{ initData.integrity }}</em>
                <em>{{ initData.recommand }}</em>
              </li>
            </ol>
            <ol class='canvas mg-s-v' :expand='fullscreen'>
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
                  <button title='插入图片'>
                    <upload @complete='img'>
                      <icon name="image"></icon>
                    </upload>
                  </button>
                </li>
                <content class="editor-outer">
                  <div id='editor' class='editor ft-s' @click='init' v-html='initData.content' spellcheck='false' contentEditable="true"></div>
                </content>
            </ol>
            <presenter ref="confirm" :title='"确认删除？"' :type='"confirm"' @out='delInteract'></presenter>
            <presenter ref="type" :title='"选择类型"' :type='"radio"' :data='types' @out='setType'></presenter>
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
        name: "新增交互",
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
        typeTxt: "请选择"
      },
      types: [
        {
          _id: "com",
          name: "组件"
        },
        {
          _id: "dialog",
          name: "对话框"
        },
        {
          _id: "list",
          name: "列表动画"
        },
        {
          _id: "card",
          name: "卡片动画"
        },
        {
          _id: "mark",
          name: "强调动画"
        },
        {
          _id: "switch",
          name: "切换动画"
        }
      ]
    };
  },
  methods: {
    saveBtn() {
      if (!this.initData.name || !this.initData.code)
        return this.$pd.toast("请检查输入");
      this.initData.content = this.$pd.id("editor").innerHTML;
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
      this.$refs.confirm.seen = true;
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
    getType() {
      this.$refs.type.seen = true;
    },
    setType(res) {
      if (!res) return;
      this.$set(this.initData, "type", res[0]._id);
      this.$set(this.initData, "typeTxt", res[0].name);
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
