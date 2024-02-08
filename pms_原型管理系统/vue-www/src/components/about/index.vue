<style scoped>
ol > img {
  display: block;
  animation: expand 500ms ease, exposure 1500ms ease-out;
}
</style>
<template>
  <app-layout>
    <section slot='content'>
      <dl>
        <header>
          <li>
            <h1 class="pd-m-h">宇通产品体验设计团队</h1>
          </li>
        </header>
        <img src="/static/img/aboutUsBgSmall.png" class="wd-max">
        <div id='h-outer' class="lay-r">
          <ul id='h-inner' class='flow-up'>
            <span v-for='(p,i) in staffs' :key='i'>
              <div class='clip mg-auto' type='circle-l'>
                <img src="/static/img/img01.jpg">
              </div>
              <li>
                <em class="align-c">{{ p.name }}</em>
              </li>
            </span>
          </ul>
        </div>
      </dl>
    </section>
  </app-layout>
</template>
<script>
// import Scroller from 'Scroller'
export default {
  data() {
    return {
      staffs: [
        {
          name: "汝霄"
        },
        {
          name: "陈峥"
        },
        {
          name: "闫亚州"
        },
        {
          name: "段坤明"
        },
        {
          name: "姜贺"
        }
      ]
    };
  },
  mounted() {
    // this.$pd.id('h-inner').style.width = this.staffs.length * 120 + 'px'
    // this.scroller = new Scroller('#h-outer', {
    //   scrollX: true,
    //   scrollY: false,
    // })
    // setTimeout(ev => {
    //   this.scroller.refresh()
    // }, 600)
  }
};
</script>
