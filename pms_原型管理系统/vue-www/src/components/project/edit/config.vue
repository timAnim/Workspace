<template>
  <transition name='slide' mode='out-in' duration='100'>
    <section>
      <div class="wd-auto pd-l" expand>
        <li>
          <span class="wd-xl">项目代号</span>
          <span>{{project.code}}</span>
        </li>
        <li>
          <span class="wd-xl">项目名</span>
          <input-text :icon='"suitcase"' :placeholder='"最多20个字"' v-model='project.name' :disabled='!isadmin'></input-text>
        </li>
        <li>
          <span class="wd-xl">开始日期</span>
          <input-date v-model='project.start' :disabled='!isadmin'></input-date>
        </li>
        <li>
          <span class="wd-xl">截止日期</span>
          <input-date v-model='project.end' :disabled='!isadmin'></input-date>
        </li>
        <li v-if='isadmin'>
          <span class="wd-xl">所属产品</span>
          <div @click='slctBelongTo' class="bg-light lay-h ht-s radius-m pointer pd-s-h">
            <div class="wd-auto">{{ project.pName }}</div>
            <span class="cl-disabled">
              <icon name='chevron-circle-down'></icon>
            </span>
          </div>
        </li>
        <li class="ht-l">
          <span class="wd-xl">原型</span>
          <input-file-zip :disabled='!isadmin' :placeholder='"输入URL"' v-model='project.proto' type="proto" :code='project.code' @start='progress_show=true' @progress='progress' @complete='complete'></input-file-zip>
        </li>
        <li class="ht-l">
          <span class="wd-xl">设计</span>
          <input-file-zip :disabled='!isadmin' :placeholder='"输入URL"' v-model='project.design' :code='project.code' type="design" @start='progress_show=true' @progress='progress' @complete='complete'></input-file-zip>
        </li>
        <div class="lay-h pd-s-v">
          <span class="wd-xl">版本说明</span>
          <textarea class="pd-s cl-prim wd-auto bg-light" style="min-height: var(--ht-l)" v-model='project.description'></textarea>
        </div>
        <li>
          <span class="wd-xl">是否上架</span>
          <div class='align-r'>{{ project.isPublic?"已上架":"否"}}</div>
          <span class="pd-m-h pointer" @click="publicProject">
            <icon scale='2' class="cl-theme" name='toggle-on' v-if='project.isPublic'></icon>
            <icon scale='2' name='toggle-off' v-else></icon>
          </span>
        </li>
      </div>
      <presenter ref='belong' title="选择所属产品" type="radio" :initData='projectList' @out='response'>
      </presenter>
      <progress-circle :percent='percent' :seen='progress_show'></progress-circle>
    </section>
  </transition>
</template>
<script>
import inputDate from "@/components/_common/input-date.vue";
import inputFileZip from "@/components/_common/input-file-zip.vue";
import progress from "@/components/_common/progress-circle.vue";

export default {
  props: ['proj'],
  data() {
    return {
      seen: false,
      progress_show: false,
      percent: 0,
      projectList: [],
      project: {
        name: "",
        cover: "",
        isPublic: "",
        pid: "",
        pid: "",
        pName: "",
        material: "",
        proto: "",
        design: "",
        description: "",
      },
    };
  },
  methods: {
    response(res) {
      if (!res) return false;
      res = res[0]
      this.$set(this.project, 'pid' ,res._id)
      this.$set(this.project, 'pName' ,res.name)
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
      this.project.description = this.project.description.replace(/<br>/ig, '\n')
      this.getAllProducts()
    },
    getAllProducts() {
      this.$http
        .post("/api/product/findAll")
        .then(res => {
          if (!res.body) return false;
          this.projectList = res.body.data
        });
    },
    publicProject(){
      this.$http.
        post("/api/projects/publicProject",{
          _id:this.project._id,
          isPublic: !this.project.isPublic
        })
        .then(res =>{
          if (!res.body) return false;
          this.project.isPublic = !this.project.isPublic
          this.$store.commit("toast", "保存成功");
        })
    },
    slctBelongTo(){
      this.$refs.belong.check([this.project.pid])
      this.$refs.belong.seen=true
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
    "input-date": inputDate,
    "input-file-zip": inputFileZip,
    "progress-circle": progress
  },
  computed: {
    isadmin() {
      return this.$store.state.isadmin
    }
  }
};

</script>
