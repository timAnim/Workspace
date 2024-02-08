<template>
  <div>
    <h3></h3>
    <ol class="pd-m-h">
      <li class='pointer'>
        <span class="ht-m wd-xl" id='triggerLeft' @click='$refs.triggerLeft.seen=true'>
          下午茶
          <label>
            <icon name='caret-down'></icon>
          </label>
        </span>
        <div class="ht-m align-c" id='triggerMiddle' @click='$refs.triggerMiddle.seen=true'>
          居中的列表
          <label>
            <icon name='caret-down'></icon>
          </label>
        </div>
        <span class="ht-m align-r wd-xl" id='trigglerRight' @click='$refs.trigglerRight.seen=true'>
          右侧尝试
          <label>
            <icon name='caret-down'></icon>
          </label>
        </span>
      </li>
    </ol>
    <dropdown :trigger='"triggerLeft"' ref='triggerLeft' @drop='markHdl'>
      <ol class="pd-m">
        <li v-for="item in arr" :key='item.id'>
          <label>
            <icon name='circle-o'></icon>
          </label>
          <em>
            {{item.name}}
          </em>
        </li>
      </ol>
    </dropdown>
    <dropdown :trigger='"trigglerRight"' ref='trigglerRight' @drop='markHdl'>
      <ol class="pd-m">
        <li class="blink-wave" v-for="item in arr" :key='item.id'>
          <em>
            {{item.name}}
          </em>
        </li>
      </ol>
    </dropdown>
    <dropdown :trigger='"triggerMiddle"' :center='true' ref='triggerMiddle' @drop='markHdl'>
      <ol class="pd-m">
        <li class="blink-wave" v-for="item in arr" :key='item.id'>
          <em>
            {{item.name}}
          </em>
        </li>
      </ol>
    </dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        {
          id: 1,
          name: "苹果-橘子-特别特别的长的一个句子"
        },
        {
          id: 2,
          name: "橘子"
        },
        {
          id: 3,
          name: "菠萝"
        },
        {
          id: 4,
          name: "西红柿"
        }
      ]
    };
  },
  methods: {
    markHdl(vm) {
      if (vm.state) {
        vm.trigger.classList.add("cl-theme");
      } else {
        vm.trigger.classList.remove("cl-theme");
      }
    }
  }
};
</script>
