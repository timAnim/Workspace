<template>
  <article @click.stop class="float-ne ht-max wd-dialog sd-card">
    <header>
      <li class="pd-s-v">
        <div></div>
        <span class="ht-s pd-l-h sd-cut pointer" @click='$emit("nav","edit")'>当前</span>
        <span class="ht-s pd-l-h sd-cut pointer sd-theme">探索</span>
        <span class="ht-s pd-l-h sd-cut pointer" v-if='logined' @click='$emit("nav","mylist")'>我的</span>
        <div></div>
      </li>
    </header>
    <content class="pd-s-h">
      <div
        :key='pt._id'
        :style="{
            padding:pt['--pd-m'],
            margin:pt['--pd-l'],
            background:pt['--cl-back'],
            borderWidth:pt['--bdr-width'],
            borderColor:pt['--bdr-color'],
            borderStyle:pt['--bdr-style'],
          }"
        class="pointer lay-r"
        v-for='pt in pkgs'
        @click='useStyle(pt)'>
        <div :style="{
            overflow:'hidden',
            boxShadow:pt['--shadow-m'],
            borderRadius:pt['--radius-m'],
            background:pt['--cl-front'],
            }">
          <div
           :style="{
              padding:pt['--pd-m'],
              }">
            <div :style="{
              color:pt['--cl-hint'],
              fontSize:pt['--fs-xs'],
              }">主题名称</div>
            <div :style="{
              color:pt['--cl-theme'],
              fontSize:pt['--fs-l'],
              height:pt['--ht-m'],
              lineHeight:pt['--ht-m'],
              }">{{pt.title}}</div>
          </div>
          <li
            class="pd-m-h"
            :style="{
            background:pt['--cl-light'],
            height:pt['--ht-s'],
            }">
            <div :style="{
              color:pt['--cl-sec'],
              fontSize:pt['--fs-s'],
              }">by {{pt.cuser}}</div>
            <button :style="{
              color:pt['--cl-hint'],
              fontSize:pt['--fs-m'],
              }" @click.stop='saveas(pt)'>编辑副本</button>
          </li>
        </div>
        <div v-if='pt._id==ptpreset._id' class="float-ne ht-m wd-m sd-theme align-c radius-l">
          <icon name='check'></icon>
        </div>
      </div>
    </content>
    <footer>
      <li class="bg-light ht-l">
        <button class="pd-m-h mg-m-h sd-cut" @click='close'>关闭</button>
        <div></div>
        <button class='sd-cut pd-m-h ' @click='create'>创建</button>
        <button class="sd-theme mg-m-h pd-m-h " @click='dfpreset'>默认主题</button>
      </li>
    </footer>
  </article>
</template>

<script>
export default {
  props: ["ptpreset"],
  data() {
    return {
      pkgs: []
    };
  },
  methods: {
    useStyle(pt) {
      this.$emit("use", pt);
    },
    saveas(pt) {
      this.$emit("saveas", pt);
    },
    close() {
      this.$emit("close");
    },
    create() {
      if (!this.logined) {
        return this.$store.commit("toast", "请先登录");
      }
      this.$emit("create");
    },
    dfpreset() {
      this.$emit("default");
    },
    init() {
      this.$http.post("/api/ptpreset/find").then(res => {
        this.pkgs = res.data.data;
      });
    }
  },
  computed: {
    logined() {
      return this.$store.state.token? true : false;
    }
  }
};
</script>
