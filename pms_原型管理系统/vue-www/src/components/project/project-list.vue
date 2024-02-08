<template>
  <div>
    <!-- 进行中的迭代start -->
    <div v-if='cur === "develop"'>
      <div @click='projectDetail(item)' v-for='item in projects' :code='item.code' class='lay-h sd-card mg-m pointer'
        :key='item.id'>
        <div class='clip wd-l mg-m' :class='{landscape:item.isLandscape}'>
          <img class='radius-m' :src='item.cover' @load='adjust($event,item)'>
        </div>
        <div class="wd-auto mg-s-h">
          <div class='mg-l-v fs-l'>
            <div class="mg-s-h">{{ item.name }}</div>
            <li class='fs-xs ht-s href-hub'>
              <span class="cl-theme mg-s-h" v-if='item.proto' @click.prevent.stop="hrefTo(item,'proto')">
                原型
              </span>
              <span class="cl-theme mg-s-h" v-if='item.design' @click.prevent.stop="hrefTo(item,'design')">
                设计
              </span>
              <span class="cl-prim mg-s-h" v-if='item.pid' @click.prevent.stop='productBelongTo(item)'>
                所属产品
              </span>
            </li>
          </div>
          <date-ruler class='mg-l-v' :_start='item.start' :_end='item.end' :stageArr='item.stage'>
          </date-ruler>
        </div>
      </div>
    </div>
    <!-- 进行中的迭代end -->

    <!-- 已发布的迭代start -->
    <div v-if='cur === "public"'>
      <div class="sd-card mg-m pointer" @click='projectDetail(item)' v-for='item in projects' :key='item.id'>
        <div class='lay-h'>
          <div class='clip wd-l mg-m pointer' :class='{landscape:item.isLandscape}' style="align-self: flex-start;">
            <img class='radius-m' :src='item.cover' @load='adjust($event,item)'>
          </div>
          <div class="wd-auto pd-m-h">
            <div class='mg-l-v'>
              <div class="fs-l">{{ item.name }}</div>
              <li class='fs-xs ht-s cl-sec' style="margin-bottom: var(--pd-m)">
                <span>版本介绍</span>
              </li>
              <div>
                <span>上线时间</span>
                <span class="mg-m-h">{{item.end}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class='bg-light ht-m lay-h href-hub'>
          <span class="cl-theme wd-auto align-c blink-wave" v-if='item.mail' @click.prevent.stop="hrefTo(item,'mail')">
            邮件往来
          </span>
          <span class="cl-theme wd-auto align-c blink-wave" v-if='item.proto'
            @click.prevent.stop="hrefTo(item,'proto')">
            原型
          </span>
          <span class="cl-theme wd-auto align-c blink-wave" v-if='item.design'
            @click.prevent.stop="hrefTo(item,'design')">
            设计
          </span>
          <span class="cl-prim wd-auto align-c blink-wave" v-if='item.pid' @click.prevent.stop='productBelongTo(item)'>
            所属产品
          </span>
        </div>
      </div>
    </div>
    <!-- 已发布的迭代end -->

    <!-- 全部迭代start -->
    <ul v-if='cur === "all"'>
      <dl @click='projectDetail(item)' v-for='item in projects' class='lay-r pd-m pointer' :key='item.id'>
        <li>
          <div>{{ item.name }}</div>
        </li>
        <div class='clip mg-m' :class='{landscape:item.isLandscape}'>
          <img class='radius-m' :src='item.cover' @load='adjust($event,item)'>
        </div>
        <li class='fs-xs ht-s href-hub' style="justify-content: space-between;">
          <span class="cl-theme" v-if='item.proto' @click.prevent.stop="hrefTo(item,'proto')">
            原型
          </span>
          <span class="cl-theme" v-if='item.design' @click.prevent.stop="hrefTo(item,'design')">
            设计
          </span>
          <span class="cl-prim" v-if='item.pid' @click.prevent.stop='productBelongTo(item)'>
            所属产品
          </span>
        </li>
      </dl>
    </ul>
    <!-- 全部迭代end -->

    <button v-if='isadmin&&buttonSeen' @click='add' float>
      <icon name='plus'></icon>
    </button>
  </div>
</template>
<style scoped>
    .href-hub>span {
        text-decoration: underline;
    }
    
    .clip {
        align-self: flex-start;
    }
</style>
<script>
    import dateRuler from "@/components/_common/date-ruler.vue";
    export default {
        data() {
            return {
                seen: false,
                projects: [],
                projectsBak: [],
                buttonSeen: true,
                item: {},
            };
        },
        methods: {
            getData() {
                this.$http.post("/api/projects/find")
                    .then(res => {
                        if (res.body.code !== 0) return;
                        this.projects = res.body.data;
                        this.init();
                    });
            },
            init() {
                if (!this.projects.length) return false
                this.projects.forEach(item => {
                    item.startVal = new Date(item.start).valueOf();
                    item.endVal = new Date(item.end).valueOf();
                    item.start = new Date(item.start).Format("yyyy-MM-dd");
                    item.end = new Date(item.end).Format("yyyy-MM-dd");
                    item.start_short = new Date(item.start).Format("MM-dd");
                    item.end_short = new Date(item.end).Format("MM-dd");
                });
                this.projectsBak = JSON.parse(JSON.stringify(this.projects));
                setTimeout(_t => {
                    this.buttonSeen = true
                }, 1200)

                this.navHdl(this.cur);
            },
            navHdl(id) {
                this.cur = id;

                if (this.cur === "all") {
                    this.projects = this.projectsBak;
                } else if (this.cur === 'develop') {
                    var nowDate = new Date().valueOf()
                    this.projects = this.projectsBak.filter(item => {
                        return item.startVal <= nowDate && item.endVal >= nowDate;
                    });
                } else {
                    this.projects = this.projectsBak.filter(item => {
                        return item.isPublic;
                    });
                }

                this.seen = false;
                this.buttonSeen = false;
                this.$pd.wait(50).then(seed => (this.seen = true));
                this.$pd.wait(350).then(seed => (this.buttonSeen = true));
            },
            adjust(e, item) {
                item.isLandscape = e.target.height / e.target.width < 1;
            },
            projectDetail(item) {
                this.$router.push({
                    path: "/project/detail",
                    query: {
                        code: item.code
                    }
                });
            },
            productBelongTo(item) {
                this.$router.push({
                    path: "/product/detail",
                    query: {
                        id: item.pid,
                    }
                });
            },
            hrefTo(item, type) {
                this.$router.push({
                    path: "/html-viewer",
                    query: {
                        code: item.code,
                        type
                    }
                });
            },
            add() {
                this.$router.push("/project/add");
            },
        },
        mounted() {
            this.getData();
        },
        computed: {
            cur: {
                get() {
                    return this.$store.state.projStage;
                },
                set(id) {
                    this.$store.commit("setProjStage", id);
                }
            },
            isadmin() {
                return this.$store.state.isadmin
            }
        },
        components: {
            "date-ruler": dateRuler
        }
    };
</script>