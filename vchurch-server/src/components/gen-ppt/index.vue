<template>
  <article>
    <header class="pd-l">
      <section>
        <el-steps :active="cur" finish-status="success">
          <el-step title="文本 1" description="将崇拜的步骤和信息按照示例格式输入到文本框"></el-step>
          <el-step title="解析 2" description="检查解析出的经文, 歌词, 流程是否有遗漏或错误"></el-step>
          <el-step title="导出 3" description="下载导出的PPT, 如果不成功请根据提示检查输入文本"></el-step>
        </el-steps>
      </section>
    </header>
    <content class="lay-r">
      <router-view></router-view>
    </content>
    <footer>
      <li class="sd-cut ht-l pd-m-h">
        <button v-show='cur!=1' class="sd-cut wd-xl" @click="previousStep">
          上一步
        </button>
        <button v-show='cur!=3' class="sd-theme wd-xl mg-m-h" @click="nextStep">
          下一步
        </button>
        <button v-show='cur==3' class="sd-theme wd-xl mg-m-h" @click="download">
          下载
        </button>
      </li>
    </footer>
  </article>
</template>
<style type="text/css" scoped>
content {
  padding: 0 !important;
}

</style>
<script>
export default {
  methods: {
    previousStep(){
      var cur = this.$store.state.cur
      switch (cur) {
        case 'parsed':
          this.cur='input'
          break;
        case 'output':
          this.cur='parsed'
          break;
        default:
          return false;
      }
    },
    nextStep(){
      var cur = this.$store.state.cur
      switch (cur) {
        case 'input':
          this.parse()
          break;
        case 'parsed':
          this.generate()
          break;
        case 'output':
          res = 3
          break;
        default:
          res = 1
      }
    },
    parse: function(e) {
      var inp = this.$store.state.inp
      if (!inp) return false
      var loading = this.$loading({
        fullscreen: true
      })

      this.$http.post('/api/parse-string', {
        inp
      }).then(res => {
        loading.close()
        if (res.body.code != 0) {
          return this.$notify.error({
            title: res.body.msg,
            message: res.body.data,
            duration: 0
          });
        }
        this.$notify.success({
          title: res.body.msg,
          message:'请检查内容和顺序'
        });
        this.$store.commit('setCur', 'parsed')
        this.$store.commit('setWorship', res.body.data)
        this.$router.replace('/gen-ppt/parsed')
      })
    },
    generate: function(e) {
      var worship = this.$store.state.worship
      if (!worship) return false
      var loading = this.$loading({
        fullscreen: true
      })
      this.$http.post('/api/gen-ppt', {
        worship
      }).then(res => {
        loading.close()
        if (res.body.code!= 0) {
          return this.$notify.error({
            title: res.body.msg,
            message: res.body.data,
            duration: 0
          });
        }
        this.$notify.success({
          title: res.body.msg,
          message:'可以下载PPT啦'
        });
        this.$store.commit('setCur', 'output')
        this.$store.commit('setDistPath', res.body.data.distPath)
        this.$router.replace('/gen-ppt/output')
      })
    },
    download: function() {
      window.location.href = this.$store.state.distPath
    },
  },
  computed: {
    cur: {
      set(val) {
        this.$store.commit('setCur', val)
        this.$router.replace('/gen-ppt/' + val)
      },
      get() {
        var cur = this.$store.state.cur
        var res
        switch (cur) {
          case 'input':
            res = 1
            break;
          case 'parsed':
            res = 2
            break;
          case 'output':
            res = 3
            break;
          default:
            res = 1
        }
        return res;
      }
    }
  }
};

</script>
