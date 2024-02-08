<template>
  <transition name='slide' mode='out-in' duration='100'>
    <section>
      <div class='pd-l sd-list'>
        <li class="pd-m-v">
          <div style="width: 50%">
            <div class="cl-hint">项目名</div>
            <div class="ht-s">{{project.name}}</div>
          </div>
          <div style="width: 50%">
            <div class="cl-hint">项目代号</div>
            <div class="ht-s">{{project.code}}</div>
          </div>
        </li>
        <li class="pd-m-v">
          <div style="width: 50%">
            <div class="cl-hint">所属产品</div>
            <div
              @click='hrefToBelong'
              class="ht-s underline pointer">
              {{project.pName}}
            </div>
          </div>
          <div style="width: 50%">
            <div class="cl-hint">是否上架</div>
            <div class="ht-s">{{ project.isPublic?"已上架":"否"}}</div>
          </div>
        </li>
        <div class="pd-m-v">
          <div class="cl-hint">里程碑</div>
          <date-ruler :_start='project.start' :_end='project.end' :stageArr='stageArr' :disabled='true' class='mg-m-h'></date-ruler>
        </div>
<!--         <li class="pd-m-v">
          <div style="width: 50%">
            <div class="cl-hint">开始日期</div>
            <div class="ht-s">{{project.start}}</div>
          </div>
          <div style="width: 50%">
            <div class="cl-hint">截止日期</div>
            <div class="ht-s">{{project.end}}</div>
          </div>
        </li> -->
        <div class="pd-m-v">
          <div class="cl-hint">原型</div>
          <div class="ht-s">
            <span class="pd-s-h blink-wave" @click='copy(proto)'><icon name='paste'></icon></span>
            <span class="pointer underline" @click= 'hrefTo(project, "proto")'>{{proto}}</span>
          </div>
        </div>
        <div class="pd-m-v">
          <div class="cl-hint">设计</div>
          <div class="ht-s">
            <span class="pd-s-h blink-wave" @click='copy(design)'><icon name='paste'></icon></span>
            <span class="pointer underline" @click= 'hrefTo(project, "design")'>{{design}}</span>
          </div>
        </div>
        <div style="border-bottom: none;">
          <div class="cl-hint mg-m-v">版本说明</div>
          <div class="pd-m sd-cut fs-s" style="word-wrap: break-word; background-color: var(--cl-light);" v-html='project.description'></div>
        </div>
      </div>
    </section>
  </transition>
</template>
<script>
import dateRuler from "@/components/_common/date-ruler.vue";

export default {
  props: ['proj'],
  data() {
    return {
      seen: false,
      progress_show: false,
      percent: 0,
      projectList: [],
      stageArr:[],
      proto:'',
      design:'',
      project: {
        name: "",
        cover: "",
        isPublic: false,
        pid: "",
        pName: "",
        material: "",
        proto: "",
        design: "",
      },
    };
  },
  methods: {
    response(res) {
      if (!res.length) return;
      res = res[0]
      this.$set(this.project, 'pid' ,res._id)
      this.$set(this.project, 'pName' ,res.name)
    },
    hrefTo(item, type){
      this.$router.push({
        path: "/html-viewer",
        query: {
          code: item.code,
          type
        }
      });
    },
    hrefToBelong(){
      this.$router.push({
        path: "/product/detail",
        query: {
          id: this.project.pid,
        }
      });
    },
    setCover(ev) {
      this.$set(this.project, "cover", ev.resPath);
    },
    save() {
      this.$http
        .post("/api/projects/update", {
          code: this.project.code,
          data: this.project
        })
        .then(res => {
          if (!res.body) return false;
          this.$store.commit("toast", "保存成功");
        });
    },
    progress(per) {
      this.percent = per;
    },
    complete(res, val) {
      this.progress_show = false;
      if (res) {
        this.project[val.type] = val.entrance;
        this.save();
      } else {
        this.$store.commit("toast", val);
      }
    },
    init() {
      if (!this.proj) return false
      this.project = JSON.parse(JSON.stringify(this.proj))
      let host = location.origin + '\\api';
      if(this.project.proto){
        this.proto = this.project.proto.replace('api', host)
      }
      if(this.project.design){
        this.design = this.project.design.replace('api', host)
      }
      this.getAllProducts()
      this.initRuler()
    },
    getD(stamp) {
      return stamp / 1000 / 60 / 60 / 24;
    },
    copy(txt){
      if(this.$pd.copy(txt)){
        this.$store.commit("toast", '复制到剪切板');
      }else{
        this.$store.commit("toast", '浏览器不支持');
      }
    },
    initRuler() {
      if (!this.project) return;
      //数据初始化
      this.start = new Date(this.project.start).valueOf();
      this.end = new Date(this.project.end).valueOf();
      this.planArr = this.project.plan;
      this.planArr = this.planArr.sort((a, b) => {
        return new Date(a.start).valueOf() - new Date(b.start).valueOf();
      });
      this.planArr.forEach(item=>{
        item.disabled = !this.isadmin
      })
      this.stageArr = this.project.stage;

      // 标尺格式化
      var week = this.getD((this.end - this.start) / 7);
      var total = this.$pd.id("list-zero").clientWidth;
      this.picWidth = total / week;
      this.unit = total / (7 * week);
      this.weekday =
        -(new Date(this.start).getDay() + 1) * this.unit + "px";
      //缓存
      var startStamp, endStamp;
      // 里程碑的格式化
      this.stageArr.forEach(stage => {
        startStamp = new Date(stage.date).valueOf();
        stage.left = this.getD(startStamp - this.start) * this.unit + "px";
        stage._date = new Date(stage.date).Format("MM-dd");
      });
      // 今天标签
      var today = new Date().valueOf();
      this.today = new Date().Format("MM-dd");
      if (today >= this.end) return;
      this.todayLeft = this.getD(today - this.start) * this.unit + "px";
    },
    getAllProducts() {
      this.$http
        .post("/api/product/findAll")
        .then(res => {
          if (!res.body) return false;
          this.projectList = res.body.data
        });
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    proj() {
      this.init()
    }
  },
  components: {
    "date-ruler": dateRuler
  },
  computed: {
    isadmin() {
      return this.$store.state.isadmin
    },
  }
};

</script>
