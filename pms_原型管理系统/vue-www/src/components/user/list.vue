<template>
  <app-layout>
    <nav-bar :navs='navs' :cur='cur' @nav='navHdl' slot='navs'></nav-bar>
    <section slot='content'>
      <ol class="pd-m radius-m">
        <li v-for="(user,index) in users" @click.stop='edit(user)' class="pointer" :key='index'>
          <div>{{ user.name }}</div>
          <pre>{{ user.number }}  {{ user.mobile }}</pre>
          <label class='wd-m'>
            <icon name="angle-right"></icon>
          </label>
        </li>
      </ol>
      <user-add ref='add' @modify='init'></user-add>
      <button float @click='add'>
        <icon name='plus'></icon>
      </button>
    </section>
  </app-layout>
</template>
<script>
import userAdd from "./add";
export default {
  data() {
    return {
      users: [],
      cur: "all",
      all: [],
      navs: [{ id: "all", name: "全部人员" }, { id: "admin", name: "管理员" }]
    };
  },
  methods: {
    edit(us) {
      this.$router.push({
        path: "/staff/edit/",
        query: {
          uid: us.uid
        }
      });
    },
    navHdl(cur) {
      this.cur = cur;
      if (cur == "all") {
        this.users = JSON.parse(JSON.stringify(this.all));
      } else if (cur == "admin") {
        this.users = this.all.filter(u => {
          return u.isadmin == true;
        });
      }
    },
    add() {
      this.$refs.add.seen = true;
    },
    range() {
      this.users = this.users.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    },
    init() {
      this.$http.post("/api/staff/find").then(res => {
        if (res.body.code != 0) return;
        this.all = res.body.data;
        this.users = JSON.parse(JSON.stringify(this.all));
        this.range();
      });
    }
  },
  created() {
    this.init();
  },
  components: {
    "user-add": userAdd
  }
};

</script>
