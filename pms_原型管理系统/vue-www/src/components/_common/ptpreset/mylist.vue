<template>
  <article @click.stop class="float-ne ht-max wd-dialog sd-card">
    <header>
      <li class="pd-s-v">
        <div></div>
        <span class="ht-s pd-l-h sd-cut pointer" @click='$emit("nav","edit")'>当前</span>
        <span class="ht-s pd-l-h sd-cut pointer" @click='$emit("nav","explore")'>探索</span>
        <span class="ht-s pd-l-h sd-cut pointer sd-theme">我的</span>
        <div></div>
      </li>
    </header>
    <content class="pd-s-h">
      <div :key='pt._id' :style="{
            padding:pt['--pd-m'],
            margin:pt['--pd-l'],
            background:pt['--cl-back'],
            borderWidth:pt['--bdr-width'],
            borderColor:pt['--bdr-color'],
            borderStyle:pt['--bdr-style'],
          }" class="pointer lay-r" v-for='pt in pkgs' @click='useStyle(pt)'>
        <div :style="{
            overflow:'hidden',
            boxShadow:pt['--shadow-m'],
            borderRadius:pt['--radius-m'],
            background:pt['--cl-front'],
            }">
          <div :style="{
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
          <li class="pd-m-h" :style="{
            background:pt['--cl-light'],
            height:pt['--ht-s'],
            }">
            <div :style="{
              color:pt['--cl-sec'],
              fontSize:pt['--fs-s'],
              }">{{pt.cdate.slice(0,10)}}</div>
            <button :style="{
              color:pt['--cl-hint'],
              fontSize:pt['--fs-m'],
              }" @click.stop='edit(pt)'>编辑</button>
            <button :style="{
              color:pt['--cl-sec'],
              fontSize:pt['--fs-m'],
              }" @click.stop='confirmDel(pt)'>
              <icon name='trash'></icon>
            </button>
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
                dfState: "on",
                paraCur: "color",
                panel: "cur",
                show: true,
                pkgs: []
            };
        },
        methods: {
            useStyle(pt) {
                this.$emit("use", pt);
            },
            edit(pt) {
                this.$emit("edit", pt);
            },
            confirmDel(pt) {
                this.$store.commit("setConfirm", {
                    seen: true,
                    msg: "确认删除？",
                    out: res => {
                        if (!res) return false;
                        this.$emit("delete", pt);
                    }
                });
            },
            close() {
                this.$emit("close");
            },
            create() {
                this.$emit("create");
            },
            dfpreset() {
                this.$emit("default");
            },
            init() {
                this.$http.post("/api/ptpreset/mylist", {
                    uid: this.$store.state.uid
                }).then(res => {
                    this.pkgs = res.data.data;
                });
            }
        }
    };
</script>