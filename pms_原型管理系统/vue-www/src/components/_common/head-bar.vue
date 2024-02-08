<template>
  <header class="shadow-l">
    <section>
      <li class="ht-l">
        <button class="ht-l wd-l" @click='toggle'>
          <icon name="bars"></icon>
        </button>
        <h1>{{ $route.name }}</h1>
        <button
          @click='showPreset'
          class="pd-s-h fs-xs">
          power by Paratag
        </button>
        <label id='setting-dlg-btn'
            v-if='logined'
            @click="$refs.sDlg.seen= true"
            class="clip wd-s mg-s-h radius-l">
            <img :src="headurl" class="pointer">
        </label>
        <button class="ht-l wd-l" v-else @click='$router.push("/login")'>
          登录
        </button>
        <button id='notice-dlg-btn'
            @click="$refs.nDlg.seen= true"
          class="ht-l wd-l">
          <icon name='bell'></icon>
        </button>
      </li>
      <slot name='navs'></slot>
    </section>
    <dropdown :trigger='"setting-dlg-btn"' ref='sDlg'>
      <ol>
        <li class='blink-wave ht-m pd-m-h' @click='edit'>
          <div>设置</div>
          <label class="wd-m align-r cl-hint">
            <icon name='angle-right'></icon>
          </label>
        </li>
        <li class='blink-wave ht-m pd-m-h' @click='logoff'>
          <div>登出</div>
          <label class="wd-m align-r cl-hint">
            <icon name='angle-right'></icon>
          </label>
        </li>
      </ol>
    </dropdown>

    <dropdown :trigger='"notice-dlg-btn"' ref='nDlg'>
      <ol class='wd-dialog'>
          <li class='blink-theme ht-m'
            v-for='{proj_name,date,proj_code,_id,item} in reminds'
            :key='_id'
            :id='_id'
            :code='proj_code'
            @click='href(proj_code)'>
            <span class="wd-l">{{ item }}</span>
            <div class="pd-m-h">{{ proj_name }}</div>
            <pre class="fs-s cl-hint">{{ date }}</pre>
          </li>
      </ol>
    </dropdown>
  </header>
</template>
<script>
export default {
  name: "head-bar",
  data() {
    return {
      reminds: [],
      left: 20,
      seen: false
    };
  },
  mounted() {
    this.$http.post("/api/log/find").then(rep => {
      rep.body.data.forEach(item => {
        item.date = new Date(item.date).Format("yyyy-MM-dd hh:mm");
      });
      this.reminds = rep.body.data;
    });
  },
  methods: {
    toggle() {
      this.aside = this.aside == "on" ? "off" : "on";
    },
    logoff(ev) {
      localStorage.clear();
      this.$store.commit("toast", "成功登出");
      setTimeout(ev => {
        this.$router.push("/login");
      }, 1500);
    },
    href(code) {
      this.$router.push({
        path: "/html-viewer/",
        query: {
          code: code,
          type: "proto"
        }
      });
    },
    edit() {
      this.$router.push({
        path: "/staff/edit/",
        query: {
          uid: this.$store.state.uid
        }
      });
    },
    showPreset() {
      this.$store.commit("showPreset", true);
    }
  },
  computed: {
    aside: {
      get() {
        return this.$store.state.aside;
      },
      set(state) {
        this.$store.commit("setAside", state);
      }
    },
    logined() {
      return this.$store.state.token ? true : false;
    },
    headurl() {
      return this.$store.state.headurl
    }
  }
};
</script>
