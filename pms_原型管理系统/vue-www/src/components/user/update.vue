<template>
  <main>
    <transition name='slide'>
      <article v-show='seen'>
        <header class="shadow-m">
          <section type='single'>
            <li class="ht-l">
              <button class="ht-l wd-l" @click='back'>
                <icon name="chevron-down"></icon>
              </button>
              <h1>用户详情</h1>
              <button v-if='auth' class='cl-alert ht-l wd-l' @click='confirmDel'>
                <icon name='trash'></icon>
              </button>
            </li>
          </section>
        </header>
        <content>
          <section type='single'>
            <ol class="mg-m sd-card radius-m">
              <div>
                <div class="clip mg-m-v mg-auto wd-xl landscape radius-l">
                  <img :src='headurl'>
                </div>
              </div>
              <div class="pd-m">
                <li>
                  <span class="wd-xl">姓名</span>
                  <div>
                    <icon class="cl-hint" name='user'></icon>
                    <span class="pd-m-h">{{name}}</span>
                  </div>
                </li>
                <li>
                  <span class="wd-xl">电话</span>
                  <div>
                    <icon class="cl-hint" name='phone'></icon>
                    <span class="pd-m-h">{{mobile}}</span>
                  </div>
                </li>
                <li>
                  <span class="wd-xl">手机</span>
                  <div>
                    <icon class="cl-hint" name='tablet'></icon>
                    <span class="pd-m-h">{{mobile}}</span>
                  </div>
                </li>
                <li>
                  <span class="wd-xl">UID</span>
                  <div>
                    <icon class="cl-hint" name='tag'></icon>
                    <span class="pd-m-h">{{uid}}</span>
                  </div>
                </li>
                <li>
                  <span class="wd-xl">职位</span>
                  <div>
                    <icon class="cl-hint" name='id-card'></icon>
                    <span class="pd-m-h">{{positionName}}</span>
                  </div>
                </li>
                <li>
                  <span class="wd-xl">邮箱</span>
                  <div>
                    <icon class="cl-hint" name='envelope'></icon>
                    <span class="pd-m-h">{{email}}</span>
                  </div>
                </li>
              </div>
            </ol>
            <ol class="mg-m pd-m-h sd-card" v-if='auth'>
              <li class="ht-l">
                <span class='wd-l'>管理员</span>
                <div class="align-r">
                  <span class="pd-m-h">{{isadmin?"是":"否"}}</span>
                  <label class="pointer" @click='save'>
                    <icon scale='1.6' class="cl-theme" v-if="isadmin" name='toggle-on'></icon>
                    <icon scale='1.6' class="cl-pre" v-else name='toggle-off'></icon>
                  </label>
                </div>
              </li>
            </ol>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
    export default {
        data() {
            return {
                seen: false,
                uid: this.$route.query.uid,
                headurl: "/api/files/image/headurl.png",
                mobile: "暂无",
                name: "暂无",
                innerphone: "暂无",
                email: "暂无",
                positionName: "暂无",
                isadmin: false,
            };
        },
        methods: {
            back() {
                this.$router.back();
            },
            save() {
                this.isadmin = !this.isadmin;
                this.$http
                    .post("/api/staff/update", {
                        data: {
                            uid: this.uid,
                            isadmin: this.isadmin
                        }
                    })
                    .then(res => {
                        if (res.body.code !== 0) return;
                        this.$store.commit("toast", "人员信息已修改");
                        this.init();
                    });
            },
            init() {

                this.$http
                    .post("/api/staff/findOne", {
                        uid: this.uid
                    })
                    .then(res => {
                        if (!res.body) return;
                        var user = res.body.data;
                        this.email = user.mail;
                        this.mobile = user.mobile;
                        this.innerphone = user.number;
                        this.name = user.name;
                        this.signature = user.signature;
                        this.positionName = user.position;
                        this.isadmin = user.isadmin ? true : false;
                        if (user.headurl) {
                            this.headurl = user.headurl;
                        }
                    });
            },
            del(res) {
                this.$http
                    .post("/api/staff/remove", {
                        uid: this.uid
                    })
                    .then(res => {
                        if (res.body.code !== 0) return;
                        this.$store.commit("toast", "用户已删除");
                        this.$router.back();
                    });
            },
            confirmDel() {
                this.$store.commit("setConfirm", {
                    seen: true,
                    msg: "确认删除？",
                    out: res => {
                        this.del();
                    }
                });
            }
        },
        computed: {
            auth() {
                return this.$store.state.isadmin
            }
        },
        mounted() {
            this.seen = true;
            this.uid = this.$route.query.uid;
            this.init();
        }
    };
</script>