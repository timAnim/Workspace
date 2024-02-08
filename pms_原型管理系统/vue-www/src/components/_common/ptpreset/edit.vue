<template>
  <article class="float-ne ht-max wd-dialog shadow-l bg-front" @click.stop>
    <header>
      <li class="pd-s-v">
        <div></div>
        <span class="ht-s pd-l-h sd-cut sd-theme pointer">当前</span>
        <span class="ht-s pd-l-h sd-cut pointer" @click='$emit("nav","explore")'>探索</span>
        <span class="ht-s pd-l-h sd-cut pointer" @click='$emit("nav","mylist")' v-if='logined'>我的</span>
        <div></div>
      </li>
      <li>
        <input-text
          class="mg-m-h sd-cut"
          :icon = '"pencil"'
          v-model='config.title'>
        </input-text>
      </li>
      <nav>
        <span @click='paraCur="palette"' :checked='paraCur==="palette"'>配色</span>
        <span @click='paraCur="greyscale"' :checked='paraCur==="greyscale"'>灰阶</span>
        <span @click='paraCur="size"' :checked='paraCur==="size"'>尺寸</span>
        <span @click='paraCur="border"' :checked='paraCur==="border"'>边框</span>
        <span @click='paraCur="font"' :checked='paraCur==="font"'>其他</span>
      </nav>
    </header>
    <keep-alive>
      <content class="pd-s-h">
        <ol v-if='paraCur==="palette"'>
          <div class="pd-m-v">
            <h2>主题色一</h2>
            <li>
              <span class="wd-xl">
                较浅
                <span class="cl-hint fs-xs align-r">{{cl_theme_light}}</span>
              </span>
              <input type="color" v-model='cl_theme_light'>
            </li>
            <li>
              <span class="wd-xl">
                标准
                <span class="cl-hint fs-xs align-r">{{cl_theme}}</span>
              </span>
              <input type="color" v-model='cl_theme'>
            </li>
            <li>
              <span class="wd-xl">
                较深
                <span class="cl-hint fs-xs align-r">{{cl_theme_dark}}</span>
              </span>
              <input type="color" v-model='cl_theme_dark'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>主题色二</h2>
            <li>
              <span class="wd-xl">
                较浅
                <span class="cl-hint fs-xs align-r">{{cl_theme_sec_light}}</span>
              </span>
              <input type="color" v-model='cl_theme_sec_light'>
            </li>
            <li>
              <span class="wd-xl">
                标准
                <span class="cl-hint fs-xs align-r">{{cl_theme_sec}}</span>
              </span>
              <input type="color" v-model='cl_theme_sec'>
            </li>
            <li>
              <span class="wd-xl">
                较深
                <span class="cl-hint fs-xs align-r">{{cl_theme_sec_dark}}</span>
              </span>
              <input type="color" v-model='cl_theme_sec_dark'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>告警色</h2>
            <li>
              <span class="wd-xl">
                较浅
                <span class="cl-hint fs-xs align-r">{{cl_alert_light}}</span>
              </span>
              <input type="color" v-model='cl_alert_light'>
            </li>
            <li>
              <span class="wd-xl">
                标准
                <span class="cl-hint fs-xs align-r">{{cl_alert}}</span>
              </span>
              <input type="color" v-model='cl_alert'>
            </li>
            <li>
              <span class="wd-xl">
                较深
                <span class="cl-hint fs-xs align-r">{{cl_alert_dark}}</span>
              </span>
              <input type="color" v-model='cl_alert_dark'>
            </li>
          </div>
        </ol>
        <ol v-if='paraCur==="greyscale"'>
          <div class="pd-m-v">
            <h2>灰阶</h2>
            <li>
              <span class="wd-xl">
                前景填充
                <span class="cl-hint fs-xs align-r">{{cl_front}}</span>
              </span>
              <input type="color" v-model='cl_front'>
            </li>
            <li>
              <span class="wd-xl">
                背景填充
                <span class="cl-hint fs-xs align-r">{{cl_back}}</span>
              </span>
              <input type="color"  v-model='cl_back'>
            </li>
            <li>
              <span class="wd-xl">
                高亮填充
                <span class="cl-hint fs-xs align-r">{{cl_light}}</span>
              </span>
              <input type="color" v-model='cl_light'>
            </li>
            <li>
              <span class="wd-xl">
                暗示文本
                <span class="cl-hint fs-xs align-r">{{cl_hint}}</span>
              </span>
              <input type="color" v-model='cl_hint'>
            </li>
            <li>
              <span class="wd-xl">
                首要文本
                <span class="cl-hint fs-xs align-r">{{cl_prim}}</span>
              </span>
              <input type="color" v-model='cl_prim'>
            </li>
            <li>
              <span class="wd-xl">
                次要文本
                <span class="cl-hint fs-xs align-r">{{cl_sec}}</span>
              </span>
              <input type="color" v-model='cl_sec'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>灰阶反色</h2>
            <li>
              <span class="wd-xl">
                前景填充
                <span class="cl-hint fs-xs align-r">{{cl_front_i}}</span>
              </span>
              <input type="color" v-model='cl_front_i'>
            </li>
            <li>
              <span class="wd-xl">
                背景填充
                <span class="cl-hint fs-xs align-r">{{cl_back_i}}</span>
              </span>
              <input type="color" v-model='cl_back_i'>
            </li>
            <li>
              <span class="wd-xl">
                高亮填充
                <span class="cl-hint fs-xs align-r">{{cl_light_i}}</span>
              </span>
              <input type="color" v-model='cl_light_i'>
            </li>
            <li>
              <span class="wd-xl">
                暗示文本
                <span class="cl-hint fs-xs align-r">{{cl_hint_i}}</span>
              </span>
              <input type="color" v-model='cl_hint_i'>
            </li>
            <li>
              <span class="wd-xl">
                首要文字
                <span class="cl-hint fs-xs align-r">{{cl_prim_i}}</span>
              </span>
              <input type="color" v-model='cl_prim_i'>
            </li>
            <li>
              <span class="wd-xl">
                次要文字
                <span class="cl-hint fs-xs align-r">{{cl_sec_i}}</span>
              </span>
              <input type="color" v-model='cl_sec_i'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>遮罩</h2>
            <li>
              <span class="wd-xl">
                颜色
                <span class="cl-hint fs-xs align-r">{{cl_mask_color}}</span>
              </span>
              <input type="color" v-model='cl_mask_color'>
            </li>
            <li>
              <span class="wd-xl">透明度</span>
              <span class="wd-l cl-hint">{{cl_mask_opacity}}</span>
              <input type="range" min='0' max='1' step="0.05"  v-model='cl_mask_opacity'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>遮罩反色</h2>
            <li>
              <span class="wd-xl">
                颜色
                <span class="cl-hint fs-xs align-r">{{cl_sec_i}}</span>
              </span>
              <input type="color" v-model='cl_mask_i_color'>
            </li>
            <li>
              <span class="wd-xl">透明度</span>
              <span class="wd-l cl-hint">{{cl_mask_i_opacity}}</span>
              <input type="range" min='0' max='1' step="0.05"  v-model='cl_mask_i_opacity'>
            </li>
          </div>
        </ol>
        <ol v-if="paraCur==='size'">
          <div class="pd-m-v">
            <h2>间隙</h2>
            <li>
              <span class="wd-xl">极窄</span>
              <span class="wd-l cl-hint">{{pd_xs}}</span>
              <input type="range" min='2' max='16' step="1"  v-model='pd_xs'>
            </li>
            <li>
              <span class="wd-xl">较窄</span>
              <span class="wd-l cl-hint">{{pd_s}}</span>
              <input type="range" min='8' max='24' step="1"  v-model='pd_s'>
            </li>
            <li>
              <span class="wd-xl">标准</span>
              <span class="wd-l cl-hint">{{pd_m}}</span>
              <input type="range" min='12' max='32' step="2" v-model='pd_m'>
            </li>
            <li>
              <span class="wd-xl">较宽</span>
              <span class="wd-l cl-hint">{{pd_l}}</span>
              <input type="range" min='24' max='56' step="2" v-model='pd_l'>
            </li>
            <li>
              <span class="wd-xl">极宽</span>
              <span class="wd-l cl-hint">{{pd_xl}}</span>
              <input type="range" min='32' max='80' step="2" v-model='pd_xl'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>行高</h2>
            <li>
              <span class="wd-xl">极矮</span>
              <span class="wd-l cl-hint">{{ht_xs}}</span>
              <input type="range" max='40' min='24' step="1"  v-model='ht_xs'>
            </li>
            <li>
              <span class="wd-xl">较矮</span>
              <span class="wd-l cl-hint">{{ht_s}}</span>
              <input type="range" max='40' min='24' step="1"  v-model='ht_s'>
            </li>
            <li>
              <span class="wd-xl">标准</span>
              <span class="wd-l cl-hint">{{ht_m}}</span>
              <input type="range" max='56' min='32' step="1"  v-model='ht_m'>
            </li>
            <li>
              <span class="wd-xl">较高</span>
              <span class="wd-l cl-hint">{{ht_l}}</span>
              <input type="range" max='80' min='48' step="2" v-model='ht_l'>
            </li>
            <li>
              <span class="wd-xl">极高</span>
              <span class="wd-l cl-hint">{{ht_xl}}</span>
              <input type="range" min='32' max='80' step="1" v-model='ht_xl'>
            </li>
            <li>
              <span class="wd-xl">面板</span>
              <span class="wd-l cl-hint">{{ht_panel}}</span>
              <input type="range" max='320' min='160' step="8" v-model='ht_panel'>
            </li>
            <li>
              <span class="wd-xl">窗体</span>
              <span class="wd-l cl-hint">{{ht_dialog}}</span>
              <input type="range" max='480' min='320' step="8" v-model='ht_dialog'>
            </li>
             <li>
              <span class="wd-xl">页面</span>
              <span class="wd-l cl-hint">{{ht_page}}</span>
              <input type="range" max='1280' min='720' step="20" v-model='ht_page'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>宽度</h2>
            <li>
              <span class="wd-xl">极窄</span>
              <span class="wd-l cl-hint">{{wd_xs}}</span>
              <input type="range"  min='16' max='32' step="2"  v-model='wd_xs'>
            </li>
            <li>
              <span class="wd-xl">较窄</span>
              <span class="wd-l cl-hint">{{wd_s}}</span>
              <input type="range" max='40' min='24' step="2"  v-model='wd_s'>
            </li>
            <li>
              <span class="wd-xl">标准</span>
              <span class="wd-l cl-hint">{{wd_m}}</span>
              <input type="range" max='56' min='32' step="2"  v-model='wd_m'>
            </li>
            <li>
              <span class="wd-xl">较宽</span>
              <span class="wd-l cl-hint">{{wd_l}}</span>
              <input type="range" max='80' min='48' step="4" v-model='wd_l'>
            </li>
            <li>
              <span class="wd-xl">极宽</span>
              <span class="wd-l cl-hint">{{wd_xl}}</span>
              <input type="range" max='200' min='80' step="2" v-model='wd_xl'>
            </li>
            <li>
              <span class="wd-xl">面板</span>
              <span class="wd-l cl-hint">{{wd_panel}}</span>
              <input type="range" max='320' min='160' step="2" v-model='wd_panel'>
            </li>
            <li>
              <span class="wd-xl">窗体</span>
              <span class="wd-l cl-hint">{{wd_dialog}}</span>
              <input type="range" max='480' min='320' step="2" v-model='wd_dialog'>
            </li>
             <li>
              <span class="wd-xl">页面</span>
              <span class="wd-l cl-hint">{{wd_page}}</span>
              <input type="range" max='1280' min='720' step="4" v-model='wd_page'>
            </li>
          </div>
        </ol>
        <ol v-if="paraCur==='border'">
          <div class="pd-m-v">
            <h2>描边</h2>
            <li>
              <span class="wd-xl">边框色</span>
              <input type="color"  v-model='border_color'>
            </li>
            <li>
              <span class="wd-xl">边框样式</span>
              <select class="wd-auto ht-s pd-s-h sd-cut"  v-model='border_style'>
                <option value="solid">实线</option>
                <option value="double">双线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">圆点</option>
                <option value="none">无</option>
              </select>
            </li>
            <li>
              <span class="wd-xl">边框宽度</span>
              <span class="wd-l cl-hint">{{border_width}}</span>
              <input type="range" max='16' min='1' step="1" v-model='border_width'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>描边反色</h2>
            <li>
              <span class="wd-xl">边框色</span>
              <input type="color"  v-model='border_color_i'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>阴影适中</h2>
            <li>
              <span class="wd-xl">偏移</span>
              <span class="wd-l cl-hint">{{shadow_offset_m}}</span>
              <input type="range" min='1' max='20' step="1" v-model='shadow_offset_m'>
            </li>
            <li>
              <span class="wd-xl">大小</span>
              <span class="wd-l cl-hint">{{shadow_distance_m}}</span>
              <input type="range" min='1' max='8' step="1" v-model='shadow_distance_m'>
            </li>
            <li>
              <span class="wd-xl">透明度</span>
              <span class="wd-l cl-hint">{{shadow_opacity_m}}</span>
              <input type="range" min='0' max='1' step="0.05"  v-model='shadow_opacity_m'>
            </li>
            <li>
              <span class="wd-xl">颜色</span>
              <input type="color"  v-model='shadow_color_m'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>较大阴影</h2>
            <li>
              <span class="wd-xl">偏移</span>
              <span class="wd-l cl-hint">{{shadow_offset_l}}</span>
              <input type="range" min='1' max='20' step="1" v-model='shadow_offset_l'>
            </li>
            <li>
              <span class="wd-xl">大小</span>
              <span class="wd-l cl-hint">{{shadow_distance_l}}</span>
              <input type="range" min='8' max='20' step="1" v-model='shadow_distance_l'>
            </li>
            <li>
              <span class="wd-xl">透明度</span>
              <span class="wd-l cl-hint">{{shadow_opacity_l}}</span>
              <input type="range" min='0' max='1' step="0.05"  v-model='shadow_opacity_l'>
            </li>
            <li>
              <span class="wd-xl">颜色</span>
              <input type="color"  v-model='shadow_color_l'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>圆角</h2>
            <li>
              <span class="wd-xl">较小</span>
              <span class="wd-l cl-hint">{{radius_s}}</span>
              <input type="range" min='0' max='16' step="1" v-model='radius_s'>
            </li>
            <li>
              <span class="wd-xl">标准</span>
              <span class="wd-l cl-hint">{{radius_m}}</span>
              <input type="range" min='2' max='32' step="1" v-model='radius_m'>
            </li>
            <li>
              <span class="wd-xl">较大</span>
              <span class="wd-l cl-hint">{{radius_l}}</span>
              <input type="range" min='4' max='56' step="4" v-model='radius_l'>
            </li>
          </div>
        </ol>
        <ol v-if="paraCur==='font'">
          <div class="pd-m-v">
            <h2>文字大小</h2>
            <li>
              <span class="wd-xl">极小</span>
              <input class="wd-m" v-model='fs_xs' disabled/>
              <input type="range" max='11' min='7' step="1" v-model='fs_xs'>
            </li>
            <li>
              <span class="wd-xl">较小</span>
              <input class="wd-m" v-model='fs_s' disabled/>
              <input type="range" min='8' max='14' step="1" v-model='fs_s'>
            </li>
            <li>
              <span class="wd-xl">标准</span>
              <input class="wd-m" v-model='fs_m' disabled/>
              <input type="range" max='16' min='10' step="1"  v-model='fs_m'>
            </li>
            <li>
              <span class="wd-xl">较大</span>
              <input class="wd-m"  v-model='fs_l' disabled/>
              <input type="range" max='24' min='14' step="1"  v-model='fs_l'>
            </li>
            <li>
              <span class="wd-xl">特大</span>
              <input class="wd-m"  v-model='fs_xl' disabled/>
              <input type="range" max='40' min='18' step="1"  v-model='fs_xl'>
            </li>
          </div>
          <div class="pd-m-v">
            <h2>动画时长</h2>
            <li>
              <span class="wd-xl">极小</span>
              <input class="wd-m" v-model='presto' disabled/>
              <input type="range" min='25' max='150' step="25" v-model='presto'>
            </li>
            <li>
              <span class="wd-xl">较小</span>
              <input class="wd-m" v-model='vivo' disabled/>
              <input type="range" min='100' max='400' step="25" v-model='vivo'>
            </li>
            <li>
              <span class="wd-xl">缓慢</span>
              <input class="wd-m" v-model='largo' disabled/>
              <input type="range" min='400' max='1600' step="25"  v-model='largo'>
            </li>
          </div>
        </ol>
      </content>
    </keep-alive>
    <footer>
      <li class="bg-light ht-l">
        <button class="pd-m-h mg-m-h sd-cut" @click='close'>关闭</button>
        <div></div>
        <button class='sd-cut pd-m-h ' @click='reset'>重置</button>
        <button class="sd-theme mg-m-h pd-m-h " @click='save'>发布</button>
      </li>
    </footer>
  </article>
