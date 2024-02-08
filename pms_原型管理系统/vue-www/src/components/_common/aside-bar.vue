<template>
  <aside :df-state='asideState' class="lay-v bg-back-i">
    <div class="shadow-m bg-light-i">
      <li class="ht-l cl-hint-i">
        <span class="wd-m align-c">
          <icon name='gg'></icon>
        </span>
        <div>产品体验设计</div>
      </li>
    </div>
    <content id='aside-scroller' class="ht-auto">
      <section>
        <div v-for='item in asides' :opened='item.opened' :key = 'item.id'>
          <li @click='_switch' class='blink-wave bg-front-i' :id='item.id' :checked='item.checked' :type='item.children?"MENU":"HREF"' v-show='item.seen'>
            <span class="wd-m align-c">
              <icon :name='item.label'></icon>
            </span>
            <div>{{ item.name }}</div>
            <span v-if='typeof(item.children)=="object"' class="wd-m align-c">
              <icon name='angle-down'></icon>
            </span>
          </li>
          <transition-group name='in-top'>
            <li @click='_switch'
                class='child blink-wave' v-for='child in item.children' :key='child.id' :id='child.id' :checked='child.checked' type='CHILD' v-if='opened&&asideState=="on"'>
              <em>{{ child.name }}</em>
            </li>
          </transition-group>
        </div>
      </section>
    </content>
  </aside>
</template>
<script>
    export default {
        name: "aside-bar",
        data() {
            return {
                asides: [{
                    name: "迭代",
                    id: "/project/list",
                    label: "home",
                    seen: true
                }, {
                    name: "产品",
                    id: "/product/list",
                    label: "home",
                    seen: true
                }, {
                    name: "组件",
                    id: "/components",
                    label: "ils",
                    seen: true
                }, {
                    id: "/instructs",
                    name: "规范",
                    label: "info-circle",
                    seen: true
                }, {
                    id: "/vr",
                    name: "虚拟现实",
                    label: "simplybuilt",
                    seen: true
                }, {
                    name: "实验室",
                    id: "/lab",
                    label: "wrench",
                    seen: false
                }, {
                    name: "关于",
                    id: "/start",
                    label: "user-circle",
                    seen: false
                }, {
                    name: "人员管理",
                    id: "/user/list",
                    label: "users",
                    seen: false
                }]
            };
        },
        methods: {
            _switch(ev) {
                //处理收缩状态
                var target = ev.target;
                while (target.tagName != "LI") {
                    target = target.parentNode;
                }
                let type = target.getAttribute("type");
                switch (type) {
                    case "MENU":
                        this.asides.forEach(item => {
                            if (item.children) {
                                if (item.id == target.id) this.$set(item, "opened", !item.opened);
                                else this.$set(item, "opened", false);
                            }
                        });
                        break;
                    case "CHILD":
                        this.asides.forEach(item => {
                            if (item.children) {
                                item.children.forEach(child => {
                                    this.$set(child, "checked", target.id == child.id);
                                });
                            }
                        });
                        this.$router.replace(target.id);
                        this.$emit("href", target.id);
                        break;
                    case "HREF":
                        this.$router.replace(target.id);
                        this.$emit("href", target.id);
                        break;
                }
            }
        },
        mounted() {
            //跳转之后回调，处理高亮
            var cur = this.$route.path;
            let childCheck;
            this.asides.forEach(item => {
                if (item.children) {
                    item.children.forEach(child => {
                        this.$set(child, "checked", child.path == cur);
                        childCheck = childCheck || child.checked;
                    });
                    this.$set(item, "checked", childCheck);
                    this.$set(item, "opened", childCheck);
                    childCheck = false;
                } else {
                    this.$set(item, "checked", cur.indexOf(item.id) == 0);
                }
            });
        },
        computed: {
            asideState: {
                get() {
                    return this.$store.state.aside;
                }
            },
            isadmin() {
                console.log(this.$store.state.isadmin)
                if (this.$store.state.isadmin) this.$set(this.asides[7], "seen", true);
                return this.$store.state.isadmin;
            }
        },
        updated() {
            this.$set(this.asides[7], "seen", this.isadmin);
        },
        watch: {
            isadmin(val) {
                this.$set(this.asides[7], "seen", val);
            }
        }
    };
</script>