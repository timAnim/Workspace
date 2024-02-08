
<style scoped>
.head {
  z-index: 999;
  transition: all 0.5s ease;
  position: fixed;
  font-size: 16px;
}

.cover {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
  background-image: url(/static/img/start/banner_bg.jpg);
  background-color: white;
}

.imgholder {
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: bottom;
  background-attachment: fixed;
}

.fs-xl {
  line-height: 120px;
  height: 80px;
  font-weight: bolder;
  color: #212121;
  font-size: var(--fs-xl);
}

.list-anim > * {
  transform: translate(0, 100px);
  transition: all 0.2s ease;
  display: inline-block;
  opacity: 0;
}

.list-anim-play > span {
  transform: translate(0, 0);
  opacity: 0.5;
}
content {
  padding: 0 !important;
}
</style>
<template>
<transition name='opacity'>
  <content class='scroll-y ht-max align-c bg-back'>
    <div>
      <div class="wd-max head">
        <section>
          <li class="ht-l">
            <img src="/static/img/start/logo.png" class="mg-m-h">
            <span class="ht-l wd-l pointer" @click='hrefTo("back")'>首页</span>
            <span class="ht-l wd-l mg-m-h sd-theme pointer">关于</span>
            <a class="ht-l wd-l pointer" @click='hrefTo("back")'>下载</a>
          </li>
        </section>
      </div>
      <div class="cover">
        <section>
          <div style="height: calc(100vh - 80px);">
            <li style="height: 30vh">
              <div>
                <div class="ht-l"></div>
                <div class="cl-front" style="font-weight: bolder; font-size: 48px; line-height: 88px;">轻松 可靠 智能的即时通讯工具</div>
                <div class="cl-front">宇信通 PC版 V2.9 | 宇信通 Android版 V1.2.2 | 宇信通 IOS版 V1.2.2</div>
              </div>
            </li>
            <li style="height:calc(100vh - 200px)">
              <div>
                <img src="/static/img/start/banner-pc.png">
              </div>
              <div class="wd-dialog">
                <img class="mg-s-h" src="/static/img/start/windows-normal.jpg">
                <img class="mg-s-h" src="/static/img/start/android-normal.jpg">
                <img class="mg-s-h" src="/static/img/start/iphone-normal.jpg">
              </div>
            </li>
          </div>
        </section>
        <div class="sd-card" style="height: 200px;">
          <div class="fs-xl">宇信通</div>
          <div class="fs-l">轻松 可靠 智能的即时通讯工具</div>
        </div>
      </div>

      <div v-for='(page,i) in pages' :key='i'>
        <div class="imgholder"
                style="height: calc(100vh - var(--ht-dialog))"
                 :style="{
                  backgroundImage: `url(${page.img})`,
                  backgroundPositionY: `var(--page-${i + 1})`
              }"></div>
        <div class="sd-card ht-dialog">
          <section>
            <li class="ht-dialog">
              <div>
                <img :src="page.imgAlt">
              </div>
              <div class="cl-sec">
                <div class="fs-xl">{{ page.th }}</div>
                <div class="fs-l">{{ page.des }}</div>
                <div class="list-anim">
                  <span v-for="(img,j) in page.funcs" :style="{transitionDelay: j*0.1 + 's'}" :key='j'>
                    <img :src="img" class="mg-m ht-l">
                  </span>
                </div>
              </div>
            </li>
          </section>
        </div>
      </div>

      <footer class="sd-dark">
        <section>
          <li class="ht-panel pd-xl">
            <div>
              <div>Copyright @ 1998-2018 All Rights Reserved</div>
              <div>宇通移动云团队为您服务 客服电话: 95603</div>
            </div>
            <div class="wd-fix">
              <div>
                <img src="/static/img/start/android.jpg">
              </div>
              <button class="sd-theme wd-xl">下载</button>
            </div>
            <div class="wd-fix mg-m-h">
              <div>
                <img src="/static/img/start/android.jpg">
              </div>
              <button class="sd-theme wd-xl">下载</button>
            </div>
          </li>

        </section>
      </footer>
    </div>
  </content>
</transition>
</template>
<script>
export default {
  data() {
    return {
      dTop: 0,
      lastTop: 0,
      pages: [
        {
          dy: 104,
          th: "自研的即时通讯技术",
          des: "更安全·更高效",
          img: "/static/img/start/list1-pc.png",
          imgAlt: "/static/img/start/list1-phone.png",
          funcs: [
            "/static/img/start/user-circle.svg",
            "/static/img/start/user-circle.svg",
            "/static/img/start/user-circle.svg"
          ]
        },
        {
          dy: 104,
          th: "服务号助手",
          des: "服务客户·服务员工·分享工作·展示风采",
          img: "/static/img/start/list2-pc.png",
          imgAlt: "/static/img/start/list2-phone.png",
          funcs: [
            "/static/img/start/user-circle.svg",
            "/static/img/start/user-circle.svg",
            "/static/img/start/user-circle.svg"
          ]
        },
        {
          dy: 104,
          th: "丰富的办公应用",
          des: "集万千功能与一身 邮件·流程跨平台同步",
          img: "/static/img/start/list3-pc.png",
          imgAlt: "/static/img/start/list3-phone.png",
          funcs: []
        }
      ]
    };
  },
  mounted() {
    this.$el.addEventListener("scroll", this.scrollHdl, false);
  },
  methods: {
    hrefTo(url) {
      this.$router.push(url);
    },
    scrollHdl(e) {
      var top = this.$el.scrollTop,
        _h = top - innerHeight, //_h是滚动的绝对距离, 和首屏高度无关
        pageH = 1000, //单页绝对高度 400(img) + 360(txt)
        head = document.querySelector(".head"),
        anim = document.querySelectorAll(".list-anim");
      this.dTop = top - this.lastTop;
      this.lastTop = top;
      if (top === 0) {
        head.style.opacity = 1;
        head.classList.remove("sd-card");
      } else if (_h >= 120 - innerHeight && _h < 120) {
        head.style.opacity = 0;
        head.classList.add("sd-card");
        anim[0].classList.remove("list-anim-play");
        this.pages[0].dy -= this.dTop * 0.15;
        this.pages[0].dy = this.pages[0].dy > 104 ? 104 : this.pages[0].dy;
        document.body.style.setProperty("--page-1", this.pages[0].dy + "px");
      } else if (_h >= 120 && _h < pageH) {
        head.style.opacity = 1;
        head.classList.add("sd-card");
        anim[0].classList.add("list-anim-play");
        anim[1].classList.remove("list-anim-play");
        this.pages[0].dy = 0;
        this.pages[1].dy -= this.dTop * 0.15;
        this.pages[1].dy = this.pages[1].dy > 104 ? 104 : this.pages[1].dy;
        document.body.style.setProperty("--page-2", this.pages[1].dy + "px");
      } else if (top >= pageH && _h < 2 * pageH) {
        head.style.opacity = 1;
        head.classList.add("sd-card");
        anim[1].classList.add("list-anim-play");
        anim[0].classList.remove("list-anim-play");
        this.pages[1].dy = 0;
        this.pages[2].dy -= this.dTop * 0.15;
        this.pages[2].dy = this.pages[2].dy > 104 ? 104 : this.pages[2].dy;
        document.body.style.setProperty("--page-3", this.pages[2].dy + "px");
      } else if (_h >= 2 * pageH) {
        anim[1].classList.remove("list-anim-play");
        this.pages[2].dy = 0;
      }
    }
  }
};
</script>

