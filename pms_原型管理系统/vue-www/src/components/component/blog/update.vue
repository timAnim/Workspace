<style scoped>
  dl {
  flex: 1 1 50%;
  border: none;
}

.tool-bar button {
  flex: auto;
}

img {
  margin: 0.08rem;
}

@media (max-width: 767px) {
  #outer dd {
    flex: 0 0 100%;
  }
}

.range {
  width: 4.8rem;
  margin: 0 auto;
}

.range dd {
  flex: 1 1 13.3%;
  text-align: center;
  border: none;
}

#editor {
  outline: none;
  width: 100%;
  min-height: 3rem;
  box-sizing: border-box;
  padding: 0.08rem;
  font-size: small;
}

.img-col {
  flex: 0 0 240px;
}

.img-col div {
  color: #bdbdbd;
  max-width: 240px;
  overflow: hidden;
  margin: 0;
  text-align: center;
}

.mo-upload {
  margin: 0;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 0.8rem;
  height: 0.9rem;
  border-radius: 10px;
  transform: rotate(-90deg);
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 16px;
  border-radius: 8px;
  box-shadow: inset 0 0 16px #e0e0e0, inset -1px 0 3px #9e9e9e;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  margin-top: -4px;
  background: #8bc34a;
  border-radius: 50%;
  border: solid 1px white;
  box-shadow: -1px 0 3px #bdbdbd;
}

.parent {
  position: relative;
}
</style>
<template>
  <main pt>
    <transition name='slide'>
      <article v-show='seen'>
        <header class="bg-bright shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button class="ht-l wd-l" @click='$router.back()'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>{{ initData.title }}</h1>
              <button v-if='initData._id' class="ht-l wd-l cl-alert" title='删除' @click='delBtn'>
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
          <section type='single' class="sd-card">
            <div class="mg-s-v sd-list">
              <div class="pd-s">
                <li class="ht-l">
                  <span class="wd-xl pd-m-h">输入标题</span>
                  <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='initData.title' class='wd-auto'></input-text>
                </li>
                <li class="ht-l">
                  <span class="wd-xl pd-m-h">作者</span>
                  <input-text :icon='"user"' :placeholder='"最多20个字"' v-model='initData.author' class='wd-auto'></input-text>
                </li>
              </div>
              <div class="sd-list">
                <li class="tool-bar">
                  <button @focus='font=!font' @blur='font=!font' class='parent'>
                    <icon name="font"></icon>
                    <transition name='opacity'>
                      <ol class="sd-card float" v-show='font'>
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
                  <button class='parent' @focus='color=!color' @blur='color=!color'>
                    <icon name="tint"></icon>
                    <transition name='opacity'>
                      <ol class="sd-card float" v-show='color'>
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
                <div id='editor' class='editor' @click='init' v-html='initData.content' spellcheck='false' contentEditable="true"></div>
              </div>
            </div>
            <h2 class="cl-sec pd-m-h">发布样式</h2>
            <ol expand>
              <div>
                <li>
                  <span class="wd-xl pd-m-h">摘要</span>
                  <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='initData.brief'></input-text>
                </li>
                <li>
                  <span class="wd-xl pd-m-h">标签</span>
                  <input-tag class="ht-s" :preset='types' :search='types'></input-tag>
                </li>
                <dd class='img-col'>
                  <upload @complete='initData.cover=$event.resPath' @progress='progress'>
                    <img :src="initData.cover" style="width:176px">
                    <div align='center'>{{ initData.cover||"请选择" }}</div>
                  </upload>
                </dd>
              </div>
            </ol>
            <presenter ref="confirm" :title='"确认删除？"' :type='"confirm"' @out='delInteract'></presenter>
          </section>
        </content>
      </article>
    </transition>
    <detail :init='initData' ref='detail'></detail>
  </main>
</template>
<script>
import upload from "@/components/_common/file-upload.vue";
import InputTag from "@/components/_common/input-tag.vue";
import detail from "./preview.vue";
export default {
  data() {
    return {
      seen: false,
      font: false,
      color: false,
      initData: {
        title: "新的博客",
        tags: [],
        cover: "/static/img/img01.jpg",
        content: "",
        author: "",
        brief: "",
        typeTxt: "请选择"
      },
      types: [{
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
      if (!this.initData.title) return this.$pd.toast("请检查输入");
      this.initData.content = this.$pd.id("editor").innerHTML;
      this.$http
        .post("/api/blogs/update", {
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
    console.log(this.initData._id);
    if (!this.initData._id) return false;

    this.$http
      .post("/api/blogs/find", {
        _id: this.initData._id
      })
      .then(res => {
        this.$pd.err(res);
        this.initData = res.body.data[0];
      });
  },
  components: {
    "input-tag": InputTag,
    detail: detail
  }
};

</script>
