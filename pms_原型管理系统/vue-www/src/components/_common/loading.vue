
<template>
  <div class="ht-max wd-max float-nw lay-h" v-if='show'>
    <div class='in-pop radius-m ht-panel mg-auto wd-panel align-c cl-front bg-mask-i'>
      <p class="mg-m-v ht-l">加载中</p>
      <div>
        <icon name='circle-o-notch' height='56' width='56' class='spinning'></icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: ["show"]
};
</script>
