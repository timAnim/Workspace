<template>
  <div>
    <dl class="mg-m-v">
      <li class="ht-l align-indent"><em>切换动画</em></li>
      <div>
        <ul class='flow-up lay-h'>
          <span class="lay-r pointer align-c mg-m ht-xl" v-for='(a,i) in anims' @click='a.seen=!a.seen' :key='i'>
            <transition :name='a.anim'>
            <div class='con wd-xl' v-if='a.seen'>
              <div class="clip"><img src="/static/img/img01.jpg"></div>
            </div>
            </transition>
            <div v-show='!a.seen' class="float-c">{{ a.name }}</div>
          </span>
        </ul>
      </div>
    </dl>

    <dl class="mg-m-v">
      <li class="ht-l align-indent"><div>强调动画</div></li>
      <div id='mark-anim'>
        <ul class="pd-m align-c">
          <span class="blink-theme ht-m sd-cut">
            <dt>闪烁</dt>
          </span>
          <span class="blink-wave ht-m sd-cut">
            <dt>波纹</dt>
          </span>
          <span class="blink-reverse ht-m sd-cut">
            <dt>主题色</dt>
          </span>
          <span class="blink-alert ht-m sd-cut">
            <dt>高亮</dt>
          </span>
        </ul>
      </div>
    </dl>

    <dl class="mg-m-v">
      <li class="ht-l align-indent"><div>列表闪烁</div></li>
      <ul id='list-anim' class="align-indent pd-m" type='column-4'>
        <ol class="blink-list" @click='list'>
          <li><em>翻转进入</em></li>
          <li><em>翻转进入</em></li>
          <li><em>翻转进入</em></li>
          <li><em>翻转进入</em></li>
          <li><em>翻转进入</em></li>
        </ol>
        <ol class="blink-list-right" @click='list'>
          <li><em>侧滑进入</em></li>
          <li><em>侧滑进入</em></li>
          <li><em>侧滑进入</em></li>
          <li><em>侧滑进入</em></li>
          <li><em>侧滑进入</em></li>
        </ol>
      </ul>
    </dl>

    <dl class="mg-m-v">
      <li class="pd-m-h ht-l"><div>卡片进入</div>
        <button class='sd-theme mg-s-h' @click='flow'>流动</button>
        <button class='sd-theme mg-s-h' @click='exposure'>曝光</button>
      </li>
      <ul id='card-example' class="pd-m">
        <span v-for='(item,i) in listData' :key='i'>
          <dt class="clip">
            <img src="/static/img/img01.jpg">
          </dt>
          <dd align='center'>卡片</dd>
        </span>
      </ul>
    </dl>
  </div>
</template>
<script>
export default {
  data() {
    return {
      anims: [
        {
          seen: true,
          anim: "circle",
          name: "圆形切换"
        },
        {
          anim: "slide",
          name: "上滑切换",
          seen: true
        },
        {
          anim: "drop",
          name: "下滑切换",
          seen: true
        },
        {
          anim: "in-left",
          name: "左滑切换",
          seen: true
        }
      ],
      listData: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    list(ev) {
      let target = ev.currentTarget;
      let name = target.className;
      target.classList.remove(name);
      setTimeout(() => {
        target.classList.add(name);
      }, 200);
    },
    flow() {
      this.$pd.id("card-example").classList.add("flow-up");
      setTimeout(() => {
        this.$pd.id("card-example").classList.remove("flow-up");
      }, 600);
    },
    exposure() {
      this.$pd.id("card-example").classList.add("exposure");
      setTimeout(() => {
        this.$pd.id("card-example").classList.remove("exposure");
      }, 600);
    }
  }
};
</script>
