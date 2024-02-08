<style scoped>
    .switch-panel {
        left: 0.8rem !important;
        top: var(--ht-m) !important;
    }
    
    .mask {
        background: transparent !important;
    }
</style>
<template>
  <main>
    <div class="ht-max wd-max lay-v">
      <header class="sd-front-i">
        <li>
          <button class='cl-prim wd-m' @click='$router.back()'>
            <icon name='arrow-left'></icon>
          </button>
          <button class='cl-prim wd-m' @click='home'>
            <icon name='home'></icon>
          </button>
          <div class="pd-s-h pointer" @click='showPanel=true'>{{ name }}{{typeName}}
            <icon name='caret-down'></icon>
          </div>
          <button @click='download' title='下载' v-if='href' class="cl-prim wd-xl">
            <icon name="download"></icon> 导出
          </button>
        </li>
      </header>
      <iframe v-if='type!="flowchart"' class="ht-auto wd-max" :src="target"></iframe>
      <svg-viewer :namespace='code' v-if='type == "flowchart"'></svg-viewer>
      <content class="ht-auto bg-light align-c" v-if="type=='product'||type=='develop'">
        <img :src="img" class="wd-xl mg-m-v">
        <div class="cl-sec ht-l">正式环境地址</div>
        <div class="cl-prim pointer" @click="hrefTo()">{{ link }}</div>
      </content>
      <transition name='opacity' mode='out-in' duration='200'>
        <div class='mask' v-show='showPanel' @click='showPanel=false'>
          <div class='sd-light-i float-nw switch-panel wd-panel'>
            <li v-for='(k,v) in typeList' :key='v' class='pointer blink-wave' @click='switchType(v)'>
              <span class='pd-m-h'>
                <icon name='dot-circle-o' v-if='v===type'></icon>
                <icon name='circle-o' v-else></icon>
              </span>
              <div>{{k}}</div>
            </li>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>
<script>
    import svgViewer from './svg-viewer.vue'
    export default {
        data() {
            return {
                code: this.$route.query.code,
                name: "UED工作平台",
                target: this.$route.query.target,
                type: this.$route.query.type,
                link: '',
                href: true,
                img: '',
                showPanel: false,
                urls: {
                    flowchart: "/api/flowchart",
                    xlsxhtml: "/api/axdoc/gen-xlsx-html",
                    docxhtml: "/api/axdoc/gen-docx-html",
                    inspecthtml: "/api/axdoc/gen-inspect-html"
                },
                downloadURL: {
                    xlsxhtml: "/api/axdoc/output-xlsx",
                    // docxhtml: "/api/axdoc/output-docx",
                    inspecthtml: "/api/axdoc/output-inspect"
                },
                typeList: {
                    flowchart: "流程图",
                    proto: "原型",
                    design: "设计",
                    xlsxhtml: "功能列表",
                    docxhtml: "需求文档",
                    inspecthtml: "埋点需求列表"
                }
            };
        },
        methods: {
            download(e) {
                if (this.type === "proto" || this.type === "design") {
                    this.getFile(this.href);
                } else if (this.type == 'flowchart') {
                    return this.$store.commit('toast', '请右键另存为')
                } else {
                    var url = this.downloadURL[this.type];
                    if (!url) return false;
                    this.$pd.toast("生成中请稍后");
                    this.$http
                        .post(url, {
                            code: this.code
                        })
                        .then(res => {
                            this.getFile(res.body);
                        });
                }
            },
            home() {
                this.$router.push("/");
            },
            getFile(url) {
                if (typeof url !== "string") {
                    this.$pd.toast("文件不存在");
                } else {
                    window.location.href = url;
                }
            },
            switchType(cur) {
                this.type = cur;
                if (cur === "proto" || cur === "design") {
                    this.initData();
                } else if (cur == 'flowchart') {
                    this.initData();
                } else {
                    this.$pd.toast("生成中请稍后");
                    this.$http
                        .post(this.urls[cur], {
                            code: this.code
                        })
                        .then(response => {
                            if (!response.body) return;
                            this.target = response.body;
                            this.initData();
                        });
                }
            },
            initData() {
                this.$http
                    .post("/api/projects/findOne", {
                        code: this.$route.query.code
                    })
                    .then(res => {
                        var proj = res.body.data;
                        this.name = proj.name;
                        if (this.type === "proto" || this.type === "design") {
                            this.target = proj[this.type];
                            this.href = `/api/files/${this.type}/${proj.code}/${proj.code}.zip`;
                        } else if (this.type == 'flowchart') {
                            this.href = null;
                        } else if (this.type == 'product' || this.type == 'develop') {
                            this.link = proj[this.type];
                            this.img = proj.cover
                        }
                    });
            },
            hrefTo() {
                // console.log(this.link)

                var str = `<form action="${this.link}" method="get"></form>`
                var form = document.createElement("form")
                form.setAttribute("action", this.link)
                form.setAttribute("method", "get")
                document.body.appendChild(form)
                form.submit()
            },
        },
        mounted() {
            this.initData();
        },
        computed: {
            typeName: {
                get() {
                    return this.typeList[this.type];
                }
            }
        },
        components: {
            'svg-viewer': svgViewer
        }
    };
</script>