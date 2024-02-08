<template>
  <main>
    <article>
      <content>
        <section>
          <div class='sd-card in-top wd-dialog'>
            <li class="mg-xl-v pd-xl-h" v-if='show'>
              <div class='logo-outer blink-text fs-l'>
                <span class='logo cl-theme'>Y</span>
                <span class='logo cl-theme'>U</span>
                <span class='logo cl-theme'>T</span>
                <span class='logo cl-theme'>O</span>
                <span class='logo cl-theme'>N</span>
                <span class='logo cl-theme'>G</span>
              </div>
            </li>
            <div class="ht-dialog slide">
              <transition name='in-left'>
                <form class='pd-xl-h wd-dialog' v-show='curView==="username"'>
                  <li>
                    <div class="fs-xl">登录</div>
                  </li>
                  <li>
                    <div>权限管理系统</div>
                  </li>
                  <li>
                    <span class='hint cl-theme wd-xl'>使用EIP登录</span>
                  </li>
                  <li>
                    <input type="text" id='name-input' placeholder="EIP账号/员工号/邮箱" autocomplete="true" autosave="true" class="wd-max radius-m cl-prim" v-model='username' @keydown.enter='enter'>
                  </li>
                  <li class='button'>
                    <button class='blink-wave' @click='$router.push("/")'>首页</button>
                    <div></div>
                    <button class='blink-wave sd-theme' @click.stop.prevent='next'>下一步</button>
                  </li>
                </form>
              </transition>
              <transition name='in-left'>
                <form class='pd-xl-h wd-dialog' v-show='curView==="password"'>
                  <li>
                    <div class="fs-xl">{{ name }}</div>
                  </li>
                  <li>
                    <label class="cl-theme">
                      <icon name='user-circle'></icon>
                    </label>
                    <div class="pd-m-h">{{ nameTxt }}</div>
                  </li>
                  <li>
                    <span class='hint cl-theme fs-s'>输入您的密码</span>
                  </li>
                  <li>
                    <input type="password" placeholder="EIP密码" id='pwd-input' autocomplete="true" autosave="true" class="wd-max cl-prim" v-model='password' @keydown.enter='enter'>
                  </li>
                  <li class='button'>
                    <button @click='previous' class='blink-wave'>上一步</button>
                    <div></div>
                    <button class='blink-wave sd-theme sd-card' @click.stop.prevent='login'>下一步</button>
                  </li>
                </form>
              </transition>
            </div>
          </div>
        </section>
      </content>
    </article>
  </main>
</template>
<style scoped>
section div {
  box-sizing: border-box;
  overflow: hidden;
}

.slide {
  width: calc(var(--wd-dialog) * 2);
}

.slide form {
  float: left;
}

article {
  background: url(/static/img/bgImg.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
}

article>content {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}

.button {
  margin-top: 0.56rem;
}

.button button {
  flex-basis: 0.8rem;
}

.sd-theme {
  transition: 0.6s ease;
}

.sd-theme:hover {
  box-shadow: 0 1px 3px #bdbdbd;
}

.logo-outer {
  font-weight: 800;
  font-family: Helvetica;
  cursor: pointer;
}

</style>
<script>
import Vue from "vue";
export default {
  name: "login",
  data() {
    return {
      isSuper: false,
      curView: "username",
      username: "",
      password: "",
      token: {},
      show: false
    };
  },
  methods: {
    previous() {
      this.curView = "username";
      document.getElementById("name-input").focus();
    },
    next() {
      this.curView = "password";
      document.getElementById("pwd-input").focus();
    },
    storeUserInfo(user) {
      user.headurl = user.headurl ? user.headurl : "/api/files/image/headurl.png"

      // 将token 和 uid 存到localstorage
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("token", user.token);

      // 将用户信息存到 全局 store 中
      console.log(user)
      this.$store.commit("setUid", user.uid);
      this.$store.commit("setToken", user.token);
      this.$store.commit("setHeadurl", user.headurl);
      this.$store.commit("setIsadmin", user.isadmin);
      this.$store.commit("setPtpreset", user.ptpreset);

      Vue.http.options.headers = {
        token: user.token
      };

      this.$router.push({
        path: "/projects",
        query: {
          cur: this.$route.query.cur
        }
      });
    },
    login() {
      this.$http
        .post("/api/staff/login", {
          uid: this.username,
          password: this.password
        })
        .then(res => {
          if (res.body.code != 0) {
            return this.$store.commit("toast", "用户名或密码错误");
          }
          this.$store.commit("toast", "登录成功");
          var user = res.body.user;
          user.token = res.body.data;
          this.storeUserInfo(user)

        });
    },
    enter() {
      if (this.curView == "username" && this.username) {
        this.next();
      } else if (this.password) {
        this.login();
      }
    }
  },
  mounted() {
    var token = localStorage.getItem("token");
    var uid = localStorage.getItem("uid");

    if (uid && token) {
      this.$http
        .post("/api/staff/findOne", {
          condition: uid
        })
        .then(res => {
          var user = res.body
          user.token = token
          this.storeUserInfo(user)
        });
    } else {
      document.getElementById("name-input").focus();
    }
    this.show = true;
  },
  computed: {
    name() {
      return this.isSuper ? "超级管理员" : "管理员";
    },
    nameTxt() {
      return this.isSuper ? "Admin_YT" : this.username;
    }
  }
};

</script>
