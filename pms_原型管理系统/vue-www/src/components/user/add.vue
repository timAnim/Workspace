<template>
  <flyout :seen='seen' :title='"添加用户"' @out='out' ref='outer'>
    <dl slot='content' class="pd-m">
      <li>
        <search-bar :placeholder="'搜索员工号'" @clear='clear' @search='search'></search-bar>
      </li>
      <div class="clip wd-l radius-l mg-auto mg-m-v">
        <img :src="headurl||'/api/files/image/headurl.png'">
      </div>
        <ol class="pd-m">
          <li>
            <span class="wd-l">姓名</span>
            <div>
              <icon class="cl-hint" name='user'></icon>
              <span class="pd-m-h">{{name}}</span>
            </div>
          </li>
          <li>
            <span class="wd-l">电话</span>
            <div>
              <icon class="cl-hint" name='phone'></icon>
              <span class="pd-m-h">{{innerphone}}</span>
            </div>
          </li>
          <li>
            <span class="wd-l">手机</span>
            <div>
              <icon class="cl-hint" name='tablet'></icon>
              <span class="pd-m-h">{{mobile}}</span>
            </div>
          </li>
          <li>
            <span class="wd-l">UID</span>
            <div>
              <icon class="cl-hint" name='tag'></icon>
              <span class="pd-m-h">{{uid}}</span>
            </div>
          </li>
          <li>
            <span class="wd-l">职位</span>
            <div>
              <icon class="cl-hint" name='id-card'></icon>
              <span class="pd-m-h">{{positionName}}</span>
            </div>
          </li>
          <li>
            <span class="wd-l">邮箱</span>
            <div>
              <icon class="cl-hint" name='envelope'></icon>
              <span class="pd-m-h">{{email}}</span>
            </div>
          </li>
        </ol>
    </dl>
  </flyout>
</template>
<script>
import searchBar from "@/components/_common/search-bar";
export default {
  data() {
    return {
      seen: false,
      name: "",
      innerphone: "",
      mobile: "",
      uid: "",
      positionName: "",
      email: "",
      headurl: "",
      website: "",
      isadmin: false
    };
  },
  methods: {
    save() {
      this.$http
        .post("/api/staff/insert", {
          data: {
            name: this.name,
            innerphone: this.innerphone,
            mobile: this.mobile,
            uid: this.uid,
            positionName: this.positionName,
            email: this.email,
            isadmin: this.isadmin,
            headurl: this.headurl,
          }
        })
        .then(res => {
          this.seen = false;
          if (res.body.code !== 0) return;
          this.$store.commit("toast", "信息已保存");
          this.$emit("modify");
        });
    },
    out(res) {
      this.seen = false;
      if (res) this.save();
    },
    search(condition) {
      this.$http
        .post("/api/ldap/user/findOne", {
          condition: condition
        })
        .then(res => {
          if (!res.body) {
            return this.$store.commit("toast", "查无此人");
          }
          var r = res.body;
          this.name = r.name;
          this.innerphone = r.innerphone;
          this.mobile = r.mobile;
          this.uid = r.uid;
          this.headurl = r.headurl;
          this.positionName = r.positionName;
          this.email = r.email;
          this.isadmin = r.isadmin ? true : false;
        });
    },
    clear() {
      this.name = "";
      this.innerphone = "";
      this.mobile = "";
      this.uid = "";
      this.headurl = "";
      this.positionName = "";
      this.email = "";
      this.isadmin = "";
    }
  },
  components: {
    "search-bar": searchBar
  }
};

</script>
