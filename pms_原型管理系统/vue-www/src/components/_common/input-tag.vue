<template>
  <div class='lay-h lay-r'>
    <div class='wd-max lay-r'>
      <input type="text" @focus='show' @blur='hide' v-model='input' class="wd-max">

      <button class='float-ne'  @click='confirm'>
        <icon name='arrow-right'></icon>
      </button>
    </div>
    <pre id='_pre' v-if='tags.length>0'>
      <span v-for='(tag,i) in tags' class='tag in-pop' @click='remove(i)' :key='i'>
        {{ tag.txt }}
        <span><icon name='times'></icon></span>
      </span>
    </pre>
    <transition name='opacity'>
      <div class='hint radius-s wd-max sd-card pd-s bg-light' v-if='presetSeen'>
        <div class='ht-s fs-s cl-sec'>推荐标签</div>
        <span v-for='tag in presets' :key='tag.txt' @click='addTag(tag)' class='blink-theme preset mg-xs'>{{ tag.txt }}</span>
      </div>
    </transition>
    <transition name='opacity'>
      <div class='hint radius-s wd-max sd-card pd-s bg-light' v-if='searchSeen'>
        <div class='ht-s fs-s cl-sec'>搜索建议</div>
        <div v-for='tag in searchs' :key='tag.txt' @click='addTag(tag)' class='blink-theme ht-xs'>
          {{ tag.txt }}
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.hint {
  position: absolute;
  top: 100%;
  margin-top: 0.04rem;
  z-index: 999;
}

#_pre {
  text-align: left;
  margin-left: 0.08rem;
  box-sizing: border-box;
  flex: none;
}

input:focus {
  box-shadow: 0 1px 3px #9e9e9e;
  border-color: transparent;
}

.tag {
  padding: 0.04rem;
  color: #212121;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 0.02rem;
  display: inline-block;
  box-sizing: border-box;
  line-height: 0.12em;
}

.tag svg {
  transform: scale(0.6);
  transition: transform 0.4s ease;
  fill: #9e9e9e;
}

.tag:hover svg {
  transform: scale(0.6) rotate(180deg);
}

.preset {
  padding: 0 0.12rem;
  border-radius: 0.02rem;
  border: 1px solid #e0e0e0;
  margin: 0.02rem;
  display: inline-block;
  height: 0.24rem;
  line-height: 0.24rem;
}
</style>
<script>
export default {
  props: ["preset", "search"],
  data() {
    return {
      input: "",
      tags: [],
      presetSeen: false,
      searchSeen: false,
      presets: JSON.parse(JSON.stringify(this.preset)) || [],
      searchs: JSON.parse(JSON.stringify(this.search)) || []
    };
  },
  methods: {
    confirm(ev) {
      if (!this.input) return false;
      for (var i in this.tags) {
        if (this.tags[i].txt == this.input) {
          return false;
        }
      }
      if (this.tags.length > 2) {
        this.tags.shift();
      }
      this.tags.push({
        txt: this.input
      });
    },
    addTag(tag) {
      for (var i in this.tags) {
        if (tag._id && this.tags[i]._id == tag._id) {
          return false;
        }
      }
      if (this.tags.length > 2) {
        this.tags.shift();
      }
      this.tags.push(tag);
    },
    remove(i) {
      this.tags.splice(i, 1);
    },
    show() {
      if (this.input) {
        this.presetSeen = false;
        this.searchSeen = true;
      } else {
        this.presetSeen = true;
        this.searchSeen = false;
      }
    },
    hide() {
      this.presetSeen = this.searchSeen = false;
    }
  },
  watch: {
    input(_n) {
      this.show();
    },
    preset(_n) {
      this.presets = JSON.parse(JSON.stringify(_n));
    },
    search(_n) {
      this.searchs = JSON.parse(JSON.stringify(_n));
    }
  }
};
</script>
