<template>
  <transition name='in-left'>
    <section id='calendar'>
      <div id='list-first' class='bg-white sd-list pd-m-v'>
        <li v-for='item in staffs' class='ht-l pd-m' :key='item._id' @click='href(item.uid)'>
          <span class="wd-xl">
            <div class='clip mg-auto landscape wd-l radius-l'>
              <img :src='item.headurl || "/api/files/image/headurl.png"'>
            </div>
          </span>
          <div>
        <li class='ht-xs'>
          <span class='fs-l cl-prim'>{{item.name}}</span>
          <em class='cl-sec pd-s-h'>{{item.positionName}}</em>
        </li>
        <li class='ht-xs'>
          <em>电话</em>
          <pre>{{item.innerphone}}, {{item.mobile}}</pre>
        </li>
        <li class='ht-xs'>
          <em>邮箱</em>
          <pre @click.stop>
            <a :href='"mailto:"+item.email' class='href'>{{item.email}}</a>
          </pre>
        </li>
      </div>
      </li>
      <li @click='updateSchedule'>
        <button class="ht-m cl-theme wd-max">更新日程</button>
      </li>
      </div>
      <presenter ref='present' :title='"人员管理"' :type='"check"' @out='setStaff'>
      </presenter>
    </section>
  </transition>
</template>
<script>
export default {
  props:['proj'],
  data() {
    return {
      staffs: [],
      code: this.$route.query.code
    };
  },
  methods: {
    href(uid) {
      console.log(uid);
      this.$router.push({
        path: "/staff/edit",
        query: { uid: uid }
      });
    },
    init() {
      if(!this.proj)return false
      this.staffs = JSON.parse(JSON.stringify(this.proj.staff))
    },
    updateSchedule() {
      this.$http
        .post("/api/projects/schedule/refresh", { code: this.code })
        .then(rep => {
          if (!rep.body) return false;
          this.$store.commit("toast", "操作成功");
          this.$emit('refresh',true);
        });
    },
    setStaff(res) {
      if (!res) return;
      var arr = [];
      res.forEach(i => {
        arr.push(i._id);
      });
      this.$http
        .post("/api/projects/staff/update", {
          code: this.code,
          staff: arr
        })
        .then(response => {
          if (response.body.code !== 0) return;
          this.$store.commit('toast',"修改成功");
          this.$emit('refresh',true);
        });
    }
  },
  watch:{
    proj(){
      this.init()
    }
  },
  mounted(){
    this.init()
  }
};

</script>
