<template>
  <div id='app' @click='blur'>
    <transition name='in-top'>
      <router-view></router-view>
    </transition>
    <toast>
      <p>用this.$store.commit('toast',msg)</p>
    </toast>
    <pt-preset v-show="showPanel"></pt-preset>
    <confirm-dlg></confirm-dlg>
  </div>
</template>
<script>
    import Ptpreset from "@/components/_common/ptpreset/ptpreset";
    import store from "@/store";
    export default {
        store,
        name: "app",
        data() {
            return {
                showPanel: false
            };
        },
        mounted() {
            var token = localStorage.getItem("token");
            var uid = localStorage.getItem("uid");
            if (uid !== "undifined" && uid && token) {
                this.$http
                    .post("/api/staff/findOne", {
                        uid
                    })
                    .then(res => {
                        var user = res.body.data;
                        user.token = token
                        this.storeUserInfo(user)
                    });
            }
        },
        methods: {
            blur(ev) {
                var tag = ev.target.tagName;
                if (tag == "INPUT" || tag == "TEXTAREA") return;
                document.activeElement.blur();
            },
            storeUserInfo(user) {
                user.headurl = user.headurl ? user.headurl : "/api/files/image/headurl.png"
                sessionStorage.token = user.token

                // 将用户信息存到 全局 store 中
                this.$store.commit("setUid", user.uid);
                this.$store.commit("setToken", user.token);
                this.$store.commit("setHeadurl", user.headurl);
                this.$store.commit("setIsadmin", user.isadmin);
                this.$store.commit("setPtpreset", user.ptpreset);
            },
        },
        components: {
            "pt-preset": Ptpreset
        }
    };
</script>
<style>
    #app {
        height: 100%;
    }
</style>