</template>

<script>
import computed from "./computed/computed.js";
export default {
  props: ["ptpreset"],
  data() {
    return {
      dfState: "on",
      paraCur: "palette",
      panel: "cur",
      show: true,
      config: JSON.parse(JSON.stringify(this.ptpreset)),
      pkgs: [],
      logined: localStorage.getItem("token") ? true : false
    };
  },
  methods: {
    setStyle(para, val) {
      document.body.style.setProperty(para, val);
      this.$set(this.config, para, val);
    },
    useStyle(pt) {
      for (var para in pt) {
        this.setStyle(para, pt[para]);
      }
    },
    reset() {
      this.useStyle(JSON.parse(JSON.stringify(this.ptpreset)));
    },
    save() {
      if (!this.logined) {
        return this.$store.commit("toast", "请先登录");
      }
      this.$http
        .post("/api/ptpreset/upsert", {
          data: this.config
        })
        .then(res => {
          if (res.body.code == 0) {
            this.$store.commit("toast", res.body.msg);
            if (res.body.data.upserted) {
              // 添加
              this.$emit("save", res.body.data.upserted[0]._id);
            } else if (res.body.data.nModified) {
              // 修改
              this.$emit("save", this.config._id);
            }
          }
        });
    },
    close() {
      this.$emit("close");
    },
    init() {
      console.log("edit");
    }
  },
  computed,
  watch: {
    ptpreset(val) {
      // 此处监听父组件 的变化, 外部更新, 此面板更新
      if (typeof val != "object") return false;
      this.config = JSON.parse(JSON.stringify(val));

      this.useStyle(val);
    }
  }
};
</script>
