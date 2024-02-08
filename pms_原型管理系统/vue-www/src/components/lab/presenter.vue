<template>
  <transition name='drop'>
    <div class='mask bg-mask-i' @click.stop='out(false)' v-if='seen'>
      <div class="dialog sd-list" @click.stop v-if='seen&&type!=="confirm"'>
        <header>
          <li class="ht-l pd-m-h">
            <h1>{{ title }}</h1>
            <button type='icon' class='cl-alert' v-if='del' @click='_del'>
              <icon name='trash'></icon>
            </button>
          </li>
        </header>
        <content class="scroll-y">
          <ol>
            <!-- 多选框 -->
            <li v-for='(item,index) in items' v-if='type==="check"' :key='item._id' @click='checkHdl(item, index)' class='blink-theme'>
              <label>
                <icon class='cl-sec' v-if='!item.checked' name="square-o"></icon>
                <icon class='cl-theme in-pop' v-else name="check-square"></icon>
              </label>
              <div>{{ item.name }}</div>
              <pre>{{ item.pre }}</pre>
            </li>
            <!-- 单选框 -->
            <li v-for='(item, index) in items' :id='item._id' :key='item.id' v-if='type==="radio"' @click='_radio(index)' class='blink-theme'>
              <label>
                <icon scale='1.25' class="cl-sec" name="circle-o" v-if='!item.checked'></icon>
                <icon scale='1.25' class="cl-theme in-pop" name="dot-circle-o" v-else></icon>
              </label>
              <div>{{ item.name }}</div>
              <pre class="pd-m-h">{{ item.pre }}</pre>
            </li>
            <!-- 菜单 -->
            <li v-for='(item, index) in items' :id='item._id' :key='item.id' v-if='type==="menu"' class='blink-theme' @click='_href(index)'>
              <em>{{ item.name }}</em>
              <pre>{{ item.pre }}</pre>
              <label>
                <icon name="angle-right"></icon>
              </label>
            </li>
            <!-- 输入框 -->
            <li v-for='(key, value) in items' v-if='type==="input"' :key='key'>
              <span class="wd-xl">{{ lan(value) }}</span>
              <input-text type="text" :value='key' @input='items[value]=$event.target.value' icon='i-cursor'></input-text>
            </li>
          </ol>
        </content>
        <footer>
          <li class="pd-m">
            <div></div>
            <button class="wd-xl mg-m-h" @click='out(false)'>取消</button>
            <button class="wd-xl sd-theme" @click='out(true)'>确认</button>
          </li>
        </footer>
      </div>
      <!-- 下面是确认框 -->
      <div @click.stop v-if='seen&&type==="confirm"' class='confirm dialog'>
        <content>
          <div>
            <li class="ht-xl align-c">
              <h2>{{ title }}</h2>
            </li>
            <li class="pd-m-h">
              <div></div>
              <button class="ht-m wd-xl mg-m-h" @click='out(false)'>取消</button>
              <button class="ht-m wd-xl sd-theme" @click='out(true)'>确认</button>
            </li>
          </div>
        </content>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.mask {
  z-index: 999 !important;
}
.dialog content{
  max-height: 3.6rem;
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    initData: {
      type: Array,
      default() {
        return [];
      }
    },
    parse: {
      type: Object,
      default() {
        return {};
      }
    },
    del: {
      type: Function
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    checkHdl(item,index) {
      item.checked = !item.checked;
      this.$set(this.items, index, this.items[index]);
    },
    _radio(index) {
      this.items.forEach(item => {
        item.checked = item._id == this.items[index]._id;
      });
      this.$set(this.items, index, this.items[index]);
    },
    _href(index) {
      this.$emit("out", this.items[index]);
    },
    _del(ev) {
      this.$emit("del", true);
    },
    out(res) {
      this.seen = false;
      switch (this.type) {
        case "radio":
          if (!res) {
            res = [];
          } else {
            res = this.items.filter(item => {
              return item.checked;
            });
          }
          break;
        case "check":
          if (!res) {
            res = [];
          } else {
            res = this.items.filter(item => item.checked);
          }
          break;
        case "input":
          res = this.items;
          break;
      }
      console.log(res)
      return this.$emit("out", res);
    },
    lan(char) {
      return this.parse[char] || char;
    },
    init(){
      if(this.initData){
        this.items = JSON.parse(JSON.stringify(this.initData));
      }
    },
    check(arr) {
      this.init()
      this.$pd.wait(50)
      .then(time=>{
        var n = 0;
        this.checked = JSON.parse(JSON.stringify(arr));

        this.items.forEach((item, index) => {
          n = 0;
          this.checked.forEach(chItem => {
            if (item._id === chItem) n++;
          });
          item.checked = n ? true : false;
          this.$set(this.items, index, item);
        });
      })
    }
  },
  data() {
    return {
      seen: false,
      checked: [],
      items: []
    };
  },
  watch: {
    initData() {
      this.init()
    }
  }
};
</script>
